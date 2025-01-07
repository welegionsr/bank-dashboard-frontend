'use client';
import '@/app/admin/users/manage-users.css';
import UserFilter from "@/components/UserList/UserFilter";
import UserList from "@/components/UserList/UserList";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Head from 'next/head';


export default function ManageUsersPage() {
    const [filters, setFilters] = useState({
        searchTerm: '',
        filterAdmins: false,
        descSort: false,
    });

    return (
        <>
            <Head>
                <title>Manage Users | GoldFront Bank</title>
            </Head>
            <Container className="manage-users-page">
                <Row>
                    <Col className="d-flex justify-content-md-center align-items-center">
                        <UserFilter filters={filters} setFilters={setFilters} />
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-md-center align-items-center">
                        <UserList filters={filters} />
                    </Col>
                </Row>
            </Container>
        </>
    );
}