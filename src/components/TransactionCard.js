'use client';

import '@/styles/TransactionCard.css';
import { formatDateTime } from '@/utils/dateUtils';
import { formatDistanceToNow } from 'date-fns';
import Image from "next/image";
import { Col, Container, OverlayTrigger, Row, Tooltip } from "react-bootstrap";

export default function TransactionCard({ name, date, amount, isInbound }) {
    const renderTooltip = (props) => (
        <Tooltip id="date-tooltip" {...props}>
            Exact date: {formatDateTime(date)}
        </Tooltip>
    );

    return (
        <Container className={`${isInbound ? 'inbound' : 'outbound'} p-3`} fluid>
            <Row>
                <Col xs={2} className="d-flex justify-content-md-center align-items-center" style={{ borderRight: '1px solid #aaa' }}>
                    <Image
                        src={`${isInbound ? '/dollar-up.svg' : '/dollar-down.svg'}`}
                        alt={`${isInbound ? 'inbound' : 'outbound'} transaction icon`}
                        width={50}
                        height={50}
                    />
                </Col>
                <Col xs={6}>
                    <Row style={{marginBottom: '6px'}}>
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
                            <OverlayTrigger
                                placement='bottom'
                                delay={{ show: 400, hide: 100 }}
                                overlay={renderTooltip}
                            >
                                <span className='property-value date'>{formatDistanceToNow(new Date(date), { addSuffix: true })}</span>
                            </OverlayTrigger>
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