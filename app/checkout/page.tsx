'use client'

import Header from '@/components/Layout/Header'
import BottomNavigation from '@/components/Layout/BottomNavigation'
import CheckoutPage from '@/pages/CheckoutPage'

export default function Checkout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <CheckoutPage />
      </main>
      <BottomNavigation />
    </div>
  )
}