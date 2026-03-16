import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BannerPopup from '@/components/ads/BannerPopup';
import StickyBanner from '@/components/ads/StickyBanner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'iQIYI - Xem Phim Trực Tuyến Miễn Phí',
  description: 'Website xem phim trực tuyến chất lượng cao, cập nhật phim mới liên tục.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="dark">
      <body className={`${inter.className} bg-[#141414] text-zinc-300 min-h-screen flex flex-col antialiased`}>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <BannerPopup />
        <StickyBanner />
      </body>
    </html>
  );
}
