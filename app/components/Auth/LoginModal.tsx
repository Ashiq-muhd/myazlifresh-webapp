// components/Auth/LoginModal.tsx
'use client';

import React, { useState } from 'react';
import { useSendOtpMutation } from '@/store/apiSlice';
import { setOtpKey } from '@/lib/auth';

type Props = {
  open: boolean;
  onClose: () => void;
  onOtpRequested?: (otpKey: string) => void;
};

export default function LoginModal({ open, onClose, onOtpRequested }: Props) {
  const [mobile, setMobile] = useState('');
  const [sendOtp, { isLoading }] = useSendOtpMutation();
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!open) return null;

  const handleSendOtp = async () => {
    setError(null);
    setSuccessMsg(null);

    if (!mobile || mobile.trim().length < 6) {
      setError('Please enter a valid mobile number or email.');
      return;
    }

    try {
      const res = await sendOtp({ mobile_or_email: mobile.trim() }).unwrap();
      const otpKey = res?.otpKey ?? (res as any)?.otpKey ?? null;

      if (!otpKey) {
        setError('Unable to request OTP. Try again.');
        return;
      }

      // store temporary key
      setOtpKey(otpKey);
      setSuccessMsg('OTP sent. Please check your phone.');
      // pass otpKey up (so UI can open OTP modal)
      onOtpRequested?.(otpKey);
    } catch (err: any) {
      console.error('sendOtp error', err);
      setError(err?.data?.message || 'Failed to send OTP');
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => onClose()}
      />
      <div className="absolute left-0 right-0 bottom-0">
        <div className="bg-gradient-to-b from-green-400 to-green-300 rounded-t-2xl p-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-semibold">Log In to Continue</h2>
              <p className="mt-2 text-sm opacity-90">Please log in with your mobile number to place your order.</p>
            </div>
            <button onClick={() => onClose()} className="text-white text-xl font-bold">✕</button>
          </div>

          <div className="mt-4">
            <input
              type="text"
              placeholder="Enter your mobile number here"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full rounded-md p-3 mt-2 text-gray-900"
            />
            {error && <p className="text-sm text-red-700 mt-2">{error}</p>}
            {successMsg && <p className="text-sm text-green-900 mt-2">{successMsg}</p>}

            <button
              onClick={handleSendOtp}
              disabled={isLoading}
              className="w-full mt-4 bg-green-700 hover:bg-green-800 text-white py-3 rounded-md font-semibold"
            >
              {isLoading ? 'Sending...' : 'Send OTP'}
            </button>
          </div>
        </div>

        <div className="bg-white p-4 rounded-t-2xl shadow-lg">
          <p className="text-xs text-gray-500">Need help? Contact our support team.</p>
        </div>
      </div>
    </div>
  );
}
