// 'use client';

// import React from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useGetRegionalSpecialsQuery } from '@/store/apiSlice';

// export default function RegionalSpecials() {
//   const { data: regions = [], isLoading, isError } = useGetRegionalSpecialsQuery();

//   if (isLoading) {
//     return <p className="px-4 text-gray-500">Loading Regional Specials...</p>;
//   }

//   if (isError) {
//     return <p className="px-4 text-red-500">Failed to load Regional Specials</p>;
//   }

//   if (!regions.length) {
//     return null; // don’t render if backend returned empty
//   }

//   const first = regions[0];
//   const rest = regions.slice(1);

//   return (
//     <div className="px-4 py-4">
//       <h2 className="text-lg font-semibold mb-2">Regional Specials</h2>

//       <div className="overflow-x-auto pb-2 scrollbar-none" style={{ scrollbarWidth: 'none' }}>
//         <div className="flex gap-4 w-max">
//           {/* First image spans two rows */}
//           <Link
//             href={`/regional/${first.slug ?? first.id}`}
//             className="flex flex-col justify-between rounded-xl shadow overflow-hidden hover:shadow-lg hover:scale-[1.01] transition-all"
//             style={{ minWidth: '160px', height: '280px' }}
//           >
//             <Image
//               src={first.img}
//               alt={first.name}
//               width={160}
//               height={280}
//               className="object-cover w-full h-full"
//             />
//           </Link>

//           {/* Group the rest into 2-row columns */}
//           {Array.from({ length: Math.ceil(rest.length / 2) }).map((_, colIdx) => {
//             const item1 = rest[colIdx * 2];
//             const item2 = rest[colIdx * 2 + 1];

//             return (
//               <div key={colIdx} className="flex flex-col gap-4">
//                 {item1 && (
//                   <Link
//                     href={`/regional/${item1.slug ?? item1.id}`}
//                     className="rounded-xl shadow overflow-hidden hover:shadow-md hover:scale-[1.01] transition-all"
//                   >
//                     <Image
//                       src={item1.img}
//                       alt={item1.name}
//                       width={160}
//                       height={130}
//                       className="object-cover w-full h-[130px]"
//                     />
//                   </Link>
//                 )}
//                 {item2 && (
//                   <Link
//                     href={`/regional/${item2.slug ?? item2.id}`}
//                     className="rounded-xl shadow overflow-hidden hover:shadow-md hover:scale-[1.01] transition-all"
//                   >
//                     <Image
//                       src={item2.img}
//                       alt={item2.name}
//                       width={160}
//                       height={130}
//                       className="object-cover w-full h-[130px]"
//                     />
//                   </Link>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }




'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useGetRegionalSpecialsQuery } from '@/store/apiSlice';

export default function RegionalSpecials() {
  const { data: regions = [], isLoading, isError } = useGetRegionalSpecialsQuery();

  if (isLoading) {
    return <p className="px-4 text-gray-500">Loading Regional Specials...</p>;
  }

  if (isError) {
    return <p className="px-4 text-red-500">Failed to load Regional Specials</p>;
  }

  if (!regions.length) {
    return null; // don't render if backend returned empty
  }

  const first = regions[0];
  const rest = regions.slice(1);

  return (
    <div className="px-4 py-4">
      <h2 className="text-lg font-semibold mb-2">Regional Specials</h2>

      <div className="overflow-x-auto pb-2 scrollbar-none" style={{ scrollbarWidth: 'none' }}>

        <div className="flex gap-4 w-max">
          {/* First image spans two rows */}
          <Link
            href={`/regional/${first.slug || first.id}`}
            className="flex flex-col justify-between rounded-xl shadow overflow-hidden hover:shadow-lg hover:scale-[1.01] transition-all"
            style={{ minWidth: '160px', height: '280px' }}
          >
            <Image
              src={first.img || first.image}
              alt={first.name || first.id}
              width={160}
              height={280}
              className="object-cover w-full h-full"
            />
          </Link>

          {/* Group the rest into 2-row columns */}
          {Array.from({ length: Math.ceil(rest.length / 2) }).map((_, colIdx) => {
            const item1 = rest[colIdx * 2];
            const item2 = rest[colIdx * 2 + 1];

            return (
              <div key={colIdx} className="flex flex-col gap-4">
                {item1 && (
                  <Link
                    href={`/regional/${item1.slug || item1.id}`}
                    className="rounded-xl shadow overflow-hidden hover:shadow-md hover:scale-[1.01] transition-all"
                  >
                    <Image
                      src={item1.img || item1.image}
                      alt={item1.name || item1.id}
                      width={160}
                      height={130}
                      className="object-cover w-full h-[130px]"
                    />
                  </Link>
                )}
                {item2 && (
                  <Link
                    href={`/regional/${item2.slug || item2.id}`}
                    className="rounded-xl shadow overflow-hidden hover:shadow-md hover:scale-[1.01] transition-all"
                  >
                    <Image
                      src={item2.img || item2.image}
                      alt={item2.name || item2.id}
                      width={160}
                      height={130}
                      className="object-cover w-full h-[130px]"
                    />
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
