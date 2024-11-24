import TopNav from "@components/TopNav";


export default function DashboardLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <TopNav/>
                <main className="login-layout">
                    {children}
                </main>
            </body>
        </html>
    );
}