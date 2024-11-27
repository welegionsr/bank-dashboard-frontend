'use client';

import { Button, Card, Container, Form } from "react-bootstrap";
import apiClient from "@utils/api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { setCookie } from "nookies";
import { useAuth } from "../layout";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setMessage, setMessageType } = useAuth();
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setSubmitted(true);

        try {
            const response = await apiClient.post('/auth/login', { email, password });

            // Save the token in a cookie
            setCookie(null, 'token', response.data.token, {
                maxAge: 30 * 24 * 60 * 60, // 30 days
                path: '/', // Accessible on all pages
            });

            setMessageType('success');
            setMessage('Success! Redirecting to dashboard...');

            // redirect to the dashboard page
            router.push('/dashboard');
        }
        catch (err) {
            console.error('Login error:', err.response?.data?.message || 'Login failed');
            setMessageType('warning');
            setMessage('Invalid email or password!');
            setSubmitted(false);
        }
    };

    return (
        <Container className="mt-4">
            <Card style={{ width: 'auto', minWidth: '16rem' }}>
                <Card.Header>
                    Sign in to your account!
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="..." value={email} onChange={(e) => setEmail(e.target.value)} required />
                            <Form.Text className="text-muted">
                                The email address you used to sign up.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="..." value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </Form.Group>

                        <Button variant="primary" type="submit" disabled={submitted}>
                            {submitted ? 'Logging in...' : 'Login'}
                        </Button>
                    </Form>
                </Card.Body>
                <Card.Footer>
                    Don't have an account? {' '}
                    <Card.Link style={{cursor: "pointer"}} onClick={()=> {router.push("/register")}}>Register!</Card.Link>
                </Card.Footer>
            </Card>
        </Container>
    );
}