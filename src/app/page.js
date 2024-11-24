'use client';

import { useRouter } from "next/navigation";
import { Button, Container, Row } from "react-bootstrap";

export default function Home() {
  const router = useRouter();

  const handleLoginRedirect = () => {
    router.push('/login');
  };

  return (
    <Container className="justify-content-md-center">
      <Row>
        <h1>Welcome to GoldFront Bank Dashboard</h1>
        <Button variant="primary" onClick={handleLoginRedirect}>Go to Dashboard</Button>
      </Row>
    </Container>
  );
}