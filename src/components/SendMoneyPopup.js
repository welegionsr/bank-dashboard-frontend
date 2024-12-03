'use client';

import apiClient from "@/utils/api";
import { useUser } from "@/utils/UserContext";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { Send, XCircle } from "react-bootstrap-icons";

export default function SendMoneyPopup({show, onHide})
{   
    const userContext = useUser();

    const handleSubmit = async () => {
        apiClient.post().then().catch();
    };

    if(!userContext.valid)
    {
        return <p> user details missing </p>
    }

    return (
        <Modal show={show} onHide={onHide} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Send money!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="sendForm.receiverEmail">
                        <Form.Label>Who's the recipient?</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="name@example.com"
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="sendForm.amount"
                    >
                        <Form.Label>How much?</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="..."
                        />
                        {userContext.valid && (<Alert className="mt-3" variant="info">
                            Maximum amount you can send: <strong>${userContext.user.balance}</strong>
                        </Alert>)}
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    <XCircle size="22" color="white" /> {' '}
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    <Send size="22" color="white" /> {' '}
                    Confirm Transaction
                </Button>
            </Modal.Footer>
        </Modal>
    );
}