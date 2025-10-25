'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { useGetCategoriesQuery } from '@/store/apiSlice';

export default function CategoriesPage() {
  const { state, dispatch } = useApp();
  const { data: categories, error, isLoading } = useGetCategoriesQuery();

  const handleCategoryClick = (categoryId: number) => {
    dispatch({ type: 'SET_CATEGORY', payload: categoryId });
  };

  return (
    <div
      className={`min-h-screen ${
        state.theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
      } pb-20 md:pb-0`}
    >
      <div className="max-w-4xl mx-auto p-4">
        <h1
          className={`text-2xl font-bold mb-6 ${
            state.theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}
        >
          Shop by Categories
        </h1>

        {/* ✅ Loading state */}
        {isLoading && (
          <p className="text-center text-gray-500">Loading categories...</p>
        )}

        {/* ✅ Error state */}
        {error && (
          <p className="text-center text-red-500">
            Failed to load categories. Please try again.
          </p>
        )}

        {/* ✅ Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {categories?.map((category: any) => (
            <Link
              key={category.id}
              href="/products"
              onClick={() => handleCategoryClick(category.id)}
              className="flex flex-col items-center text-center transition-all duration-200 hover:scale-105"
            >
              <div className="w-20 h-20 mb-3 rounded-full overflow-hidden shadow-sm">
                <img
                  src={category.img}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3
                className={`text-sm font-medium mb-1 leading-tight ${
                  state.theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}


// 'use client';

// import React from 'react';
// import Link from 'next/link';
// import { useApp } from '@/context/AppContext';
// import { useGetCategoriesQuery } from '@/store/apiSlice';

// export default function CategoriesPage() {
//   const { state, dispatch } = useApp();
//   const { data: categories, error, isLoading } = useGetCategoriesQuery();

//   const handleCategoryClick = (categoryId: number) => {
//     dispatch({ type: 'SET_CATEGORY', payload: categoryId });
//   };

//   return (
//     <div
//       className={`min-h-screen ${
//         state.theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
//       } pb-20 md:pb-0`}
//     >
//       <div className="max-w-4xl mx-auto p-4">
//         <h1
//           className={`text-2xl font-bold mb-6 ${
//             state.theme === 'dark' ? 'text-white' : 'text-gray-900'
//           }`}
//         >
//           Shop by Categories
//         </h1>

//         {/* ✅ Loading state */}
//         {isLoading && (
//           <p className="text-center text-gray-500">Loading categories...</p>
//         )}

//         {/* ✅ Error state */}
//         {error && (
//           <p className="text-center text-red-500">
//             Failed to load categories. Please try again.
//           </p>
//         )}

//         {/* ✅ Categories Grid */}
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
//           {categories?.map((category: any) => (
//             <Link
//               key={category.id}
//               href="/products"
//               onClick={() => handleCategoryClick(category.id)}
//               className="flex flex-col items-center text-center transition-all duration-200 hover:scale-105"
//             >
//               <div className="w-20 h-20 mb-3 rounded-full overflow-hidden shadow-sm">
//                 <img
//                   src={category.img}
//                   alt={category.name}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <h3
//                 className={`text-sm font-medium mb-1 leading-tight ${
//                   state.theme === 'dark' ? 'text-white' : 'text-gray-900'
//                 }`}
//               >
//                 {category.name}
//               </h3>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }



// 'use client';

// import React from 'react';
// import Link from 'next/link';
// import { useApp } from '@/context/AppContext';
// import { useGetCategoriesQuery } from '@/store/apiSlice';

// export default function CategoriesPage() {
//   const { state, dispatch } = useApp();
//   const { data: categories = [], error, isLoading } = useGetCategoriesQuery();

//   const handleCategoryClick = (categoryId: number) => {
//     dispatch({ type: 'SET_CATEGORY', payload: categoryId });
//   };

//   return (
//     <div className={`min-h-screen ${state.theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} pb-20 md:pb-0`}>
//       <div className="max-w-4xl mx-auto p-4">
//         <h1 className={`text-2xl font-bold mb-6 ${state.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
//           Shop by Categories
//         </h1>

//         {isLoading && <p>Loading categories...</p>}
//         {error && <p className="text-red-500">Failed to load categories</p>}

//         <div className="grid grid-cols-4 gap-6">
//           {categories.map((category) => (
//             <Link
//               key={category.id}
//               href="/products"
//               onClick={() => handleCategoryClick(category.id)}
//               className="flex flex-col items-center text-center transition-all duration-200 hover:scale-105"
//             >
//               <div className="w-20 h-20 mb-3 rounded-full overflow-hidden shadow-sm">
//                 <img
//                   src={category.img}
//                   alt={category.name}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <h3 className={`text-sm font-medium mb-1 leading-tight ${state.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
//                 {category.name}
//               </h3>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


// 'use client';

// import React from 'react';
// import Link from 'next/link';
// import { useApp } from '@/context/AppContext'; // If alias works
// import { categories } from '@/data/categories'; // make sure this path is correct

// export default function CategoriesPage() {
//   const { state, dispatch } = useApp();

//   const handleCategoryClick = (categoryId: string) => {
//     dispatch({ type: 'SET_CATEGORY', payload: categoryId });
//   };

//   return (
//     <div className={`min-h-screen ${state.theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} pb-20 md:pb-0`}>
//       <div className="max-w-4xl mx-auto p-4">
//         <h1 className={`text-2xl font-bold mb-6 ${state.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
//           Shop by Categories
//         </h1>

//         <div className="grid grid-cols-4 gap-6">
//           {categories.map((category) => (
//             <Link
//               key={category.id}
//               href="/products"
//               onClick={() => handleCategoryClick(category.id)}
//               className="flex flex-col items-center text-center transition-all duration-200 hover:scale-105"
//             >
//               <div className="w-20 h-20 mb-3 rounded-full overflow-hidden shadow-sm">
//                 <img
//                   src={category.image}
//                   alt={category.name}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <h3 className={`text-sm font-medium mb-1 leading-tight ${state.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
//                 {category.name}
//               </h3>
//               <p className={`text-xs ${state.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
//                 {category.count}
//               </p>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


