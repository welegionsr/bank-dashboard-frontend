import TopNav from '@/components/TopNav';
import { roboto } from '@/utils/fonts';
import { UserProvider } from '@/utils/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <UserProvider>
          <TopNav />
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
