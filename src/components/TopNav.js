'use client';
import '@/styles/TopNav.css';
import { useUser } from '@/utils/UserContext';
import { useEffect, useState } from 'react';
import { Button, Container, Navbar } from "react-bootstrap";
import { BoxArrowRight } from 'react-bootstrap-icons';

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
                    <span className='nav-icon'>
                        <img
                            alt=""
                            src="/images/logo-nav.webp"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />
                    </span>{'  '}
                    <span className='nav-title'>GoldFront Bank</span>
                </Navbar.Brand>

                {isLoggedIn && userContext.user &&
                    (
                        <Navbar.Text style={{ color: "white" }}>
                        Hello {userContext.user.name}! {' '} 
                        <Button variant='secondary' onClick={userContext.handleLogout} style={{ fontSize: "0.8rem", marginLeft: "0.4rem" }}><BoxArrowRight size="14" color='white' /> Sign out</Button>
                        </Navbar.Text>
                    )
                }
            </Container>
        </Navbar>
    );
}