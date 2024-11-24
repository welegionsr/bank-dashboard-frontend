'use client';

import { useRouter } from "next/navigation";
import { Button } from "react-bootstrap";

export default function Home() {
  const router = useRouter();

  const handleLoginRedirect = () => {
    router.push('/login');
  };

  return (
    <div>
      <h1>Welcome to GoldFront Bank Dashboard</h1>
      <button onClick={handleLoginRedirect}>Go to Login</button>
    </div>
  );
}