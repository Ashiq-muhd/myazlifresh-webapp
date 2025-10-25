'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, MapPin, CreditCard, Truck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function CheckoutPage() {
  const { state, dispatch } = useApp();
  const router = useRouter();
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'online'>('cod');
  const [newAddress, setNewAddress] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    pincode: ''
  });

  const subtotal = state.cart.reduce((total, item) => {
    const price = item.variant ? item.variant.price : item.product.price;
    return total + (price * item.quantity);
  }, 0);

  const deliveryFee = subtotal > 500 ? 0 : 40;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = () => {
    // Create order
    const order = {
      id: Date.now().toString(),
      items: state.cart,
      total,
      status: 'pending' as const,
      address: {
        id: '1',
        name: newAddress.name || 'John Doe',
        phone: newAddress.phone || '9876543210',
        address: newAddress.address || 'Sample Address',
        city: newAddress.city || 'Bengaluru',
        pincode: newAddress.pincode || '560001',
        isDefault: true
      },
      createdAt: new Date()
    };

    dispatch({ type: 'ADD_ORDER', payload: order });
    dispatch({ type: 'CLEAR_CART' });
    router.push('/order-confirmation');
  };

  if (state.cart.length === 0) {
    router.push('/cart');
    return null;
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
            Checkout
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        {/* Delivery Address */}
        <div className={`${state.theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 mb-6 shadow-sm`}>
          <div className="flex items-center space-x-3 mb-4">
            <MapPin className="w-5 h-5 text-green-600" />
            <h3 className={`text-lg font-semibold ${state.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Delivery Address
            </h3>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                value={newAddress.name}
                onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                className={`w-full p-3 border rounded-lg ${state.theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'} focus:outline-none focus:ring-2 focus:ring-green-500`}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={newAddress.phone}
                onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                className={`w-full p-3 border rounded-lg ${state.theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'} focus:outline-none focus:ring-2 focus:ring-green-500`}
              />
            </div>
            <textarea
              placeholder="Complete Address"
              rows={3}
              value={newAddress.address}
              onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
              className={`w-full p-3 border rounded-lg ${state.theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'} focus:outline-none focus:ring-2 focus:ring-green-500`}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="City"
                value={newAddress.city}
                onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                className={`w-full p-3 border rounded-lg ${state.theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'} focus:outline-none focus:ring-2 focus:ring-green-500`}
              />
              <input
                type="text"
                placeholder="Pincode"
                value={newAddress.pincode}
                onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                className={`w-full p-3 border rounded-lg ${state.theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'} focus:outline-none focus:ring-2 focus:ring-green-500`}
              />
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className={`${state.theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 mb-6 shadow-sm`}>
          <div className="flex items-center space-x-3 mb-4">
            <CreditCard className="w-5 h-5 text-green-600" />
            <h3 className={`text-lg font-semibold ${state.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Payment Method
            </h3>
          </div>

          <div className="space-y-3">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === 'cod'}
                onChange={(e) => setPaymentMethod(e.target.value as 'cod')}
                className="text-green-600 focus:ring-green-500"
              />
              <span className={`${state.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Cash on Delivery
              </span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="online"
                checked={paymentMethod === 'online'}
                onChange={(e) => setPaymentMethod(e.target.value as 'online')}
                className="text-green-600 focus:ring-green-500"
              />
              <span className={`${state.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Online Payment
              </span>
            </label>
          </div>
        </div>

        {/* Delivery Info */}
        <div className={`${state.theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 mb-6 shadow-sm`}>
          <div className="flex items-center space-x-3 mb-4">
            <Truck className="w-5 h-5 text-green-600" />
            <h3 className={`text-lg font-semibold ${state.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Delivery Information
            </h3>
          </div>
          <div className="flex items-center space-x-2 text-green-600">
            <span className="text-2xl">⚡</span>
            <span className="font-medium">Express Delivery in 20 minutes</span>
          </div>
        </div>

        {/* Order Summary */}
        <div className={`${state.theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow-sm`}>
          <h3 className={`text-lg font-semibold mb-4 ${state.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Order Summary
          </h3>
          
          <div className="space-y-3 mb-4">
            {state.cart.map((item) => {
              const price = item.variant ? item.variant.price : item.product.price;
              return (
                <div key={`${item.product.id}-${item.variant?.id || 'default'}`} className="flex justify-between">
                  <span className={`${state.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {item.product.name} x {item.quantity}
                  </span>
                  <span className={`${state.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    ₹{price * item.quantity}
                  </span>
                </div>
              );
            })}
          </div>
          
          <div className={`space-y-2 mb-4 pt-4 border-t ${state.theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className={`flex justify-between ${state.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className={`flex justify-between ${state.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              <span>Delivery Fee</span>
              <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
            </div>
          </div>
          
          <div className={`flex justify-between text-lg font-bold mb-6 ${state.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
          >
            Place Order - ₹{total}
          </button>
        </div>
      </div>
    </div>
  );
}