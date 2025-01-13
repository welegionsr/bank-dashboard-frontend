'use client';

import '@/styles/UserCard.css';
import { useUser } from "@/utils/UserContext";
import { Button, Card, Col, Container, Placeholder, Row, Stack } from "react-bootstrap";
import { Clipboard2Data, SendPlusFill } from 'react-bootstrap-icons';

export default function UserCard({ onPrimaryClick, primaryText, onSecondaryClick, secondaryText }) {
    const userContext = useUser();

    if (userContext.isLoading || !userContext.user) {
        return (
            <Card className='user-card'>
                <Card.Body>
                    <Container fluid>
                        <Row>
                            <Col xs="7">
                                <Row>
                                    <Placeholder as={Card.Title} animation="glow">
                                        <Placeholder xs={8} />
                                    </Placeholder>
                                    <Card.Body>
                                        <Placeholder xs={4} size="sm" /><br/>
                                        <Placeholder xs={6} size="lg" />
                                    </Card.Body>
                                    
                                </Row>
                                <hr style={{ marginTop: '0', marginRight: '1.15rem', color: 'grey' }} />
                                <Row className='mt-4'>
                                    <Stack direction='horizontal' gap={2}>
                                        <Placeholder.Button
                                            variant='primary'
                                            className='menu-btn send-btn'
                                            xs="6"
                                        />
                                        <Placeholder.Button
                                            variant='secondary'
                                            className='menu-btn history-btn'
                                            xs="6"
                                        />
                                    </Stack>
                                </Row>
                            </Col>
                            <Col xs="5" className='safe-back' />
                        </Row>
                    </Container>
                </Card.Body>


            </Card>
        );
    }

    return (
        <Card className='user-card'>
            <Card.Body>
                <Container fluid>
                    <Row>
                        <Col xs="7">
                            <Row>
                                <h2 className='card-title'>Hello, {userContext.user.name}!</h2>
                                <p style={{ fontSize: '0.65rem', fontWeight: '500', marginTop: '0.6rem', marginBottom: '0.1rem' }}>Current balance</p>
                                <span className="balance">$ {userContext.user.balance / 100}</span>
                            </Row>
                            <hr style={{ marginTop: '0', marginRight: '1.15rem', color: 'grey' }} />
                            <Row className='mt-4'>
                                <Stack direction='horizontal' gap={2}>
                                    <Button
                                        variant='primary'
                                        className='menu-btn send-btn'
                                        onClick={() => {
                                            console.log("Primary button clicked");
                                            console.log("[UserCard] UserContext:", userContext);
                                            onPrimaryClick();
                                        }}
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
                                        <span style={{ verticalAlign: 'middle' }}>{secondaryText}</span>
                                    </Button>
                                </Stack>
                            </Row>
                        </Col>
                        <Col xs="5" className='safe-back' />
                    </Row>
                </Container>
            </Card.Body>


        </Card>
    );
}