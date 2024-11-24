'use client';

import { Alert, Button, Container, Form } from "react-bootstrap";
import apiClient from "@utils/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);


    // first check if the user is already logged in
    // by checking if there's a valid token on component mount
    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem('user-token');

            if (!token) {
                setLoading(false);  // No token, allow the user to log in
                return;
            }

            try {
                // Make a request to validate the token
                const response = await apiClient.post('/auth/token', { token });

                if (response.status === 200) {
                    // Token is valid, redirect to /dashboard
                    router.push('/dashboard');
                }
            } catch (error) {
                // Token is invalid or error occurred, show login form
                setError('Invalid or expired token, please log in again.');
                setLoading(false);
            }
        };

        checkToken();
    }, [router]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try 
        {
            const response = await apiClient.post('/auth/login', {email, password});

            localStorage.setItem('user-token', response.data.token);

            // redirect to the dashboard page
            router.push('/dashboard');
        }
        catch (err)
        {
            console.error('Login error:', err.response?.data?.message || 'Login failed');
            setError('Invalid email or password!');
        }
    };

    if (loading) {
        // Optionally, show a loading indicator while checking the token
        return <div>Loading...</div>;
    }

    return (
        <Container className="mt-4">
            <h2>Login Page!</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="..." value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    <Form.Text className="text-muted">
                        The email address you used to sign up.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlid="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="..." value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </Form.Group>

                {
                    error != '' &&
                        <Alert variant="warning">{error}</Alert>
                }
                

                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </Container>
    );
}