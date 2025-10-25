'use client'

// import { AppProvider } from '../context/AppContext'
import { useApp, AppProvider } from '@/context/AppContext';
// import Header from '../components/Layout/Header'
import Header from '@/components/Layout/Header';
import BottomNavigation from '@/components/Layout/BottomNavigation';
import ProductsPage from '../pages/ProductsPage'

export default function Products() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <ProductsPage />
        </main>
        <BottomNavigation />
      </div>
    </AppProvider>
  )
}