'use client';

import { categories } from '../../data/categories';
import React, { useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import Link from 'next/link';
import { useGetCategoriesQuery } from '../../store/apiSlice';

export default function CategoryGrid() {
  const { state, dispatch } = useApp();

  // 🔥 Fetch categories from API with fallback to static data
  const { data: categoriesData = [], isLoading, isError } = useGetCategoriesQuery();

  // Debug: log the API response
  console.log('Categories API Response:', categoriesData);

  // Transform and fallback logic
  const displayCategories = useMemo(() => {
    // Use static data as fallback if API returns empty or fails
    const dataSource = (!categoriesData || categoriesData.length === 0) ? categories : categoriesData;
    
    if (!dataSource || !Array.isArray(dataSource)) {
      console.log('Categories data is not an array:', dataSource);
      return categories; // Always fallback to static categories
    }
    
    console.log('Using categories source:', (!categoriesData || categoriesData.length === 0) ? 'static' : 'API', 'Count:', dataSource.length);
    
    // Transform API data to match expected structure
    return dataSource.map(item => ({
      id: item.id?.toString() || item._id?.toString() || item.name?.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      name: item.name || item.title || 'Category',
      image: item.image || item.img || item.imgs?.[0]?.img || '/placeholder.jpg',
    }));
  }, [categoriesData]);

  const handleCategoryClick = (categoryId: string) => {
    dispatch({ type: 'SET_CATEGORY', payload: categoryId });
  };

  return (
    <div className="px-4 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-xl font-bold ${state.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Shop by Categories
        </h2>
        <Link
          href="/categories"
          className={`text-sm font-medium ${
            state.theme === 'dark'
              ? 'text-gray-400 hover:text-gray-200'
              : 'text-gray-500 hover:text-gray-700'
          } transition-colors`}
        >
          See All
        </Link>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="text-center py-8">
          <div className="text-gray-500">Loading categories...</div>
        </div>
      )}

      {/* Categories Grid */}
      {!isLoading && (
        <div className="grid grid-cols-4 gap-4">
          {displayCategories.map((category) => (
            <Link
              key={category.id}
              href="/products"
              onClick={() => handleCategoryClick(category.id)}
              className="flex flex-col items-center text-center transition-all duration-200 hover:scale-105"
            >
              <div className="w-16 h-16 mb-3 rounded-full overflow-hidden shadow-sm">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3
                className={`text-xs font-medium leading-tight ${
                  state.theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
