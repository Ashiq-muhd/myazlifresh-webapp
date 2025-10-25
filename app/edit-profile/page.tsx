'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function EditProfile() {
  const router = useRouter();

  const [firstName, setFirstName] = useState('My Azli order');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('ashiqmuhd0786@gmail.com');
  const [bio, setBio] = useState('');

  const handleUpdate = () => {
    // You can add form validation or saving logic here
    console.log({ firstName, lastName, email, bio });
    router.back(); // Navigate back after saving
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 pt-6 pb-20">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button onClick={() => router.back()} className="mr-3">
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">Edit Profile</h1>
      </div>

      {/* Form */}
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700">First Name</label>
          <input
            className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Last Name</label>
          <input
            className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Email ID</label>
          <input
            className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email ID"
            type="email"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Bio</label>
          <input
            className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="A brief description of who you are"
          />
        </div>

        <button
          onClick={handleUpdate}
          className="w-full mt-4 bg-green-600 text-white py-3 rounded-full font-semibold hover:bg-green-700 transition"
        >
          Update
        </button>
      </div>
    </div>
  );
}
