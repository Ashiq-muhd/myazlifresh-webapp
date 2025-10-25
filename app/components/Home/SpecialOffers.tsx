'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import ProductCard from '../Product/ProductCard';
import { useGetSpecialOffersQuery } from '@/store/apiSlice';
import { products as staticProducts } from '@/data/products'; // Import static fallback data

export default function SpecialOffers() {
  const { state } = useApp();
  const { data: specialOffersData = [], isLoading, isError } = useGetSpecialOffersQuery();

  if (isLoading) {
    return <p className="px-4 text-gray-500">Loading special offers...</p>;
  }

  if (isError) {
    return <p className="px-4 text-red-500">Failed to load offers.</p>;
  }

  // Transform API data to match ProductCard expected structure
  const specialOffers = Array.isArray(specialOffersData) && specialOffersData.length > 0
    ? specialOffersData.slice(0, 7).map(item => ({
        id: item.id?.toString() || item._id?.toString(),
        name: item.name || item.title || 'Product',
        image: item.imgs?.[0]?.img || item.image || '/placeholder.jpg',
        price: item.price || 0,
        originalPrice: item.originalPrice || item.mrp,
        weight: item.weight || '1kg',
        category: item.category || 'fish',
        description: item.description || '',
        inStock: item.inStock !== false,
        discount: item.discount || item.discountPercentage || 0,
      }))
    : // Fallback to static products with discount > 15%
      staticProducts.filter(p => p.discount && p.discount > 15).slice(0, 7);

  return (
    <div className="px-4 mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <h2 className={`text-xl font-bold ${state.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Special Offers Just for You
          </h2>
          <span className="text-yellow-500">⭐</span>
        </div>
        <button
          className={`text-sm font-medium ${
            state.theme === 'dark'
              ? 'text-gray-400 hover:text-gray-200'
              : 'text-gray-500 hover:text-gray-700'
          } transition-colors`}
        >
          See All
        </button>
      </div>

      {/* Horizontal scroll on mobile, grid on larger screens */}
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide sm:grid sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 sm:gap-3 sm:justify-items-center">
        {specialOffers.map((product) => (
          <div key={product.id} className="min-w-[150px] sm:min-w-0 shrink-0">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}



// 'use client'

// import React from 'react';
// import { useApp } from '../../context/AppContext';
// import { products } from '../../data/products';
// import ProductCard from '../Product/ProductCard';

// export default function SpecialOffers() {
//   const { state } = useApp();

//   const specialOffers = products.filter(product => product.discount && product.discount > 15).slice(0, 7);

//   return (
//     <div className="px-4 mb-8">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-6">
//         <div className="flex items-center space-x-2">
//           <h2 className={`text-xl font-bold ${state.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
//             Special Offers Just for You
//           </h2>
//           <span className="text-yellow-500">⭐</span>
//         </div>
//         <button className={`text-sm font-medium ${state.theme === 'dark' ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'} transition-colors`}>
//           See All
//         </button>
//       </div>

//       {/* Horizontal scroll on mobile, grid on larger screens */}
//       <div className="flex space-x-4 overflow-x-auto scrollbar-hide sm:grid sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 sm:gap-3 sm:justify-items-center">
//         {specialOffers.map((product) => (
//           <div key={product.id} className="min-w-[150px] sm:min-w-0 shrink-0">
//             <ProductCard product={product} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
