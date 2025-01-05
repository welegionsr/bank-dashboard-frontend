'use client';

import { useRouter } from "next/navigation";
import { Button } from "react-bootstrap";

export default function AdminPage() {
    const router = useRouter();
    return (
        <div>
            <h1>Admin Page</h1>
            <Button variant="primary" onClick={() => router.push('/admin/users')}>Manage Users</Button>
        </div>
    );
}