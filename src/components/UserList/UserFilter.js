'use client';

import '@/styles/UserList/UserFilter.css';
import { Form, InputGroup, Button, Container, Row, Col } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";

export default function UserFilter({ filters, setFilters }) {

    const handleSearchChange = (e) => {
        setFilters(prev => ({ ...prev, searchTerm: e.target.value }));
    };

    const handleFilterAdminsToggle = () => {
        setFilters(prev => ({ ...prev, filterAdmins: !prev.filterAdmins }));
    };

    const handleDescSortToggle = () => {
        setFilters(prev => ({ ...prev, descSort: !prev.descSort }));
    };

    return (
        <Container className="user-filter">
            <Form>
                <Row className="align-items-center">
                    <Col xs={6}>
                        <InputGroup className="mb-3 search-input">
                            <Form.Control
                                type="text"
                                placeholder="Search users..."
                                value={filters.searchTerm}
                                onChange={handleSearchChange}
                                aria-label="Search"
                            />
                            <Button variant="outline-secondary">
                                <Search size={18} />
                            </Button>
                        </InputGroup>
                    </Col>
                    <Col xs={3}>
                        <Form.Switch
                            id="filteradmins-switch"
                            label="Admins only"
                            checked={filters.filterAdmins}
                            onChange={handleFilterAdminsToggle}
                            aria-label="Admins only switch"
                        />
                    </Col>
                    <Col xs={3}>
                        <Form.Switch
                            id="descsort-switch"
                            label="DESC sort"
                            value={filters.descSort}
                            onChange={handleDescSortToggle}
                            aria-label="DESC sort switch"
                        />
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}
