'use client';

import '@/styles/UserList/UserRow.css';
import { Badge, Col, Container, Row } from "react-bootstrap";
import UserRowActions from "./UserRowActions";
import { ArrowDown, ArrowUp } from 'react-bootstrap-icons';
import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from 'react';

export default function UserRow({user}){
    const [lastOnlineRelative, setLastOnlineRelative] = useState('');

    useEffect(() => {
        // Set the initial relative time
        if (user.lastOnline) {
            setLastOnlineRelative(formatDistanceToNow(new Date(user.lastOnline), { addSuffix: true }));
        }

        // Update the relative time every minute
        const interval = setInterval(() => {
            if (user.lastOnline) {
                setLastOnlineRelative(formatDistanceToNow(new Date(user.lastOnline), { addSuffix: true }));
            }
        }, 60000); // Update every minute (60000 ms)

        // Cleanup the interval on component unmount
        return () => clearInterval(interval);

    }, [user.lastOnline]);

    const handleDelete = () => {
        console.log('Delete', user.name);
    }

    const handleEdit = () => {
        console.log('Edit', user.name);
    }

    const handleInfo = () => {
        console.log('Info', user.name);
    }

    return (
        <Container>
            <Row className="p-2">
                <Col xs={5}>
                    <span className="name">{user.name}</span>
                    <br/>
                    <span className="email">{user.email}</span>
                </Col>
                <Col xs={4}>
                    <Row>
                        <Col xs={5}>
                            <Badge className='property-badge' bg="secondary">Last online</Badge>
                        </Col>
                        <Col>
                            <span className="last-online">
                                {user.lastOnline ? lastOnlineRelative : "Never"}
                            </span>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={5}>
                            <Badge className='property-badge' bg="secondary">Transactions</Badge>
                        </Col>
                        <Col>
                            <span className="inbound-transactions-count">
                                <ArrowDown size={14} />
                                {user.receivedTransactionCount}
                            </span>
                            {' '}
                            <span className="outbound-transactions-count">
                                <ArrowUp size={14} />
                                {user.sentTransactionCount}
                            </span>
                        </Col>
                    </Row>

                </Col>
                <Col xs={3} className="ms-auto">
                    <UserRowActions
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onInfo={handleInfo}
                    />
                </Col>
            </Row>

        </Container>
    );
}