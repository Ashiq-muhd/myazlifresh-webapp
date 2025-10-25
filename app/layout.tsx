import type { Metadata } from 'next';
import './globals.css';
import ReduxProvider from './ReduxProvider';

export const metadata: Metadata = {
  title: 'My Azli fresh',
  description: 'Fresh fish, meat, and seafood delivered in 20 minutes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* ✅ Wrap children with Redux Provider */}
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
