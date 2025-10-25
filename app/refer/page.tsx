'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function ReferPage() {
  const router = useRouter();
  const referralCode = 'Ing0joy05sOI';

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    alert('Referral code copied!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-300 text-gray-800 flex flex-col">
      {/* Back Header */}
      <div className="flex items-center gap-3 p-4">
        <button onClick={() => router.push('/account')}>
          <ArrowLeft className="w-6 h-6 text-black" />
        </button>
        <h1 className="text-lg font-semibold">Refer & Earn</h1>
      </div>

      <main className="flex-grow px-6 text-center">
        <div className="text-4xl font-bold text-yellow-500 mb-2">⭐</div>
        <div className="text-3xl font-bold text-black mb-2">100 Points</div>
        <p className="text-gray-700 text-sm mb-6">
          Your friend gets 100 Points on sign up and you get 100 Points too every time!
        </p>

        <p className="text-base font-semibold mb-2">Your Unique Referral Code:</p>

        <div className="bg-green-500 text-white px-6 py-3 rounded-md flex items-center justify-between max-w-xs mx-auto mb-4">
          <span className="font-mono tracking-wider">{referralCode}</span>
          <button onClick={handleCopy} className="ml-4 text-sm underline">
            Copy
          </button>
        </div>

        <p className="text-sm text-gray-700 mb-4">
          Share your referral link with friends and earn rewards!
        </p>

        <p className="text-xs text-gray-600 mb-3">Share your Referral Code via</p>

       <div className="flex justify-center gap-4 mb-6">
  <div className="bg-white shadow-md rounded-lg p-3">
    <img src="/icons/instagram.svg" alt="Instagram" width={32} height={32} />
  </div>
  <div className="bg-white shadow-md rounded-lg p-3">
    <img src="/icons/facebook.svg" alt="Facebook" width={32} height={32} />
  </div>
  <div className="bg-white shadow-md rounded-lg p-3">
    <img src="/icons/whatsapp.svg" alt="WhatsApp" width={32} height={32} />
  </div>
  <div className="bg-white shadow-md rounded-lg p-3">
    <img src="/icons/snapchat.svg" alt="Snapchat" width={32} height={32} />
  </div>
  <div className="bg-white shadow-md rounded-lg p-3">
    <img src="/icons/messenger.svg" alt="Message" width={32} height={32} />
  </div>
</div>

        <p className="text-sm text-green-800">other</p>
        <footer className="text-xs text-gray-600 mt-2 mb-4">My Azli Fresh © 2024</footer>
      </main>
    </div>
  );
}
