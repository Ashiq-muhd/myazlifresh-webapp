'use client';

import React from 'react';
import { Heart } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useAddToCartMutation } from '@/store/apiSlice'; // ✅ import mutation

type ProductDetailProps = {
  product: {
    id: string;
    name: string;
    description?: string;
    price: number;
    originalPrice?: number;
    weight?: string;
    image: string;
    inStock?: boolean;
    discount?: number;
    category?: string;
  };
};

export default function ProductDetailPage({ product }: ProductDetailProps) {
  const { state } = useApp();
  const [addToCart, { isLoading, isSuccess, isError }] = useAddToCartMutation();

  const handleAddToCart = async () => {
    try {
      await addToCart({ productId: Number(product.id), quantity: 1 }).unwrap();
      alert('✅ Added to cart successfully!');
    } catch (err) {
      console.error('Failed to add to cart:', err);
      alert('❌ Failed to add to cart');
    }
  };

  return (
    <div
      className={`rounded-2xl shadow-md overflow-hidden ${
        state.theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      }`}
    >
      {/* Product Image */}
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover"
        />
        {product.discount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            {product.discount}% OFF
          </div>
        )}
        <button className="absolute top-3 right-3 p-2 bg-white/80 rounded-full shadow hover:bg-white">
          <Heart className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h1 className="text-xl font-bold mb-2">{product.name}</h1>

        {product.description && (
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            {product.description}
          </p>
        )}

        <div className="flex items-center space-x-2 mb-3">
          <span className="text-2xl font-bold text-green-600">
            ₹{product.price}
          </span>
          {product.originalPrice && (
            <span className="text-sm line-through text-gray-500">
              ₹{product.originalPrice}
            </span>
          )}
        </div>

        {product.weight && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Net Weight: {product.weight}
          </p>
        )}

        {product.inStock ? (
          <button
            onClick={handleAddToCart}
            disabled={isLoading}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition disabled:opacity-50"
          >
            {isLoading ? 'Adding...' : 'Add to Cart'}
          </button>
        ) : (
          <div className="w-full border border-red-200 text-red-500 py-2 px-4 rounded-lg text-center">
            Out of Stock
          </div>
        )}

        {/* Optional status messages */}
        {isSuccess && <p className="text-green-600 mt-2 text-sm">Added successfully!</p>}
        {isError && <p className="text-red-500 mt-2 text-sm">Something went wrong.</p>}
      </div>
    </div>
  );
}



// 'use client';

// import React from 'react';
// import { Heart } from 'lucide-react';
// import { useApp } from '@/context/AppContext';

// // ✅ Define product type based on API response
// type ProductDetailProps = {
//   product: {
//     id: string;
//     name: string;
//     description?: string;
//     price: number;
//     originalPrice?: number;
//     weight?: string;
//     image: string;
//     inStock?: boolean;
//     discount?: number;
//     category?: string;
//   };
// };

// export default function ProductDetailPage({ product }: ProductDetailProps) {
//   const { state } = useApp();

//   return (
//     <div
//       className={`rounded-2xl shadow-md overflow-hidden ${
//         state.theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
//       }`}
//     >
//       {/* Product Image */}
//       <div className="relative">
//         <img
//           src={product.image}
//           alt={product.name}
//           className="w-full h-64 object-cover"
//         />
//         {product.discount && (
//           <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
//             {product.discount}% OFF
//           </div>
//         )}
//         <button className="absolute top-3 right-3 p-2 bg-white/80 rounded-full shadow hover:bg-white">
//           <Heart className="w-5 h-5 text-gray-600" />
//         </button>
//       </div>

//       {/* Product Info */}
//       <div className="p-4">
//         <h1 className="text-xl font-bold mb-2">{product.name}</h1>

//         {product.description && (
//           <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
//             {product.description}
//           </p>
//         )}

//         <div className="flex items-center space-x-2 mb-3">
//           <span className="text-2xl font-bold text-green-600">
//             ₹{product.price}
//           </span>
//           {product.originalPrice && (
//             <span className="text-sm line-through text-gray-500">
//               ₹{product.originalPrice}
//             </span>
//           )}
//         </div>

//         {product.weight && (
//           <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
//             Net Weight: {product.weight}
//           </p>
//         )}

//         {product.inStock ? (
//           <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition">
//             Add to Cart
//           </button>
//         ) : (
//           <div className="w-full border border-red-200 text-red-500 py-2 px-4 rounded-lg text-center">
//             Out of Stock
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// 'use client';

// import React from 'react';
// import { Heart } from 'lucide-react';
// import { useApp } from '@/context/AppContext';

// // ✅ Define product type based on API response
// type ProductDetailProps = {
//   product: {
//     id: string;
//     name: string;
//     description?: string;
//     price: number;
//     originalPrice?: number;
//     weight?: string;
//     image: string;
//     inStock?: boolean;
//     discount?: number;
//     category?: string;
//   };
// };

// export default function ProductDetailPage({ product }: ProductDetailProps) {
//   const { state } = useApp();

//   return (
//     <div
//       className={`rounded-2xl shadow-md overflow-hidden ${
//         state.theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
//       }`}
//     >
//       {/* Product Image */}
//       <div className="relative">
//         <img
//           src={product.image}
//           alt={product.name}
//           className="w-full h-64 object-cover"
//         />
//         {product.discount && (
//           <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
//             {product.discount}% OFF
//           </div>
//         )}
//         <button className="absolute top-3 right-3 p-2 bg-white/80 rounded-full shadow hover:bg-white">
//           <Heart className="w-5 h-5 text-gray-600" />
//         </button>
//       </div>

//       {/* Product Info */}
//       <div className="p-4">
//         <h1 className="tex
