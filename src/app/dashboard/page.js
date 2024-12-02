'use client';

import UserCard from "@/components/UserCard";
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

    useEffect(() => {
        const fetchUserDetails = async () => {
            if (!token) {
                console.log("NO TOKEN!");
                router.push('/login');
                return;
            }

            // Prevent fetching if user is already loaded
            if (userContext.valid) return;


            apiClient.get(`/users/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(response => {
                    if (response.data && response.data.user) {
                        userContext.setUser(response.data.user);
                        userContext.setValid(true);
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

        };

        fetchUserDetails();
    }, []);


    return (
        <Container>
            <UserCard />
        </Container>
    );
}