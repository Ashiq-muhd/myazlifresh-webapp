'use client'

import { AppProvider } from '../context/AppContext'
import Header from '../components/Layout/Header'
import BottomNavigation from '../components/Layout/BottomNavigation'
import OrderConfirmationPage from '../pages/OrderConfirmationPage'

export default function OrderConfirmation() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <OrderConfirmationPage />
        </main>
        <BottomNavigation />
      </div>
    </AppProvider>
  )
}