'use client';

import { Alert, Button, Container, Form, Spinner } from "react-bootstrap";
import apiClient from "@utils/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { parseCookies, setCookie } from "nookies";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const { token } = parseCookies();


    // first check if the user is already logged in
    // by checking if there's a valid token on component mount
    useEffect(() => {
        const checkToken = async () => {

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
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await apiClient.post('/auth/login', { email, password });

            // Save the token in a cookie
            setCookie(null, 'token', response.data.token, {
                maxAge: 30 * 24 * 60 * 60, // 30 days
                path: '/', // Accessible on all pages
            });

            // redirect to the dashboard page
            router.push('/dashboard');
        }
        catch (err) {
            console.error('Login error:', err.response?.data?.message || 'Login failed');
            setError('Invalid email or password!');
        }
    };

    if (loading) {
        // Optionally, show a loading indicator while checking the token
        return <Spinner animation="grow" />;
    }

    return (
        <Container className="mt-4">
            <h2>Login Page!</h2>
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


                {error && <Alert variant="warning">{error}</Alert>}


                <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </Button>
            </Form>
        </Container>
    );
}