'use client';

import React, { useState, useEffect } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import Image from 'next/image';

export default function StickyBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000); // Show after 5 seconds
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 bg-black/80 backdrop-blur-sm border-t border-zinc-800 p-2 flex justify-center items-center shadow-[0_-10px_30px_rgba(0,0,0,0.5)] transition-transform duration-500 translate-y-0">
      <div className="relative w-full max-w-6xl flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 pr-8 md:pr-0">
        
        {/* Ad 1 */}
        <a 
          href="https://example.com/ad1" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block relative w-full max-w-[320px] h-[50px] md:h-[70px] shrink-0 bg-zinc-900 rounded overflow-hidden cursor-pointer group"
        >
          <Image
            src="https://picsum.photos/seed/stickyad1/320/70"
            alt="Advertisement 1"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
            unoptimized
          />
          <div className="absolute bottom-1 left-1 bg-black/50 text-white px-1 py-0.5 text-[10px] rounded">
            Quảng cáo
          </div>
        </a>

        {/* Ad 2 */}
        <a 
          href="https://example.com/ad2" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block relative w-full max-w-[320px] h-[50px] md:h-[70px] shrink-0 bg-zinc-900 rounded overflow-hidden cursor-pointer group"
        >
          <Image
            src="https://picsum.photos/seed/stickyad2/320/70"
            alt="Advertisement 2"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
            unoptimized
          />
          <div className="absolute bottom-1 left-1 bg-black/50 text-white px-1 py-0.5 text-[10px] rounded">
            Quảng cáo
          </div>
        </a>

        {/* Ad 3 */}
        <a 
          href="https://example.com/ad3" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block relative w-full max-w-[320px] h-[50px] md:h-[70px] shrink-0 bg-zinc-900 rounded overflow-hidden cursor-pointer group"
        >
          <Image
            src="https://picsum.photos/seed/stickyad3/320/70"
            alt="Advertisement 3"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
            unoptimized
          />
          <div className="absolute bottom-1 left-1 bg-black/50 text-white px-1 py-0.5 text-[10px] rounded">
            Quảng cáo
          </div>
        </a>

      </div>

      <button
        onClick={handleClose}
        className="absolute top-2 right-2 md:right-4 bg-zinc-800/80 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-500 transition-colors z-10 border border-zinc-700"
        aria-label="Close Ad"
      >
        <CloseOutlined className="text-[10px]" />
      </button>
    </div>
  );
}
