'use client'

import React from 'react';
import { useApp } from '../../context/AppContext';
import { useGetCategoriesQuery } from '../../store/apiSlice';

export default function ProductFilters() {
  const { state, dispatch } = useApp();
  const { data: categories = [], isLoading } = useGetCategoriesQuery();

  const handleCategoryChange = (categoryId: string) => {
    dispatch({ type: 'SET_CATEGORY', payload: categoryId });
  };

  if (isLoading) {
    return (
      <div className="px-4 mb-6">
        <p className="text-gray-500">Loading categories...</p>
      </div>
    );
  }

  // Add "All" option to the categories from API
  const allCategories = [
    { id: 'all', name: 'All' },
    ...categories.map(cat => ({
      id: cat.id?.toString() || cat._id?.toString(),
      name: cat.name || cat.title || 'Category'
    }))
  ];

  return (
    <div className="px-4 mb-6">
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {allCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryChange(category.id)}
            className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-colors ${
              state.selectedCategory === category.id
                ? 'bg-green-600 text-white'
                : state.theme === 'dark'
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}