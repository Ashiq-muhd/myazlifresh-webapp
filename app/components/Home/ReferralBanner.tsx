'use client'

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function ReferralBanner() {
  const router = useRouter();
  // Correct public path (spaces URL-encoded)
  const bannerSrc = '/banner/refer%20and%20earn.png';

  return (
    <div className="px-4">
      <button
        onClick={() => router.push('/refer')}
        className="block w-full group focus:outline-none focus:ring-4 focus:ring-yellow-300 rounded-xl"
        aria-label="Go to Refer & Earn"
      >
        <Image
          src={bannerSrc}
          alt="Refer & Earn - Invite your friends and earn ₹200 wallet credit"
          width={740}
          height={406}
          priority
          className="w-full h-auto rounded-xl shadow transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </button>
    </div>
  );
}
