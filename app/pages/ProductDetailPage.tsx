'use client';

import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useAddToCartMutation, useGetProductByIdQuery, useGetCartListQuery } from '@/store/apiSlice';
import { useParams } from 'next/navigation';
import CheckoutBar from '@/components/Layout/CheckoutBar';

// Product shape — adapt to your real API if fields differ
type Product = {
  id: string | number;
  name: string;
  description?: string;
  price?: number;
  originalPrice?: number;
  weight?: string;
  image?: string;
  inStock?: boolean;
  discount?: number;
  category?: string;
};

type ProductDetailProps = { product?: any };

// Fetch product via RTK Query using dynamic productId (from props or route)
export default function ProductDetailPage({ product: propProduct }: ProductDetailProps) {
  const params = useParams();
  const rawId: any = params?.id;
  const routeId = Array.isArray(rawId) ? rawId[0] : rawId;
  const activeId = propProduct ? String(propProduct.id) : routeId ? String(routeId) : undefined;
  const { data: fetchedProduct, isLoading, isError } = useGetProductByIdQuery(activeId as string, { skip: !activeId || !!propProduct });
  const product: any = propProduct || fetchedProduct;
  if (!product) {
    if (isError) return <div className="p-4 text-sm text-red-600">Failed to load product.</div>;
    return <div className="p-4 text-sm">Loading product...</div>;
  }
  const { state, dispatch } = useApp();
  // Dynamic cutting options extraction
  const rawCuts = product?.fish_cutting_options || product?.fish_cutting_options_data || product?.cut_options || [];
  const cutArray = Array.isArray(rawCuts) ? rawCuts : [];
  const whole = product?.whole_Fish_data || product?.whole_fish_data || {};
  const extractPrice = (val: any) => {
    if (typeof val === 'number') return val;
    const n = parseFloat(String(val ?? '').replace(/[^0-9.]/g, ''));
    return isNaN(n) ? 0 : n;
  };
  const fromCuts = cutArray.map((c: any, idx: number) => ({
    id: c?.id || `cut-${idx}`,
    name: c?.cut_name || c?.name || 'Cut',
    weight: c?.weight || c?.approx_weight || c?.approximate_weight || '',
    cleanedWeight: c?.cleaned_weight || c?.after_cleaned_weight || c?.clean_weight || '',
    uncleanedWeight: c?.uncleaned_weight || c?.un_cleaned_weight || whole?.un_cleaned_weight || '',
    price: c?.price ?? c?.off_price ?? c?.amount ?? product?.off_price ?? product?.price ?? 0,
    image: c?.img || c?.image || c?.imgs?.[0]?.img || (product?.imgs?.[0]?.img || product?.image) || '/placeholder.jpg',
  }));
  const approx = Array.isArray(whole?.approximate_weights) ? whole.approximate_weights : [];
  const fromWhole = approx.map((w: any, idx: number) => ({
    id: `whole-${idx}`,
    name: 'Whole Fish',
    weight: w?.content || '',
    cleanedWeight: '',
    uncleanedWeight: whole?.un_cleaned_weight || '',
    price: extractPrice(w?.approximate_price),
    image: (product?.imgs?.[0]?.img || product?.image) || '/placeholder.jpg',
  }));
  const dynamicCutOptions = fromCuts.length > 0 ? fromCuts : fromWhole;
  const hasCutOptions = dynamicCutOptions.length > 0;
  const [tab, setTab] = useState<'cuts' | 'about'>(hasCutOptions ? 'cuts' : 'about');
  const [addToCart, { isLoading: adding }] = useAddToCartMutation();
  // NEW: per-cut quantities
  const [cutQuantities, setCutQuantities] = useState<Record<string, number>>({});

  const userToken = typeof window !== 'undefined' ? (localStorage.getItem('authToken') || localStorage.getItem('userToken') || '') : '';
  const { refetch: refetchCart } = useGetCartListQuery(undefined, { skip: !userToken });

  const handleAddToCart = async (productId: number | string, quantity = 1) => {
    try {
      await addToCart({ productId: Number(productId), quantity }).unwrap();
      if (userToken) refetchCart();
    } catch (err) {
      console.error('Add to cart failed', err);
    }
  };

  const addCut = (id: string) => {
    setCutQuantities(q => ({ ...q, [id]: 1 }));
    const opt = dynamicCutOptions.find(o => o.id === id);
    if (opt) {
      dispatch({
        type: 'ADD_TO_CART',
        payload: {
          product: {
            id: String(product.id),
            name: product.name,
            category: product.category || 'fish',
            price: product.off_price || product.price || 0,
            originalPrice: product.price,
            weight: product.weight || opt.weight || '1kg',
            image: product.imgs?.[0]?.img || product.image || '/placeholder.jpg',
            description: product.description || '',
            inStock: product.inStock !== false,
            discount: product.discount || 0,
            variants: [],
          },
          quantity: 1,
          variant: {
            id: String(opt.id),
            name: opt.name,
            price: parsePrice(opt.price),
            originalPrice: undefined,
            weight: opt.weight || product.weight || '1kg',
            description: '',
            image: opt.image || product.imgs?.[0]?.img || product.image || '/placeholder.jpg',
          }
        }
      });
    }
    handleAddToCart(product.id, 1);
  };
  const incrementCut = (id: string) => {
    setCutQuantities(q => {
      const next = (q[id] || 0) + 1;
      const opt = dynamicCutOptions.find(o => o.id === id);
      if (opt) {
        dispatch({
          type: 'UPDATE_CART_QUANTITY',
          payload: { productId: String(product.id), variantId: String(opt.id), quantity: next }
        });
      }
      handleAddToCart(product.id, 1);
      return { ...q, [id]: next };
    });
  };
  const decrementCut = (id: string) => {
    setCutQuantities(q => {
      const current = q[id] || 0;
      const opt = dynamicCutOptions.find(o => o.id === id);
      if (current <= 1) {
        if (opt) {
          dispatch({ type: 'REMOVE_FROM_CART', payload: { productId: String(product.id), variantId: String(opt.id) } });
        }
        const { [id]: _, ...rest } = q;
        return rest;
      }
      const next = current - 1;
      if (opt) {
        dispatch({
          type: 'UPDATE_CART_QUANTITY',
          payload: { productId: String(product.id), variantId: String(opt.id), quantity: next }
        });
      }
      return { ...q, [id]: next };
    });
  };

  // Totals for sticky bar
  const totalItems = Object.values(cutQuantities).reduce((a, b) => a + b, 0);
  const parsePrice = (p: any) => (typeof p === 'number' ? p : parseFloat(String(p)) || 0);
  const totalPrice = dynamicCutOptions.reduce((sum: number, opt: any) => sum + (cutQuantities[opt.id] || 0) * parsePrice(opt.price), 0);

  // Derive computed fields from API response
  const mainImg = product?.imgs?.[0]?.img || product?.image || '/placeholder.jpg';
  const discount = product?.price && product?.off_price ? Math.round(((product.price - product.off_price) / product.price) * 100) : 0;
  const detailsSections: Array<{ Key: string; content: string }> = Array.isArray(product?.details) ? product.details : [];

  return (
    <div className={`relative rounded-2xl shadow-md overflow-hidden pb-28 md:pb-0 ${state.theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
      {/* Image + badge */}
      <div className="relative">
        <img
          src={mainImg}
          alt={product.name}
          className="w-full h-64 object-cover"
        />
        {discount > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            {discount}% OFF
          </div>
        )}
        <button
          className="absolute top-3 right-3 p-2 bg-white/80 rounded-full shadow hover:bg-white"
          onClick={() => alert('❤️ wishlist placeholder')}
        >
          <Heart className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Info */}
      <div className="p-4 space-y-4">
        <div>
          <h1 className="text-xl font-bold mb-1">{product.name}</h1>
          {product.weight && <div className="text-sm text-gray-500 mb-2">{product.weight}</div>}
          <div className="flex items-center space-x-3">
            <span className="text-2xl font-bold text-green-600">₹{product.off_price || product.price}</span>
            {product.price && product.off_price && (
              <span className="text-sm line-through text-gray-500">₹{product.price}</span>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-full p-1 flex items-center gap-1">
          {hasCutOptions && (
            <button
              onClick={() => setTab('cuts')}
              className={`flex-1 text-sm font-medium py-2 rounded-full transition ${tab === 'cuts' ? 'bg-white dark:bg-gray-800 shadow' : 'text-gray-500 dark:text-gray-400'}`}
            >
              Cleaning & Cutting Option
            </button>
          )}
          <button
            onClick={() => setTab('about')}
            className={`flex-1 text-sm font-medium py-2 rounded-full transition ${tab === 'about' ? 'bg-white dark:bg-gray-800 shadow' : 'text-gray-500 dark:text-gray-400'}`}
          >
            About
          </button>
        </div>

        {/* Tab content */}
        {tab === 'cuts' && hasCutOptions ? (
          <div className="space-y-3">
            {dynamicCutOptions.map((opt) => {
              const qty = cutQuantities[opt.id] || 0;
              return (
                <div key={opt.id} className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                      <img src={opt.image || mainImg} alt={opt.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{opt.name}</div>
                      {opt.weight && <div className="text-xs text-gray-500">{opt.weight}</div>}
                      {opt.cleanedWeight && <div className="text-[11px] text-gray-500">Cleaned: {opt.cleanedWeight}</div>}
                      {opt.uncleanedWeight && <div className="text-[11px] text-gray-400">Uncleaned: {opt.uncleanedWeight}</div>}
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-sm font-bold text-green-600">₹{parsePrice(opt.price)}</div>
                    {qty === 0 ? (
                      <button
                        onClick={() => addCut(opt.id)}
                        className="mt-2 bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1 rounded-full"
                      >
                        + Add
                      </button>
                    ) : (
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          onClick={() => decrementCut(opt.id)}
                          className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm font-bold"
                        >
                          -
                        </button>
                        <div className="w-6 text-center text-sm font-semibold">{qty}</div>
                        <button
                          onClick={() => incrementCut(opt.id)}
                          className="w-7 h-7 flex items-center justify-center rounded-full bg-green-600 hover:bg-green-700 text-white text-sm font-bold"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : tab === 'cuts' && !hasCutOptions ? (
          <div className="text-sm text-gray-500">No cutting options available for this product.</div>
        ) : (
          <div className="prose prose-sm max-w-none text-sm text-gray-700 dark:text-gray-300">
            <h4 className="mb-2">About this product</h4>
            <div dangerouslySetInnerHTML={{ __html: product.description || '<p>No description.</p>' }} />
            {detailsSections.map((sec) => (
              <div key={sec.Key} className="mt-4">
                <h5 className="font-semibold mb-2">{sec.Key}</h5>
                <div dangerouslySetInnerHTML={{ __html: sec.content }} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sticky-ish checkout/add bar */}
      <CheckoutBar />
    </div>
  );
}


// 'use client';

// import React from 'react';
// import { Heart } from 'lucide-react';
// import { useApp } from '@/context/AppContext';
// import { useAddToCartMutation } from '@/store/apiSlice'; // ✅ import mutation

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
//   const [addToCart, { isLoading, isSuccess, isError }] = useAddToCartMutation();

//   const handleAddToCart = async () => {
//     try {
//       await addToCart({ productId: Number(product.id), quantity: 1 }).unwrap();
//       alert('✅ Added to cart successfully!');
//     } catch (err) {
//       console.error('Failed to add to cart:', err);
//       alert('❌ Failed to add to cart');
//     }
//   };

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
//           <button
//             onClick={handleAddToCart}
//             disabled={isLoading}
//             className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition disabled:opacity-50"
//           >
//             {isLoading ? 'Adding...' : 'Add to Cart'}
//           </button>
//         ) : (
//           <div className="w-full border border-red-200 text-red-500 py-2 px-4 rounded-lg text-center">
//             Out of Stock
//           </div>
//         )}

//         {/* Optional status messages */}
//         {isSuccess && <p className="text-green-600 mt-2 text-sm">Added successfully!</p>}
//         {isError && <p className="text-red-500 mt-2 text-sm">Something went wrong.</p>}
//       </div>
//     </div>
//   );
// }

