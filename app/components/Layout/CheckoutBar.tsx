'use client';

import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { useGetCartListQuery } from '@/store/apiSlice';

function extractCartItems(data: any): any[] {
  const candidates = [
    data?.items,
    data?.cart?.items,
    data?.cartItems,
    data?.products,
    data?.data?.items,
    Array.isArray(data) ? data : undefined,
  ];
  for (const c of candidates) if (Array.isArray(c)) return c;
  return [];
}

function getItemUnitPrice(it: any): number {
  const candidates = [
    it?.price,
    it?.off_price,
    it?.amount,
    it?.product?.price,
    it?.variant?.price,
  ];
  for (const c of candidates) {
    const n = typeof c === 'number' ? c : parseFloat(String(c));
    if (Number.isFinite(n)) return n;
  }
  return 0;
}

const FREE_THRESHOLD = 1000;

export default function CheckoutBar() {
  const { state } = useApp();
  const router = useRouter();

  const { data: backendCart, isSuccess } = useGetCartListQuery();

  const contextTotals = useMemo(() => {
    const items = state.cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
    const price = state.cart.reduce((sum, item) => {
      const unit = item.variant?.price ?? item.product?.price ?? 0;
      return sum + unit * (item.quantity || 0);
    }, 0);
    return { items, price };
  }, [state.cart]);

  const backendItemsArr = isSuccess ? extractCartItems(backendCart) : [];
  const items =
    backendItemsArr.length > 0
      ? backendItemsArr.reduce(
          (acc: number, it: any) => acc + (Number(it.quantity) || 0),
          0
        )
      : contextTotals.items;

  const subtotal =
    backendItemsArr.length > 0
      ? backendItemsArr.reduce(
          (acc: number, it: any) =>
            acc + getItemUnitPrice(it) * (Number(it.quantity) || 0),
          0
        )
      : contextTotals.price;

  if (items === 0) return null;

  const remaining = Math.max(0, FREE_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_THRESHOLD) * 100);

  const handleCheckout = () => {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('authToken') : '';
    if (!token) router.push('/?login=1&next=/checkout');
    else router.push('/checkout');
  };

  return (
    <div
      className="
        fixed bottom-20 left-1/2 -translate-x-1/2
        w-[95%] max-w-[420px]
        z-50 animate-slide-up
      "
    >
      <div className="bg-white shadow-[0_4px_25px_rgba(0,0,0,0.15)] rounded-xl p-4 relative">

        {/* Free Eggs Badge */}
        <div className="absolute top-3 left-3">
          <img
            src="/icons/free%20tag.gif"
            className="w-12 h-12 object-contain mix-blend-multiply"
            alt="Free eggs"
          />
        </div>

        {/* Message */}
        <p className="ml-16 text-sm text-gray-800 leading-tight mb-2">
          {remaining > 0 ? (
            <>
              Add <span className="font-semibold">₹{remaining}</span> more to get{' '}
              <span className="font-semibold">5 free eggs!</span>
            </>
          ) : (
            <span className="text-green-600 font-semibold">
              🎉 You unlocked 5 free eggs!
            </span>
          )}
        </p>

        {/* 🔥 Progress Bar */}
        <div className=" w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-6">
          <div
            className={`
              h-2 rounded-full transition-all duration-500
              ${progress >= 100 ? 'bg-green-600' : 'bg-yellow-500'}
            `}
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Checkout Button */}
        <button
          onClick={handleCheckout}
          className="
            w-full bg-[#539944] text-white py-3 rounded-lg text-center font-semibold text-base
            flex items-center justify-center gap-2 active:scale-95 transition
          "
        >
          {items} Item{items > 1 ? 's' : ''} • ₹{Math.round(subtotal)}
          <span className="font-bold">|</span> Checkout
        </button>
      </div>
    </div>
  );
}