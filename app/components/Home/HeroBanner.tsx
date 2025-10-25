// 'use client';

// import React, { useState, useEffect } from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import Link from 'next/link';
// import { useApp } from '../../context/AppContext';
// import { useGetHeroBannersQuery } from '@/store/apiSlice';

// export default function HeroBanner() {
//   const { state } = useApp();
//   const { data: banners = [], isLoading, isError } = useGetHeroBannersQuery();
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true);

//   // Auto-slide
//   useEffect(() => {
//     if (!isAutoPlaying || banners.length === 0) return;
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % banners.length);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, [isAutoPlaying, banners.length]);

//   const goToSlide = (index: number) => {
//     setCurrentSlide(index);
//     setIsAutoPlaying(false);
//     setTimeout(() => setIsAutoPlaying(true), 10000);
//   };

//   if (isLoading) {
//     return <p className="px-4 text-gray-500">Loading banners...</p>;
//   }

//   if (isError || banners.length === 0) {
//     return <p className="px-4 text-red-500">Failed to load banners</p>;
//   }

//   return (
//     <div className="relative mx-4 my-6 overflow-hidden rounded-2xl">
//       {/* Banner Container */}
//       <div
//         className="flex transition-transform duration-500 ease-in-out"
//         style={{ transform: `translateX(-${currentSlide * 100}%)` }}
//       >
//         {banners.map((banner: any) => (
//           <div key={banner.id} className="relative min-w-full overflow-hidden">
//             <Link
//               href={`/product/${banner.product_id}`}
//               className="block w-full h-full group cursor-pointer"
//             >
//               <img
//                 src={banner.img}
//                 alt={banner.alt ?? 'Banner'}
//                 className="w-full h-48 md:h-64 lg:h-80 object-cover transition-transform duration-300 group-hover:scale-105"
//               />
//             </Link>
//           </div>
//         ))}
//       </div>

//       {/* Navigation */}
//       <button onClick={() => goToSlide((currentSlide - 1 + banners.length) % banners.length)} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 p-2 rounded-full text-white">
//         <ChevronLeft className="w-5 h-5" />
//       </button>
//       <button onClick={() => goToSlide((currentSlide + 1) % banners.length)} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 p-2 rounded-full text-white">
//         <ChevronRight className="w-5 h-5" />
//       </button>
//     </div>
//   );
// }


'use client'

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useApp } from '../../context/AppContext';

const banners = [
  {
    id: 1,
    image: "/banner/backwater2.jpg",
    alt: "Delivery focused banner",
    productId: "3" // Links to Catla Fish
  },
  {
    id: 2,
    image: "/banner/get desired fish.jpg",
    alt: "My Azli Fresh branded poster",
    productId: "1" // Links to Fresh Water Tiger Prawns
  },
  {
    id: 3,
    image: "/banner/karemeen.jpg",
    alt: "20 minutes delivery promise",
    productId: "6" // Links to Fresh Chicken Breast
  },
  {
    id: 4,
    image: "/banner/ocean to kitchen.jpg",
    alt: "Customization banner",
    productId: "9" // Links to Mutton Curry Cut
  },
  {
    id: 5,
    image: "/delivery.jpg",
    alt: "General promotional banner",
    productId: "13" // Links to Fresh Salmon Fillet
  }
];

export default function HeroBanner() {
  const { state } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds of manual interaction
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="relative mx-4 my-6 overflow-hidden rounded-2xl">
      {/* Banner Container */}
      <div 
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="relative min-w-full overflow-hidden"
          >
            <Link 
              href={`/product/${banner.productId}`}
              className="block w-full h-full group cursor-pointer"
              onClick={() => {
                setIsAutoPlaying(false);
                setTimeout(() => setIsAutoPlaying(true), 15000);
              }}
            >
              <img
                src={banner.image}
                alt={banner.alt}
                className="w-full h-48 md:h-64 lg:h-80 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* Hover overlay for better UX */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="text-gray-900 font-medium text-sm">View Product</span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-200 hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-200 hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              index === currentSlide
                ? 'bg-white w-6'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play indicator */}
      <div className="absolute top-4 right-4">
        <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`} />
      </div>
    </div>
  );
}