import '@/app/admin/admin.css';
import { Container, Row } from "react-bootstrap";

export default function AdminDashboardLayout({ children }) {
    return (
        <>
            <Container fluid className="admin-dashboard-layout">
                <Row className="pt-4">
                    {children}
                </Row>
            </Container>
        </>
    );
}