'use client'

import { AppProvider } from './context/AppContext'
import Header from './components/Layout/Header'
import BottomNavigation from './components/Layout/BottomNavigation'
import HomePage from './pages/HomePage'

export default function Home() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <HomePage />
        </main>
        <BottomNavigation />
      </div>
    </AppProvider>
  )
}