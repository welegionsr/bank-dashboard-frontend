'use client';

import '@/styles/UserCard.css';
import { useUser } from "@/utils/UserContext";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";

export default function UserCard({ onPrimaryClick, primaryText, onSecondaryClick, secondaryText }) {
    const userContext = useUser();

    if (!userContext.valid) {
        return <Spinner animation="grow" variant="light" role="status" />
    }

    return (
        <Card className='user-card'>
            <Card.Body>
                <Container fluid>
                    <Row>
                        <Col xs="6">
                            <Row>
                                <h2 className='card-title'>Hello, {userContext.user.name}!</h2>
                                <p style={{ fontSize: '0.7rem', fontWeight: '600', marginTop: '0.6rem', marginBottom: '0.5rem' }}>Current balance</p>
                                <span className="balance" style={{ fontSize: '2.6rem' }}>$ {userContext.user.balance}</span>
                            </Row>
                            <Row className='mt-4'>
                                <Col>
                                    <Button variant='primary' onClick={onPrimaryClick}>{primaryText}</Button>
                                </Col>
                                <Col>
                                    <Button variant='secondary' onClick={onSecondaryClick} aria-controls='transactions-collapse'>{secondaryText}</Button>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs="6" className='safe-back'/>
                    </Row>

                </Container>
            </Card.Body>


        </Card>
    );
}