'use client';

import SendMoneyPopup from "@/components/SendMoneyPopup";
import TransactionCard from "@/components/TransactionCard";
import TransactionList from "@/components/TransactionList";
import UserCard from "@/components/UserCard";
import apiClient from "@/utils/api";
import { useUser } from "@/utils/UserContext";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { Col, Collapse, Container, Row } from "react-bootstrap";


export default function DashboardPage() {
    const { token } = parseCookies();
    const userContext = useUser();
    const [showSendMoneyModal, setShowSendMoneyModal] = useState(false);
    const [openTransactions, setOpenTransactions] = useState(false);

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
    });

    const userEmail = userContext.user?.email;

    return (
        <Container>
            <Row >
                <Col className="d-flex justify-content-md-center align-items-center">
                    <UserCard 
                        onPrimaryClick={() => setShowSendMoneyModal(true)} 
                        onSecondaryClick={() => setOpenTransactions(!openTransactions)} 
                        primaryText="Send Money!"
                        secondaryText={`${openTransactions ? 'Hide' : 'Show'} History`}
                    />
                </Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-md-center align-items-center">
                    <Collapse in={openTransactions}>
                        <div id="transactions-collapse">
                            <TransactionList userEmail={userEmail} />
                        </div>
                    </Collapse>
                </Col>
            </Row>

            <SendMoneyPopup show={showSendMoneyModal} onHide={() => setShowSendMoneyModal(false)}/>
        </Container>
    );
}