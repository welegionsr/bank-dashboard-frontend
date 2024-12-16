'use client';

import '@/styles/contacts/ContactPill.css';
import { Badge, Button } from "react-bootstrap";
import { PersonCircle } from "react-bootstrap-icons";

export default function ContactPill({contact, onContactChoice})
{

    return (
        <Badge pill className='contact-pill' as={Button} onClick={() => onContactChoice(contact.email)}>
            <PersonCircle size={22} color="white"/> {' '}
            <span className="contact-name">{contact.name}</span>
            <Button className='delete-button'>X</Button>
        </Badge>
    );
}