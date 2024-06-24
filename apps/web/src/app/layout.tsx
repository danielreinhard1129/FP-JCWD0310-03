import { Footer } from '@/components/Footer';
// import { Toaster } from '@/components/ui/toaster';
import CreatePickupButton from '@/components/CreatePickupButton';
import StoreProvider from '@/provider/StoreProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';
import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';
// import 'leaflet/dist/leaflet.css';

const inter = DM_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Kucekin',
  description: 'The best laundry apps',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GoogleOAuthProvider clientId="761232261353-uov835jcu2ocgve4443buco69jho2kvk.apps.googleusercontent.com">
          <StoreProvider>
            {children}
            {/* <Footer /> */}
            {/* <CreatePickupButton /> */}
            <Toaster richColors />
          </StoreProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
