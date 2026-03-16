'use client';

import React from 'react';
import Image from 'next/image';

export default function TopBanner() {
  return (
    <div className="w-full bg-black/90 border-b border-zinc-800 p-2 flex justify-center items-center">
      <div className="relative w-full max-w-6xl flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
        
        {/* Ad 1 */}
        <a 
          href="https://example.com/topad1" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block relative w-full max-w-[320px] h-[50px] md:h-[70px] shrink-0 bg-zinc-900 rounded overflow-hidden cursor-pointer group"
        >
          <Image
            src="https://picsum.photos/seed/topad1/320/70"
            alt="Top Advertisement 1"
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
          href="https://example.com/topad2" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block relative w-full max-w-[320px] h-[50px] md:h-[70px] shrink-0 bg-zinc-900 rounded overflow-hidden cursor-pointer group"
        >
          <Image
            src="https://picsum.photos/seed/topad2/320/70"
            alt="Top Advertisement 2"
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
          href="https://example.com/topad3" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block relative w-full max-w-[320px] h-[50px] md:h-[70px] shrink-0 bg-zinc-900 rounded overflow-hidden cursor-pointer group"
        >
          <Image
            src="https://picsum.photos/seed/topad3/320/70"
            alt="Top Advertisement 3"
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
    </div>
  );
}
