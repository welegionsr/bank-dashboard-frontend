'use client';

import '@/styles/UserCard.css';
import { useUser } from "@/utils/UserContext";
import { Button, Card, Col, Container, Row, Spinner, Stack } from "react-bootstrap";
import { Clipboard2Data, SendPlusFill } from 'react-bootstrap-icons';

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
                        <Col xs="7">
                            <Row>
                                <h2 className='card-title'>Hello, {userContext.user.name}!</h2>
                                <p style={{ fontSize: '0.7rem', fontWeight: '600', marginTop: '0.6rem', marginBottom: '0.5rem' }}>Current balance</p>
                                <span className="balance" style={{ fontSize: '2.6rem' }}>$ {userContext.user.balance / 100}</span>
                            </Row>
                            <Row className='mt-4'>
                                <Stack direction='horizontal' gap={2}>
                                    <Button 
                                        variant='primary' 
                                        className='menu-btn send-btn' 
                                        onClick={onPrimaryClick}
                                    >
                                        <SendPlusFill size={24} color="white" />{' '}
                                        <span style={{ verticalAlign: 'middle' }}>{primaryText}</span>
                                    </Button>
                                    <Button
                                        variant='secondary'
                                        className='menu-btn history-btn'
                                        onClick={onSecondaryClick}
                                        aria-controls='transactions-collapse'
                                    >
                                        <Clipboard2Data size={24} color="white" />{' '}
                                        <span style={{verticalAlign: 'middle'}}>{secondaryText}</span>
                                    </Button>
                                </Stack>
                            </Row>
                        </Col>
                        <Col xs="5" className='safe-back'/>
                    </Row>
                </Container>
            </Card.Body>


        </Card>
    );
}