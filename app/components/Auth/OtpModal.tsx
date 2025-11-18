// components/Auth/OtpModal.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useVerifyOtpMutation } from '@/store/apiSlice';
import { setToken, getOtpKey, clearOtpKey } from '@/lib/auth';

type Props = {
  open: boolean;
  otpKeyFromParent?: string | null;
  onClose: () => void;
  onVerified?: (token: string) => void;
};

export default function OtpModal({ open, onClose, otpKeyFromParent, onVerified }: Props) {
  const [otp, setOtp] = useState('');
  const [otpKey, setOtpKeyState] = useState<string | null>(otpKeyFromParent ?? null);
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!otpKeyFromParent) {
      const stored = getOtpKey();
      setOtpKeyState(stored);
    } else {
      setOtpKeyState(otpKeyFromParent);
    }
  }, [otpKeyFromParent]);

  if (!open) return null;

  const handleVerify = async () => {
    setError(null);
    if (!otpKey || otp.trim().length === 0) {
      setError('Missing OTP session. Try requesting OTP again.');
      return;
    }
    if (otp.trim().length < 3) {
      setError('Please enter a valid OTP.');
      return;
    }

    try {
      const res = await verifyOtp({ otpKey, otp: otp.trim() }).unwrap();
      const apiKey = (res as any)?.apiKey ?? (res as any)?.['api-key'] ?? null;
      if (!apiKey) {
        setError('Invalid verification response.');
        return;
      }

      // Save token (localStorage + cookie)
      setToken(String(apiKey));
      clearOtpKey();
      onVerified?.(String(apiKey));
      onClose();
    } catch (err: any) {
      console.error('verifyOtp error', err);
      setError(err?.data?.message || 'OTP verification failed');
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={() => onClose()} />
      <div className="absolute left-0 right-0 bottom-0">
        <div className="bg-gradient-to-b from-green-400 to-green-300 rounded-t-2xl p-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-semibold">Verify Your Number</h2>
              <p className="mt-2 text-sm opacity-90">We've sent a 6-digit OTP. Please enter it below.</p>
            </div>
            <button onClick={() => onClose()} className="text-white text-xl font-bold">✕</button>
          </div>

          <div className="mt-4">
            <div className="flex gap-2">
              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full rounded-md p-3 text-gray-900"
                placeholder="Enter OTP"
              />
            </div>

            {error && <p className="text-sm text-red-700 mt-2">{error}</p>}

            <button
              onClick={handleVerify}
              disabled={isLoading}
              className="w-full mt-4 bg-green-700 hover:bg-green-800 text-white py-3 rounded-md font-semibold"
            >
              {isLoading ? 'Verifying...' : 'Save & Continue'}
            </button>
          </div>
        </div>

        <div className="bg-white p-4 rounded-t-2xl shadow-lg">
          <p className="text-xs text-gray-500">Didn't receive the OTP? Request again from login.</p>
        </div>
      </div>
    </div>
  );
}
