'use client';

import apiClient from "@/utils/api";
import Head from "next/head";
import { useState } from "react";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";
import { Envelope } from "react-bootstrap-icons";
import { useAuth } from "../layout";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [sent, setSent] = useState(false);
    const { setMessage, setMessageType } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

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
            <p style={{padding: '0.5rem', fontWeight: '500', textAlign: 'center'}}>
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
                    // isInvalid={!!errors.email}
                    required
                />
                {/* <Form.Control.Feedback type="invalid">
                                    {errors.email}
                                </Form.Control.Feedback> */}
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
                    <Card.Body>
                        <Card.Text className="mt-2" style={{ padding: '0 0.5rem' }}>
                            {cardBodyContent}
                            {formContent}
                        </Card.Text>
                    </Card.Body>
                    {/* <Card.Footer>
                        <EnvelopeX size="22" color="black" style={{ marginRight: "4px" }} /> {' '}
                        Didn&apos;t get an email? {' '}
                        <Button
                            variant="link"
                            style={{ padding: "0", cursor: "pointer", textDecoration: "none" }}
                            onClick={handleResend}
                            disabled={resent}
                        >
                            {resent ? `Resend in ${Math.floor(resendTimer / 60)}:${String(resendTimer % 60).padStart(2, '0')}...` : "Send a new one!"}
                        </Button>
                    </Card.Footer> */}
                </Card>
            </Container>
        </>
    );
};