'use client';

import SendMoneyPopup from "@/components/SendMoneyPopup";
import TransactionCard from "@/components/TransactionCard";
import UserCard from "@/components/UserCard";
import apiClient from "@/utils/api";
import { useUser } from "@/utils/UserContext";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";


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
                    <UserCard onPrimaryClick={() => setShowSendMoneyModal(true)} primaryText="Send Money!" />
                </Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-md-center align-items-center">
                    <div style={{ width: '36rem', height: '23rem', backgroundColor: '#F8F8F8', paddingTop: '14px', marginTop: '-14px', borderRadius: '12px', boxShadow: 'inset 0 2px 4px 0px rgb(0, 0, 0, 0.20)'}}>
                        <TransactionCard name="Fred" date="05/12/2024 - 18:32" amount="500" isInbound={true} />
                        <TransactionCard name="Moshe" date="05/12/2024 - 18:32" amount="250" isInbound={false} />
                    </div>
                </Col>
            </Row>

            <SendMoneyPopup show={showSendMoneyModal} onHide={() => setShowSendMoneyModal(false)}/>
        </Container>
    );
}