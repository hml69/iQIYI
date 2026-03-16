import React from 'react';
import { ophimService } from '@/services/ophim';
import MovieCard from '@/components/movie/MovieCard';
import Pagination from '@/components/ui/Pagination';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export const revalidate = 3600;

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const { page } = await searchParams;
  const currentPage = parseInt(page || '1', 10);

  let data;
  try {
    // Check if it's a type or category
    if (['phim-le', 'phim-bo', 'hoat-hinh', 'tv-shows'].includes(slug)) {
      data = await ophimService.getMoviesList(slug, currentPage);
    } else {
      data = await ophimService.getMoviesByCategory(slug, currentPage);
    }
    if (!data.status) return notFound();
  } catch (error) {
    return notFound();
  }

  const movies = data.data?.items || data.items || [];
  const title = data.data?.titlePage || data.data?.seoOnPage?.titleHead || 'Danh Sách Phim';
  const paginationData = data.data?.params?.pagination || { totalItems: 0, totalItemsPerPage: 24, currentPage: 1 };
  const totalPages = Math.ceil(paginationData.totalItems / paginationData.totalItemsPerPage) || 1;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-8 border-l-4 border-emerald-500 pl-4 uppercase tracking-wider">
        {title}
      </h1>

      {movies.length === 0 ? (
        <p className="text-zinc-400 text-center py-12">Không tìm thấy phim nào.</p>
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
            basePath={`/danh-sach/${slug}`} 
          />
        </>
      )}
    </div>
  );
}
