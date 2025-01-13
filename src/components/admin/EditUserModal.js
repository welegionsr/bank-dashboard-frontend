'use client';

import apiClient from "@/utils/api";
import { validateBalance, validateName, validatePhone } from "@/utils/validators";
import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { CheckCircle, PersonVcard, PiggyBank, TelephoneInbound, XCircle } from "react-bootstrap-icons";

export default function EditUserModal({ user, show, onHide }) {
    const [newName, setNewName] = useState(user?.name || '');
    const [newPhone, setNewPhone] = useState(user?.phone || '');
    const [newBalance, setNewBalance] = useState(user?.balance ? user.balance / 100 : 0);
    const [submitted, setSubmitted] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState({});

    // form validation
    const validateForm = () => {
        const newErrors = {};
        if (!validateName(newName)) newErrors.name = "Name field cannot be empty!";
        if (!validatePhone(newPhone)) newErrors.phone = "Phone number must be 10 digits!";
        if (!validateBalance(newBalance)) newErrors.balance = "Balance must be a positive number!";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    useEffect(() => {
        if (user) {
            setNewName(user.name || "");
            setNewPhone(user.phone || "");
            setNewBalance(user.balance ? user.balance / 100 : 0);
        }
    }, [user]);

    if (!user) {
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setSubmitted(true);

        await apiClient.put(`/users/${user._id}`, {
            name: newName,
            phone: newPhone,
            balance: newBalance * 100,
        })
            .then((_response) => {
                setSuccess(true);
                setSubmitted(false);
            })
            .catch((error) => {
                console.error("[EditUserModal] Error updating user", error);
                setSubmitted(false);
            });
    }

    const handleHide = () => {
        setTimeout(() => {
            setSuccess(false);
            setSubmitted(false);
        }, 1000);
        onHide();
    }

    return (
        <Modal show={show} onHide={handleHide} backdrop="static">
            {!success && (
                <Form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>{`Edit ${user.name}'s profile`}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ overflow: 'auto', maxWidth: '100%' }}>
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label><PersonVcard size="18" />{' '}Full name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="..."
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                isInvalid={!!errors.name}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.name}
                            </Form.Control.Feedback>
                            <Form.Text className="text-muted">
                                First and last name
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPhone">
                            <Form.Label><TelephoneInbound size="18" />{' '}Phone number?</Form.Label>
                            <Form.Control
                                type="tel"
                                placeholder="..."
                                value={newPhone}
                                onChange={(e) => setNewPhone(e.target.value)}
                                isInvalid={!!errors.phone}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.phone}
                            </Form.Control.Feedback>
                            <Form.Text className="text-muted">
                                A valid phone number
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBalance">
                            <Form.Label><PiggyBank size="18" />{' '}Current balance</Form.Label>
                            <Form.Control 
                                type="numeric" 
                                placeholder="100.0" 
                                value={newBalance} 
                                onChange={(e) => setNewBalance(e.target.value)} 
                                isInvalid={!!errors.balance}
                                required 
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.balance}
                            </Form.Control.Feedback>
                            <Form.Text className="text-muted">
                                In the end, money is just a number
                            </Form.Text>
                        </Form.Group>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="submit" disabled={submitted}>
                            <CheckCircle size="22" color="white" />
                            <span style={{ verticalAlign: 'middle' }}> {' '} {submitted ? 'Submitting...' : 'Save changes'}</span>
                        </Button>
                        <Button variant="secondary" onClick={handleHide}>
                            <XCircle size="22" color="white" />
                            <span style={{ verticalAlign: 'middle' }}> {' '} Cancel</span>
                        </Button>
                    </Modal.Footer>
                </Form>
            )}

            {success && (
                <Modal.Body>
                    <h4>Success!</h4>
                    <p>User profile updated successfully.</p>
                    <Button variant="primary" onClick={handleHide}>
                        Close
                    </Button>
                </Modal.Body>
            )}
        </Modal>
    );
}