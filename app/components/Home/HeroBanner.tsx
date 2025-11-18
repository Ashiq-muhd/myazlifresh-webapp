"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useApp } from "../../context/AppContext";
import { useGetBannersByTypeQuery } from "@/store/apiSlice";

export default function HeroBanner() {
  const { state } = useApp();
  const { data: rawBanners, isLoading, isError } = useGetBannersByTypeQuery({
    bannerType: "slider",
  });
  const banners = Array.isArray(rawBanners) ? rawBanners : [];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying || banners.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, banners.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    pauseAutoPlay();
  };

  const pauseAutoPlay = () => {
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
    pauseAutoPlay();
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
    pauseAutoPlay();
  };

  if (isLoading) {
    return <p className="px-4 text-gray-500">Loading banners...</p>;
  }

  if (isError) {
    return <p className="px-4 text-red-500">Failed to load banners</p>;
  }

  if (banners.length === 0) {
    return <p className="px-4 text-gray-500">No banners available</p>;
  }

  return (
    <div className="relative mx-4 my-6 overflow-hidden rounded-2xl">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {banners.map((banner: any) => (
          <div
            key={banner.id || banner.banner_id || banner.img}
            className="relative min-w-full overflow-hidden"
          >
            <Link
              href={`/product/${banner.product_id || ""}`}
              className="block w-full h-full group cursor-pointer"
              onClick={pauseAutoPlay}
            >
              <img
                src={banner.img || banner.image}
                alt={banner.alt || banner.title || "Banner"}
                className="w-full h-48 md:h-64 lg:h-80 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="text-gray-900 font-medium text-sm">
                    View Product
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

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

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_: any, index: number) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              index === currentSlide
                ? "bg-white w-6"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="absolute top-4 right-4">
        <div
          className={`w-2 h-2 rounded-full ${
            isAutoPlaying ? "bg-green-400 animate-pulse" : "bg-gray-400"
          }`}
        />
      </div>
    </div>
  );
}