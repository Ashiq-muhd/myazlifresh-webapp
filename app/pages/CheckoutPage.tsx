'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, MapPin, Truck, Tag } from 'lucide-react';
import { useApp } from '../context/AppContext';
import {
  useGetCartListQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
} from '@/store/apiSlice';
import AddressBottomSheet from '@/components/Checkout/AddressBottomSheet';

export default function CheckoutPage() {
  const { state, dispatch } = useApp();
  const router = useRouter();

  // ✅ Fetch cart from API
  const userToken =
    typeof window !== 'undefined'
      ? localStorage.getItem('authToken') || localStorage.getItem('userToken') || ''
      : '';
  const isAuthenticated = !!userToken;
  const { data: cartData, refetch } = useGetCartListQuery();
  const [addToCart] = useAddToCartMutation();
  const [removeFromCart] = useRemoveFromCartMutation();

  const [isAddressSheetOpen, setIsAddressSheetOpen] = useState(false);

  const [optimisticQty, setOptimisticQty] = useState<Record<string, number>>({});

  const extractCartItems = (data: any) => {
    const candidates = [
      data?.items,
      data?.data?.items,
      data?.data?.cart?.items,
      data?.cart?.items,
      data?.data?.data,
      data?.data,
      data,
    ];
    for (const c of candidates) {
      if (Array.isArray(c)) return c;
    }
    return state.cart;
  };

  const cartItems: any[] = extractCartItems(cartData);

  const getUnitPrice = (item: any) => {
    const raw = item?.variant?.price ?? item?.product?.price ?? item?.price ?? 0;
    const n = Number(raw);
    return Number.isFinite(n) ? n : 0;
  };

  const resolveProductId = (item: any): string => {
    const id = item?.product?.id ?? item?.product_id ?? item?.productId ?? item?.id;
    return String(id);
  };

  const resolveVariantId = (item: any): string | undefined => {
    const vid = item?.variant?.id ?? item?.variant_id ?? item?.variantId;
    return vid !== undefined && vid !== null ? String(vid) : undefined;
  };

  const makeKey = (pid: string, vid?: string) => `${pid}|${vid ?? ''}`;

  React.useEffect(() => {
    if (isAuthenticated && Array.isArray(cartItems)) {
      const next: Record<string, number> = {};
      for (const it of cartItems) {
        const pid = resolveProductId(it);
        const vid = resolveVariantId(it);
        const key = makeKey(pid, vid);
        const qty = Number(it.quantity) || 0;
        next[key] = optimisticQty[key] ?? qty;
      }
      setOptimisticQty(next);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, cartData]);

  const displayItems = (isAuthenticated ? cartItems : state.cart).map((it: any) => {
    const pid = resolveProductId(it);
    const vid = resolveVariantId(it);
    const key = makeKey(pid, vid);
    const baseQty = (Number(it.quantity) || 0);
    const q = isAuthenticated
      ? (optimisticQty[key] ?? baseQty)
      : baseQty;
    return { ...it, quantity: q, _pid: pid, _vid: vid, _key: key };
  });

  const subtotal = displayItems.reduce(
    (total: number, item: any) => total + getUnitPrice(item) * (Number(item.quantity) || 0),
    0
  );
  const deliveryFee = subtotal > 500 ? 0 : 40;
  const total = subtotal + deliveryFee;

  if (displayItems.length === 0) {
    router.push('/cart');
    return null;
  }

  const handleAddToCart = async (productId: string, variantId?: string) => {
    const idStr = String(productId);
    const key = makeKey(idStr, variantId);
    const current =
      displayItems.find((it: any) => it._key === key)?.quantity || 0;

    if (isAuthenticated) {
      setOptimisticQty((prev) => ({ ...prev, [key]: current + 1 }));
      try {
        await addToCart({ productId: Number(idStr), quantity: 1 }).unwrap();
        await refetch();
      } catch (error) {
        setOptimisticQty((prev) => ({ ...prev, [key]: current }));
        console.error('Error adding to cart:', error);
      }
    } else {
      dispatch({
        type: 'UPDATE_CART_QUANTITY',
        payload: { productId: idStr, variantId, quantity: current + 1 },
      });
    }
  };

  const handleRemoveFromCart = async (productId: string, variantId?: string) => {
    const idStr = String(productId);
    const key = makeKey(idStr, variantId);
    const current =
      displayItems.find((it: any) => it._key === key)?.quantity || 0;

    if (isAuthenticated) {
      const nextQty = Math.max(0, current - 1);
      setOptimisticQty((prev) => ({ ...prev, [key]: nextQty }));
      try {
        await removeFromCart({ productId: Number(idStr), quantity: 1 }).unwrap();
        await refetch();
      } catch (error) {
        setOptimisticQty((prev) => ({ ...prev, [key]: current }));
        console.error('Error removing from cart:', error);
      }
    } else {
      if (current <= 1) {
        dispatch({ type: 'REMOVE_FROM_CART', payload: { productId: idStr, variantId } });
      } else {
        dispatch({
          type: 'UPDATE_CART_QUANTITY',
          payload: { productId: idStr, variantId, quantity: current - 1 },
        });
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-white pb-28">
      {/* Header */}
      <header className="flex items-center px-4 py-3 shadow-sm bg-white sticky top-0 z-10">
        <button onClick={() => router.back()} className="mr-3">
          <ArrowLeft className="w-5 h-5 text-gray-800" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">Checkout</h1>
      </header>

      {/* Estimated Delivery Banner */}
      <div className="bg-green-50 text-center py-2 text-sm text-green-700 font-medium">
        Estimated Delivery Time: 11:00 am
      </div>

      <div className="px-4 py-4 space-y-5">
        {/* Delivery Address */}
        <section className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100">
          <div className="flex items-center space-x-3 mb-3">
            <MapPin className="w-5 h-5 text-green-600" />
            <h2 className="font-semibold text-gray-900">Deliver to</h2>
          </div>

          <p className="text-gray-700 text-sm mb-2">
            123, Green Valley Apartments
          </p>

          <button
            onClick={() => setIsAddressSheetOpen(true)}
            className="text-green-600 text-sm font-medium"
          >
            Change Address →
          </button>
        </section>

        {/* Delivery Method */}
        <section className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100">
          <div className="flex items-center space-x-3 mb-2">
            <Truck className="w-5 h-5 text-green-600" />
            <h2 className="font-semibold text-gray-900">Delivery Method</h2>
          </div>
          <p className="text-gray-700 text-sm">30 minutes Express Delivery</p>
        </section>

        {/* Skip Paper Bag */}
        <section className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <input type="checkbox" className="accent-green-600 w-4 h-4" />
            <span className="text-gray-800 text-sm font-medium">
              Skip the paper bag 🌱
            </span>
          </div>
        </section>

        {/* Ordered Items */}
        <section className="space-y-4">
          {displayItems.map((item: any) => {
            const price = getUnitPrice(item);
            const pid = item._pid || resolveProductId(item);
            const vid = item._vid || resolveVariantId(item);
            return (
              <div
                key={item._key || makeKey(pid, vid)}
                className="bg-white rounded-2xl p-3 flex items-center justify-between shadow-sm border border-gray-100"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={item.product?.image || item.image}
                    alt={item.product?.name || item.name}
                    className="w-16 h-16 rounded-md object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-900">
                      {item.product?.name || item.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {item.variant?.weight ||
                        item.product?.weight ||
                        item.weight}
                    </p>
                    <p className="font-semibold text-green-600 text-sm mt-1">
                      ₹{price}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleRemoveFromCart(pid, vid)}
                    className="border border-gray-300 rounded-full w-6 h-6 flex items-center justify-center text-gray-700 font-bold"
                  >
                    –
                  </button>
                  <span className="font-medium text-gray-900">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => handleAddToCart(pid, vid)}
                    className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </section>

        {/* Forgot Something Banner */}
        <section className="bg-yellow-400 rounded-xl py-3 px-4 flex items-center justify-between shadow-sm">
          <p className="text-white font-semibold text-sm">Forgot Something?</p>
          <button className="bg-white text-yellow-500 font-semibold rounded-full px-4 py-1 text-sm">
            + Add more items
          </button>
        </section>

        {/* Free Item Section */}
        <section>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            🎁 You’ve Earned a Free Item!
          </h3>

          <div className="grid grid-cols-2 gap-3">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-sm p-3 border border-gray-100 relative"
              >
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  FREE
                </span>
                <img
                  src="/placeholder.jpg"
                  alt="Free item"
                  className="w-full h-20 object-cover rounded-md mb-2"
                />
                <p className="text-sm font-medium text-gray-900">
                  Malabar Biriyani Masala
                </p>
                <p className="text-xs text-gray-500 mb-2">150 gm</p>
                <button
                  onClick={() => alert('Claimed free item')}
                  className="w-full border border-green-600 text-green-600 font-medium rounded-full py-1 text-sm"
                >
                  Claim
                </button>
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-500 mt-3 bg-gray-50 rounded-md p-2">
            Add this free item to your order before placing it. If not claimed,
            it will be canceled.
          </p>
        </section>

        {/* Apply Coupon */}
        <section className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Tag className="w-5 h-5 text-green-600" />
            <span className="text-green-600 font-medium text-sm">
              Apply Coupon
            </span>
          </div>
          <span className="text-gray-400 text-sm">{'>'}</span>
        </section>

        {/* Order Summary */}
        <section className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100">
          <h3 className="text-gray-900 font-semibold mb-3">Order Summary</h3>
          <div className="text-sm space-y-2 mb-2">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery Fee</span>
              <span>{deliveryFee === 0 ? 'Free' : `₹${deliveryFee}`}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax</span>
              <span>₹{(subtotal * 0.05).toFixed(2)}</span>
            </div>
          </div>

          <div className="flex justify-between text-gray-900 font-bold text-lg border-t border-gray-100 pt-2">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </section>
      </div>

      {/* ✅ Sticky Bottom Bar */}
      <div className="fixed left-0 right-0 bottom-[76px] md:bottom-0 bg-green-50 border-t border-gray-200 p-3 flex items-center justify-between shadow-inner z-40">
        <div className="flex flex-col text-sm text-gray-800 font-medium">
          <span>{displayItems.length} items</span>
          <span className="text-green-700 font-semibold">
            ₹{total.toFixed(2)}
          </span>
        </div>
        <button
          onClick={() => setIsAddressSheetOpen(true)}
          className="bg-green-600 text-white font-semibold rounded-full px-8 py-2 text-sm shadow hover:bg-green-700 transition-all"
        >
          Add Address
        </button>
      </div>

      {/* ✅ Address Bottom Sheet */}
      <AddressBottomSheet
        isOpen={isAddressSheetOpen}
        onClose={() => setIsAddressSheetOpen(false)}
      />
    </div>
  );
}
