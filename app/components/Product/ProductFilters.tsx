'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { useGetCategoriesQuery } from '@/store/apiSlice';

type ProductFiltersProps = {
  hideAllOption?: boolean;
  hideScrollbar?: boolean;
};

export default function ProductFilters({ hideAllOption, hideScrollbar }: ProductFiltersProps) {
  const { state, dispatch } = useApp();
  const { data: categories = [] } = useGetCategoriesQuery();

  return (
    <div
      className={`flex gap-3 overflow-x-auto py-3 px-4 scrollbar-hide ${
        hideScrollbar ? 'scrollbar-none' : ''
      }`}
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {!hideAllOption && (
        <button
          onClick={() => dispatch({ type: 'SET_CATEGORY', payload: 'all' })}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            state.selectedCategory === 'all'
              ? 'bg-green-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          All
        </button>
      )}

      {categories.map((cat: any) => (
        <button
          key={cat.id}
          onClick={() => dispatch({ type: 'SET_CATEGORY', payload: cat.id })}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
            state.selectedCategory === String(cat.id)
              ? 'bg-green-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
