'use client';

import apiClient from "@/utils/api";
import { parseCookies } from "nookies";
import { useState } from "react";
import { Container, Button, Row } from "react-bootstrap";
import { PersonAdd, PersonCheck, SendCheckFill } from "react-bootstrap-icons";

export default function TransactionSuccess({ transaction }) {
    const { token } = parseCookies();
    const [success, setSuccess] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [message, setMessage] = useState("Save to Contacts");

    const handleSaveContact = async () => {

        setSubmitted(true);

        apiClient.post(`/users/${transaction.sender}/contacts`, { contactId: transaction.receiver._id }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(_response => {
            setMessage("Saved!");
            setSuccess(true);
        })
        .catch(err => {
            if(err.status === 400)
            {
                setMessage("Already in Contacts!");
                setSuccess(true);
            }
            else
            {
                console.log("error saving contact: ", err);
                setSubmitted(false);
                setSuccess(false);
            }
        });
    };

    return (
        <Container style={{ textAlign: "center" }}>
            <Row className="mt-2">
                <SendCheckFill size={48} />
            </Row>
            <Row className="mt-4 mb-4">
                <h2 className="mt-2">Money sent successfully!</h2>
                <p><strong>Transaction ID:</strong> {transaction._id}</p>
                <p><strong>Recipient:</strong> {transaction.receiver.name}</p>
                <Button 
                    variant="primary"
                    onClick={handleSaveContact}
                    disabled={submitted}
                    style={{
                        backgroundColor: success ? "green" : "blue"
                    }}
                >
                    {
                        success ? <PersonCheck size={22} color="white" /> : <PersonAdd size={22} color="white" />
                    } {' '}
                    {message}
                </Button>
                <span style={{marginTop: "8px", fontSize: "0.8rem"}}>You can choose to add this recipient to your saved contacts, so that you could easily send them money in the future.</span>
            </Row>
        </Container>
    );
};