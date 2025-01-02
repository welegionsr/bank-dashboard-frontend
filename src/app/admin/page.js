'use client';

import { Button } from "react-bootstrap";

export default function AdminPage() {
    return (
        <div>
            <h1>Admin Page</h1>
            <Button href="/admin/users" variant="primary">Manage Users</Button>
        </div>
    );
}