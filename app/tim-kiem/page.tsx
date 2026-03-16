import React from 'react';
import { ophimService } from '@/services/ophim';
import MovieCard from '@/components/movie/MovieCard';
import Pagination from '@/components/ui/Pagination';
import Link from 'next/link';

export const revalidate = 0; // Dynamic page

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ keyword?: string; page?: string }>;
}) {
  const { keyword, page } = await searchParams;
  const currentPage = parseInt(page || '1', 10);
  const query = keyword || '';

  let data;
  try {
    if (query) {
      data = await ophimService.searchMovies(query, currentPage);
    }
  } catch (error) {
    console.error('Search error', error);
  }

  const movies = data?.data?.items || [];
  const paginationData = data?.data?.params?.pagination || { totalItems: 0, totalItemsPerPage: 24, currentPage: 1 };
  const totalPages = Math.ceil(paginationData.totalItems / paginationData.totalItemsPerPage) || 1;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-8 border-l-4 border-emerald-500 pl-4 uppercase tracking-wider">
        Tìm kiếm: <span className="text-emerald-500">{query}</span>
      </h1>

      {!query ? (
        <p className="text-zinc-400 text-center py-12">Vui lòng nhập từ khóa tìm kiếm.</p>
      ) : movies.length === 0 ? (
        <p className="text-zinc-400 text-center py-12">Không tìm thấy phim nào phù hợp với từ khóa &quot;{query}&quot;.</p>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {movies.map((movie: any) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>

          {/* Pagination */}
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            basePath={`/tim-kiem?keyword=${encodeURIComponent(query)}`} 
          />
        </>
      )}
    </div>
  );
}
