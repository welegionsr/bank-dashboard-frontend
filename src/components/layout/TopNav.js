'use client';

import '@/styles/TopNav.css';
import { useUser } from '@/utils/UserContext';
import { Badge, Container, Navbar, Stack } from "react-bootstrap";
import { Bell, BoxArrowRight, PersonLock } from 'react-bootstrap-icons';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { jockeyOne } from '@/utils/fonts';
import NavAction from './NavAction';
import { useQuery } from '@tanstack/react-query';
import { fetchMyUnreadNotifications } from '@/app/api/notificationsApi';
import NotificationPane from '../notifications/NotificationPane';
import { useState } from 'react';


export default function TopNav() {
    const { user, role, isLoading, isError, handleLogout } = useUser();
    const router = useRouter();
    const [showNotificationPane, setShowNotificationPane] = useState(false);

    const isLoggedIn = Boolean(user);
    const isAdmin = role === "admin";

    // get user notifications
    const { data: notifications, refetch } = useQuery({
        queryKey: ["notifications"],
        queryFn: fetchMyUnreadNotifications,
        retry: false,
        enabled: isLoggedIn,
        staleTime: 10 * 60 * 1000, // 10 minutes
    });

    const handleShowNotifications = () => {
        setShowNotificationPane(!showNotificationPane);
    };

    // placeholder for when there's an error fetching the user data
    if (isError) {
        return (
            <Navbar className="top-nav" sticky="top">
                <Container>
                    <Navbar.Brand className='logo' onClick={() => router.push('/dashboard')}>
                        <Image
                            src='/images/logo-nav.webp'
                            alt='GoldFront Bank logo'
                            width={34}
                            height={34}
                            style={{ verticalAlign: 'middle', borderRadius: '10px' }}
                        /> {' '}
                        <span className={`nav-title ${jockeyOne.className}`} style={{ verticalAlign: 'middle' }}>GoldFront Bank</span>
                    </Navbar.Brand>

                    <div className="ms-auto d-flex align-items-center">
                    </div>
                </Container>
            </Navbar>
        );
    }

    return (
        <Navbar className="top-nav" sticky="top">
            <Container>
                <Navbar.Brand className='logo' onClick={() => router.push('/dashboard')} style={{ cursor: 'pointer' }}>
                    <Image
                        src='/images/logo-nav.webp'
                        alt='GoldFront Bank logo'
                        width={34}
                        height={34}
                        style={{ verticalAlign: 'middle', borderRadius: '10px' }}
                    />{' '}
                    <span className={`nav-title ${jockeyOne.className}`} style={{ verticalAlign: 'middle' }}>
                        GoldFront Bank
                    </span>
                </Navbar.Brand>

                <div className="ms-auto d-flex align-items-center">
                    <Stack direction="horizontal" gap={2}>
                        {/* Admin Button */}
                        {isLoading ? (
                            <div style={{ visibility: "hidden" }}>
                                <NavAction className="btn-admin" variant='link' tooltipPlacement='bottom' tooltipText='Admin Dashboard'>
                                    <PersonLock size="24" color='black' />
                                </NavAction>
                            </div>
                        ) : (
                            isAdmin && (
                                <Navbar.Text>
                                    <NavAction className="btn-admin" variant='link' onClick={() => { router.push('/admin') }} tooltipPlacement='bottom' tooltipText='Admin Dashboard'>
                                        <PersonLock size="24" color='black' />
                                    </NavAction>
                                </Navbar.Text>
                            )
                        )}

                        {/* Notifications Button */}
                        {isLoading ? (
                            <div style={{ visibility: "hidden" }}>
                                <NavAction className="btn-notifications" variant='link' tooltipPlacement='bottom' tooltipText='Unread Notifications'>
                                    <Bell size="24" color='black' />
                                </NavAction>
                            </div>
                        ) : (
                            isLoggedIn && (
                                <Navbar.Text>
                                    <NavAction className="btn-notifications" variant='link' onClick={handleShowNotifications} tooltipPlacement='bottom' tooltipText='Recent Notifications'>
                                        <Bell size="24" color='black' />
                                    </NavAction>
                                    {notifications?.length > 0 && (
                                        <Badge className="notification-count" pill bg="danger">{notifications.length}</Badge>
                                    )}
                                </Navbar.Text>
                            )
                        )}

                        {/* Logout Button */}
                        {isLoading ? (
                            <div style={{ visibility: "hidden" }}>
                                <NavAction className="btn-logout" variant='link' tooltipPlacement='bottom' tooltipText='Sign out'>
                                    <BoxArrowRight size="24" color='black' />
                                </NavAction>
                            </div>
                        ) : (
                            isLoggedIn && (
                                <Navbar.Text>
                                    <NavAction className="btn-logout" variant='link' onClick={handleLogout} tooltipPlacement='bottom' tooltipText='Sign out'>
                                        <BoxArrowRight size="24" color='black' />
                                    </NavAction>
                                </Navbar.Text>
                            )
                        )}
                    </Stack>
                </div>
            </Container>

            <NotificationPane
                show={showNotificationPane}
                onHide={() => setShowNotificationPane(false)}
                notifications={notifications}
            />
        </Navbar>
    );
}