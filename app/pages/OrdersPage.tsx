'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function OrdersPage() {
  const { state } = useApp();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'ongoing' | 'completed'>('ongoing');

  const orders = [
    {
      id: 1,
      image: 'https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?auto=compress&cs=tinysrgb&w=800',
      status: 'Completed',
      date: 'Thu, Apr 10, 2025 2:27 PM',
      amount: '₹780.00'
    },
    {
      id: 2,
      image: '/images/fish2.jpg',
      status: 'Cancelled',
      date: 'Wed, Mar 26, 2025 8:56 AM',
      amount: '₹1,900.00'
    },
    {
      id: 3,
      image: '/images/fish3.jpg',
      status: 'Completed',
      date: 'Wed, Mar 26, 2025 8:50 AM',
      amount: '₹1,256.00'
    },
    {
      id: 4,
      image: '/images/fish4.jpg',
      status: 'Cancelled',
      date: 'Fri, Jan 31, 2025 6:24 PM',
      amount: '₹567.00'
    },
    {
      id: 5,
      image: '/images/fish1.jpg',
      status: 'Completed',
      date: 'Fri, Nov 15, 2024 7:27 PM',
      amount: '₹425.00'
    },
  ];

  return (
    <div className={`min-h-screen ${state.theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} pb-20`}>
      {/* Header */}
      <div className={`${state.theme === 'dark' ? 'bg-gray-800' : 'bg-white'} px-4 py-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button onClick={() => router.back()}>
              <ArrowLeft className={`w-6 h-6 ${state.theme === 'dark' ? 'text-white' : 'text-gray-900'}`} />
            </button>
            <h1 className={`text-lg font-semibold ${state.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              My Orders
            </h1>
          </div>
          <div className="text-right">
            <div className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
              Express Delivery ⚡
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        {/* Tabs */}
        <div className="flex mb-6">
          {['ongoing', 'completed'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as 'ongoing' | 'completed')}
              className={`flex-1 py-3 px-4 font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-green-600 text-green-600'
                  : state.theme === 'dark'
                  ? 'border-transparent text-gray-400'
                  : 'border-transparent text-gray-500'
              }`}
            >
              {tab === 'ongoing' ? 'Ongoing Orders' : 'Completed Orders'}
            </button>
          ))}
        </div>

        {/* Tab Content */}

        <div onClick={() => router.push(`/order-details/3456`)} className="cursor-pointer hover:shadow-md transition-shadow">
  {}
</div>

        
        {activeTab === 'completed' ? (
          <div className="space-y-4">
            {orders.map(order => (
              <div
  key={order.id}
  onClick={() => router.push(`/order-details/${order.id}`)}
  className={`flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border cursor-pointer hover:shadow-md transition-all ${
    state.theme === 'dark' ? 'bg-gray-800 text-white' : ''
  }`}
>
                <div className="flex items-center space-x-4">
                  <img src={order.image} alt="Product" className="w-14 h-14 rounded-lg object-cover" />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className={`font-semibold ${order.status === 'Cancelled' ? 'text-red-600' : 'text-green-600'}`}>
                        {order.status}
                      </span>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Order Placed at {order.date}
                    </p>
                  </div>
                </div>
                <div className="text-right font-semibold text-green-600">
                  {order.amount} <span className="text-xl">{'›'}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-8xl mb-6">🐟</div>
            <h3 className={`text-xl font-semibold mb-2 ${state.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              No Orders Yet
            </h3>
            <p className={`mb-6 ${state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Once you place an order, it will appear here.<br />
              Get started with your first fresh pick!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
