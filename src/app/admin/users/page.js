'use client';

import UserFilter from "@/components/UserList/UserFilter";
import UserList from "@/components/UserList/UserList";
import { Col, Container, Row } from "react-bootstrap";


export default function ManageUsersPage() {
    return (
        <Container>
            <Row>
                <Col className="d-flex justify-content-md-center align-items-center">
                    <UserFilter />
                </Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-md-center align-items-center">
                    <UserList />
                </Col>
            </Row>
        </Container>
    );
}