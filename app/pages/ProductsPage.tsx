'use client';

import React, { useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import ProductCard from '@/components/Product/ProductCard';
import { 
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
} from '@/store/apiSlice';

export default function ProductsPage() {
  const { state, dispatch } = useApp();
  const searchParams = useSearchParams();
  // Accept both ?catId= and ?category=
  const categoryFromUrl = searchParams.get('catId') || searchParams.get('category');
  const effectiveCategory = categoryFromUrl || state.selectedCategory || '';

  // Sync context, but do not block rendering
  useEffect(() => {
    if (categoryFromUrl && categoryFromUrl !== state.selectedCategory) {
      dispatch({ type: 'SET_CATEGORY', payload: categoryFromUrl });
    }
  }, [categoryFromUrl, state.selectedCategory, dispatch]);

  const { data: categoriesData = [], isLoading: isLoadingCats } = useGetCategoriesQuery();

  const slugify = (val?: string) => (val || '')
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-');

  // Resolve category to numeric ID using API data only (avoids wrong hardcoded ids)
  const apiCategoryId = useMemo(() => {
    if (!effectiveCategory) return undefined;
    const sel = String(effectiveCategory);
    if (/^\d+$/.test(sel)) return Number(sel);
    const match = (categoriesData as any[])?.find((c) => {
      const cid = c?.id?.toString?.();
      const name = c?.name || c?.title;
      return cid === sel || slugify(name) === slugify(sel);
    });
    return match?.id ? Number(match.id) : undefined;
  }, [effectiveCategory, categoriesData]);

  // If we have a non-numeric category but categories not loaded yet, keep showing loader until we can resolve ID
  const shouldSkip = !effectiveCategory || (isLoadingCats && !/^\d+$/.test(String(effectiveCategory)) && !apiCategoryId);

  const { data: productsData = [], isLoading, isError } = useGetProductsByCategoryQuery(
    { categoryId: Number(apiCategoryId), page: 1, limit: 48 },
    { skip: shouldSkip || apiCategoryId === undefined }
  );

  const products = useMemo(() => {
    if (!Array.isArray(productsData)) return [];
    return productsData.map((item: any) => ({
      id: item.id?.toString() || item._id?.toString() || Math.random().toString(),
      name: item.name || item.title || 'Product',
      image: item.imgs?.[0]?.img || item.image || '/placeholder.jpg',
      price: item.off_price || item.price || 0,
      originalPrice: item.price || item.mrp || item.originalPrice,
      weight: item.weight || '1kg',
      category: item.category || 'fish',
      categoryId: item.categoryId?.toString() || item.category_id?.toString() || item.category,
      description: item.description || '',
      inStock: item.stock_status !== false && item.inStock !== false,
      discount: item.discount || (item.price && item.off_price ? Math.round(((item.price - item.off_price) / item.price) * 100) : 0),
    }));
  }, [productsData]);

  return (
    <div className="pb-20 md:pb-0">
      <div className="px-4 py-6">
        <h1 className={`text-2xl font-bold ${state.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Fresh Products
        </h1>
      </div>
      <div className="px-4">
        {(!effectiveCategory || shouldSkip) ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : isError ? (
          <div className="p-6 text-center text-red-500">Failed to load products</div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 justify-items-center">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className={`text-xl font-semibold mb-2 ${state.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>No products found</h3>
            <p className={`${state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Try another category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
