import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-400 py-12 mt-12 border-t border-zinc-800">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="relative w-24 h-24 mb-6 overflow-hidden">
            <Image 
              src="/images/iqiyi.png" 
              alt="Logo" 
              fill
              className="object-contain drop-shadow-md hover:scale-105 transition-transform duration-300"
              unoptimized
            />
          </div>
          <p className="text-sm leading-relaxed">
            Xem phim trực tuyến chất lượng cao miễn phí. Cập nhật phim mới nhất, phim hành động, tình cảm, hài hước, kinh dị, viễn tưởng...
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Phim Mới</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/danh-sach/phim-le" className="hover:text-emerald-400 transition-colors">Phim Lẻ Mới</Link></li>
            <li><Link href="/danh-sach/phim-bo" className="hover:text-emerald-400 transition-colors">Phim Bộ Mới</Link></li>
            <li><Link href="/danh-sach/hoat-hinh" className="hover:text-emerald-400 transition-colors">Phim Hoạt Hình</Link></li>
            <li><Link href="/danh-sach/tv-shows" className="hover:text-emerald-400 transition-colors">TV Shows</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Thông Tin</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="#" className="hover:text-emerald-400 transition-colors">Điều khoản sử dụng</Link></li>
            <li><Link href="#" className="hover:text-emerald-400 transition-colors">Chính sách bảo mật</Link></li>
            <li><Link href="#" className="hover:text-emerald-400 transition-colors">Khiếu nại bản quyền</Link></li>
            <li><Link href="#" className="hover:text-emerald-400 transition-colors">Liên hệ</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Theo dõi chúng tôi</h4>
          <p className="text-sm mb-4">Nhận thông báo về phim mới nhất.</p>
          <div className="flex gap-2">
            <input type="email" placeholder="Email của bạn" className="bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm w-full focus:outline-none focus:border-emerald-500" />
            <button className="bg-emerald-500 text-white px-4 py-2 rounded text-sm hover:bg-emerald-600 transition-colors">Gửi</button>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 pt-8 border-t border-zinc-800 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
      </div>
    </footer>
  );
}
