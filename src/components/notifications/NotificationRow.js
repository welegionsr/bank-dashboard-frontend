'use client';

import '@/styles/notifications/NotificationRow.css';
import { formatDistanceToNow } from "date-fns";
import { useState } from 'react';
import { Badge, Button, Col, Container, Row } from "react-bootstrap";
import { Asterisk, CashCoin, CheckCircle, CheckCircleFill, InfoCircle } from "react-bootstrap-icons";

export default function NotificationRow({notification, onMarkRead}){
    const [isRead, setIsRead] = useState(notification?.isRead);

    const getNotificationIcon = (type) => {
        if(type === 'transaction')
        {
            return <CashCoin size={36} color="black" />
        }
        if(type === 'alert')
        {
            return <InfoCircle size={36} color="black" />
        }
        
        return <Asterisk size={36} color="black" />
    }
    
    return (
        <Container fluid className={`notification ${isRead ? 'read' : 'unread'}`}>
            <Row className="d-flex align-items-center">
                <Col className='icon' xs={2}>
                    {notification && getNotificationIcon(notification.type)}
                </Col>
                <Col>
                    <Row>
                        <span className='notification-text'>
                            {notification.message}
                        </span>
                    </Row>
                    <Row>
                        <Col>
                            <Badge bg='dark'>
                                <span className="notification-time">
                                    {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                                </span>
                            </Badge>
                        </Col>
                    </Row>
                </Col>
                <Col xs={2}>
                    <Button 
                        className='mark-read-btn' 
                        variant="link" 
                        onClick={() => {onMarkRead(); setIsRead(true);}}
                        disabled={isRead}
                    >
                        {isRead && (
                            <CheckCircleFill size={24} color="black" />
                        )}

                        {!isRead && (
                            <CheckCircle size={24} color="black" />
                        )}
                        
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}