'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useGetOrdersQuery } from '../store/apiSlice';

export default function OrdersPage() {
  const { state } = useApp();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'ongoing' | 'completed'>('ongoing');
  const [userToken, setUserToken] = useState<string | null>(null);

  // Get token (adjust key if different)
  useEffect(() => {
    try {
      const t = typeof window !== 'undefined' ? localStorage.getItem('userToken') : null;
      if (t) setUserToken(t);
    } catch {}
  }, []);

  const { data: ordersRaw = [], isLoading, isError } = useGetOrdersQuery(
    { userToken: userToken || '' },
    { skip: !userToken }
  );

  // Map backend orders to UI-friendly shape
  const mappedOrders = ordersRaw.map((o: any) => {
    const products = Array.isArray(o?.order_product_data) ? o.order_product_data : [];
    const firstProduct = products[0] || {};
    const payment = o?.order_payment_details_data || {};
    const status = o?.status || (
      o?.canceled_date
        ? 'Cancelled'
        : o?.delivered_date
        ? 'Delivered'
        : o?.shipped_date
        ? 'Shipped'
        : o?.packed_date
        ? 'Packed'
        : 'Pending'
    );
    return {
      id: o?.id || o?._id || o?.order_id || 'unknown',
      image: firstProduct?.img || firstProduct?.image || '/delivery.jpg',
      status,
      date: o?.createdAt || o?.ordered_date || o?.order_date || '',
      amount: payment?.total_amount != null ? `₹${payment.total_amount}` : (o?.price_int ? `₹${o.price_int}` : '₹0'),
      isCompleted: status.toLowerCase() === 'delivered' || !!o?.delivered_date,
      isCancelled: status.toLowerCase() === 'cancelled' || !!o?.canceled_date,
    };
  });

  const ongoingOrders = mappedOrders.filter(o => !o.isCompleted && !o.isCancelled);
  const completedOrders = mappedOrders.filter(o => o.isCompleted || o.isCancelled);

  const listToShow = activeTab === 'completed' ? completedOrders : ongoingOrders;

  return (
    <div className={`min-h-screen ${state.theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} pb-20`}>
      {/* Header */}
      <div className={`${state.theme === 'dark' ? 'bg-gray-800' : 'bg-white'} px-4 py-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button onClick={() => router.back()}>
              <ArrowLeft className={`w-6 h-6 ${state.theme === 'dark' ? 'text-white' : 'text-gray-900'}`} />
            </button>
            <h1 className={`text-lg font-semibold ${state.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>My Orders</h1>
          </div>
          <div className="text-right">
            <div className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">Express Delivery ⚡</div>
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

        {/* Content */}
        {isLoading || !userToken ? (
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-gray-200 dark:bg-gray-700 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
                    <div className="h-3 w-48 bg-gray-200 dark:bg-gray-700 rounded" />
                  </div>
                  <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-6">⚠️</div>
            <h3 className={`text-xl font-semibold mb-2 ${state.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Failed to load orders</h3>
            <p className={`${state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Please try again later.</p>
          </div>
        ) : listToShow.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-8xl mb-6">🐟</div>
            <h3 className={`text-xl font-semibold mb-2 ${state.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>No Orders Yet</h3>
            <p className={`${state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {activeTab === 'ongoing'
                ? 'Your ongoing orders will appear here.'
                : 'No completed or cancelled orders yet.'}
              <br />Start shopping fresh!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {listToShow.map(order => (
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
                      <span
                        className={`font-semibold ${
                          order.isCancelled
                            ? 'text-red-600'
                            : order.isCompleted
                            ? 'text-green-600'
                            : 'text-yellow-600'
                        }`}
                      >
                        {order.status}
                      </span>
                      {(order.isCompleted || order.isCancelled) && (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Order Placed at {order.date}</p>
                  </div>
                </div>
                <div className="text-right font-semibold text-green-600">
                  {order.amount} <span className="text-xl">›</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
