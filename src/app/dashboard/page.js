'use client';

import apiClient from "@/utils/api";
import { useUser } from "@/utils/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button, Card, Container, ListGroup } from "react-bootstrap";

export default function DashboardPage() {
    const {token, user, setUser, setToken} = useUser();
    const router = useRouter();

    const handleLogout = () => {
        setToken(null);
        setUser(null);

        router.push('/login');
    };

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                // Attach the token to the Authorization header
                const response = await apiClient.get(`/user/${user.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Add the token here
                    },
                });

                // Handle the response data (e.g., set it to state or context)
                console.log('User details:', response.data);
            } catch (err) {
                // Handle errors (e.g., log them or show a message)
                console.error('Error fetching user details:', err.response?.data || err.message);
            }
        };

        fetchUserDetails(); // Call the async function
    }, []); // Empty dependency array to run only when the component mounts

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
                    <Button variant="secondary" onClick={handleLogout}>Log out</Button>
                </Card.Body>
            </Card>
            
            {token ? <p>Your token: {token}</p> : <p>Loading token...</p>}
        </Container>
    );
}