'use client'

import React from 'react';
import { Home, Grid3X3, ShoppingBag, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '../../context/AppContext';

export default function BottomNavigation() {
  const pathname = usePathname();
  const { state } = useApp();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Grid3X3, label: 'Categories', path: '/categories' },
    { icon: ShoppingBag, label: 'Orders', path: '/orders' },
    { icon: User, label: 'Account', path: '/account' },
  ];

  return (
    <nav className={`fixed bottom-0 left-0 right-0 ${state.theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border-t md:hidden`}>
      <div className="flex items-center justify-around py-2">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = pathname === path;
          return (
            <Link
              key={path}
              href={path}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                isActive
                  ? 'text-green-600'
                  : state.theme === 'dark'
                  ? 'text-gray-400 hover:text-gray-200'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs mt-1">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}