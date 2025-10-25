'use client'

import React from 'react';

export default function ReferralBanner() {
  return (
    <div className="px-4">
      <div className="rounded-xl bg-purple-100 p-4 flex justify-between items-center shadow">
        <div>
          <h2 className="text-purple-800 font-extrabold text-lg">₹200 FOR YOU<br />₹200 FOR THEM</h2>
          <p className="text-sm text-purple-600">Refer your friends & enjoy wallet rewards together – it’s a win-win!</p>
        </div>
        <button className="bg-yellow-400 text-black px-3 py-1 rounded font-semibold text-sm">Refer Now</button>
      </div>
    </div>
  );
}
