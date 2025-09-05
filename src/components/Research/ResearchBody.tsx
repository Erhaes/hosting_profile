"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import apiClient from "@/services/apiClient";

// Type definitions based on API response
interface ResearchItem {
  id: number;
  title: string;
  author: string[];
  abstract: string;
  year: string;
  publication: string;
  keywords: string[];
  link: string;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

interface ApiResponse {
  current_page: number;
  data: ResearchItem[];
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

const fetchResearch = async (
  page: number = 1,
  perPage: number = 8,
  search?: string
) => {
  const params = new URLSearchParams({
    page: page.toString(),
    per_page: perPage.toString(),
  });

  if (search && search.trim() !== "") {
    params.append("search", search.trim());
  }

  const response = await apiClient.get(`/research?${params.toString()}`);
  return response.data;
};

export default function ResearchMain() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  // const [itemsPerPage, setItemsPerPage] = useState<number>(8);
  const itemsPerPage = 8; // Fixed items per page for simplicity
  const [apiData, setApiData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Search and filter states
  // const [searchTerm, setSearchTerm] = useState<string>("");
  const searchTerm = ""
  // const [selectedYear, setSelectedYear] = useState<string>("Semua Tahun");
  const selectedYear = "Semua Tahun"; // Fixed for simplicity

  // Get unique years from data for filter
  // const getUniqueYears = () => {
  //   if (!apiData?.data) return ["Semua Tahun"];
  //   const years = [...new Set(apiData.data.map((item) => item.year))];
  //   return ["Semua Tahun", ...years.sort().reverse()];
  // };

  // Fetch data from API
  useEffect(() => {
    const loadResearch = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchResearch(currentPage, itemsPerPage, searchTerm);
        setApiData(data);
      } catch (err) {
        console.error("Failed to fetch research:", err);
        setError("Gagal memuat data penelitian. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    };

    // Debounce search
    const timeoutId = setTimeout(loadResearch, 300);
    return () => clearTimeout(timeoutId);
  }, [currentPage, itemsPerPage, searchTerm]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle items per page change
  // const handleItemsPerPageChange = (
  //   e: React.ChangeEvent<HTMLSelectElement>
  // ) => {
  //   setItemsPerPage(Number(e.target.value));
  //   setCurrentPage(1);
  // };

  // Generate page numbers for pagination
  const generatePageNumbers = () => {
    if (!apiData) return [];

    const totalPages = apiData.last_page;
    const current = apiData.current_page;
    const pages = [];

    const maxVisible = 7;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      const start = Math.max(2, current - 2);
      const end = Math.min(totalPages - 1, current + 2);

      if (start > 2) {
        pages.push("...");
      }

      for (let i = start; i <= end; i++) {
        if (i > 1 && i < totalPages) {
          pages.push(i);
        }
      }

      if (end < totalPages - 1) {
        pages.push("...");
      }

      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  // Helper function to format authors
  const formatAuthors = (authors: string[]) => {
    if (authors.length === 0) return "Tidak ada penulis";
    if (authors.length === 1) return authors[0];
    if (authors.length === 2) return authors.join(" dan ");
    return `${authors.slice(0, -1).join(", ")} dan ${
      authors[authors.length - 1]
    }`;
  };

  // Helper function to format keywords
  // const formatKeywords = (keywords: string[]) => {
  //   return keywords.join(", ");
  // };

  // Filter research by year (client-side filtering)
  const filteredResearch =
    apiData?.data?.filter(
      (item) => selectedYear === "Semua Tahun" || item.year === selectedYear
    ) || [];

  // Get available years for the filter dropdown
  // const availableYears = getUniqueYears();

  if (loading) {
    return (
      <section className="py-16 bg-light-base text-dark-base section-padding-x">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sipil-base mx-auto mb-4"></div>
              <p>Memuat data penelitian...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-light-base text-dark-base section-padding-x">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center text-red-600">
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-sipil-base text-white rounded-md hover:bg-sipil-secondary"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </section>
    );
  }

  const pageNumbers = generatePageNumbers();
  const totalPages = apiData?.last_page || 1;

  return (
    <section className="py-16 bg-light-base text-dark-base section-padding-x">
      <div className="max-w-screen-xl mx-auto">
        {/* Search and Filter Section */}
        {/* <div className="bg-light-base rounded-lg p-4 md:p-6 shadow-md mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <label
                htmlFor="search"
                className="block mb-2 text-gray-700 font-medium"
              >
                Cari Penelitian
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="search"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sipil-base"
                  placeholder="Cari berdasarkan judul, abstrak, penulis, atau kata kunci..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>

            <div className="md:w-64">
              <label
                htmlFor="year"
                className="block mb-2 text-gray-700 font-medium"
              >
                Filter Tahun
              </label>
              <select
                id="year"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sipil-base appearance-none bg-light-base"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                {availableYears.map((year, index) => (
                  <option key={index} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-gray-600 flex items-center">
              <span>Menampilkan </span>
              <select
                className="mx-2 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sipil-base"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
              >
                <option value="5">5</option>
                <option value="8">8</option>
                <option value="10">10</option>
                <option value="20">20</option>
              </select>
              <span>dari {apiData?.total || 0} penelitian</span>
            </div>
          </div>
        </div> */}

        {/* Research Table */}
        <div className="bg-light-base rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-sipil-base text-light-base">
                  <th className="px-4 py-2 md:px-6 md:py-3 text-left w-12">
                    No
                  </th>
                  <th className="px-4 py-2 md:px-6 md:py-3 text-left">
                    Judul & Penulis
                  </th>
                  <th className="px-4 py-2 md:px-6 md:py-3 text-left">
                    Abstrak
                  </th>
                  <th className="px-4 py-2 md:px-6 md:py-3 text-left">
                    Kata Kunci
                  </th>
                  <th className="px-4 py-2 md:px-6 md:py-3 text-center">
                    Publikasi
                  </th>
                  <th className="px-4 py-2 md:px-6 md:py-3 text-center">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredResearch.length > 0 ? (
                  filteredResearch.map((item, index) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 md:px-6 md:py-3 whitespace-nowrap">
                        {(apiData?.from || 0) + index}
                      </td>
                      <td className="px-4 py-2 md:px-6 md:py-3">
                        <div className="font-medium text-sipil-base">
                          {item.title}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          <div>Penulis: {formatAuthors(item.author)}</div>
                          <div>Tahun: {item.year}</div>
                        </div>
                      </td>
                      <td className="px-4 py-2 md:px-6 md:py-3">
                        <p className="text-gray-600 line-clamp-3 text-sm">
                          {item.abstract}
                        </p>
                      </td>
                      <td className="px-4 py-2 md:px-6 md:py-3">
                        <div className="flex flex-wrap gap-1">
                          {item.keywords.map((keyword, idx) => (
                            <span
                              key={idx}
                              className="inline-block px-2 py-1 bg-gray-100 text-xs rounded-full"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-2 md:px-6 md:py-3 text-center">
                        <span className="text-gray-600 text-sm line-clamp-2">
                          {item.publication}
                        </span>
                      </td>
                      <td className="px-4 py-2 md:px-6 md:py-3 text-center whitespace-nowrap">
                        <Link
                          href={item.link}
                          className="inline-flex items-center gap-1 bg-sipil-base text-light-base py-2 px-4 rounded-md hover:bg-sipil-secondary transition-colors duration-200"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                          Lihat
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <svg
                          className="w-12 h-12 text-gray-300 mb-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                        <p className="text-gray-500 text-lg font-medium">
                          Tidak ada penelitian yang ditemukan
                        </p>
                        <p className="text-gray-400 mt-1">
                          Coba ubah filter pencarian Anda
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-4 py-2 md:px-6 md:py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
              <button
                className="px-3 py-1 md:px-4 md:py-2 text-sm bg-light-base border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Sebelumnya
              </button>

              <div className="hidden md:flex items-center gap-1">
                {pageNumbers.map((page, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      typeof page === "number" && handlePageChange(page)
                    }
                    disabled={page === "..."}
                    className={`px-3 py-1 text-sm rounded-md ${
                      currentPage === page
                        ? "bg-sipil-base text-light-base"
                        : page === "..."
                        ? "cursor-default"
                        : "bg-light-base border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                className="px-3 py-1 md:px-4 md:py-2 text-sm bg-light-base border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Selanjutnya
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
