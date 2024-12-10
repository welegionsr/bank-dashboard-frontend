'use client';

import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";

export default function TransactionCard({name, date, amount, isInbound}){
    return (
        <Container fluid>
            <Row>
                <Col xs={2}>
                    <Image
                        src={`/images/${ isInbound ? 'dollar-up.svg' : 'dollar-down.svg'}`}
                        alt={`${isInbound ? 'inbound' : 'outbound'} transaction icon`}
                        width={50}
                        height={50}
                    />
                </Col>
                <Col xs={6}>
                    <Row>
                        <Col xs={3}>
                            <span>from</span>
                        </Col>
                        <Col>
                            <span>{name}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={3}>
                            <span>date</span>
                        </Col>
                        <Col>
                            <span>{date}</span>
                        </Col>
                    </Row>
                </Col>
                <Col xs={4}>
                    <Row>
                        <Col xs={3}>
                            <span>amount</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <span>${amount}</span>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
} 