'use client';

import { Jockey_One } from 'next/font/google';
import '@/styles/TopNav.css';
import { useUser } from '@/utils/UserContext';
import { Button, Container, Navbar, Spinner, Stack } from "react-bootstrap";
import { BoxArrowRight, PersonLock } from 'react-bootstrap-icons';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const jockeyOne = Jockey_One({ subsets: ['latin'], weight: '400' });

export default function TopNav() {
    const { user, role, isLoading, isError, handleLogout } = useUser();
    const router = useRouter();

    // placeholder for when there's an error fetching the user data
    if (isError) {
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
                                <Button className="btn-admin" variant='light'>
                                    <PersonLock size="16" /> Admin
                                </Button>
                            </div>
                        ) : (
                            isAdmin && (
                                <Navbar.Text>
                                    <Button className="btn-admin" variant='light' onClick={() => { router.push('/admin') }}>
                                        <PersonLock size="16" color='black' /> Admin
                                    </Button>
                                </Navbar.Text>
                            )
                        )}

                        {/* Logout Button */}
                        {isLoading ? (
                            <div style={{ visibility: "hidden" }}>
                                <Button className="btn-logout" variant='dark'>
                                    <BoxArrowRight size="16" /> Sign out
                                </Button>
                            </div>
                        ) : (
                            isLoggedIn && (
                                <Navbar.Text>
                                    <Button className="btn-logout" variant='dark' onClick={handleLogout}>
                                        <BoxArrowRight size="16" color='white' /> Sign out
                                    </Button>
                                </Navbar.Text>
                            )
                        )}
                    </Stack>
                </div>
            </Container>
        </Navbar>
    );
}