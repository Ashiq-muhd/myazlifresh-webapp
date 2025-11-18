'use client';

import React from 'react';
import HeroBanner from '../components/Home/HeroBanner';
import CategoryGrid from '../components/Home/CategoryGrid';
import SpecialOffers from '../components/Home/SpecialOffers';
import ReadyInMinutes from '../components/Home/ReadyInMinutes';
import TextSlider from '../components/Home/TextSlider';
import RegionalSpecials from '../components/Home/RegionalSpecials';
import ReferralBanner from '../components/Home/ReferralBanner';
import FeaturedFeed from '../components/Home/FeaturedFeed';
import CheckoutBar from '@/components/Layout/CheckoutBar';
import { Search } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const { state, dispatch } = useApp();
  const router = useRouter();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch({ type: 'SET_SEARCH_QUERY', payload: value });
    const trimmed = value.trim();
    if (trimmed && window.location.pathname !== '/products') {
      router.push('/products');
    }
  };

  const handleSearchFocus = () => {
    if (window.location.pathname !== '/products') {
      router.push('/products');
    }
  };

  return (
    <div className="pb-24 space-y-6">
      {/* Global Search Bar now at top of Home */}
      <div className="px-4 pt-4">
        {/* Mobile & Desktop unified styling */}
        <div className={`relative ${state.theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} rounded-full w-full`}>
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

      <HeroBanner />
      <CategoryGrid />
      <SpecialOffers />

      {/* Mobile-only sections */}
      <div className="md:hidden">
        <ReadyInMinutes />
      </div>
      <div className="md:hidden">
        <TextSlider />
      </div>

      {/* ✅ Updated RegionalSpecials (Explore Our Special Picks) */}
      <div className="md:hidden">
        <RegionalSpecials />
      </div>

      <div className="md:hidden">
        <ReferralBanner />
      </div>
      <div className="md:hidden">
        <FeaturedFeed />
      </div>

      <CheckoutBar />
    </div>
  );
}
