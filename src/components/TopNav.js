'use client';

import { Container, Navbar } from "react-bootstrap";

export default function TopNav(){
    return (
        <Navbar className="bg-body-tertiary">
            <Container>
                <Navbar.Brand>
                    <img
                        alt=""
                        src="/file.svg"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    GoldFront Bank
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
}