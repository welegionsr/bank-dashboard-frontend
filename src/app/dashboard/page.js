'use client';

import apiClient from "@/utils/api";
import { useUser } from "@/utils/UserContext";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { Button, Card, Container, ListGroup, Spinner } from "react-bootstrap";


export default function DashboardPage() {
    const router = useRouter();
    const { token } = parseCookies();
    const userContext = useUser();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserDetails = async () => {
            if (!token) {
                console.log("NO TOKEN!");
                router.push('/login');
                return;
            }

            // Prevent fetching if user is already loaded
            if (userContext.user) return;


            apiClient.get(`/users/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(response => {
                    if (response.data && response.data.user) {
                        userContext.setUser(response.data.user);
                    } else {
                        // If user data is invalid or missing
                        console.error("Invalid user data");
                        handleLogout();
                    }
                })
                .catch(err => {
                    console.error("Error fetching user details:", err);
                    handleLogout();
                })
                .finally(() => {
                    setLoading(false);  // Set loading to false after the request
                })


        };

        fetchUserDetails();
    }, []);


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
                    {loading && <Spinner animation="grow" />}
                    {userContext.user && (
                        <>
                            <ListGroup.Item>Name: {userContext.user.name}</ListGroup.Item>
                            <ListGroup.Item>Email: {userContext.user.email}</ListGroup.Item>
                            <ListGroup.Item>Phone: {userContext.user.phone}</ListGroup.Item>
                            <ListGroup.Item>Balance: {userContext.user.balance}</ListGroup.Item>
                        </>
                    )}
                </ListGroup>
                <Card.Body>
                    <Button variant="primary">Transfer Money</Button>
                    <Button variant="secondary">Add Money</Button>
                    <Button variant="secondary" onClick={userContext.handleLogout}>Log out</Button>
                </Card.Body>
            </Card>
        </Container>
    );
}