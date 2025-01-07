import 'bootstrap/dist/css/bootstrap.min.css';
import { roboto } from '@/utils/fonts';
import ClientProviders from '@/components/layout/ClientProviders';

export const metadata = {
  title: 'GoldFront Bank',
  description: 'A "banking" app for learning purposes using NextJS/React.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
