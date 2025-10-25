'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Home, Building2 } from 'lucide-react';

export default function AddressesPage() {
  const router = useRouter();

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'office',
      icon: <Building2 className="text-green-700 w-5 h-5" />,
      name: 'ashiq',
      location: 'channasandra',
      pin: '560067',
      phone: '8139826619',
    },
    {
      id: 2,
      type: 'home',
      icon: <Home className="text-gray-700 w-5 h-5" />,
      name: 'My Azli Fresh',
      location:
        'XQC9+VF3, near Ramdev Medical and pharma, Nagondanahalli, Bengaluru, Karnataka 560066, India',
      pin: '560066',
      phone: '8139826619',
    },
  ]);

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this address?');
    if (confirmDelete) {
      setAddresses(prev => prev.filter(addr => addr.id !== id));
    }
  };

  const handleEdit = (id: number) => {
    router.push(`/edit-address/${id}`); // Assuming this route exists
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 pt-6 pb-24">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button onClick={() => router.back()} className="mr-3">
          <ArrowLeft className="w-6 h-6 text-gray-800" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">Addresses</h1>
      </div>

      {/* Saved Addresses */}
      <div>
        <h2 className="text-base font-semibold text-gray-800 mb-4">Saved Addresses</h2>

        {addresses.length === 0 ? (
          <p className="text-gray-500 text-sm text-center">No saved addresses</p>
        ) : (
          addresses.map((addr) => (
            <div
              key={addr.id}
              className="bg-white rounded-xl border p-4 mb-4 shadow-sm"
            >
              <div className="flex items-center space-x-2 mb-2">
                {addr.icon}
                <span className="font-semibold capitalize text-md">{addr.type}</span>
              </div>
              <div className="text-gray-700 text-sm leading-snug whitespace-pre-line">
                {addr.name}
                {'\n'}
                {addr.location}
                {'\n'}
                pin : {addr.pin}
                {'\n'}
                <strong>Phone : </strong> {addr.phone}
              </div>
              <div className="flex items-center space-x-6 mt-3">
                <button
                  onClick={() => handleEdit(addr.id)}
                  className="text-green-600 font-semibold text-sm"
                >
                  EDIT
                </button>
                <button
                  onClick={() => handleDelete(addr.id)}
                  className="text-red-600 font-semibold text-sm"
                >
                  DELETE
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add New Address */}
      <button
        onClick={() => router.push('/add-address')}
        className="fixed bottom-6 left-4 right-4 bg-green-600 text-white py-4 rounded-full text-center font-semibold text-base shadow-lg"
      >
        Add New Address
      </button>
    </div>
  );
}
