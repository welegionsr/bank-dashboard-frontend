'use client';

import { Col, Container, Row, Spinner } from "react-bootstrap";
import { ExclamationOctagon } from "react-bootstrap-icons";
import UserRow from "./UserRow";
import { fetchUsers } from "@/app/api/usersApi";
import { parseCookies } from "nookies";
import { useQuery } from "@tanstack/react-query";

export default function UserList() {
    const { token } = parseCookies();

    const { data: users, isLoading, error } = useQuery({
        queryKey: ['users'],
        queryFn: () => fetchUsers(token),
        enabled: !!token,
        staleTime: 5 * 60 * 1000,
    });


    if (isLoading) {
        return <Spinner size='48' color='grey' />
    }

    if (error) {
        return <p>Error: {error.message}</p>
    }

    return (
        <div className="user-list">
            {!users?.length && (
                <Container className='mt-4 mb-2'>
                    <Row>
                        <Col className='d-flex justify-content-md-center align-items-center'>
                            <ExclamationOctagon size={48} color='black' />
                        </Col>
                    </Row>
                    <Row>
                        <Col className='d-flex justify-content-md-center align-items-center'>
                            <p className='mt-2'>No users exist in the system :(</p>
                        </Col>
                    </Row>
                </Container>
            )
            }

            {users?.length > 0 && users.map((user, index) => (
                <UserRow
                    key={index}
                    user={user}
                />
            ))}
        </div>
    );
}