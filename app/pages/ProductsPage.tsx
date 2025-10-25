'use client';

import React, { useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import ProductCard from '@/components/Product/ProductCard';
import ProductFilters from '@/components/Product/ProductFilters';
import { 
  useGetProductsQuery, 
  useGetProductsByCategoryQuery 
} from '@/store/apiSlice';
import { products as staticProducts } from '@/data/products';

export default function ProductsPage() {
  const { state, dispatch } = useApp();
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get('category');

  const shouldFetchByCategory = state.selectedCategory && state.selectedCategory !== 'all';

  // 🔥 Fix: pass object instead of raw string
  const { data: allProductsData = [], isLoading: isLoadingAll, isError: isErrorAll } =
    useGetProductsQuery(undefined, { skip: shouldFetchByCategory });

  const { data: categoryProductsData = [], isLoading: isLoadingCategory, isError: isErrorCategory } =
    useGetProductsByCategoryQuery(
      { categoryId: Number(state.selectedCategory), page: 1, limit: 48 }, // ✅ fixed
      { skip: !shouldFetchByCategory }
    );

  const productsData = shouldFetchByCategory ? categoryProductsData : allProductsData;
  const isLoading = shouldFetchByCategory ? isLoadingCategory : isLoadingAll;
  const isError = shouldFetchByCategory ? isErrorCategory : isErrorAll;

  useEffect(() => {
    if (categoryFromUrl && categoryFromUrl !== state.selectedCategory) {
      dispatch({ type: 'SET_CATEGORY', payload: categoryFromUrl });
    }
  }, [categoryFromUrl, state.selectedCategory, dispatch]);

  const products = useMemo(() => {
    const dataSource = (!productsData || productsData.length === 0) ? staticProducts : productsData;

    return Array.isArray(dataSource)
      ? dataSource.map(item => ({
          id: item.id?.toString() || item._id?.toString() || Math.random().toString(),
          name: item.name || item.title || 'Product',
          image: item.imgs?.[0]?.img || item.image || '/placeholder.jpg',
          price: item.price || 0,
          originalPrice: item.originalPrice || item.mrp,
          weight: item.weight || '1kg',
          category: item.category || 'fish',
          categoryId: item.categoryId?.toString() || item.category_id?.toString() || item.category,
          description: item.description || '',
          inStock: item.inStock !== false,
          discount: item.discount || item.discountPercentage || 0,
        }))
      : [];
  }, [productsData]);

  const filteredProducts = useMemo(() => {
    if (!products || products.length === 0) return [];

    let filtered = products;

    if (state.selectedCategory && state.selectedCategory !== 'all') {
      filtered = filtered.filter(product =>
        Array.isArray(product.categoryId)
          ? product.categoryId.includes(state.selectedCategory)
          : product.categoryId === state.selectedCategory || product.category === state.selectedCategory
      );
    }

    if (state.searchQuery) {
      filtered = filtered.filter(
        product =>
          product.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          product.description?.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [products, state.selectedCategory, state.searchQuery]);

  if (isLoading) return <div className="p-6 text-center">Loading products...</div>;
  if (isError) return <div className="p-6 text-center text-red-500">Failed to load products</div>;

  return (
    <div className="pb-20 md:pb-0">
      <div className="px-4 py-6">
        <h1 className={`text-2xl font-bold ${state.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Fresh Products
        </h1>
      </div>

      {!state.searchQuery && <ProductFilters />}

      <div className="px-4">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 justify-items-center">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className={`text-xl font-semibold mb-2 ${state.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              No products found
            </h3>
            <p className={`${state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}



// 'use client';

// import React, { useMemo } from 'react';
// import { Search, Package, AlertCircle } from 'lucide-react';
// import { useApp } from '@/context/AppContext';
// import { useGetProductsQuery } from '@/store/apiSlice';
// import ProductCard from '@/components/Product/ProductCard';
// import ProductFilters from '@/components/Product/ProductFilters';

// export default function ProductsPage() {
//   const { state } = useApp();
//   const { data: products = [], error, isLoading } = useGetProductsQuery();

//   // ✅ Apply filters/search only on loaded products
//   const filteredProducts = useMemo(() => {
//     let filtered = products;

//     if (state.selectedCategory !== 'all') {
//       filtered = filtered.filter(
//         (product) => product.category === state.selectedCategory
//       );
//     }

//     if (state.searchQuery) {
//       filtered = filtered.filter(
//         (product) =>
//           product.name
//             .toLowerCase()
//             .includes(state.searchQuery.toLowerCase()) ||
//           product.description
//             .toLowerCase()
//             .includes(state.searchQuery.toLowerCase())
//       );
//     }

//     return filtered;
//   }, [products, state.selectedCategory, state.searchQuery]);

//   const isSearchActive = state.searchQuery.trim().length > 0;

//   return (
//     <div className="pb-20 md:pb-0">
//       {/* ✅ Loading & Error states */}
//       {isLoading && (
//         <p className="text-center text-gray-500">Loading products...</p>
//       )}
//       {error && (
//         <p className="text-center text-red-500">
//           Failed to load products. Please try again.
//         </p>
//       )}

//       {/* ✅ Header */}
//       {!isSearchActive ? (
//         <div className="px-4 py-6">
//           <h1
//             className={`text-2xl font-bold mb-6 ${
//               state.theme === 'dark' ? 'text-white' : 'text-gray-900'
//             }`}
//           >
//             Fresh Products
//           </h1>
//         </div>
//       ) : (
//         <div className="px-4 py-6 flex items-center space-x-3">
//           <Search
//             className={`w-6 h-6 ${
//               state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
//             }`}
//           />
//           <h1
//             className={`text-2xl font-bold ${
//               state.theme === 'dark' ? 'text-white' : 'text-gray-900'
//             }`}
//           >
//             Search Results
//           </h1>
//         </div>
//       )}

//       {!isSearchActive && <ProductFilters />}

//       {/* ✅ Product Grid */}
//       <div className="px-4">
//         {filteredProducts.length > 0 ? (
//           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 justify-items-center">
//             {filteredProducts.map((product: any) => (
//               <ProductCard key={product.id} product={product} />
//             ))}
//           </div>
//         ) : (
//           !isLoading &&
//           !error && (
//             <div className="text-center py-12">
//               <div className="text-6xl mb-4">🔍</div>
//               <h3
//                 className={`text-xl font-semibold mb-2 ${
//                   state.theme === 'dark' ? 'text-white' : 'text-gray-900'
//                 }`}
//               >
//                 No products found
//               </h3>
//               <p
//                 className={`${
//                   state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
//                 }`}
//               >
//                 Try adjusting your search or filter criteria
//               </p>
//             </div>
//           )
//         )}
//       </div>
//     </div>
//   );
// }


