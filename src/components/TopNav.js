'use client';

import { Jockey_One } from 'next/font/google';
import '@/styles/TopNav.css';
import { useUser } from '@/utils/UserContext';
import { useEffect, useState } from 'react';
import { Button, Container, Navbar } from "react-bootstrap";
import { BoxArrowRight, PersonLock } from 'react-bootstrap-icons';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const jockeyOne = Jockey_One({subsets: ['latin'], weight: '400'});

export default function TopNav() {
    const userContext = useUser();
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const[isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        setIsLoggedIn(userContext.user != null && userContext.user.name != '');
        setIsAdmin(userContext.user != null && userContext.user.role === 'admin');
    }, [userContext.user]);
    return (
        <Navbar className="top-nav" sticky="top">
            <Container>
                <Navbar.Brand href='/dashboard' className='logo'>
                    <Image
                        src='/images/logo-nav.webp'
                        alt='GoldFront Bank logo'
                        width={34}
                        height={34}
                        style={{verticalAlign: 'middle', borderRadius: '10px'}}
                    /> {' '}
                    <span className={`nav-title ${jockeyOne.className}`} style={{ verticalAlign: 'middle' }} >GoldFront Bank</span>
                </Navbar.Brand>

                {isAdmin && (
                    <Navbar.Text style={{ color: "black" }}>
                        <Button className="btn-admin" variant='light' onClick={() => {router.push('/admin')}} ><PersonLock size="16" color='black' /> Admin</Button>
                    </Navbar.Text>
                )}

                {isLoggedIn && userContext.user &&
                    (
                        <Navbar.Text style={{ color: "white" }}>
                        <Button className="btn-logout" variant='dark' onClick={userContext.handleLogout} ><BoxArrowRight size="16" color='white' /> Sign out</Button>
                        </Navbar.Text>
                    )
                }
            </Container>
        </Navbar>
    );
}