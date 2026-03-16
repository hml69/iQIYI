import Link from 'next/link';
import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  queryParam?: string;
}

export default function Pagination({ currentPage, totalPages, basePath, queryParam = 'page' }: PaginationProps) {
  if (totalPages <= 1) return null;

  const maxPagesToShow = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  const createUrl = (pageNumber: number) => {
    const url = new URL(basePath, 'http://localhost');
    url.searchParams.set(queryParam, pageNumber.toString());
    return `${url.pathname}${url.search}`;
  };

  return (
    <div className="flex flex-wrap justify-center items-center mt-12 gap-2">
      {currentPage > 1 && (
        <Link
          href={createUrl(currentPage - 1)}
          className="bg-zinc-800 hover:bg-emerald-500 hover:text-white text-zinc-300 px-3 py-2 rounded transition-colors text-sm font-medium"
        >
          Trang trước
        </Link>
      )}

      {startPage > 1 && (
        <>
          <Link
            href={createUrl(1)}
            className="bg-zinc-800 hover:bg-emerald-500 hover:text-white text-zinc-300 w-10 h-10 flex items-center justify-center rounded transition-colors text-sm font-medium"
          >
            1
          </Link>
          {startPage > 2 && <span className="text-zinc-500 px-2">...</span>}
        </>
      )}

      {pages.map((page) => (
        <Link
          key={page}
          href={createUrl(page)}
          className={`w-10 h-10 flex items-center justify-center rounded transition-colors text-sm font-medium ${
            currentPage === page
              ? 'bg-emerald-500 text-white shadow-[0_0_10px_rgba(16,185,129,0.3)]'
              : 'bg-zinc-800 hover:bg-emerald-500 hover:text-white text-zinc-300'
          }`}
        >
          {page}
        </Link>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="text-zinc-500 px-2">...</span>}
          <Link
            href={createUrl(totalPages)}
            className="bg-zinc-800 hover:bg-emerald-500 hover:text-white text-zinc-300 w-10 h-10 flex items-center justify-center rounded transition-colors text-sm font-medium"
          >
            {totalPages}
          </Link>
        </>
      )}

      {currentPage < totalPages && (
        <Link
          href={createUrl(currentPage + 1)}
          className="bg-zinc-800 hover:bg-emerald-500 hover:text-white text-zinc-300 px-3 py-2 rounded transition-colors text-sm font-medium"
        >
          Trang sau
        </Link>
      )}
    </div>
  );
}
