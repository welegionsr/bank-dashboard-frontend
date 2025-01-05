import { Container, Row } from "react-bootstrap";

export default function AdminDashboardLayout({ children }) {
    return (
        <>
            <Container fluid className="admin-dashboard-layout">
                <Row className="mt-4">
                    {children}
                </Row>
            </Container>
        </>
    );
}