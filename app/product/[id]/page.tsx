// app/product/[id]/page.tsx
'use client';

import { useGetProductByIdQuery } from '@/store/apiSlice'; // ✅ RTK Query hook
import ProductDetailPage from '@/pages/ProductDetailPage';
import { AppProvider } from '@/context/AppContext';
import Header from '@/components/Layout/Header';
import BottomNavigation from '@/components/Layout/BottomNavigation';

type ProductDetailProps = {
  params: {
    id: string;
  };
};

// ✅ Fix for static export: return empty params
export async function generateStaticParams() {
  return [];
}

export default function ProductPage({ params }: ProductDetailProps) {
  const { id } = params;
  const { data: product, isLoading, isError } = useGetProductByIdQuery(id);

  if (isLoading) {
    return <div className="p-6 text-center">Loading product...</div>;
  }

  if (isError || !product) {
    return <div className="p-6 text-center text-red-500">Product not found</div>;
  }

  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="p-4">
          <ProductDetailPage product={product} />
        </main>
        <BottomNavigation />
      </div>
    </AppProvider>
  );
}


// // app/product/[id]/page.tsx
// 'use client';

// import { useGetProductByIdQuery } from '@/store/apiSlice'; // ✅ RTK Query hook
// import ProductDetailPage from '@/pages/ProductDetailPage';
// import { AppProvider } from '@/context/AppContext';
// import Header from '@/components/Layout/Header';
// import BottomNavigation from '@/components/Layout/BottomNavigation';

// type ProductDetailProps = {
//   params: {
//     id: string;
//   };
// };

// export default function ProductPage({ params }: ProductDetailProps) {
//   const { id } = params;
//   const { data: product, isLoading, isError } = useGetProductByIdQuery(id);

//   if (isLoading) {
//     return <div className="p-6 text-center">Loading product...</div>;
//   }

//   if (isError || !product) {
//     return <div className="p-6 text-center text-red-500">Product not found</div>;
//   }

//   return (
//     <AppProvider>
//       <div className="min-h-screen bg-gray-50">
//         <Header />
//         <main className="p-4">
//           <ProductDetailPage product={product} />
//         </main>
//         <BottomNavigation />
//       </div>
//     </AppProvider>
//   );
// }
