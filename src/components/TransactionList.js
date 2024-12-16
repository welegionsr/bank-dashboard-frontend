'use client';

import '@/styles/TransactionList.css';
import TransactionCard from "./TransactionCard";
import { ExclamationOctagon } from 'react-bootstrap-icons';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { useQuery } from '@tanstack/react-query';
import { fetchTransactions } from '@/app/api/transactionsApi';
import { parseCookies } from 'nookies';
import { formatDateTime } from '@/utils/dateUtils';


export default function TransactionList({userEmail}){
    const {token} = parseCookies();

    const { data: transactions, isLoading, error } = useQuery({
        queryKey: ['transactions', userEmail],
        queryFn: () => userEmail ? fetchTransactions(userEmail, token) : Promise.reject('User email is null'),
        enabled: !!userEmail && !!token, // Only run query if userEmail is truthy
        staleTime: 5 * 60 * 1000, // Optional: Cache duration
    });


    if (!userEmail) {
        return <p>User email is null</p>
    }

    if(isLoading)
    {
        return <Spinner size='48' color='grey'/>
    }

    if(error)
    {
        return <p>Error: {error.message}</p>
    }

    return (
        <div className="transaction-list">
            { !transactions?.length && (
                <Container className='mt-4 mb-2'>
                    <Row>
                        <Col className='d-flex justify-content-md-center align-items-center'>
                                <ExclamationOctagon size={48} color='black'/>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='d-flex justify-content-md-center align-items-center'>
                            <p className='mt-2'>No transaction history :(</p>       
                        </Col>
                    </Row>
                </Container>
            )
            }

            {transactions?.length > 0 && transactions.map((transaction, index) => (
                <TransactionCard
                    key={index}
                    name={(userEmail === transaction.receiver.email) ? transaction.sender.name : transaction.receiver.name}
                    date={formatDateTime(transaction.date)}
                    amount={transaction.amount / 100}
                    isInbound={userEmail === transaction.receiver.email}
                />
            ))}
        </div>
    );
}