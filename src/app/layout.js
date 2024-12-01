import TopNav from '@/components/TopNav';
import { UserProvider } from '@/utils/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <TopNav />
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
