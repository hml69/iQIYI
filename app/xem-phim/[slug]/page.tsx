import React from 'react';
import { ophimService } from '@/services/ophim';
import VideoPlayer from '@/components/player/VideoPlayer';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { InfoCircleOutlined, PlayCircleOutlined } from '@ant-design/icons';

export const revalidate = 3600;

export default async function WatchMoviePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ tap?: string }>;
}) {
  const { slug } = await params;
  const { tap } = await searchParams;

  let movieData;
  try {
    const res = await ophimService.getMovieDetail(slug);
    if (!res.status) return notFound();
    movieData = res;
  } catch (error) {
    return notFound();
  }

  const { movie, episodes } = movieData;
  const serverData = episodes[0]?.server_data || [];
  
  // Find the episode to play
  let currentEpisode = serverData[0];
  if (tap) {
    const found = serverData.find((ep: any) => ep.slug === tap);
    if (found) currentEpisode = found;
  }

  if (!currentEpisode) return notFound();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content: Player */}
        <div className="lg:col-span-3">
          <div className="mb-6">
            <VideoPlayer url={currentEpisode.link_embed} />
          </div>

          <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {movie.name}
            </h1>
            <h2 className="text-lg text-zinc-400 mb-4">
              {movie.origin_name} - Tập {currentEpisode.name}
            </h2>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-300 border-t border-zinc-800 pt-4">
              <span className="flex items-center gap-1">
                <InfoCircleOutlined className="text-emerald-500" /> {movie.time}
              </span>
              <span className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded text-xs">
                {movie.quality}
              </span>
              <span>{movie.year}</span>
            </div>
          </div>
        </div>

        {/* Sidebar: Episode List & Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Episode List */}
          <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <PlayCircleOutlined className="text-emerald-500" /> Danh Sách Tập
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 gap-2 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
              {serverData.map((ep: any) => {
                const isActive = ep.slug === currentEpisode.slug;
                return (
                  <Link
                    key={ep.slug}
                    href={`/xem-phim/${movie.slug}?tap=${ep.slug}`}
                    className={`text-center py-2 rounded text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-emerald-500 text-white shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                        : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                    }`}
                  >
                    {ep.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Movie Info Short */}
          <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
             <h3 className="text-xl font-bold text-white mb-4">Thông Tin</h3>
             <ul className="space-y-3 text-sm">
                <li className="flex flex-col gap-1">
                  <span className="text-zinc-500">Thể loại:</span>
                  <span className="text-zinc-300">{movie.category.map((c: any) => c.name).join(', ')}</span>
                </li>
                <li className="flex flex-col gap-1">
                  <span className="text-zinc-500">Quốc gia:</span>
                  <span className="text-zinc-300">{movie.country.map((c: any) => c.name).join(', ')}</span>
                </li>
             </ul>
             <Link href={`/phim/${movie.slug}`} className="mt-6 block text-center bg-zinc-800 hover:bg-zinc-700 text-white py-2 rounded transition-colors text-sm">
               Xem chi tiết phim
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
