'use client';

import { Alert, Button, Container, Form } from "react-bootstrap";
import apiClient from "../utils/api";
import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try 
        {
            const response = await apiClient.post('/auth/login', {email, password});

            console.log('Login successful: ', response.data);

            console.log('token: ', response.data.token);

            // store token later?

            // redirect to some dashboard page
        }
        catch (err)
        {
            console.error('Login error:', err.response?.data?.message || 'Login failed');
            setError('Invalid email or password!');
        }
    };

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