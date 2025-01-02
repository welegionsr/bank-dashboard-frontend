'use client';

import '@/styles/UserList/UserFilter.css';
import { useState } from "react";
import { Form, InputGroup, Button, Container, Row, Col } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";

export default function UserFilter({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterAdmins, setFilterAdmins] = useState(false);
    const [descSort, setDescSort] = useState(false);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

    return (
        <Container className="user-filter">
            <Form onSubmit={handleSearchSubmit}>
                <Row className="align-items-center">
                    <Col xs={6}>

                        <InputGroup className="mb-3 search-input">
                            <Form.Control
                                type="text"
                                placeholder="Search users..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                                aria-label="Search"
                            />
                            <Button variant="outline-secondary" type="submit">
                                <Search size={18} />
                            </Button>
                        </InputGroup>
                    </Col>
                    <Col xs={3}>
                        <Form.Switch
                            id="filteradmins-switch"
                            label="Admins only"
                            value={filterAdmins}
                            onChange={() => setFilterAdmins(!filterAdmins)}
                            aria-label="Admins only switch"
                        />
                    </Col>
                    <Col xs={3}>
                        <Form.Switch
                            id="descsort-switch"
                            label="DESC sort"
                            value={descSort}
                            onChange={() => setDescSort(!descSort)}
                            aria-label="DESC sort switch"
                        />
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}
