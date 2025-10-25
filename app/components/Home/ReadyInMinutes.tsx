'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ProductCard from '@/components/Product/ProductCard';
import { useGetReadyToEatQuery } from '@/store/apiSlice';
import { products as staticProducts } from '@/data/products'; // Import static fallback data

export default function ReadyInMinutes() {
  const router = useRouter();
  const { data: readyToEatData = [], isLoading, isError } = useGetReadyToEatQuery();

  if (isLoading) {
    return (
      <div className="px-4">
        <p className="text-gray-500">Loading ready-to-eat products...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="px-4">
        <p className="text-red-500">Failed to load ready-to-eat products.</p>
      </div>
    );
  }

  // Transform API data to match ProductCard expected structure
  const readyMeals = Array.isArray(readyToEatData) && readyToEatData.length > 0
    ? readyToEatData.slice(0, 6).map(item => ({
        id: item.id?.toString() || item._id?.toString(),
        name: item.name || item.title || 'Product',
        image: item.imgs?.[0]?.img || item.image || '/placeholder.jpg',
        price: item.price || 0,
        originalPrice: item.originalPrice || item.mrp,
        weight: item.weight || '1kg',
        category: item.category || 'ready',
        description: item.description || '',
        inStock: item.inStock !== false,
        discount: item.discount || item.discountPercentage || 0,
      }))
    : // Fallback to static products - get products with specific IDs for instant items
      staticProducts.filter(p => p.id.includes('gravy') || p.name.toLowerCase().includes('instant')).slice(0, 6);

  return (
    <div className="px-4">
      {/* Header with GIF, Heading, and Subtext aligned properly */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-start gap-2">
          <Image
            src="/frying-pan.gif"
            alt="Pan Icon"
            width={28}
            height={28}
            className="w-7 h-7 mt-1"
          />
          <div>
            <h2 className="text-green-700 font-bold text-base">
              Ready in Minutes!
            </h2>
            <p className="text-sm text-gray-500 -mt-1">
              Simplify Your Meals
            </p>
          </div>
        </div>

        <button 
          onClick={() => router.push('/products?category=ready')}
          className="text-green-600 font-semibold text-sm border border-green-600 px-3 py-1 rounded-md"
        >
          See All
        </button>
      </div>

      {/* Horizontal scroll section */}
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide no-scrollbar">
        {/* Banner Image */}
        <div className="min-w-[140px] h-[120px] rounded-xl overflow-hidden border shadow-sm">
          <Image
            src="/ready to cook image.png"
            alt="Ready to Cook Banner"
            width={140}
            height={120}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Products */}
        {readyMeals.map((item) => (
  <div key={item.id} className="min-w-[160px] max-w-[180px]">
    <ProductCard product={item} hideLabel />
  </div>
))}
      </div>
    </div>
  );
}
