import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PlayCircleOutlined } from '@ant-design/icons';

interface MovieCardProps {
  movie: any;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const getImageUrl = (url: string) => {
    if (!url) return 'https://picsum.photos/seed/movie/300/450';
    if (url.startsWith('http')) return url;
    return `https://img.ophim.live/uploads/movies/${url}`;
  };

  const posterUrl = getImageUrl(movie.thumb_url || movie.poster_url);

  return (
    <Link href={`/phim/${movie.slug}`} className="group relative block rounded-xl overflow-hidden shadow-lg bg-zinc-800 transition-transform duration-300 hover:-translate-y-1">
      <div className="relative aspect-[2/3] w-full">
        <Image
          src={posterUrl}
          alt={movie.name}
          fill
          className="object-cover transition-opacity duration-300 group-hover:opacity-75"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <PlayCircleOutlined className="text-5xl text-emerald-500" />
        </div>
        <div className="absolute top-2 left-2 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded shadow">
          {movie.episode_current || 'Full'}
        </div>
        {movie.quality && (
          <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow">
            {movie.quality}
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="text-white font-semibold text-sm truncate" title={movie.name}>
          {movie.name}
        </h3>
        <p className="text-zinc-400 text-xs truncate mt-1" title={movie.origin_name}>
          {movie.origin_name} ({movie.year})
        </p>
      </div>
    </Link>
  );
}
