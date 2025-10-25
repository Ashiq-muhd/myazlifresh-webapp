'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, Minus, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function CartPage() {
  const { state, dispatch } = useApp();
  const router = useRouter();

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    } else {
      dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { productId, quantity: newQuantity } });
    }
  };

  const updateVariantQuantity = (productId: string, variantId: string | undefined, newQuantity: number) => {
    if (newQuantity === 0) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: { productId, variantId } });
    } else {
      dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { productId, variantId, quantity: newQuantity } });
    }
  };

  const removeItem = (productId: string, variantId: string | undefined) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { productId, variantId } });
  };

  const subtotal = state.cart.reduce((total, item) => {
    const price = item.variant ? item.variant.price : item.product.price;
    return total + (price * item.quantity);
  }, 0);

  const deliveryFee = subtotal > 500 ? 0 : 40;
  const total = subtotal + deliveryFee;

  if (state.cart.length === 0) {
    return (
      <div className={`min-h-screen ${state.theme === 'dark' ? 'bg-gray-900' : 'bg-white'} pb-20 md:pb-0`}>
        <div className={`${state.theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm px-4 py-4`}>
          <div className="flex items-center space-x-4">
            <button onClick={() => router.back()}>
              <ArrowLeft className={`w-6 h-6 ${state.theme === 'dark' ? 'text-white' : 'text-gray-900'}`} />
            </button>
            <h1 className={`text-lg font-semibold ${state.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Shopping Cart
            </h1>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center h-96">
          <div className="text-6xl mb-4">🛒</div>
          <h3 className={`text-xl font-semibold mb-2 ${state.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Your cart is empty
          </h3>
          <p className={`text-center mb-6 ${state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Add some fresh products to get started
          </p>
          <button
            onClick={() => router.push('/products')}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${state.theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} pb-20 md:pb-0`}>
      {/* Header */}
      <div className={`${state.theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm px-4 py-4`}>
        <div className="flex items-center space-x-4">
          <button onClick={() => router.back()}>
            <ArrowLeft className={`w-6 h-6 ${state.theme === 'dark' ? 'text-white' : 'text-gray-900'}`} />
          </button>
          <h1 className={`text-lg font-semibold ${state.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Shopping Cart ({state.cart.length} items)
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        {/* Cart Items */}
        <div className="space-y-4 mb-6">
          {state.cart.map((item) => {
            const price = item.variant ? item.variant.price : item.product.price;
            const weight = item.variant ? item.variant.weight : item.product.weight;
            
            return (
              <div
                key={`${item.product.id}-${item.variant?.id || 'default'}`}
                className={`${state.theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg p-4 shadow-sm`}
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <h3 className={`font-semibold ${state.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {item.product.name}
                    </h3>
                    {item.variant && (
                      <p className={`text-sm ${state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {item.variant.name}
                      </p>
                    )}
                    <p className={`text-sm ${state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {weight}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-lg font-bold text-green-600">
                        ₹{price}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateVariantQuantity(item.product.id, item.variant?.id, item.quantity - 1)}
                        className={`p-1 rounded-full ${state.theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className={`text-lg font-semibold min-w-[2rem] text-center ${state.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateVariantQuantity(item.product.id, item.variant?.id, item.quantity + 1)}
                        className={`p-1 rounded-full ${state.theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <button
                      onClick={() => removeItem(item.product.id, item.variant?.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary */}
        <div className={`${state.theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow-sm`}>
          <h3 className={`text-lg font-semibold mb-4 ${state.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Order Summary
          </h3>
          
          <div className="space-y-2 mb-4">
            <div className={`flex justify-between ${state.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className={`flex justify-between ${state.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              <span>Delivery Fee</span>
              <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
            </div>
            {deliveryFee === 0 && (
              <p className="text-sm text-green-600">Free delivery on orders above ₹500</p>
            )}
          </div>
          
          <div className={`border-t pt-4 ${state.theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className={`flex justify-between text-lg font-bold ${state.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>

          <button
            onClick={() => router.push('/checkout')}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold mt-6 transition-colors"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}