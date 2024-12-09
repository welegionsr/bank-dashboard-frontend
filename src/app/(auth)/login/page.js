'use client';

import '@/app/(auth)/auth.css';
import { Button, Card, Container, Form } from "react-bootstrap";
import apiClient from "@utils/api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { setCookie } from "nookies";
import { useAuth } from "../layout";
import { Envelope, Key, PersonPlusFill, PersonVcardFill } from 'react-bootstrap-icons';
import { useUser } from '@/utils/UserContext';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setMessage, setMessageType } = useAuth();
    const [submitted, setSubmitted] = useState(false);
    const userContext = useUser();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setSubmitted(true);

        try {
            const response = await apiClient.post('/auth/login', { email, password });

            // Save the token in a cookie
            setCookie(null, 'token', response.data.token, {
                maxAge: 20 * 60 * 60, // 20 minutes
                path: '/', // Accessible on all pages
            }); 

            setMessageType('success');
            setMessage('Success! Redirecting to dashboard...');

            // redirect to the dashboard page
            router.push('/dashboard');
        }
        catch (err) {
            if(err.status === 403)
            {
                // handle case when the account exists but isn't verified yet
                // redirect to the verify page
                userContext.setUser({email});
                router.push('/verify');
            }
            else if(err.status === 400)
            {
                console.error('Login error:', err.response?.data?.message || 'Login failed');
                setMessageType('warning');
                setMessage('Invalid email or password!');
                setSubmitted(false);
            }
            else
            {
                // Unexpected error
                console.error('Login error:', err.response?.data?.message || 'Login failed');
                setMessageType('danger');
                setMessage('Unexpected server error/response');
                setSubmitted(false);
            }
        }
    };

    return (
        <Container className="mt-4">
            <Card className="form">
                <Card.Header>
                    <PersonVcardFill size="22" color="black"/> {' '}
                    Sign in to your account!
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label><Envelope size="18"/> {' '} Email address</Form.Label>
                            <Form.Control type="email" placeholder="..." value={email} onChange={(e) => setEmail(e.target.value)} required />
                            <Form.Text className="text-muted">
                                The email address you used to sign up.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label><Key size="18"/>{' '} Password</Form.Label>
                            <Form.Control type="password" placeholder="..." value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </Form.Group>

                        <Button variant="primary" type="submit" disabled={submitted}>
                            {submitted ? 'Logging in...' : 'Login'}
                        </Button>
                    </Form>
                </Card.Body>
                <Card.Footer>
                    <PersonPlusFill size="22" color="black" style={{marginRight: "4px"}} /> {' '}
                    Don't have an account? {' '}
                    <Card.Link 
                        style={{cursor: "pointer", textDecoration: "none"}} 
                        onClick={()=> {router.push("/register")}}
                    >
                        Register!
                    </Card.Link>
                </Card.Footer>
            </Card>
        </Container>
    );
}