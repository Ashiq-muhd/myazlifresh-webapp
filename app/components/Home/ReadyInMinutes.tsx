'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ProductCard from '@/components/Product/ProductCard';
import * as apiHooks from '@/store/apiSlice';
import { products as staticProducts } from '@/data/products'; // Import static fallback data

export default function ReadyInMinutes() {
  const router = useRouter();
  const { data: readyToEatData = [], isLoading, isError } = apiHooks.useGetReadyToEatQuery();
  // Load categories to resolve the exact "Instant Gravy & Masala" category id
  const { data: categoriesData = [] } = apiHooks.useGetCategoriesQuery();

  // Resolve the category id for "Instant Gravy & Masala" (matches name/slug loosely)
  const instantCatId = React.useMemo(() => {
    const dataArr = Array.isArray(categoriesData) ? categoriesData : [];
    const normalize = (s?: string) => (s || '').toLowerCase().trim();
    const targets = [
      'instant gravy & masala',
      'instant gravy and masala',
      'instant gravy',
      'gravy & masala',
      'instant',
    ];

    const isMatch = (item: any) => {
      const name = normalize(item?.name);
      const slug = normalize(item?.slug);
      return targets.some(t => name.includes(t) || (slug && slug.includes(t)));
    };

    for (const cat of dataArr) {
      if (isMatch(cat)) return cat.id;
      const subs = cat?.sub_categories || cat?.subCategories || cat?.sub_cat || [];
      if (Array.isArray(subs)) {
        const found = subs.find(isMatch);
        if (found) return found.id;
      }
    }
    return undefined;
  }, [categoriesData]);

  // Transform API data to match ProductCard expected structure
  const readyMeals = React.useMemo(() => {
    if (Array.isArray(readyToEatData) && readyToEatData.length > 0) {
      // Extract products from the API response structure
      const products = readyToEatData[0]?.ready_to_eat_products || [];
      
      return products.slice(0, 6).map(item => {
        const productData = item.ready_to_eat_product_data;
        return {
          id: productData.id?.toString() || item.id?.toString(),
          name: productData.name || 'Ready to Eat Product',
          image: productData.imgs?.[0]?.img || '/placeholder.jpg',
          price: productData.off_price || productData.price || 0,
          originalPrice: productData.price || productData.off_price || 0,
          weight: productData.weight || '1kg',
          category: 'ready-to-eat',
          description: `Ready to eat ${productData.name}`,
          inStock: productData.stock_status !== false,
          discount: productData.price && productData.off_price ? 
            Math.round(((productData.price - productData.off_price) / productData.price) * 100) : 0,
          stock: productData.stock || 0,
        };
      });
    }
    
    // Fallback to static products - get products with specific IDs for instant items
    return staticProducts.filter(p => p.id.includes('gravy') || p.name.toLowerCase().includes('instant')).slice(0, 6);
  }, [readyToEatData]);

  // Handle loading state
  if (isLoading) {
    return (
      <div className="px-4">
        <p className="text-gray-500">Loading ready-to-eat products...</p>
      </div>
    );
  }

  // Handle error state
  if (isError) {
    return (
      <div className="px-4">
        <p className="text-red-500">Failed to load ready-to-eat products.</p>
      </div>
    );
  }

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
          onClick={() => router.push(`/products?category=${encodeURIComponent(instantCatId ?? 'instant')}`)}
          className="text-green-600 font-semibold text-sm border border-green-600 px-3 py-1 rounded-md"
        >
          See All
        </button>
      </div>

      {/* Horizontal scroll section */}
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide no-scrollbar">
        {/* Banner Image */}
        <div className="min-w-[140px] h-[250px] rounded-xl overflow-hidden border shadow-sm">
          <Image
            src="/ready to cook image.png"
            alt="Ready to Cook Banner"
            width={140}
            height={250}
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
