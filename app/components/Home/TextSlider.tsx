'use client';

import React, { useEffect, useRef } from 'react';
import { FaQuestionCircle, FaFish, FaCut } from 'react-icons/fa';

const banners = [
  {
    id: 1,
    icon: <FaQuestionCircle className="text-blue-500 text-3xl" />,
    title: 'Need Help? Meet ChatFin',
    subtitle: 'Your Smart Shopping Assistant.',
  },
  {
    id: 2,
    icon: <FaCut className="text-yellow-600 text-3xl" />,
    title: 'Your Order, Your Way!',
    subtitle: 'Choose your cut—curry, fry, or whole.',
  },
  {
    id: 3,
    icon: <FaFish className="text-green-600 text-3xl" />,
    title: 'Freshness Starts Here',
    subtitle: 'Prepare Fish Only After your order.',
  },
];

export default function TextSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const container = sliderRef.current;
      if (container) {
        container.scrollBy({
          left: container.clientWidth,
          behavior: 'smooth',
        });

        setTimeout(() => {
          if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
            container.scrollTo({ left: 0, behavior: 'smooth' });
          }
        }, 500);
      }
    }, 4000); // 4 seconds per slide

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full overflow-hidden px-4 my-4">
      <div
        ref={sliderRef}
        className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth"
      >
        {banners.map((item) => (
          <div
            key={item.id}
            className="min-w-full bg-white rounded-xl shadow-md px-4 py-4 flex items-center justify-center gap-4"
          >
            <div>{item.icon}</div>
            <div className="text-center">
              <h3 className="text-md font-semibold text-gray-800">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
