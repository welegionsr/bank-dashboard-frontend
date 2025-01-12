'use client';

import '@/styles/notifications/NotificationPane.css';
import { Col, Container, Offcanvas, Row } from "react-bootstrap";
import { ListCheck } from "react-bootstrap-icons";
import NotificationRow from "./NotificationRow";
import { setNotificationAsRead } from "@/app/api/notificationsApi";
import { useQueryClient } from "@tanstack/react-query";
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function NotificationPane({ show, onHide, notifications }) {
    const queryClient = useQueryClient();

    const handleMarkRead = async (id) => {
        // send update to the server to mark notification as 'read'
        try {
            await setNotificationAsRead(id);
            queryClient.invalidateQueries(['notifications']);
        }
        catch (error) {
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
                    <div className="no-notifications-container">
                        <Container fluid>
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
                    </div>
                )}

                <div className="notification-list">
                    <AnimatePresence>
                        {notifications?.map((notification) => (
                            <motion.div
                                key={notification._id}
                                initial={{ opacity: 0, x: 400 }} // Start off-screen to the right
                                animate={{ opacity: 1, x: 0 }}  // Move into view
                                exit={{ opacity: 0.3, x: 400 }}    // Exit off-screen to the right
                                transition={{ duration: 0.5 }}  // Animation timing
                            >
                                <NotificationRow
                                    notification={notification}
                                    onMarkRead={() => handleMarkRead(notification._id)}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

            </Offcanvas.Body>
        </Offcanvas>
    );
};