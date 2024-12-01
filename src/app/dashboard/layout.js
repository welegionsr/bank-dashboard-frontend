import '@/app/dashboard/dashboard.css';

import { Container } from "react-bootstrap";


export default function DashboardLayout({ children }) {
    return (
        <>
            <Container fluid className="dashboard-layout">
                <main className="pt-4">
                    {children}
                </main>
            </Container>
        </>
    );
}