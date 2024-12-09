'use client';

import SendMoneyPopup from "@/components/SendMoneyPopup";
import UserCard from "@/components/UserCard";
import apiClient from "@/utils/api";
import { useUser } from "@/utils/UserContext";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";


export default function DashboardPage() {
    const { token } = parseCookies();
    const userContext = useUser();
    const [showSendMoneyModal, setShowSendMoneyModal] = useState(false);

    useEffect(() => {
        const fetchUserDetails = async () => {
            if (!token) {
                console.log("NO TOKEN!");
                userContext.handleLogout();
                return;
            }

            // Prevent fetching if user is already loaded
            if (userContext.valid) return;


            apiClient.get(`/users/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(response => {
                    if (response.data && response.data.user) {
                        userContext.setUser(response.data.user);
                        userContext.setValid(true);
                    } else {
                        // If user data is invalid or missing
                        console.error("Invalid user data");
                        handleLogout();
                    }
                })
                .catch(err => {
                    console.error("Error fetching user details:", err);
                    userContext.handleLogout();
                })

        };

        fetchUserDetails();
    }, []);


    return (
        <Container>
            <Row >
                <Col className="d-flex justify-content-md-center align-items-center">
                    <UserCard />
                </Col>
            </Row>
            <Row className="mt-2">
                <Col className="d-flex justify-content-md-center align-items-center">
                    <Button onClick={() => setShowSendMoneyModal(true)}>Send Money!</Button>
                </Col>
            </Row>

            <SendMoneyPopup show={showSendMoneyModal} onHide={() => setShowSendMoneyModal(false)}/>
        </Container>
    );
}