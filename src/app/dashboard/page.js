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
    const {user, setUser} = useUser();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserDetails = async () => {
            if (!token) 
            {
                console.log("NO TOKEN!");
                router.push('/login');
                return;
            }

            // Prevent fetching if user is already loaded
            if (user) return;

            try 
            {
                const response = await apiClient.get(`/users/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data && response.data.user) {
                    console.log("User details:", response.data.user);
                    setUser(response.data.user);
                } else {
                    // If user data is invalid or missing
                    console.error("Invalid user data");
                    handleLogout();
                }
            } 
            catch (error) 
            {
                console.error("Error fetching user details:", error);
                handleLogout();
            }
            finally 
            {
                setLoading(false);  // Set loading to false after the request
            }
        };

        fetchUserDetails();
    }, []);


    const handleLogout = () => {
        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        setUser(null);
        router.push('/login');
    };


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
                    {user && (
                        <>
                            <ListGroup.Item>Name: {user.name}</ListGroup.Item>
                            <ListGroup.Item>Email: {user.email}</ListGroup.Item>
                            <ListGroup.Item>Phone: {user.phone}</ListGroup.Item>
                            <ListGroup.Item>Balance: {user.balance}</ListGroup.Item>
                        </>
                    )}
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