'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  User, 
  ShoppingBag, 
  Bell, 
  Wallet, 
  DollarSign, 
  MapPin, 
  Users, 
  Info, 
  Star,
  Edit,
  ArrowLeft
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import Link from 'next/link';
import { useGetWalletTransactionsQuery } from '../store/apiSlice';
import { WalletTransaction } from '../types';


export default function AccountPage() {
  const { state, dispatch } = useApp();
  const router = useRouter();
  const { data: walletData, isLoading: walletLoading } = useGetWalletTransactionsQuery();

  // Calculate total balance from transactions
  const calculateBalance = (transactions: WalletTransaction[]) => {
    return transactions.reduce((total, transaction) => {
      return transaction.type === 'credit' 
        ? total + transaction.amount 
        : total - transaction.amount;
    }, 0);
  };

  const walletBalance = walletData?.transactions ? calculateBalance(walletData.transactions) : 0;

  const accountOptions = [
    {
      icon: ShoppingBag,
      title: 'My Orders',
      color: 'bg-green-100 text-green-600',
      bgColor: 'bg-green-50',
      path: '/orders'
    },
    {
      icon: Bell,
      title: 'Notifications',
      color: 'bg-blue-100 text-blue-600',
      bgColor: 'bg-blue-50',
      path: '/notifications'
    },
    {
      icon: Wallet,
      title: 'Wallet',
      color: 'bg-yellow-100 text-yellow-600',
      bgColor: 'bg-yellow-50',
      path: '/wallet'
    },
    {
      icon: DollarSign,
      title: 'Refund',
      color: 'bg-green-100 text-green-600',
      bgColor: 'bg-green-50',
      path: '/refund'
    },
    /*{
      icon: MapPin,
      title: 'Addresses',
      color: 'bg-orange-100 text-orange-600',
      bgColor: 'bg-orange-50',
      path: '/addresses'
    },*/
    {
  icon: MapPin,
  title: 'Addresses',
  color: 'bg-orange-100 text-orange-600',
  bgColor: 'bg-orange-50',
  path: '/addresses' // ✅ this should match
},
    {
      icon: Users,
      title: 'Refer & Earn',
      color: 'bg-cyan-100 text-cyan-600',
      bgColor: 'bg-cyan-50',
      path: '/refer'
    }
  ];

  return (
    <div className={`min-h-screen ${state.theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} pb-20 md:pb-0`}>
      {/* Header */}
      <div className={`${state.theme === 'dark' ? 'bg-gray-800' : 'bg-white'} px-4 py-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button onClick={() => router.back()} className="md:hidden">
              <ArrowLeft className={`w-6 h-6 ${state.theme === 'dark' ? 'text-white' : 'text-gray-900'}`} />
            </button>
        
            <h1 className={`text-lg font-semibold ${state.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              My Account
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
        {/* User Profile */}
        <div className={`${state.theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 mb-6 shadow-sm`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h2 className={`text-xl font-bold ${state.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  My Azli order
                </h2>
                <p className={`${state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  8139826619
                </p>
              </div>
            </div>
            {/* <button className={`p-2 ${state.theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-full transition-colors`}>
              <Edit className={`w-5 h-5 ${state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
            </button> */}
            <button
  onClick={() => router.push('/edit-profile')}
  className={`p-2 ${state.theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-full transition-colors`}
>
  <Edit className={`w-5 h-5 ${state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
</button>

          </div>
        </div>

        {/* Wallet Balance Preview */}
        <div className={`${state.theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 mb-6 shadow-sm`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Wallet className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className={`text-lg font-bold ${state.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Wallet Balance
                </h3>
                {walletLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className={`text-sm ${state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Loading...</p>
                  </div>
                ) : (
                  <p className="text-2xl font-bold text-green-600">₹ {walletBalance.toFixed(1)}</p>
                )}
              </div>
            </div>
            <button 
              onClick={() => router.push('/wallet')}
              className={`px-4 py-2 ${state.theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-green-100 hover:bg-green-200 text-green-600'} rounded-lg transition-colors`}
            >
              View Details
            </button>
          </div>
          {walletData?.transactions && walletData.transactions.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className={`text-sm ${state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
                Recent Activity
              </p>
              <div className="space-y-2">
                {walletData.transactions.slice(0, 2).map((transaction: WalletTransaction) => (
                  <div key={transaction.id} className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        transaction.type === 'credit' ? 'bg-green-500' : 'bg-red-500'
                      }`}></div>
                      <span className={`text-sm ${state.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        {transaction.tittle}
                      </span>
                    </div>
                    <span className={`text-sm font-medium ${
                      transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Account Dashboard */}
        <div className="mb-6">
          <h3 className={`text-lg font-bold mb-4 ${state.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Account Dashboard
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            {accountOptions.map((option) => (
              <button
                key={option.title}
                onClick={() => router.push(option.path)}
                className={`${option.bgColor} ${state.theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'hover:bg-gray-50'} rounded-2xl p-6 text-left transition-all duration-200 hover:scale-105 hover:shadow-lg`}
              >
                <div className={`w-12 h-12 ${option.color} ${state.theme === 'dark' ? 'bg-gray-700' : ''} rounded-xl flex items-center justify-center mb-3`}>
                  <option.icon className={`w-6 h-6 ${state.theme === 'dark' ? 'text-gray-300' : ''}`} />
                </div>
                <h4 className={`font-semibold ${state.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {option.title}
                </h4>
              </button>
            ))}
          </div>
        </div>

        {/* Feedback & Information */}
        <div className="mb-6">
          <h3 className={`text-lg font-bold mb-4 ${state.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Feedback & Informations
          </h3>
          
          <div className="space-y-3">
            <button className={`w-full flex items-center justify-between p-4 ${state.theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} rounded-lg transition-colors`}>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Info className="w-4 h-4 text-green-600" />
                </div>
                <span className={`font-medium ${state.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  About My Azli Fresh
                </span>
              </div>
              <span className={`text-2xl ${state.theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`}>›</span>
            </button>

            <button className={`w-full flex items-center justify-between p-4 ${state.theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} rounded-lg transition-colors`}>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Star className="w-4 h-4 text-yellow-600" />
                </div>
                <span className={`font-medium ${state.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Rate Us
                </span>
              </div>
              <span className={`text-2xl ${state.theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`}>›</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}