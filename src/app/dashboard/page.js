'use client';

import SendMoneyPopup from "@/components/SendMoneyPopup";
import TransactionList from "@/components/TransactionList";
import UserCard from "@/components/UserCard";
import { useUser } from "@/utils/UserContext";
import { useState } from "react";
import { Col, Collapse, Container, Row } from "react-bootstrap";


export default function DashboardPage() {
    const userContext = useUser();
    const [showSendMoneyModal, setShowSendMoneyModal] = useState(false);
    const [openTransactions, setOpenTransactions] = useState(false);

    const userEmail = userContext?.user?.email || "";

    return (
        <Container>
            <Row >
                <Col className="d-flex justify-content-md-center align-items-center">
                    <UserCard
                        onPrimaryClick={() => {
                            console.log("Modal open triggered");
                            setShowSendMoneyModal(true);
                        }}
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

            <SendMoneyPopup
                show={showSendMoneyModal}
                onHide={() => {
                    console.log("Modal close triggered");
                    setShowSendMoneyModal(false);
                }}
            />
        </Container>
    );
}