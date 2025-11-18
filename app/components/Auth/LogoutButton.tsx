// components/Auth/LogoutButton.tsx
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { clearToken, getToken } from '@/lib/auth';

export default function LogoutButton() {
  const router = useRouter();
  const handleLogout = () => {
    clearToken();
    // refresh or go home
    router.push('/');
  };
  return (
    <button
      onClick={handleLogout}
      className="px-3 py-2 rounded-md bg-red-50 text-red-700 hover:bg-red-100"
    >
      Logout
    </button>
  );
}
