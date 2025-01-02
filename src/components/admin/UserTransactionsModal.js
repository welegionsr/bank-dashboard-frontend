'use client';

import { Button, Modal } from "react-bootstrap";
import TransactionList from "../TransactionList";
import { CheckCircle } from "react-bootstrap-icons";

export default function UserTransactionsModal({ user, show, onHide }) {
    if(!user)
    {
        return null;
    }
    return (
        <Modal show={show} onHide={onHide} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>{`${user.name}'s Transaction History`}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ overflow: 'auto', maxWidth: '100%' }}>
                <TransactionList userEmail={user.email} className="modal-content"/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    <CheckCircle size="22" color="black" /> {" Close"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}