"use client";
import { useEffect } from 'react';

// Ensures auth cookies exist for middleware after SPA login
export default function AuthCookieSync() {
  useEffect(() => {
    try {
      const token =
        localStorage.getItem('authToken') ||
        localStorage.getItem('apiKey') ||
        localStorage.getItem('api-key') ||
        localStorage.getItem('userToken') ||
        null;
      if (token) {
        const maxAge = 60 * 60 * 24 * 30; // 30 days
        document.cookie = `authToken=${token}; path=/; max-age=${maxAge}`;
        document.cookie = `apiKey=${token}; path=/; max-age=${maxAge}`;
      }
    } catch {}
  }, []);
  return null;
}
