"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Home, Building2 } from "lucide-react";
import { useGetAddressListQuery } from "@/store/apiSlice";
import { skipToken } from "@reduxjs/toolkit/query";

export default function AddressesPage() {
  const router = useRouter();

  // ----------------------------------------
  // TOKEN LOADER (Client-side only)
  // ----------------------------------------
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const t =
      localStorage.getItem("authToken") ||
      localStorage.getItem("userToken") ||
      null;
    setToken(t);
  }, []);

  // ----------------------------------------
  // FETCH SAVED ADDRESSES
  // ----------------------------------------
  const addressResult = useGetAddressListQuery(
    token ? { userToken: token } : skipToken
  );

  const addresses: any[] = addressResult?.data ?? [];
  const isLoading = addressResult?.isLoading;
  const isError = addressResult?.isError;

  // ----------------------------------------
  // UI HELPERS
  // ----------------------------------------
  const renderIcon = (type?: string) =>
    (type || "").toLowerCase() === "office" ? (
      <Building2 className="text-green-700 w-6 h-6" />
    ) : (
      <Home className="text-green-700 w-6 h-6" />
    );

  const handleEdit = (id: number) => {
    router.push(`/edit-address/${id}`);
  };

  const handleDelete = (id: number) => {
    // TODO - implement delete endpoint
    alert("Delete feature not implemented yet");
  };

  // ----------------------------------------
  // UI
  // ----------------------------------------
  return (
    <div className="min-h-screen bg-white px-5 pt-6 pb-24">
      {/* HEADER */}
      <div className="flex items-center mb-6">
        <button onClick={() => router.back()} className="mr-3">
          <ArrowLeft className="w-6 h-6 text-gray-800" />
        </button>
        <h1 className="text-xl font-semibold text-gray-900">Addresses</h1>
      </div>

      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Saved Addresses
      </h2>

      {/* Loader States */}
      {!token ? (
        <p className="text-gray-500 text-sm text-center">
          Loading session...
        </p>
      ) : isLoading ? (
        <p className="text-gray-500 text-sm text-center">Loading...</p>
      ) : isError ? (
        <p className="text-red-500 text-sm text-center">
          Failed to load addresses.
        </p>
      ) : addresses.length === 0 ? (
        <p className="text-gray-500 text-sm text-center">
          No saved addresses
        </p>
      ) : (
        addresses.map((addr) => (
          <div
            key={addr.id}
            className="bg-white border rounded-xl p-5 mb-5 shadow-sm"
          >
            {/* Address Label */}
            <div className="flex items-center gap-3 mb-3">
              {renderIcon(addr.address_type)}
              <span className="text-lg font-semibold capitalize">
                {addr.address_type}
              </span>
            </div>

            {/* Full Address */}
            <div className="text-gray-700 text-sm leading-relaxed mb-3">
              <p>{addr.full_name}</p>
              <p>{addr.street}</p>
              <p>
                {addr.district}, {addr.state} - {addr.pin_code}
              </p>
              <p className="mt-2 font-medium">
                Phone: <span className="font-semibold">{addr.ph_number}</span>
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-8 mt-3">
              <button
                onClick={() => handleEdit(addr.id)}
                className="text-green-600 font-semibold text-sm"
              >
                EDIT
              </button>

              <button
                onClick={() => handleDelete(addr.id)}
                className="text-red-500 font-semibold text-sm"
              >
                DELETE
              </button>
            </div>
          </div>
        ))
      )}

      {/* Add Button */}
      <button
        onClick={() => router.push("/add-address")}
        className="fixed bottom-6 left-4 right-4 bg-green-600 text-white py-4 rounded-full text-center font-semibold text-lg shadow-lg"
      >
        Add New Address
      </button>
    </div>
  );
}
