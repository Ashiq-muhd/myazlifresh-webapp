'use client'

import Header from './components/Layout/Header'
import BottomNavigation from './components/Layout/BottomNavigation'
import HomePage from './pages/HomePage'
import CheckoutBar from './components/Layout/CheckoutBar'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <HomePage />
      </main>
      <CheckoutBar />
      <BottomNavigation />
    </div>
  )
}