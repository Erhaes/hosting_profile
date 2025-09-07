"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import apiClient from "@/services/apiClient";
import { Equipment, Package, Test } from "@/types";

interface Laboratory {
  id: number;
  code: string;
  slug: string;
  name: string;
  room: string;
  description: string;
  images: string[];
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  equipments: Equipment[];
  packages: Package[];
  tests: Test[];
}

interface ApiResponse {
  current_page: number;
  data: Laboratory[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

const fetchFacilities = async (page: number = 1, perPage: number = 16) => {
  const params = new URLSearchParams({
    page: page.toString(),
    per_page: perPage.toString(),
  });

  const response = await apiClient.get(`/labs?${params.toString()}`);
  return response.data;
};

export default function FacilityMain() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(16);
  const [apiData, setApiData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from API
  useEffect(() => {
    const loadFacilities = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchFacilities(currentPage, itemsPerPage);
        setApiData(data);
      } catch (err) {
        console.error("Failed to fetch facilities:", err);
        setError("Gagal memuat data fasilitas. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    };

    loadFacilities();
  }, [currentPage, itemsPerPage]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Generate page numbers for pagination
  const generatePageNumbers = () => {
    if (!apiData) return [];

    const totalPages = apiData.last_page;
    const current = apiData.current_page;
    const pages = [];

    // Always show first page
    if (totalPages > 0) pages.push(1);

    // Show pages around current page
    for (
      let i = Math.max(2, current - 1);
      i <= Math.min(totalPages - 1, current + 1);
      i++
    ) {
      if (!pages.includes(i)) pages.push(i);
    }

    // Always show last page
    if (totalPages > 1 && !pages.includes(totalPages)) {
      pages.push(totalPages);
    }

    return pages.sort((a, b) => a - b);
  };

  const pageNumbers = generatePageNumbers();
  const facilities = apiData?.data || [];

  console.log("Facilities:", facilities);

  return (
    <section className="bg-light-base section-padding-x py-16">
      <div className="max-w-screen-xl mx-auto">
        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {error}
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sipil-base mx-auto mb-4"></div>
            <p className="text-gray-600">Memuat data fasilitas...</p>
          </div>
        )}

        {/* Facilities Grid */}
        {!loading && facilities.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {facilities.map((facility) => (
              <div
                key={facility.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="h-48">
                  <img
                    src={`${
                      process.env.NEXT_PUBLIC_API_BASE_URL ||
                      "https://reservasi.labsipilunsoed.com"
                    }/storage/${facility.images[0]}`}
                    alt={facility.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <a href={`/fasilitas/${facility.slug}`} className="block">
                      <h3 className="text-lg font-bold text-sipil-base line-clamp-2">
                        {facility.name}
                      </h3>
                    </a>
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-md">
                      {facility.room}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                    {facility.description}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                    <span>{facility.code}</span>
                    <span className="mx-2">•</span>
                    <span>{facility.tests.length} Pengujian</span>
                    {facility.packages.length > 0 && (
                      <>
                        <span className="mx-2">•</span>
                        <span>{facility.packages.length} Paket</span>
                      </>
                    )}
                  </div>
                  <Link
                    href={`/fasilitas/${facility.slug}`}
                    className="inline-flex items-center text-sipil-base font-medium hover:underline"
                  >
                    Lihat Detail
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && facilities.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <svg
              className="w-16 h-16 mx-auto text-gray-300 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Tidak ada fasilitas ditemukan
            </h3>
            <p className="text-gray-500">
              Tidak ada fasilitas yang tersedia saat ini
            </p>
          </div>
        )}

        {/* Pagination Controls */}
        {!loading && apiData && apiData.last_page > 1 && (
          <div className="flex justify-center mt-8">
            <nav className="flex items-center">
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(apiData.current_page - 1)}
                disabled={!apiData.prev_page_url}
                className="px-3 py-2 border border-gray-300 bg-white rounded-l-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                &laquo; Sebelumnya
              </button>

              {/* Page Numbers */}
              <div className="hidden md:flex">
                {pageNumbers.map((pageNum, index) => {
                  const prevPage = pageNumbers[index - 1];
                  const showEllipsis = prevPage && pageNum - prevPage > 1;

                  return (
                    <div key={pageNum} className="flex">
                      {showEllipsis && (
                        <span className="px-4 py-2 border-t border-b border-gray-300 bg-white text-gray-500">
                          ...
                        </span>
                      )}
                      <button
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-4 py-2 border-t border-b border-gray-300 ${
                          apiData.current_page === pageNum
                            ? "bg-sipil-base text-white"
                            : "bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Mobile page indicator */}
              <span className="md:hidden px-4 py-2 border-t border-b border-gray-300 bg-white">
                {apiData.current_page} / {apiData.last_page}
              </span>

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(apiData.current_page + 1)}
                disabled={!apiData.next_page_url}
                className="px-3 py-2 border border-gray-300 bg-white rounded-r-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Berikutnya &raquo;
              </button>
            </nav>
          </div>
        )}
      </div>
    </section>
  );
}
