'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, Home, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function OrderConfirmationPage() {
  const router = useRouter();
  const { state } = useApp();
  const orderId = 'ORD' + Date.now();

  return (
    <div className={`min-h-screen ${state.theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center p-4`}>
      <div className={`${state.theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-8 max-w-md w-full text-center shadow-lg`}>
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>

        <h1 className={`text-2xl font-bold mb-2 ${state.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Order Confirmed!
        </h1>
        
        <p className={`mb-6 ${state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          Your order #{orderId} has been placed successfully.
        </p>

        <div className={`${state.theme === 'dark' ? 'bg-gray-700' : 'bg-green-50'} rounded-lg p-4 mb-6`}>
          <div className="flex items-center justify-center space-x-2 text-green-600 mb-2">
            <span className="text-2xl">⚡</span>
            <span className="font-semibold">Express Delivery</span>
          </div>
          <p className={`text-sm ${state.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            Your fresh products will be delivered in 20 minutes!
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => router.push('/orders')}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>Track Order</span>
          </button>
          
          <button
            onClick={() => router.push('/')}
            className={`w-full ${state.theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'} py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2`}
          >
            <Home className="w-5 h-5" />
            <span>Continue Shopping</span>
          </button>
        </div>
      </div>
    </div>
  );
}