'use client';

import '@/app/(auth)/auth.css';
import { useState } from "react";
import { Button, Card, Form, Container } from "react-bootstrap";
import { useAuth } from "../layout";
import apiClient from "@/utils/api";
import { useRouter } from "next/navigation";
import { Envelope, Key, PersonFillCheck, PersonVcard, PiggyBank, TelephoneInbound } from 'react-bootstrap-icons';
import { useUser } from '@/utils/UserContext';
import { setCookie } from 'nookies';
import Head from 'next/head';


export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [balance, setBalance] = useState(100);
    const { setMessage, setMessageType, setJustRegistered } = useAuth();
    const [submitted, setSubmitted] = useState(false);
    const router = useRouter();
    const userContext = useUser();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSubmitted(true);

        await apiClient.post('/auth/register',
             { email, password, phone, name, balance: balance * 100 })
        .then(_response => {
            //save incomplete user object to context, to be used temporarily in verification page
            const userForVerification = { email, name, phone };
            userContext.setIncompleteUser(userForVerification);

            setMessageType('success');
            setMessage('Success! redirecting to verification...');
            setJustRegistered(true);

            // set temp cookie to enable access to verify page
            setCookie(null, 'verify_access', 'true', {
                maxAge: 15 * 60, // 15 minutes
                sameSite: 'strict',
                path: '/',
            });
            
            // redirect to the verification page
            router.push('/verify');
        })
        .catch(_err => {
            setMessageType('warning');
            setMessage('Registration failed! Please make sure that the data you provided is valid.');
            setSubmitted(false);
        });
    };

    return (
        <>
            <Head>
                <title>Register | GoldFront Bank</title>
            </Head>
            <Container className="mt-4">
                <Card className='form'>
                    <Card.Img variant='top' src='/images/register.webp' />
                    <Card.Header>
                        Create your new account by filling out this form!
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label><Envelope size="18" />{' '}Email address</Form.Label>
                                <Form.Control type="email" placeholder="..." value={email} onChange={(e) => setEmail(e.target.value)} required />
                                <Form.Text className="text-muted">
                                    A valid email address that you have access to!
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formPassword">
                                <Form.Label><Key size="18" />{' '}Password</Form.Label>
                                <Form.Control type="password" placeholder="..." value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Label><PersonVcard size="18" />{' '}What&apos;s your name?</Form.Label>
                                <Form.Control type="text" placeholder="..." value={name} onChange={(e) => setName(e.target.value)} required />
                                <Form.Text className="text-muted">
                                    First and last name
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formPhone">
                                <Form.Label><TelephoneInbound size="18" />{' '}Phone number?</Form.Label>
                                <Form.Control type="tel" placeholder="..." value={phone} onChange={(e) => setPhone(e.target.value)} required />
                                <Form.Text className="text-muted">
                                    A valid phone number
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBalance">
                                <Form.Label><PiggyBank size="18" />{' '}How much money do you want?</Form.Label>
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
                    <Card.Footer>
                        <PersonFillCheck size="22"/> {' '}
                        Already have an account? 
                        <Card.Link
                            style={{ cursor: "pointer", textDecoration: "none" }}
                            onClick={() => { router.push("/login") }}
                        >
                            {' '} Sign in!
                        </Card.Link>
                    </Card.Footer>
                </Card>
            </Container>
        </>
    );
}