'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Input, Drawer } from 'antd';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import Image from 'next/image';

const { Search } = Input;

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  const onSearch = (value: string) => {
    if (value.trim()) {
      router.push(`/tim-kiem?keyword=${encodeURIComponent(value)}`);
      setVisible(false);
    }
  };

  const menuItems = [
    { key: '/', label: 'Trang chủ' },
    { key: '/danh-sach/phim-le', label: 'Phim lẻ' },
    { key: '/danh-sach/phim-bo', label: 'Phim bộ' },
    { key: '/danh-sach/hoat-hinh', label: 'Hoạt hình' },
    { key: '/danh-sach/tv-shows', label: 'TV Shows' },
  ];

  return (
    <header className="sticky top-0 z-50 flex flex-col w-full shadow-lg shadow-black/20">
      <div className="bg-zinc-950/90 backdrop-blur-md text-white border-b border-zinc-800/50">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-10">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="relative w-16 h-16 overflow-hidden">
              <Image 
                src="/images/iqiyi.png" 
                alt="Logo" 
                fill
                className="object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300"
                unoptimized
                referrerPolicy="no-referrer"
              />
            </div>
          </Link>
          
          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.key;
              return (
                <Link
                  key={item.key}
                  href={item.key}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    isActive 
                      ? 'bg-emerald-500/15 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]' 
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Search & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <Search
              placeholder="Tìm kiếm phim..."
              allowClear
              onSearch={onSearch}
              style={{ width: 280 }}
              className="custom-search"
            />
          </div>

          <button
            className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-zinc-800/50"
            onClick={() => setVisible(true)}
          >
            <MenuOutlined className="text-xl" />
          </button>
        </div>
      </div>
      </div>

      {/* Mobile Menu Drawer */}
      <Drawer
        placement="right"
        onClose={() => setVisible(false)}
        open={visible}
        closeIcon={<CloseOutlined className="text-zinc-400 hover:text-white text-xl" />}
        styles={{ 
          body: { padding: 0, background: '#09090b' }, 
          header: { background: '#09090b', borderBottom: '1px solid #27272a' } 
        }}
        title={
          <div className="flex items-center">
            <div className="relative w-14 h-14 overflow-hidden">
              <Image 
                src="/images/iqiyi.png" 
                alt="Logo" 
                fill
                className="object-contain drop-shadow-md"
                unoptimized
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        }
      >
        <div className="p-6 flex flex-col gap-6">
          <Search
            placeholder="Tìm kiếm phim..."
            allowClear
            onSearch={onSearch}
            size="large"
            className="w-full custom-search"
          />
          
          <nav className="flex flex-col gap-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.key;
              return (
                <Link
                  key={item.key}
                  href={item.key}
                  onClick={() => setVisible(false)}
                  className={`px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 flex items-center gap-3 ${
                    isActive 
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]' 
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50 border border-transparent'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </Drawer>
    </header>
  );
}
