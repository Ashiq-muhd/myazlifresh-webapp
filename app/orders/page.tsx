'use client'

import { AppProvider } from '../context/AppContext'
import Header from '../components/Layout/Header'
import BottomNavigation from '../components/Layout/BottomNavigation'
import OrdersPage from '../pages/OrdersPage'

export default function Orders() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <OrdersPage />
        </main>
        <BottomNavigation />
      </div>
    </AppProvider>
  )
}