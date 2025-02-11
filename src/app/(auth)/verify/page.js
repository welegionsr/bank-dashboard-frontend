'use client';

import apiClient from "@/utils/api";
import { useEffect, useState } from "react";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";
import { EnvelopePaper, EnvelopeX, KeyFill } from "react-bootstrap-icons";
import { useAuth } from "../layout";
import { useRouter } from "next/navigation";
import { useUser } from "@/utils/UserContext";
import VerifyField from "@/components/form/VerifyField";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { destroyCookie } from "nookies";
import Head from "next/head";

const isProduction = process.env.NODE_ENV === 'production';

export default function VerifyPage() {
    const [verificationCode, setVerificationCode] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [resent, setResent] = useState(false);
    const [resendTimer, setResendTimer] = useState(0);
    const userContext = useUser();
    const { setMessage, setMessageType } = useAuth();
    const router = useRouter();

    // clear the temp cookie that enables access to this page
    useEffect(() => {
        destroyCookie(null, 'verify_access', {
            sameSite: isProduction ? 'None' : 'Lax',
            secure: isProduction,
            path: '/',
            ...(isProduction && { partitioned: true }),
            ...(isProduction && { domain: process.env.DEPLOY_DOMAIN }),
        });
    }, []);

    // Effect to handle the countdown timer
    useEffect(() => {
        let interval = null;

        if (resendTimer > 0) {
            interval = setInterval(() => {
                setResendTimer((prev) => {
                    if (prev === 1) {
                        setResent(false); // Reset "resent" when timer reaches 0
                        clearInterval(interval); // Clear the interval immediately
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            if (interval) clearInterval(interval); // Cleanup on unmount
        };
    }, [resendTimer]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSubmitted(true);

        console.log("[VerifyPage] UserContext:", userContext);

        const { email } = userContext.incompleteUser;

        apiClient.post('/auth/verify', { email, verificationCode })
            .then(_response => {
                setMessageType('success');
                setMessage('Account Verified! Please sign in to continue.');
                userContext.setIncompleteUser(null); // Clear the incomplete user data
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

    const handleResend = async (e) => {
        e.preventDefault();

        setResent(true);
        setResendTimer(20); // start a timer of 20 seconds

        const { email } = userContext.user;

        apiClient.post('/auth/resend', { email })
            .then(_response => {
                setMessageType('info');
                setMessage('A new code was sent to your email');
                setTimeout(() => {
                    setMessage('');
                }, 5000);
            })
            .catch(err => {
                console.error('Resend error:', err.response?.data?.message || 'Resend failed');
                setMessageType('warning');
                setMessage('Failed to resend the verification email!');
                setResent(false);
            });

    }

    return (
        <>
            <Head>
                <title>Verify Account | GoldFront Bank</title>
            </Head>
            <Container className="mt-4">
                <Card className="form">
                    <Card.Header>
                        <KeyFill size="22" color="black" /> {' '}
                        Verify your account to continue!
                    </Card.Header>
                    <Card.Body>
                        <DotLottieReact
                            src="animations/email-verify.lottie"
                            autoplay
                            loop
                        />
                        <Card.Text className="mt-4" style={{ padding: '0 1rem' }}>
                            An email with a passcode is on its way to your inbox!<br />
                        </Card.Text>
                    </Card.Body>
                    <Alert style={{ margin: '0.2rem 1rem', fontSize: '0.75rem', padding: '8px' }}><strong>Note:</strong> the passcode is valid for the next 10 minutes.</Alert>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formPasscode">
                                <Form.Label><EnvelopePaper size="18" /> {' '} Enter the passcode</Form.Label>
                                <VerifyField
                                    length={6} // 6-digit code
                                    onChange={(value) => setVerificationCode(value)}
                                />
                                <Form.Text className="text-muted">
                                    It&apos;s the 6-digit code that was sent to you by email.
                                </Form.Text>
                            </Form.Group>

                            <Button variant="primary" type="submit" disabled={submitted}>
                                {submitted ? 'Verifying...' : 'Verify'}
                            </Button>
                        </Form>
                    </Card.Body>
                    <Card.Footer>
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
                    </Card.Footer>
                </Card>
            </Container>
        </>
    );
}