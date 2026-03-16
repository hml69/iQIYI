import React from 'react';
import { ophimService } from '@/services/ophim';
import MovieSlider from '@/components/movie/MovieSlider';
import MovieCard from '@/components/movie/MovieCard';
import Link from 'next/link';
import { RightOutlined } from '@ant-design/icons';
import TopBanner from '@/components/ads/TopBanner';

export const revalidate = 3600; // Revalidate every hour

const SectionHeader = ({ title, href }: { title: string; href: string }) => (
  <div className="flex justify-between items-center mb-6 mt-12">
    <h2 className="text-2xl font-bold text-white border-l-4 border-emerald-500 pl-3 uppercase tracking-wider">
      {title}
    </h2>
    <Link href={href} className="text-emerald-500 hover:text-emerald-400 flex items-center gap-1 text-sm font-medium transition-colors">
      Xem tất cả <RightOutlined className="text-xs" />
    </Link>
  </div>
);

export default async function HomePage() {
  const [newMoviesRes, moviesLeRes, moviesBoRes, hoatHinhRes] = await Promise.all([
    ophimService.getNewMovies(1),
    ophimService.getMoviesList('phim-le', 1),
    ophimService.getMoviesList('phim-bo', 1),
    ophimService.getMoviesList('hoat-hinh', 1),
  ]);

  const newMovies = newMoviesRes?.items || [];
  const moviesLe = moviesLeRes?.data?.items || [];
  const moviesBo = moviesBoRes?.data?.items || [];
  const hoatHinh = hoatHinhRes?.data?.items || [];

  return (
    <div className="flex flex-col">
      <TopBanner />
      <div className="container mx-auto px-4 py-8">
        <h1 className="sr-only">iQIYI - Xem Phim Trực Tuyến Miễn Phí</h1>
        
        {/* Phim Nổi Bật (Slider) */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white border-l-4 border-emerald-500 pl-3 uppercase tracking-wider mb-6">
          Phim Mới Cập Nhật
        </h2>
        <MovieSlider movies={newMovies} />
      </div>

      {/* Phim Lẻ */}
      <section>
        <SectionHeader title="Phim Lẻ Mới" href="/danh-sach/phim-le" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {moviesLe.slice(0, 12).map((movie: any) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      </section>

      {/* Phim Bộ */}
      <section>
        <SectionHeader title="Phim Bộ Mới" href="/danh-sach/phim-bo" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {moviesBo.slice(0, 12).map((movie: any) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      </section>

      {/* Hoạt Hình */}
      <section>
        <SectionHeader title="Hoạt Hình" href="/danh-sach/hoat-hinh" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {hoatHinh.slice(0, 12).map((movie: any) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      </section>
      </div>
    </div>
  );
}
