// 'use client';

// import React from 'react';
// import { Heart, AlertCircle } from 'lucide-react';
// import { useApp } from '../../context/AppContext';
// import Link from 'next/link';

// type ProductCardProps = {
//   product: {
//     id: string;
//     name: string;
//     image: string;
//     price: number;
//     originalPrice?: number | null;
//     weight?: string;
//     discount?: number;
//     inStock?: boolean;
//   };
//   hideLabel?: boolean;
// };

// export default function ProductCard({ product, hideLabel }: ProductCardProps) {
//   const { state } = useApp();

//   return (
//     <Link href={`/product/${product.id}`}>
//       <div
//         className={`${state.theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} 
//           rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 
//           overflow-hidden group cursor-pointer flex flex-col ${!product.inStock ? 'opacity-75' : ''}`}
//         style={{ minWidth: '160px', maxWidth: '193px', height: '250px' }}
//       >
//         {/* Product Image */}
//         <div className="relative flex-shrink-0">
//           <img
//             src={product.image}
//             alt={product.name}
//             className={`w-full h-28 object-cover group-hover:scale-105 transition-transform duration-200 ${!product.inStock ? 'grayscale' : ''}`}
//           />
//           {product.discount && product.inStock && (
//             <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-bold">
//               {product.discount}% OFF
//             </div>
//           )}
//           {!product.inStock && (
//             <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-bold flex items-center space-x-1">
//               <AlertCircle className="w-3 h-3" />
//               <span>OUT OF STOCK</span>
//             </div>
//           )}
//           <button
//             className="absolute top-2 right-2 p-1 bg-white/80 hover:bg-white rounded-full transition-colors"
//             onClick={(e) => e.preventDefault()}
//           >
//             <Heart className="w-3 h-3 text-gray-600" />
//           </button>
//         </div>

//         {/* Product Info */}
//         <div className="p-3 flex flex-col flex-1 justify-between">
//           <div className="flex-1">
//             <h3 className={`font-semibold text-sm mb-2 line-clamp-2 leading-tight ${state.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
//               {product.name}
//             </h3>

//             {/* ✅ Price Section */}
//             <div className="flex items-center space-x-1 mb-2">
//               <span className={`font-bold text-base ${product.inStock ? 'text-green-600' : 'text-gray-400'}`}>
//                 ₹{product.price}
//               </span>
//               {product.originalPrice && (
//                 <span className={`text-xs line-through ${state.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
//                   ₹{product.originalPrice}
//                 </span>
//               )}
//             </div>

//             {/* ✅ Weight */}
//             {product.weight && (
//               <p className={`text-xs mb-3 ${state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
//                 {hideLabel ? product.weight : `Net Weight: ${product.weight}`}
//               </p>
//             )}
//           </div>

//           <div className="mt-auto">
//             {!product.inStock ? (
//               <div className="w-full border border-red-200 text-red-500 py-1.5 px-2 rounded text-xs font-medium text-center">
//                 Out Of Stock
//               </div>
//             ) : (
//               <div className="h-6"></div>
//             )}
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// }


'use client';

import React from 'react';
import { Heart, AlertCircle } from 'lucide-react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';
import Link from 'next/link';

type ProductCardProps = {
  product: Product;
  hideLabel?: boolean; // optional prop to control weight label
};

export default function ProductCard({ product, hideLabel }: ProductCardProps) {
  const { state } = useApp();

  return (
    <Link href={`/product/${product.id}`}>
      <div 
        className={`${state.theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden group cursor-pointer flex flex-col ${!product.inStock ? 'opacity-75' : ''}`}
        style={{ minWidth: '160px', maxWidth: '193px', height: '250px' }}
      >
        <div className="relative flex-shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-28 object-cover group-hover:scale-105 transition-transform duration-200 ${!product.inStock ? 'grayscale' : ''}`}
          />
          {product.discount && product.inStock && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-bold">
              {product.discount}% OFF
            </div>
          )}
          {!product.inStock && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-bold flex items-center space-x-1">
              <AlertCircle className="w-3 h-3" />
              <span>OUT OF STOCK</span>
            </div>
          )}
          <button 
            className="absolute top-2 right-2 p-1 bg-white/80 hover:bg-white rounded-full transition-colors"
            onClick={(e) => e.preventDefault()}
          >
            <Heart className="w-3 h-3 text-gray-600" />
          </button>
        </div>

        <div className="p-3 flex flex-col flex-1 justify-between">
          <div className="flex-1">
            <h3 className={`font-semibold text-sm mb-2 line-clamp-2 leading-tight ${state.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {product.name}
            </h3>
            
            <div className="flex items-center space-x-1 mb-2">
              <span className={`font-bold text-base ${product.inStock ? 'text-green-600' : 'text-gray-400'}`}>
                ₹{product.price}
              </span>
              {product.originalPrice && (
                <span className={`text-xs line-through ${state.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  ₹{product.originalPrice}
                </span>
              )}
            </div>

            <p className={`text-xs mb-3 ${state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {hideLabel ? product.weight : `Net Weight: ${product.weight}`}
            </p>
          </div>

          <div className="mt-auto">
            {!product.inStock ? (
              <div className="w-full border border-red-200 text-red-500 py-1.5 px-2 rounded text-xs font-medium text-center">
                Out Of Stock
              </div>
            ) : (
              <div className="h-6"></div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
