'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, LocateFixed, Home, Building2, MapPin } from 'lucide-react';

export default function AddAddressPage() {
  const router = useRouter();

  const [addressType, setAddressType] = useState<'Home' | 'Office' | 'Other'>('Home');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [houseNo, setHouseNo] = useState('');
  const [street, setStreet] = useState('');
  const [landmark, setLandmark] = useState('');
  const [district, setDistrict] = useState('');

  const handleSubmit = () => {
    const address = {
      addressType,
      name,
      phone,
      pin,
      houseNo,
      street,
      landmark,
      district,
    };

    console.log('Saving address:', address);

    // redirect to address page
    router.push('/addresses');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 px-4">
      {/* Header */}
      <div className="flex items-center pt-6 mb-4">
        <button onClick={() => router.back()} className="mr-3">
          <ArrowLeft className="w-6 h-6 text-gray-800" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">Add New Address</h1>
      </div>

      {/* Map */}
      <div className="relative rounded-xl overflow-hidden mb-4 h-48 bg-gray-200">
        <iframe
          className="w-full h-full"
          loading="lazy"
          src="https://maps.google.com/maps?q=Nagondanahalli&t=&z=15&ie=UTF8&iwloc=&output=embed"
        ></iframe>
        <button className="absolute top-2 right-2 bg-white border rounded-full p-2 shadow">
          <LocateFixed className="w-4 h-4 text-gray-800" />
        </button>
      </div>

      {/* Address Type */}
      <div className="mb-4">
        <label className="font-medium text-sm mb-1 block text-gray-700">Address Type</label>
        <div className="flex space-x-3">
          {[
            { type: 'Home', icon: <Home className="w-4 h-4" /> },
            { type: 'Office', icon: <Building2 className="w-4 h-4" /> },
            { type: 'Other', icon: <MapPin className="w-4 h-4" /> },
          ].map(({ type, icon }) => (
            <button
              key={type}
              onClick={() => setAddressType(type as any)}
              className={`flex items-center space-x-1 px-4 py-2 rounded-full text-sm font-medium ${
                addressType === type ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {icon}
              <span>{type}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Form Inputs */}
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Your Name</label>
          <input
            type="text"
            placeholder="Enter your full name.."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-4 py-2 rounded-lg mt-1"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Phone number</label>
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border px-4 py-2 rounded-lg mt-1"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Pin Code</label>
          <input
            type="text"
            placeholder="Pin Code"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full border px-4 py-2 rounded-lg mt-1"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">House No</label>
          <input
            type="text"
            placeholder="Enter your house no"
            value={houseNo}
            onChange={(e) => setHouseNo(e.target.value)}
            className="w-full border px-4 py-2 rounded-lg mt-1"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Street / Location</label>
          <input
            type="text"
            placeholder="e.g., Ramdev Medical, Nagondanahalli"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            className="w-full border px-4 py-2 rounded-lg mt-1"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Landmark (optional)</label>
          <input
            type="text"
            placeholder="e.g., near Apollo Pharmacy"
            value={landmark}
            onChange={(e) => setLandmark(e.target.value)}
            className="w-full border px-4 py-2 rounded-lg mt-1"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">District</label>
          <input
            type="text"
            placeholder="e.g., Bengaluru"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="w-full border px-4 py-2 rounded-lg mt-1"
          />
        </div>
      </div>

      {/* Save & Proceed */}
      <button
        onClick={handleSubmit}
        className="w-full bg-green-600 text-white py-4 rounded-full mt-6 font-semibold text-base shadow-lg"
      >
        Save & Proceed
      </button>
    </div>
  );
}
