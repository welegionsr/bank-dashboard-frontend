import { UserProvider } from '@/utils/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
