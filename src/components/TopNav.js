'use client';
import '@/styles/TopNav.css';
import { Container, Navbar } from "react-bootstrap";

export default function TopNav(){
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
            </Container>
        </Navbar>
    );
}