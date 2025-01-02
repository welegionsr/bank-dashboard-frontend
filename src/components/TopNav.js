'use client';

import { Jockey_One } from 'next/font/google';
import '@/styles/TopNav.css';
import { useUser } from '@/utils/UserContext';
import { useEffect, useState } from 'react';
import { Button, Container, Navbar, Stack } from "react-bootstrap";
import { BoxArrowRight, PersonLock } from 'react-bootstrap-icons';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

const jockeyOne = Jockey_One({ subsets: ['latin'], weight: '400' });

export default function TopNav() {
    const userContext = useUser();
    const router = useRouter();
    const pathname = usePathname();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const user = userContext.user;
        setIsLoggedIn(pathname !== '/login' && user != null && user.name !== '');
        setIsAdmin(pathname !== '/login' && user != null && user.role === 'admin');
    }, [userContext.user, pathname]); // React to both user changes and route changes



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
                    <span className={`nav-title ${jockeyOne.className}`} style={{ verticalAlign: 'middle' }} >GoldFront Bank</span>
                </Navbar.Brand>

                <div className="ms-auto d-flex align-items-center">
                    <Stack direction="horizontal" gap={2}>
                        {isAdmin && (
                            <Navbar.Text style={{ color: "black" }}>
                                <Button className="btn-admin" variant='light' onClick={() => { router.push('/admin') }} ><PersonLock size="16" color='black' /> Admin</Button>
                            </Navbar.Text>
                        )}

                        {isLoggedIn && userContext.user &&
                            (
                                <Navbar.Text style={{ color: "white" }}>
                                    <Button className="btn-logout" variant='dark' onClick={userContext.handleLogout} ><BoxArrowRight size="16" color='white' /> Sign out</Button>
                                </Navbar.Text>
                            )
                        }
                    </Stack>
                </div>
            </Container>
        </Navbar>
    );
}