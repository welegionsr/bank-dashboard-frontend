'use client';

import '@/styles/UserList/UserRow.css';
import { Badge, Col, Container, Row } from "react-bootstrap";
import UserRowActions from "./UserRowActions";
import { ArrowDown, ArrowUp } from 'react-bootstrap-icons';
import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from 'react';

export default function UserRow({user, onDelete, onEdit, onInfo}){
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

    return (
        <Container className='user-row'>
            <Row className="p-2">
                <Col xs={4}>
                    <Row>
                        <span className="name">{user.name}</span>
                    </Row>
                    <Row>
                        <span className="email">{user.email}</span>
                    </Row>
                    
                </Col>
                <Col xs={5}>
                    <Row>
                        <Col xs={4}>
                            <Badge className='property-badge' bg="secondary">Last online</Badge>
                        </Col>
                        <Col>
                            <span className="last-online">
                                {user.lastOnline ? lastOnlineRelative : "Never"}
                            </span>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={4}>
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
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onInfo={onInfo}
                    />
                </Col>
            </Row>

        </Container>
    );
}