'use client';

import apiClient from "@/utils/api";
import { useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { EnvelopePaper, EnvelopeX, KeyFill } from "react-bootstrap-icons";
import { useAuth } from "../layout";
import { useRouter } from "next/navigation";
import { useUser } from "@/utils/UserContext";


export default function VerifyPage() {
    const [verificationCode, setVerificationCode] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const userContext = useUser();
    const { setMessage, setMessageType } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSubmitted(true);

        const { email } = userContext.user;

        apiClient.post('/auth/verify', { email, verificationCode })
            .then(response => {
                setMessageType('success');
                setMessage('Account Verified! Redirecting to login...');
                router.push('/login');  // Redirect to the login page
            })
            .catch(err => {
                console.error('Verification error:', err.response?.data?.message || 'Verification failed');
                setMessageType('warning');
                // TODO: add different handling for different status codes (400, 403 etc)
                setMessage('Verification process failed!');
                setSubmitted(false);
            });
    };

    return (
        <Container className="mt-4">
            <Card className="form">
                <Card.Header>
                    <KeyFill size="22" color="black" /> {' '}
                    Verify your account to continue!
                </Card.Header>
                <Card.Text>
                    An email with a passcode is on its way to your inbox!
                    Note: the passcode is valid only for the next 10 minutes.
                </Card.Text>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formPasscode">
                            <Form.Label><EnvelopePaper size="18" /> {' '} Enter the passcode</Form.Label>
                            <Form.Control type="text" placeholder="..." value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} required />
                            <Form.Text className="text-muted">
                                It's the 6-digit code that was sent to you by email.
                            </Form.Text>
                        </Form.Group>

                        <Button variant="primary" type="submit" disabled={submitted}>
                            {submitted ? 'Verifying...' : 'Verify'}
                        </Button>
                    </Form>
                </Card.Body>
                <Card.Footer>
                    <EnvelopeX size="22" color="black" style={{ marginRight: "4px" }} /> {' '}
                    Didn't get an email? {' '}
                    <Card.Link
                        style={{ cursor: "pointer", textDecoration: "none" }}
                        onClick={() => { /* HANDLE RE-SEND OF EMAIL */ }}
                    >
                        Send a new one!
                    </Card.Link>
                </Card.Footer>
            </Card>
        </Container>
    );
}