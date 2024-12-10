'use client';

import apiClient from "@/utils/api";
import { useUser } from "@/utils/UserContext";
import { parseCookies } from "nookies";
import { useState } from "react";
import { Alert, Badge, Button, Form, Modal } from "react-bootstrap";
import { Send, XCircle } from "react-bootstrap-icons";

export default function SendMoneyPopup({ show, onHide }) {
    const userContext = useUser();
    const { token } = parseCookies();
    const [recipientEmail, setRecipientEmail] = useState('');
    const [amount, setAmount] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

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

    const handleSubmit = async () => {

        if (userContext.user.email === recipientEmail) {
            setError("It's not allowed to set yourself as the recipient");
            return;
        }

        if (amount <= 0) {
            setError("Amount must be a positive value");
            return;
        }

        if (amount > userContext.user.balance) {
            setError("You don't have enough in your balance to complete this transaction");
            return;
        }


        setSubmitted(true);

        apiClient.post(`/transactions`, { sender: userContext.user.email, receiver: recipientEmail, amount }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(_response => {
                setError('');
                setSuccess(true);
                userContext.user.balance -= amount;
            })
            .catch(err => {
                console.log("error sending transaction: ", err);
                // TODO add different handling according to type of error
                setSuccess(false);
                setSubmitted(false);
            });
    };

    if (!userContext.valid) {
        return <p> user details missing </p>
    }

    return (
        <Modal show={show} onHide={handleHide} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Send money!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {!success &&
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
                                required
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="sendForm.amount"
                        >
                            <Form.Label>How much?</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="..."
                                value={amount}
                                disabled={submitted}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                            />
                            {userContext.valid && (<span>
                                <Badge bg="warning" text="dark"><strong>Maximum amount you can send: ${userContext.user.balance}</strong></Badge>
                            </span>)}
                        </Form.Group>
                    </Form>
                }
                {success &&
                    <h2>Money sent successfully! yay.</h2>
                }

                {error &&
                    <Alert variant="danger">{error}</Alert>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant={success ? "primary" : "secondary"} onClick={handleHide} disabled={!success && submitted}>
                    <XCircle size="22" color="white" /> {' '}
                    {success ? "Close" : "Cancel"}
                </Button>
                {!success &&
                    <Button variant="primary" onClick={handleSubmit} disabled={submitted}>
                        <Send size="22" color="white" /> {' '}
                        {submitted ? "Sending..." : "Confirm Transaction"}
                    </Button>
                }
            </Modal.Footer>
        </Modal>
    );
}