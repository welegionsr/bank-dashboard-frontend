import '@/app/dashboard/dashboard.css';

import { Container, Row } from "react-bootstrap";


export default function DashboardLayout({ children }) {
    return (
        <>
            <Container fluid className="dashboard-layout">
                <Row>
                    {children}
                </Row>
            </Container>
        </>
    );
}