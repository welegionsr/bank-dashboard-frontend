'use client';

import apiClient from "@/utils/api";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Container, Button, Row } from "react-bootstrap";
import { PersonAdd, PersonCheck } from "react-bootstrap-icons";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function TransactionSuccess({ transaction }) {
    const [success, setSuccess] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [message, setMessage] = useState("Save to Contacts");
    const queryClient = useQueryClient();

    const handleSaveContact = async () => {

        setSubmitted(true);

        apiClient.post(`/users/${transaction.sender}/contacts`, { contactId: transaction.receiver._id })
        .then(_response => {
            setMessage("Saved!");
            queryClient.invalidateQueries('contacts');
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
                <DotLottieReact
                    src="animations/transfer-done.json"
                    autoplay
                />
            </Row>
            <Row className="mb-4">
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