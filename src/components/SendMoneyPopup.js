'use client';

import apiClient from "@/utils/api";
import { useUser } from "@/utils/UserContext";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Alert, Badge, Button, Form, Modal, Spinner } from "react-bootstrap";
import { CheckCircle, Send, XCircle } from "react-bootstrap-icons";
import TransactionSuccess from "./TransactionSuccess";
import ContactRow from "./contacts/ContactRow";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { validateBalance, validateEmail } from "@/utils/validators";

export default function SendMoneyPopup({ show, onHide }) {
    const userContext = useUser();
    const [recipientEmail, setRecipientEmail] = useState('');
    const [amount, setAmount] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const queryClient = useQueryClient();
    const [transaction, setTransaction] = useState("");
    const [errors, setErrors] = useState({});

    // form validation
    const validateForm = () => {
        const newErrors = {};
        if (!validateEmail(recipientEmail)) newErrors.email = "Invalid email format!";
        if (!validateBalance(amount)) newErrors.amount = "Amount must be a positive number!";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleHide = () => {
        onHide();
        setTimeout(() => {
            setSuccess(false);
            setAmount(0);
            setRecipientEmail('');
            setSubmitted(false);
            setError('');
        }, 1000);
    };

    const handleContactChoice = (email) => {
        setRecipientEmail(email);
    };

    const handleSubmit = async () => {

        if(!validateForm()) return;

        if (userContext.user.email === recipientEmail) {
            setError("It's not allowed to set yourself as the recipient");
            return;
        }

        const amountInCents = amount * 100;

        if (amountInCents > userContext.user.balance) {
            setError("You don't have enough in your balance to complete this transaction");
            return;
        }


        setSubmitted(true);

        apiClient.post(`/transactions`, { sender: userContext.user.email, receiver: recipientEmail, amount: amountInCents })
            .then(response => {
                setError('');
                setTransaction(response.data.transaction);
                userContext.user.balance -= amountInCents;
                // invalidate the cache to make it reload transactions data
                queryClient.invalidateQueries(['transactions', userContext.user.email]);
                setSuccess(true);
            })
            .catch(err => {
                console.log("error sending transaction: ", err);
                // TODO add different handling according to type of error
                setSuccess(false);
                setSubmitted(false);
            });
    };

    if (!userContext.user) {
        return;
    }


    const cancelButton = (
        <Button
            variant={success ? "primary" : "secondary"}
            onClick={handleHide}
            disabled={!success && submitted}
        >
            {success ? <CheckCircle size="22" color="white" /> : <XCircle size="22" color="white" />}
            {' '}
            {success ? "Done" : "Cancel"}
        </Button>
    );

    const submitButton = !success && (
        <Button variant="primary" onClick={handleSubmit} disabled={submitted}>
            {submitted ? 
                <Spinner size="sm" color="white" animation="border" /> 
                : 
                <Send size="22" color="white" />
            }
            {' '}
            {submitted ? "Sending..." : "Confirm Transaction"}
        </Button>
    );

    return (
        <Modal show={show} onHide={handleHide} backdrop="static">
            <Modal.Header closeButton>
                {/* <Modal.Title>{success ? "" : "Send money!"}</Modal.Title> */}
            </Modal.Header>
            <Modal.Body>
                {!success &&
                    <>
                        <DotLottieReact
                            src="animations/transfer-tree.lottie"
                            autoplay
                            loop
                        />
                        <Form>
                            <Form.Group className="mb-3" controlId="sendForm.receiverEmail">
                                <Form.Label>Who&apos;s the recipient?</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="name@example.com"
                                    autoFocus
                                    value={recipientEmail}
                                    disabled={submitted}
                                    onChange={(e) => setRecipientEmail(e.target.value)}
                                    isInvalid={!!errors.email}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.email}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <small style={{ fontSize: '0.7rem', letterSpacing: '-0.3px' }}>Saved contacts:</small>
                            <ContactRow userId={userContext.user._id} onContactChoice={handleContactChoice} />

                            <Form.Group
                                className="mb-3 mt-3"
                                controlId="sendForm.amount"
                            >
                                <Form.Label>How much?</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="..."
                                    value={amount}
                                    disabled={submitted}
                                    onChange={(e) => setAmount(e.target.value)}
                                    isInvalid={!!errors.amount}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.amount}
                                </Form.Control.Feedback>
                                {userContext.user && (<span>
                                    <Badge className="mt-2" bg="warning" text="dark">Maximum amount you can send: ${userContext.user.balance / 100}</Badge>
                                </span>)}
                            </Form.Group>
                        </Form>
                    </>
                }
                {success &&
                    <TransactionSuccess transaction={transaction} />
                }

                {error &&
                    <Alert variant="danger">{error}</Alert>
                }
            </Modal.Body>
            <Modal.Footer className={`${success ? "" : "d-flex justify-content-between"}`}>
                {cancelButton}
                {submitButton}
            </Modal.Footer>
        </Modal>
    );
}