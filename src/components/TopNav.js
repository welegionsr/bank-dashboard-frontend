'use client';
import '@/styles/TopNav.css';
import { useUser } from '@/utils/UserContext';
import { useEffect, useState } from 'react';
import { Container, Navbar } from "react-bootstrap";

export default function TopNav(){
    const {user} = useUser();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(()=>{
        setIsLoggedIn(user != null);
    }, [user]);
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

                { isLoggedIn && user && <Navbar.Text style={{color: "white"}}>Hello {user.name}!</Navbar.Text> }
            </Container>
        </Navbar>
    );
}