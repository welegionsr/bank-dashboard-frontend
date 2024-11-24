import TopNav from "@components/TopNav";
import { Container } from "react-bootstrap";


export default function DashboardLayout({ children }) {
    return (
        <Container fluid>
            <TopNav />
            <main className="dashboard-layout mt-4">
                {children}
            </main>
        </Container>
    );
}