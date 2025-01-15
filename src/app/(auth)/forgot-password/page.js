'use client';

import apiClient from "@/utils/api";
import Head from "next/head";
import { useState } from "react";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";
import { Envelope, Eraser } from "react-bootstrap-icons";
import { useAuth } from "../layout";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { validateEmail } from "@/utils/validators";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [sent, setSent] = useState(false);
    const { setMessage, setMessageType } = useAuth();
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!validateEmail(email)) newErrors.email = "Invalid email format!";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setSubmitted(true);

        await apiClient.post("/auth/request-password-reset", {
            email
        })
            .then(_response => {
                setSent(true);
                setMessage('');
            })
            .catch(error => {
                console.error("[ForgotPasswordPage] error: ", error);
                setSubmitted(false);
                setMessageType('danger');
                setMessage('There was a problem sending the email, try again later.');
            });

    };

    const cardBodyContent = sent ? (
        <>
            <DotLottieReact
                src="animations/email-verify.lottie"
                autoplay
                loop
            />
            <p style={{ padding: '0.5rem', fontWeight: '500', textAlign: 'center' }}>
                If an account with this email exists, an email was sent!
            </p>
            <p style={{ padding: '0.5rem', textAlign: 'center' }}>
                Please follow the instructions in the email to reset your password.
            </p>
            <Alert variant="info"><strong>Note:</strong> Check your spam folder as well!</Alert>
        </>
    ) : (
        `Please type your email to receive a link to reset your password, if an account exists with this email.`
    );

    const formContent = sent ? (
        <Container className="d-flex justify-content-md-center">
            <Button href="/login">Return to login</Button>
        </Container>
    ) : (
        <Form className="mt-4" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label><Envelope size="18" /> {' '} Email address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    isInvalid={!!errors.email}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    {errors.email}
                </Form.Control.Feedback>
                <Form.Text className="text-muted">
                    The email address of the account.
                </Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit" disabled={submitted}>
                {submitted ? 'Submitting...' : 'Submit'}
            </Button>
        </Form>
    );

    return (
        <>
            <Head>
                <title>Password Reset Request | GoldFront Bank</title>
            </Head>
            <Container className="mt-4">
                <Card className="form">
                    <Card.Header>
                        <Eraser size="20" color="black" /> {' '}
                        <span>Request a password reset</span>
                    </Card.Header>
                    <Card.Body style={{ padding: '1.4rem' }}>
                        {cardBodyContent}
                        <hr />
                        {formContent}
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};