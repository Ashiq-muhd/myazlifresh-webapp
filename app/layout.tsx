// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "./ReduxProvider";
import { AppProvider } from "./context/AppContext";
import AuthGate from "./components/Auth/AuthGate";
import AuthCookieSync from "./components/Auth/AuthCookieSync";

export const metadata: Metadata = {
  title: "My Azli fresh",
  description: "Fresh fish, meat, and seafood delivered in 20 minutes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <AppProvider>
            {/* Auth wrapper: checks token, shows login & otp modals */}
            <AuthGate>
              <AuthCookieSync />
              {children}
            </AuthGate>
          </AppProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}