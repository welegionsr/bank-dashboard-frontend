'use client';

import Head from "next/head";
import { useRouter } from "next/navigation";
import { Button } from "react-bootstrap";

export default function AdminPage() {
    const router = useRouter();
    return (
        <>
            <Head>
                <title>Admin Dashboard | GoldFront Bank</title>
            </Head>
            <div>
                <h1>Admin Page</h1>
                <Button variant="primary" onClick={() => router.push('/admin/users')}>Manage Users</Button>
            </div>
        </>
    );
}