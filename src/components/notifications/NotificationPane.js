'use client';

import { Col, Container, Offcanvas, Row } from "react-bootstrap";
import { ListCheck } from "react-bootstrap-icons";
import NotificationRow from "./NotificationRow";
import { setNotificationAsRead } from "@/app/api/notificationsApi";
import { useQueryClient } from "@tanstack/react-query";

export default function NotificationPane({show, onHide, notifications}){
    const queryClient = useQueryClient();

    const handleMarkRead = async (id) => {
        // send update to the server to mark notification as 'read'
        try {
            await setNotificationAsRead(id);
            queryClient.invalidateQueries(['notifications']);
        }
        catch(error)
        {
            console.error("Couldn't update notification as read:", error);
        }
    };

    return (
        <Offcanvas placement="end" show={show} onHide={onHide}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Unread Notifications</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body style={{ padding: 0 }}>
                {!notifications?.length && (
                    <Container fluid className='mt-4 mb-2'>
                        <Row>
                            <Col className='d-flex justify-content-md-center align-items-center'>
                                <ListCheck size={48} color='black' />
                            </Col>
                        </Row>
                        <Row>
                            <Col className='d-flex justify-content-md-center align-items-center'>
                                <p className='mt-2'>There are no new notifications to show you.</p>
                            </Col>
                        </Row>
                    </Container>
                )
                }

                {notifications?.length > 0 && notifications.map((notification, index) => (
                    <NotificationRow
                        key={index}
                        notification={notification}
                        onMarkRead={() => handleMarkRead(notification._id)}
                    />
                ))}
            </Offcanvas.Body>
        </Offcanvas>
    );
};