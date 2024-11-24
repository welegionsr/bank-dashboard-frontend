'use client';

import { useEffect, useState } from "react";
import { Button, Card, Container, ListGroup } from "react-bootstrap";

export default function DashboardPage() {
    const [token, setToken] = useState(null);

    useEffect(() => {
        // Access localStorage only on the client side
        const savedToken = localStorage.getItem('user-token');
        setToken(savedToken);
    }, []);  // Empty dependency array ensures this runs only once on mount
    
    return (
        <Container>
            <Card style={{ width: '32rem' }}>
                <Card.Header>Welcome!</Card.Header>
                <Card.Body>
                    <Card.Text>
                        This is your dashboard page, where you can see your balance,
                        transfer money to other users, and add money to your account.
                        Enjoy!
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>Name: XXX XXXXX</ListGroup.Item>
                    <ListGroup.Item>Email: XXX@XX.com</ListGroup.Item>
                    <ListGroup.Item>Phone: 1234567890</ListGroup.Item>
                    <ListGroup.Item>Balance: XXX</ListGroup.Item>
                </ListGroup>
                <Card.Body>
                    <Button variant="primary">Transfer Money</Button>
                    <Button variant="secondary">Add Money</Button>
                </Card.Body>
            </Card>
            
            {token ? <p>Your token: {token}</p> : <p>Loading token...</p>}
        </Container>
    );
}