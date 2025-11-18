// app/components/Auth/AuthGate.tsx
'use client';

import React, { useEffect, useState, type ReactNode } from 'react';
import LoginModal from './LoginModal';
import OtpModal from './OtpModal';
import { getToken, getOtpKey } from '@/lib/auth';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

type AuthGateProps = {
  children: ReactNode;
};

export default function AuthGate({ children }: AuthGateProps) {
  const [openLogin, setOpenLogin] = useState(false);
  const [openOtp, setOpenOtp] = useState(false);
  const [otpKey, setOtpKey] = useState<string | null>(null);
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();

  // Show login modal if ?login=1 or ?auth=1 and no token
  useEffect(() => {
    const show = params?.get('login') === '1' || params?.get('auth') === '1';
    if (show && !getToken()) {
      setOpenLogin(true);
    }
  }, [params]);

  const handleOtpRequested = (key: string) => {
    setOtpKey(key);
    setOpenOtp(true);
    setOpenLogin(false);

    // remove query param so it doesn't reopen on refresh
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete('login');
      url.searchParams.delete('auth');
      window.history.replaceState({}, '', url.toString());
    } catch {
      // ignore
    }
  };

  const handleVerified = (token: string) => {
    setOpenOtp(false);
    setOpenLogin(false);

    const next = params?.get('next');
    if (next) {
      router.push(next);
    } else {
      router.refresh();
    }
  };

  return (
    <>
      {/* normal page content */}
      {children}

      {/* auth modals layered on top */}
      <LoginModal
        open={openLogin}
        onClose={() => setOpenLogin(false)}
        onOtpRequested={handleOtpRequested}
      />

      <OtpModal
        open={openOtp}
        otpKeyFromParent={otpKey ?? getOtpKey()}
        onClose={() => setOpenOtp(false)}
        onVerified={handleVerified}
      />
    </>
  );
}