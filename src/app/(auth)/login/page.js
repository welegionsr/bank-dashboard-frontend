'use client';

import '@/app/(auth)/auth.css';
import Head from 'next/head';
import { Button, Card, Container, Form, Spinner, Stack } from "react-bootstrap";
import apiClient from "@utils/api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../layout";
import { BoxArrowInRight, Envelope, Eraser, Key, PersonPlusFill, PersonVcardFill } from 'react-bootstrap-icons';
import { useUser } from '@/utils/UserContext';
import { setCookie } from 'nookies';
import { validateEmail, validateLoginPassword } from '@/utils/validators';

const isProduction = process.env.NODE_ENV === 'production';


export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setMessage, setMessageType } = useAuth();
    const [submitted, setSubmitted] = useState(false);
    const userContext = useUser();
    const [errors, setErrors] = useState({});

    // main validation function
    const validateForm = () => {
        const newErrors = {};
        if (!validateEmail(email)) newErrors.email = "Invalid email format!";
        if (!validateLoginPassword(password)) newErrors.password = "Password must be at least 8 characters!"; // TODO: needs to be modified after I implement a way to reset passwords
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        // validate form first
        if (!validateForm()) return;

        setSubmitted(true);

        await apiClient.post('/auth/login', { email, password })
            .then(async response => {
                // Check if login was successful and response is valid
                if (response.status === 200) {
                    setMessageType('success');
                    setMessage('Success! Redirecting to dashboard...');

                    // Wait until the server has set the session cookies
                    setCookie(null, 'isLoggedIn', 'true', {
                        maxAge: 30 * 60, // 30 minutes
                        sameSite: isProduction ? 'None' : 'Lax',
                        secure: isProduction,
                        path: '/',
                        ...(isProduction && { partitioned: true }), // Add partitioned only in production
                        ...(isProduction && { domain: process.env.DEPLOY_DOMAIN }),
                    });

                    // Optionally refetch user context to ensure updated state
                    await userContext.refetch();

                    // Redirect after ensuring cookies are set and session is established
                    router.push('/dashboard');
                }
            })
            .catch(err => {
                if (err.status === 403) {
                    // handle case when the account exists but isn't verified yet
                    // redirect to the verify page

                    // set temp cookie to enable access to verify page
                    setCookie(null, 'verify_access', 'true', {
                        maxAge: 15 * 60, // 15 minutes
                        sameSite: isProduction ? 'None' : 'Lax',
                        secure: isProduction,
                        path: '/',
                        ...(isProduction && { partitioned: true }),
                        ...(isProduction && { domain: process.env.DEPLOY_DOMAIN }),
                    });

                    userContext.setIncompleteUser({ email });
                    console.log("[Verify] User account not verified... Redirecting to /verify");
                    router.push('/verify');
                }
                else if (err.status === 400) {
                    console.error('Login error:', err.response?.data?.message || 'Login failed');
                    setMessageType('warning');
                    setMessage('Invalid email or password!');
                    setSubmitted(false);
                }
                else {
                    // Unexpected error
                    console.error('Login error:', err.response?.data?.message || 'Login failed');
                    setMessageType('danger');
                    setMessage('Unexpected server error/response');
                    setSubmitted(false);
                }
            });
    };


    const submitButtonContent = submitted ? (
        <>
            <Spinner size="sm" color="white" animation="border" />
            {' '}
            <span style={{ verticalAlign: 'middle' }}>Signing in...</span>
        </>
    ) : (
        <>
            <BoxArrowInRight size={22} color="white" />
            {' '}
            <span style={{ verticalAlign: 'middle' }}>Sign in</span>
        </>
    );

    return (
        <>
            <Head>
                <title>Login | GoldFront Bank</title>
            </Head>
            <Container className="mt-4">
                <Card className="form">
                    <Card.Header>
                        <PersonVcardFill size="22" color="black" /> {' '}
                        Sign in to your account!
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
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
                                    The email address you used to sign up.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formPassword">
                                <Form.Label><Key size="18" />{' '} Password</Form.Label>
                                <Form.Control 
                                    className='no-autofill' 
                                    type="password" 
                                    placeholder="..." 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)}
                                    isInvalid={!!errors.password}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.password}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Stack dir='vertical' gap={3} style={{alignItems: 'start'}}>
                                <Button className='login-btn' variant="primary" type="submit" disabled={submitted} style={{width: 'fit-content'}}>
                                    {submitButtonContent}
                                </Button>

                                <Button 
                                    variant='link'
                                    onClick={() => router.push('/forgot-password')}
                                    style={{textDecoration: 'none', padding: '0', fontSize: '0.9rem'}}
                                >
                                    <Eraser size={16} />{' '}
                                    <span style={{verticalAlign: 'middle'}}> Forgot your password?</span>
                                </Button>
                            </Stack>

                        </Form>
                    </Card.Body>
                    <Card.Footer>
                        <PersonPlusFill size="22" color="black" style={{ marginRight: "4px" }} /> {' '}
                        Don&apos;t have an account? {' '}
                        <Card.Link
                            style={{ cursor: "pointer", textDecoration: "none" }}
                            onClick={() => { router.push("/register") }}
                        >
                            Register!
                        </Card.Link>
                    </Card.Footer>
                </Card>
            </Container>
        </>
    );
}