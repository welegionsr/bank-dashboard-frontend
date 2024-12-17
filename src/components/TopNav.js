'use client';

import { Jockey_One } from 'next/font/google';
import '@/styles/TopNav.css';
import { useUser } from '@/utils/UserContext';
import { useEffect, useState } from 'react';
import { Button, Container, Navbar } from "react-bootstrap";
import { BoxArrowRight } from 'react-bootstrap-icons';
import Image from 'next/image';

const jockeyOne = Jockey_One({subsets: ['latin'], weight: '400'});

export default function TopNav() {
    const userContext = useUser();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(userContext.user != null && userContext.user.name != '');
    }, [userContext.user]);
    return (
        <Navbar className="top-nav" sticky="top">
            <Container>
                <Navbar.Brand>
                    <Image
                        src='/images/logo-nav.webp'
                        alt='GoldFront Bank logo'
                        width={34}
                        height={34}
                        style={{verticalAlign: 'middle', borderRadius: '10px'}}
                    /> {' '}
                    <span className={`nav-title ${jockeyOne.className}`} style={{ verticalAlign: 'middle' }} >GoldFront Bank</span>
                </Navbar.Brand>

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