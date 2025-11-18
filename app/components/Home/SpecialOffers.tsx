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

  // Normalize API items to match ProductCard props exactly, avoiding NaN/invalid values
  const normalize = (item: any) => {
    const id = (item.id ?? item._id)?.toString();

    const rawName = item.name ?? item.title ?? item.product_name;
    const name = typeof rawName === 'string' && rawName.trim().length > 0 ? rawName : 'Product';

    const image = item?.imgs?.[0]?.img || item?.image || '/placeholder.jpg';

    const toNumber = (v: any) => {
      const n = Number(v);
      return Number.isFinite(n) ? n : undefined;
    };

    const price = toNumber(item.price ?? item.offerPrice ?? item.selling_price) ?? 0;

    const originalPriceRaw = toNumber(item.originalPrice ?? item.mrp ?? item.regularPrice);
    const originalPrice = originalPriceRaw && originalPriceRaw > 0 ? originalPriceRaw : undefined;

    const weightRaw = item.weight ?? item.netWeight ?? item.packetSize;
    const weight = typeof weightRaw === 'string' && weightRaw.trim()
      ? weightRaw
      : (Number.isFinite(Number(weightRaw)) ? `${weightRaw}` : '1kg');

    const inStock = (item.inStock !== false) && (item.stock === undefined || item.stock > 0);

    let discountRaw = toNumber(item.discount ?? item.discountPercentage);
    if ((!discountRaw || !Number.isFinite(discountRaw)) && originalPrice && price > 0 && originalPrice > price) {
      discountRaw = Math.round(((originalPrice - price) / originalPrice) * 100);
    }
    const discount = discountRaw && discountRaw > 0 ? discountRaw : undefined;

    return { id, name, image, price, originalPrice, weight, inStock, discount };
  };

  const specialOffers = Array.isArray(specialOffersData) && specialOffersData.length > 0
    ? specialOffersData.slice(0, 7).map(normalize)
    : staticProducts
        .filter(p => p.discount && p.discount > 15)
        .slice(0, 7)
        .map(p => ({
          id: p.id,
          name: typeof p.name === 'string' && p.name.trim() ? p.name : 'Product',
          image: p.image || '/placeholder.jpg',
          price: Number.isFinite(Number(p.price)) ? (p.price as number) : 0,
          originalPrice: Number.isFinite(Number(p.originalPrice)) ? (p.originalPrice as number) : undefined,
          weight: typeof p.weight === 'string' && p.weight.trim() ? p.weight : '1kg',
          inStock: p.inStock !== false,
          discount: Number.isFinite(Number(p.discount)) && Number(p.discount) > 0 ? (p.discount as number) : undefined,
        }));

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
