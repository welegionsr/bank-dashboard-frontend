'use client';

import { Spinner } from "react-bootstrap";
import ContactPill from "./ContactPill";
import { parseCookies } from "nookies";
import { useQuery } from '@tanstack/react-query';
import { fetchContacts } from "@/app/api/usersApi";

export default function ContactRow({ userEmail, onContactChoice })
{
    const { token } = parseCookies();

    const { data: contacts, isLoading, error } = useQuery({
        queryKey: ['contacts', userEmail],
        queryFn: () => userEmail ? fetchContacts(userEmail, token) : Promise.reject('User email is null'),
        enabled: !!userEmail && !!token, // Only run query if userEmail is truthy
        staleTime: 15 * 60 * 1000, // Optional: Cache duration
    });

    if (!userEmail) {
        return <p>User email is null</p>
    }

    if (isLoading) {
        return <Spinner size='24' color='grey' />
    }

    if (error) {
        return <p>Error loading contacts: {error.message}</p>
    }

    if(!contacts || contacts.length === 0)
    {
        return <div style={{textDecoration: 'italics', fontSize: '0.8rem'}}>You have no saved contacts.</div>
    }

    return (
        <div className="contact-row">
            {contacts?.length > 0 && contacts.map((contact, index) => (
                <ContactPill
                    key={index}
                    contact={contact}
                    onContactChoice={onContactChoice}
                />
            ))}
        </div>
    );
}