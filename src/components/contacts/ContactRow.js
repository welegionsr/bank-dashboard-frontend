'use client';

import { Spinner } from "react-bootstrap";
import ContactPill from "./ContactPill";
import { parseCookies } from "nookies";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'; import { deleteContact, fetchContacts } from "@/app/api/usersApi";

export default function ContactRow({ userId, onContactChoice })
{
    const { token } = parseCookies();
    const queryClient = useQueryClient();

    const { data: contacts, isLoading, error } = useQuery({
        queryKey: ['contacts', userId],
        queryFn: () => userId ? fetchContacts(userId, token) : Promise.reject('User id is null'),
        enabled: !!userId && !!token, // Only run query if userId is truthy
        staleTime: 15 * 60 * 1000, // Optional: Cache duration
    });

    // Mutation to delete a saved contact
    const deleteContactMutation = useMutation({
        mutationFn: (contactId) => deleteContact(userId, contactId, token),
        onSuccess: () => {
            queryClient.invalidateQueries(['contacts'], userId);
        },
        onError: (error) => {
            console.error("Failed to delete contact: ", error.message);
        },
    });

    const handleDeleteContact = (contactId) => {
        deleteContactMutation.mutate(contactId);
    };

    if (!userId) {
        return <p>User id is null</p>
    }

    if (isLoading) {
        return <Spinner size='24' color='grey' />
    }

    if (error) {
        return <p>Error loading contacts: {error.message}</p>
    }

    if(!contacts || contacts.length === 0)
    {
        return <div style={{textDecoration: 'italic', fontSize: '0.8rem'}}>You have no saved contacts.</div>
    }

    return (
        <div className="contact-row">
            {contacts?.length > 0 && contacts.map((contact) => (
                <ContactPill
                    key={contact._id}
                    contact={contact}
                    onContactChoice={onContactChoice}
                    onDelete={handleDeleteContact}
                />
            ))}
        </div>
    );
}