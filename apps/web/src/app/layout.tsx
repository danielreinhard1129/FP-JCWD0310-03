import { Footer } from '@/components/Footer';
// import { Toaster } from '@/components/ui/toaster';
import CreatePickupButton from '@/components/CreatePickupButton';
import StoreProvider from '@/provider/StoreProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';
import type { Metadata } from 'next';
import { DM_Sans, Inter, Poppins, Rubik } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';
// import './page.module.css';
// import 'leaflet/dist/leaflet.css';

const inter = Rubik({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900', '300', '800'],
});

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
