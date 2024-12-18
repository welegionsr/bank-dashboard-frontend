'use client';

import '@/styles/TransactionCard.css';
import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";

export default function TransactionCard({name, date, amount, isInbound}){
    return (
        <Container className={`${isInbound ? 'inbound' : 'outbound'} p-3`} fluid>
            <Row>
                <Col xs={2} className="d-flex justify-content-md-center align-items-center" style={{borderRight: '1px solid #aaa'}}>
                    <Image
                        src={`${ isInbound ? 'dollar-up.svg' : 'dollar-down.svg'}`}
                        alt={`${isInbound ? 'inbound' : 'outbound'} transaction icon`}
                        width={50}
                        height={50}
                    />
                </Col>
                <Col xs={6}>
                    <Row>
                        <Col className="d-flex justify-content-md-center align-items-center" xs={3}>
                            <span className="property-title">{isInbound ? 'From' : 'To'}</span>
                        </Col>
                        <Col>
                            <span className='property-value'>{name}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="d-flex justify-content-md-center align-items-center" xs={3}>
                            <span className="property-title">Date</span>
                        </Col>
                        <Col>
                            <span className='property-value'>{date}</span>
                        </Col>
                    </Row>
                </Col>
                <Col xs={4}>
                    <Row>
                        <Col xs={3}>
                            <span className="property-title">Amount</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <span className='amount'>${amount}</span>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
} 