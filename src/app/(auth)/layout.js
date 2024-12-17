'use client';

import '@/app/(auth)/auth.css';

import apiClient from "@/utils/api";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { createContext, useContext, useEffect, useState } from "react";
import { Alert, Col, Row, Spinner } from "react-bootstrap";
import Container from "react-bootstrap/Container";


const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext); // context for child elements to get access to loading and error states

export default function DashboardLayout({ children }) {
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('warning');
    const router = useRouter();
    const { token } = parseCookies();
    const [justRegistered, setJustRegistered] = useState(false);

    // first check if the user is already logged in
    // by checking if there's a valid token on component mount
    useEffect(() => {
        const checkToken = async () => {

            if (!token) {
                setLoading(false);  // No token, allow the user to log in or register
                return;
            }

            try {
                // if token found, make a request to validate it
                const response = await apiClient.post('/auth/token', { token });

                if (response.status === 200) {
                    setMessage('');
                    // Token is valid, redirect to /dashboard
                    router.push('/dashboard');
                }
            } catch (err) {
                // Token is invalid or error occurred, show login form
                setMessageType('warning');
                setMessage('Invalid or expired token, please log in or register.');
                setLoading(false);
            }
        };

        checkToken();
    }, []);

    useEffect(() => {
        if(justRegistered)
        {
            setMessageType('success');
            setMessage('Thank you for registering! Please verify your account.');
        }
    }, [justRegistered]);


    if (loading) {
        // show a loading indicator while checking the token
        return (
            <Container fluid className="justify-content-md-center">
                <Spinner animation="grow" />
            </Container>
        );
    }

    return (
        <AuthContext.Provider value={{ message, setMessage, messageType, setMessageType, setJustRegistered }}>
            <Container fluid className="auth-layout">
                <Row>
                    <Col xs={0} md={7} xl={8}>

                    </Col>
                    <Col className="form-section" xs={12} md={5} xl={4} >
                        <main className="form-card">
                            {message && <Alert variant={messageType} style={{textAlign: "center"}}>{message}</Alert>}
                            {children}
                        </main>
                    </Col>
                </Row>
            </Container>
        </AuthContext.Provider>
    );
}