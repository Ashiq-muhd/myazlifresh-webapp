'use client'

// import { AppProvider } from '../context/AppContext'
import { useApp } from '@/context/AppContext';
import { AppProvider } from '@/context/AppContext';
import Header from '../components/Layout/Header'
import BottomNavigation from '../components/Layout/BottomNavigation'
import CategoriesPage from '../pages/CategoriesPage'

export default function Categories() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <CategoriesPage />
        </main>
        <BottomNavigation />
      </div>
    </AppProvider>
  )
}