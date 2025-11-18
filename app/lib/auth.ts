// lib/auth.ts
export const TOKEN_KEY = 'authToken';
export const OTP_KEY = 'otpKey'; // temporary storage for otpKey between modals

export function setToken(token: string, maxAgeSeconds = 60 * 60 * 24 * 30) {
  if (typeof window !== 'undefined') {
    // Persist in multiple keys for backward compatibility
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem('apiKey', token);
    localStorage.setItem('api-key', token);
    localStorage.setItem('userToken', token);
    // set cookie so middleware can read it
    document.cookie = `authToken=${token}; path=/; max-age=${maxAgeSeconds};`;
    document.cookie = `apiKey=${token}; path=/; max-age=${maxAgeSeconds};`;
  }
}

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY) ?? localStorage.getItem('apiKey') ?? localStorage.getItem('api-key') ?? null;
}

export function clearToken() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem('apiKey');
    localStorage.removeItem('api-key');
    localStorage.removeItem('userToken');
    // remove cookies
    document.cookie = `authToken=; path=/; max-age=0;`;
    document.cookie = `apiKey=; path=/; max-age=0;`;
  }
}

export function setOtpKey(otpKey: string) {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(OTP_KEY, otpKey);
  }
}

export function getOtpKey(): string | null {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem(OTP_KEY);
}

export function clearOtpKey() {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(OTP_KEY);
  }
}

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return !!(localStorage.getItem(TOKEN_KEY) || localStorage.getItem('apiKey') || localStorage.getItem('api-key'));
}
