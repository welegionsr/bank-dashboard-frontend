'use client';

export default function DashboardPage()
{
    return (
        <div>
            <h2>Welcome!</h2>
            <p>This is the dashboard page!</p>
            <p>Your token: {localStorage.getItem('user-token') ? localStorage.getItem('user-token') : "No token found!"}</p>
        </div>
    );
}