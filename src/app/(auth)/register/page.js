'use client';

import '@/app/(auth)/auth.css';
import { useState } from "react";
import { Button, Card, Form, Container } from "react-bootstrap";
import { useAuth } from "../layout";
import apiClient from "@/utils/api";
import { useRouter } from "next/navigation";


export default function RegisterPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [balance, setBalance] = useState(100);
    const { setMessage, setMessageType, setJustRegistered } = useAuth();
    const [submitted, setSubmitted] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSubmitted(true);

        try
        {
            const response = await apiClient.post('/auth/register', { email, password, phone, name, balance});

            // TODO: handle verification process

            setMessageType('success');
            setMessage('Success! redirecting to login page...');
            setJustRegistered(true);
            // redirect to the login page
            router.push('/login');
        }
        catch (err)
        {
            setMessageType('warning');
            setMessage('Registration failed! Please make sure that the data you provided is valid.');
            setSubmitted(false);
        }
    };

    return (
        <Container className="mt-4">
            <Card className='form'>
                <Card.Header>
                    Create your new account by filling out this form!
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="..." value={email} onChange={(e) => setEmail(e.target.value)} required />
                            <Form.Text className="text-muted">
                                A valid email address that you have access to!
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="..." value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label>What's your name?</Form.Label>
                            <Form.Control type="text" placeholder="..." value={name} onChange={(e) => setName(e.target.value)} required />
                            <Form.Text className="text-muted">
                                First and last name
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPhone">
                            <Form.Label>Phone number?</Form.Label>
                            <Form.Control type="tel" placeholder="..." value={phone} onChange={(e) => setPhone(e.target.value)} required />
                            <Form.Text className="text-muted">
                                A valid phone number
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBalance">
                            <Form.Label>How much money do you want?</Form.Label>
                            <Form.Control type="numeric" placeholder="100.0" value={balance} onChange={(e) => setBalance(e.target.value)} required />
                            <Form.Text className="text-muted">
                                In the end, money is just a number
                            </Form.Text>
                        </Form.Group>

                        <Button variant="primary" type="submit" disabled={submitted}>
                            {submitted ? 'Submitting...' : 'Sign up'}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}