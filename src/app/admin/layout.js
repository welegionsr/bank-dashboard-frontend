'use client';

import { useUser } from "@/utils/UserContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Container, Row, Spinner } from "react-bootstrap";

export default function AdminDashboardLayout({ children }) {
    const userContext = useUser();
    const router = useRouter();
    const [permitted, setPermitted] = useState(false);

    useEffect(() => {
        if (!userContext.valid) {
            router.push('/login');
        } else if (userContext.user?.role !== 'admin') {
            router.push('/dashboard');
        } else {
            setPermitted(true);
        }
    }, [userContext, router]);


    if(!permitted)
    {
        return <Spinner size="48" color="black" animation="grow" />
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