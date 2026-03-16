import React from 'react';
import { ophimService } from '@/services/ophim';
import Image from 'next/image';
import Link from 'next/link';
import { PlayCircleFilled, InfoCircleOutlined } from '@ant-design/icons';
import { notFound } from 'next/navigation';

export const revalidate = 3600;

export default async function MovieDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let movieData;
  
  try {
    const res = await ophimService.getMovieDetail(slug);
    if (!res.status) {
      return notFound();
    }
    movieData = res;
  } catch (error) {
    return notFound();
  }

  const { movie, episodes } = movieData;
  
  const getImageUrl = (url: string) => {
    if (!url) return 'https://picsum.photos/seed/movie/300/450';
    if (url.startsWith('http')) return url;
    return `https://img.ophim.live/uploads/movies/${url}`;
  };

  const posterUrl = getImageUrl(movie.thumb_url);
  const backgroundUrl = getImageUrl(movie.poster_url);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative w-full h-[50vh] md:h-[70vh] bg-zinc-900">
        <div className="absolute inset-0">
          <Image
            src={backgroundUrl}
            alt={movie.name}
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/80 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 h-full relative z-10 flex flex-col md:flex-row items-end md:items-center pb-8 md:pb-0 gap-8">
          <div className="hidden md:block w-64 shrink-0 rounded-xl overflow-hidden shadow-2xl border-2 border-zinc-800">
            <div className="relative aspect-[2/3] w-full">
              <Image src={posterUrl} alt={movie.name} fill className="object-cover" />
            </div>
          </div>
          
          <div className="flex-1 text-white">
            <h1 className="text-3xl md:text-5xl font-bold mb-2 text-white">{movie.name}</h1>
            <h2 className="text-xl md:text-2xl text-zinc-400 mb-4">{movie.origin_name} ({movie.year})</h2>
            
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
              <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30">
                {movie.quality} - {movie.lang}
              </span>
              <span className="text-zinc-300 flex items-center gap-1">
                <InfoCircleOutlined /> {movie.time}
              </span>
              <span className="text-zinc-300">{movie.episode_current}</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {movie.category.map((cat: any) => (
                <Link key={cat.id} href={`/danh-sach/${cat.slug}`} className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-3 py-1 rounded transition-colors text-sm">
                  {cat.name}
                </Link>
              ))}
            </div>

            <div className="flex gap-4">
              <Link href={`/xem-phim/${movie.slug}`} className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 transition-all hover:scale-105 shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                <PlayCircleFilled className="text-xl" /> Xem Phim Ngay
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h3 className="text-2xl font-bold text-white mb-4 border-l-4 border-emerald-500 pl-3">Nội Dung Phim</h3>
          <div 
            className="text-zinc-400 leading-relaxed text-base md:text-lg"
            dangerouslySetInnerHTML={{ __html: movie.content }}
          />

          {/* Episodes List (if multiple) */}
          {episodes && episodes[0]?.server_data?.length > 1 && (
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-white mb-6 border-l-4 border-emerald-500 pl-3">Danh Sách Tập</h3>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
                {episodes[0].server_data.map((ep: any) => (
                  <Link 
                    key={ep.slug} 
                    href={`/xem-phim/${movie.slug}?tap=${ep.slug}`}
                    className="bg-zinc-800 hover:bg-emerald-500 hover:text-white text-zinc-300 text-center py-2 rounded transition-colors text-sm font-medium"
                  >
                    {ep.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800 h-fit">
          <h3 className="text-xl font-bold text-white mb-6 border-b border-zinc-800 pb-4">Thông Tin Chi Tiết</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex justify-between border-b border-zinc-800/50 pb-2">
              <span className="text-zinc-500">Đạo diễn</span>
              <span className="text-zinc-300 text-right">{movie.director.join(', ') || 'Đang cập nhật'}</span>
            </li>
            <li className="flex justify-between border-b border-zinc-800/50 pb-2">
              <span className="text-zinc-500">Diễn viên</span>
              <span className="text-zinc-300 text-right max-w-[60%] truncate" title={movie.actor.join(', ')}>{movie.actor.join(', ') || 'Đang cập nhật'}</span>
            </li>
            <li className="flex justify-between border-b border-zinc-800/50 pb-2">
              <span className="text-zinc-500">Quốc gia</span>
              <span className="text-zinc-300 text-right">{movie.country.map((c: any) => c.name).join(', ')}</span>
            </li>
            <li className="flex justify-between border-b border-zinc-800/50 pb-2">
              <span className="text-zinc-500">Năm phát hành</span>
              <span className="text-zinc-300 text-right">{movie.year}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-zinc-500">Trạng thái</span>
              <span className="text-emerald-400 text-right font-medium">{movie.episode_current}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
