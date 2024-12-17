'use client';

import '@/styles/contacts/ContactPill.css';
import { Badge, Button } from "react-bootstrap";
import { PersonCircle } from "react-bootstrap-icons";

export default function ContactPill({contact, onContactChoice, onDelete})
{

    return (
        <Badge pill className="contact-pill">
            <Button variant="link" className="pill-button" onClick={() => onContactChoice(contact.email)}>
                <PersonCircle size={22} color="white" />{' '}
                <span className="contact-name">{contact.name}</span>
            </Button>
            <Button
                className="delete-button"
                variant="danger"
                size="sm"
                onClick={() => onDelete(contact._id)} // Call delete handler
            >
                <span>X</span>
            </Button>
        </Badge>
    );
}