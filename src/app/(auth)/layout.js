'use client';

import '@/app/(auth)/auth.css';
import { createContext, useContext, useEffect, useState } from "react";
import { Alert, Col, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext); // context for child elements to get access to loading and error states

export default function DashboardLayout({ children }) {
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('warning');
    const [justRegistered, setJustRegistered] = useState(false);

    useEffect(() => {
        if (justRegistered) {
            setMessageType('success');
            setMessage('Thank you for registering! Please verify your account.');
        }
    }, [justRegistered]);

    return (
        <AuthContext.Provider value={{ message, setMessage, messageType, setMessageType, setJustRegistered }}>
            <Container fluid className="auth-layout">
                <Row>
                    <Col xs={0} md={7} xl={8}>

                    </Col>
                    <Col className="form-section" xs={12} md={5} xl={4} >
                        <main className="form-card">
                            {message && <Alert variant={messageType} className='mt-4' style={{ textAlign: "center", width: "auto", minWidth: "16rem", margin: "0.8rem" }}>{message}</Alert>}
                            {children}
                        </main>
                    </Col>
                </Row>
            </Container>
        </AuthContext.Provider>
    );
}