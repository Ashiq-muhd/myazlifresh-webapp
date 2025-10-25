'use client'

import { AppProvider } from '../context/AppContext'
import Header from '../components/Layout/Header'
import BottomNavigation from '../components/Layout/BottomNavigation'
import CartPage from '../pages/CartPage'

export default function Cart() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <CartPage />
        </main>
        <BottomNavigation />
      </div>
    </AppProvider>
  )
}