'use client'

import { AppProvider } from '../context/AppContext'
import Header from '../components/Layout/Header'
import BottomNavigation from '../components/Layout/BottomNavigation'
import AccountPage from '../pages/AccountPage'

export default function Account() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <AccountPage />
        </main>
        <BottomNavigation />
      </div>
    </AppProvider>
  )
}