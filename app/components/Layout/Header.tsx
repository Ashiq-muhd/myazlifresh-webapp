'use client'

import React from 'react';
import { Search, ShoppingCart, MapPin, Zap, User, Home } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { state, dispatch } = useApp();
  const router = useRouter();

  const cartItemsCount = state.cart.reduce((total, item) => total + item.quantity, 0);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value });
    // Navigate to products page when user starts searching
    if (e.target.value.trim() && window.location.pathname !== '/products') {
      router.push('/products');
    }
  };

  const handleSearchFocus = () => {
    // Navigate to products page when search is focused
    if (window.location.pathname !== '/products') {
      router.push('/products');
    }
  };

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
              <span className={`text-xs ${state.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                {' '}• Bengaluru, Bengaluru Urban
              </span>
            </div>
            <Zap className="w-3 h-3 text-yellow-500" />
          </div>

          {/* Search Bar - Mobile (Full Width) */}
          <div className="w-full">
            <div className={`relative ${state.theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} rounded-full`}>
              <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${state.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
              <input
                type="text"
                placeholder="Search for fish, meat, seafood..."
                value={state.searchQuery}
                onChange={handleSearchChange}
                onFocus={handleSearchFocus}
                className={`w-full pl-12 pr-4 py-3 text-base ${state.theme === 'dark' ? 'bg-gray-800 text-white placeholder-gray-400' : 'bg-gray-100 text-gray-900 placeholder-gray-500'} rounded-full focus:outline-none focus:ring-2 focus:ring-green-500`}
              />
            </div>
          </div>
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
              <span className={`text-xs ${state.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Bengaluru, Bengaluru Urban
              </span>
            </div>
            <Zap className="w-3 h-3 text-yellow-500" />
          </div>

          {/* Center Section - Search Bar */}
          <div className="flex-1 max-w-md mx-4">
            <div className={`relative ${state.theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} rounded-full`}>
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${state.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
              <input
                type="text"
                placeholder="Search for fish, meat, seafood..."
                value={state.searchQuery}
                onChange={handleSearchChange}
                onFocus={handleSearchFocus}
                className={`w-full pl-10 pr-3 py-2 text-sm ${state.theme === 'dark' ? 'bg-gray-800 text-white placeholder-gray-400' : 'bg-gray-100 text-gray-900 placeholder-gray-500'} rounded-full focus:outline-none focus:ring-2 focus:ring-green-500`}
              />
            </div>
          </div>

          {/* Right Section - Actions (Desktop Only) */}
          <div className="flex items-center space-x-2 flex-shrink-0">
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