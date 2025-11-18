'use client'

import React from 'react';
import { ShoppingCart, MapPin, Zap, User, Home } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { state } = useApp();
  const router = useRouter();

  const cartItemsCount = state.cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className={`sticky top-0 z-50 ${state.theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white'} shadow-sm`}>
      {/* Mobile Header */}
      <div className="md:hidden px-4 py-3">
        <div className="space-y-3">
          {/* Location Info - Mobile */}
          <div className="flex items-center justify-center space-x-2 text-sm">
            <MapPin className="w-4 h-4 text-green-600" />
            <div className="text-center">
              <span className="text-green-600 font-medium text-sm">Get Faster Delivery</span>
              <span className={`${state.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} text-xs`}>
                {' '}• Bengaluru, Bengaluru Urban
              </span>
            </div>
            <Zap className="w-3 h-3 text-yellow-500" />
          </div>
          {/* Search bar removed from Header (now on HomePage) */}
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:block px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between space-x-4">
          {/* Left Section - Location Info */}
          <div className="flex items-center space-x-2 text-sm min-w-0 flex-shrink-0">
            <MapPin className="w-4 h-4 text-green-600" />
            <div className="flex flex-col">
              <span className="text-green-600 font-medium text-xs">Get Faster Delivery</span>
              <span className={`${state.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} text-xs`}>
                Bengaluru, Bengaluru Urban
              </span>
            </div>
            <Zap className="w-3 h-3 text-yellow-500" />
          </div>

          {/* Center Section removed */}

          {/* Right Section - Actions (Desktop Only) */}
          <div className="flex items-center space-x-2 flex-shrink-0 ml-auto">
            <Link
              href="/"
              className={`p-2 rounded-full ${state.theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} transition-colors`}
            >
              <Home className="w-4 h-4" />
            </Link>
            <Link
              href="/cart"
              className={`relative p-2 ${state.theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-full transition-colors`}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            <Link
              href="/account"
              className={`p-2 ${state.theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-full transition-colors`}
            >
              <User className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}