'use client';

import { useUser } from "@/utils/UserContext";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { Container, Row, Spinner } from "react-bootstrap";


export default function AdminDashboardLayout({ children }) {
    const userContext = useUser();
    const router = useRouter();
    const [permitted, setPermitted] = useState(false);
    const {token} = parseCookies();

    useEffect(() => {
        if(!token)
        {
            router.replace('/login');
        }
        else if (!userContext || !userContext.user || userContext.user.role !== 'admin') {
            router.replace('/dashboard');
        }
        else
        {
            setPermitted(true);
        }
    }, [userContext, router, token]);

    if(!permitted)
    {
        return <Spinner animation="grow" size="48"/>;
    }

    return (
        <>
            <Container fluid className="admin-dashboard-layout">
                <Row className="mt-4">
                    {children}
                </Row>
            </Container>
        </>
    );
}