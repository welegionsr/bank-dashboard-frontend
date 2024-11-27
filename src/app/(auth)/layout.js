'use client';

import apiClient from "@/utils/api";
import TopNav from "@components/TopNav";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { createContext, useContext, useEffect, useState } from "react";
import { Alert, Spinner } from "react-bootstrap";
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
            setMessage('Thank you for registering! Please login using the credentials you provided.');
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
            <Container fluid>
                <TopNav />

                <h2 style={{ textAlign: "center" }}> * User Authentication * </h2>

                <main className="auth-layout mt-4">
                    {message && <Alert variant={messageType}>{message}</Alert>}
                    {children}
                </main>
            </Container>
        </AuthContext.Provider>
    );
}