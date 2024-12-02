'use client';

import { useUser } from "@/utils/UserContext";
import { Card, ListGroup, Spinner } from "react-bootstrap";
import { PersonBadge } from "react-bootstrap-icons";

export default function UserCard()
{
    const userContext = useUser();

    if (!userContext.valid)
    {
        return <Spinner animation="grow" variant="light" role="status" />
    }

    return (
        <Card style={{ width: '32rem' }}>
            <Card.Header>
                <PersonBadge size="18"/> {' '}
                Welcome, { userContext.valid ? userContext.user.name : "" }!
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    This is your dashboard page, where you can see your balance,
                    transfer money to other users, and add money to your account.
                    Enjoy!
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                {userContext.valid && (
                    <>
                        <ListGroup.Item>Name: {userContext.user.name}</ListGroup.Item>
                        <ListGroup.Item>Email: {userContext.user.email}</ListGroup.Item>
                        <ListGroup.Item>Phone: {userContext.user.phone}</ListGroup.Item>
                        <ListGroup.Item>Balance: ${userContext.user.balance}</ListGroup.Item>
                    </>
                )}
            </ListGroup>
        </Card>
    );
}