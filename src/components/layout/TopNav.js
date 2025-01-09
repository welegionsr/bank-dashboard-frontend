'use client';

import '@/styles/TopNav.css';
import { useUser } from '@/utils/UserContext';
import { Button, Container, Navbar, Stack } from "react-bootstrap";
import { Bell, BoxArrowRight, PersonLock } from 'react-bootstrap-icons';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { jockeyOne } from '@/utils/fonts';
import NavAction from './NavAction';


export default function TopNav() {
    const { user, role, isLoading, isError, handleLogout } = useUser();
    const router = useRouter();

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

    const isLoggedIn = Boolean(user);
    const isAdmin = role === "admin";

    return (
        <Navbar className="top-nav" sticky="top">
            <Container>
                <Navbar.Brand href='/dashboard' className='logo'>
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
                                <NavAction className="btn-notifications" variant='link' tooltipPlacement='bottom' tooltipText='Recent Notifications'>
                                    <Bell size="24" color='black' />
                                </NavAction>
                            </div>
                        ) : (
                            isLoggedIn && (
                                <Navbar.Text>
                                    <NavAction className="btn-notifications" variant='link' onClick={handleLogout} tooltipPlacement='bottom' tooltipText='Recent Notifications'>
                                        <Bell size="24" color='black' />
                                    </NavAction>
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
        </Navbar>
    );
}