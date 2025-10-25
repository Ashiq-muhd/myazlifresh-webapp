'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function OrderDetailsClient({ orderId }: { orderId: string }) {
  const router = useRouter();

  // Dummy order data
  const order = {
    id: orderId,
    status: orderId === '2' || orderId === '4' ? 'Cancelled' : 'Completed',
    date: 'Thu, Apr 10, 2025 2:27 PM',
    name: 'ashiq',
    location: 'Channasandra, Bengaluru Urban, Karnataka',
    pincode: '560067',
    phone: '8139826619',
    item: {
      name: 'Kingfish (Aykora/Vanjiram)',
      weight: '2 kg',
      price: '₹780.00',
      image: '/images/kingfish.jpg',
    },
    deliveryType: 'Time Slot - 07:00:00 - 09:30:00',
    paymentMethod: 'Online Payment',
    paymentStatus: orderId === '2' ? 'Pending' : 'Paid',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 flex items-center">
        <button onClick={() => router.back()}>
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="ml-4 text-lg font-semibold">Order Details</h1>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-white p-4 rounded-md shadow">
          <div className="flex justify-between">
            <span className="font-semibold">Order #{order.id}</span>
            <span className={`text-sm px-2 py-1 rounded ${order.status === 'Cancelled' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
              {order.status}
            </span>
          </div>
          <p className="text-sm text-gray-600">{order.date}</p>
        </div>

        <div className="bg-white p-4 rounded-md shadow">
          <h3 className="text-sm font-semibold text-gray-600">Deliver to</h3>
          <p className="text-sm text-gray-800 mt-1">
            {order.name}, {order.location}, Pincode: {order.pincode}, Phone: {order.phone}
          </p>
        </div>

        <div className="bg-white p-4 rounded-md shadow space-y-2">
          <p className="font-semibold">Order Confirmed</p>
          <div className="text-sm text-gray-700">Order placed — {order.date}</div>
          {order.status === 'Cancelled' && (
            <div className="text-sm text-red-600">Cancelled — Apr 10, 2025 2:30 PM</div>
          )}
        </div>

        <div className="bg-white p-4 rounded-md shadow flex items-center space-x-4">
          <img src={order.item.image} alt="item" className="w-16 h-16 rounded object-cover" />
          <div>
            <p className="font-semibold">{order.item.name}</p>
            <p className="text-sm text-gray-500">Gross weight: {order.item.weight}</p>
            <p className="text-green-600 font-semibold">{order.item.price}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-md shadow space-y-2">
          <h3 className="font-semibold text-gray-700">Bill Details</h3>
          <div className="flex justify-between">
            <span>Item Total</span><span>{order.item.price}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee</span><span className="text-green-600">FREE</span>
          </div>
          <div className="flex justify-between">
            <span>Coupon Discount</span><span>0</span>
          </div>
          <div className="flex justify-between">
            <span>Wallet Discount</span><span>0</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total to Pay</span><span>{order.item.price}</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-md shadow space-y-2">
          <h3 className="font-semibold text-gray-700">Order Details</h3>
          <div className="text-sm text-gray-700">Delivery Type: {order.deliveryType}</div>
          <div className="text-sm text-gray-700">Payment Method: {order.paymentMethod}</div>
          <div className={`text-sm font-semibold ${order.paymentStatus === 'Pending' ? 'text-red-600' : 'text-green-600'}`}>
            Payment Status: {order.paymentStatus}
          </div>
          <div className="text-sm text-gray-600">Phone: {order.phone}</div>
        </div>
      </div>
    </div>
  );
}
