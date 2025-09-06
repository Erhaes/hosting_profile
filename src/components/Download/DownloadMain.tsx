"use client";
import { useEffect, useState } from "react";
import apiClient from "@/services/apiClient";

// Type definitions based on API response
interface DownloadItem {
  id: number;
  title: string;
  description: string;
  file: string;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

interface ApiResponse {
  current_page: number;
  data: DownloadItem[];
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

const fetchDownloads = async (
  page: number = 1,
  perPage: number = 2,
  search?: string
) => {
  const params = new URLSearchParams({
    page: page.toString(),
    per_page: perPage.toString(),
  });

  if (search && search.trim() !== "") {
    params.append("search", search.trim());
  }

  const response = await apiClient.get(`/downloads?${params.toString()}`);
  return response.data;
};

export default function DownloadMain() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  // const [itemsPerPage, setItemsPerPage] = useState<number>(2); // Match your backend per_page
  const itemsPerPage = 2; // Fixed for simplicity, can be made dynamic if needed
  const [apiData, setApiData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Search and filter states
  // const [searchTerm, setSearchTerm] = useState<string>("");
  // const [selectedCategory, setSelectedCategory] =
  //   useState<string>("Semua Kategori");

  // Categories for filter (you can modify this based on your needs)
  // const categories = ["Semua Kategori", "Pedoman", "Template", "Panduan"];

  // Fetch data from API
  useEffect(() => {
    const loadDownloads = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchDownloads(
          currentPage,
          itemsPerPage,
          // searchTerm
        );
        setApiData(data);
      } catch (err) {
        console.error("Failed to fetch downloads:", err);
        setError("Gagal memuat data download. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    };

    // Debounce search
    const timeoutId = setTimeout(loadDownloads, 300);
    return () => clearTimeout(timeoutId);
  }, [currentPage, itemsPerPage /*, searchTerm, selectedCategory*/]);

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
  //   setCurrentPage(1); // Reset to first page when changing items per page
  // };

  // Handle search
  // const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchTerm(e.target.value);
  //   setCurrentPage(1); // Reset to first page when searching
  // };

  // Generate page numbers for pagination
  const generatePageNumbers = () => {
    if (!apiData) return [];

    const totalPages = apiData.last_page;
    const current = apiData.current_page;
    const pages = [];

    // Show maximum 7 pages
    const maxVisible = 7;

    if (totalPages <= maxVisible) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      // Calculate start and end of middle pages
      const start = Math.max(2, current - 2);
      const end = Math.min(totalPages - 1, current + 2);

      // Add ellipsis after first page if needed
      if (start > 2) {
        pages.push("...");
      }

      // Add middle pages
      for (let i = start; i <= end; i++) {
        if (i > 1 && i < totalPages) {
          pages.push(i);
        }
      }

      // Add ellipsis before last page if needed
      if (end < totalPages - 1) {
        pages.push("...");
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  // Helper function to format download URL
  const getDownloadUrl = (filePath: string) => {
    return `${
      process.env.NEXT_PUBLIC_STORAGE_URL || "https://reservasi.labsipilunsoed.com/"
    }/storage/${filePath}`;
  };

  if (loading) {
    return (
      <section className="py-16 bg-light-base text-dark-base section-padding-x">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sipil-base mx-auto mb-4"></div>
              <p>Memuat data...</p>
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
  const downloads = apiData?.data || [];

  return (
    <section className="py-16 bg-light-base text-dark-base section-padding-x">
      <div className="max-w-screen-xl mx-auto">
        {/* Filter dan Pencarian */}
        {/* <div className="bg-white rounded-lg p-4 md:p-6 shadow-md mb-8 small-font-size">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <label
                htmlFor="search"
                className="block mb-2 text-gray-700 font-medium"
              >
                Cari Dokumen
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="search"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sipil-base"
                  placeholder="Cari berdasarkan judul atau deskripsi..."
                  value={searchTerm}
                  onChange={handleSearchChange}
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
                htmlFor="category"
                className="block mb-2 text-gray-700 font-medium"
              >
                Filter Kategori
              </label>
              <select
                id="category"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sipil-base appearance-none bg-white"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 extra-small-font-size">
            <div className="text-gray-600 flex items-center">
              <span>Menampilkan </span>
              <select
                className="mx-2 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sipil-base"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
              >
                <option value="2">2</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
              </select>
              <span>dari {apiData?.total || 0} dokumen</span>
            </div>

            {apiData && (
              <div className="text-gray-600">
                Halaman {apiData.current_page} dari {apiData.last_page}
              </div>
            )}
          </div>
        </div> */}

        {/* Tabel Dokumen */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden extra-small-font-size">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-sipil-base text-white">
                  <th className="px-4 py-2 md:px-6 md:py-3 text-left w-12">
                    No
                  </th>
                  <th className="px-4 py-2 md:px-6 md:py-3 text-left">Judul</th>
                  <th className="px-4 py-2 md:px-6 md:py-3 text-left">
                    Keterangan
                  </th>
                  <th className="px-4 py-2 md:px-6 md:py-3 text-center">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {downloads.length > 0 ? (
                  downloads.map((item, index) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 md:px-6 md:py-3 whitespace-nowrap">
                        {((apiData?.current_page || 1) - 1) *
                          (apiData?.per_page || itemsPerPage) +
                          index +
                          1}
                      </td>
                      <td className="px-4 py-2 md:px-6 md:py-3">
                        <div className="font-medium text-sipil-base">
                          {item.title}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Tanggal:{" "}
                          {new Date(item.created_at).toLocaleDateString(
                            "id-ID",
                            { day: "numeric", month: "long", year: "numeric" }
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-2 md:px-6 md:py-3">
                        <p className="text-gray-600 line-clamp-2 extra-small-font-size">
                          {item.description}
                        </p>
                      </td>
                      <td className="px-4 py-2 md:px-6 md:py-3 text-center whitespace-nowrap">
                        <a
                          href={getDownloadUrl(item.file)}
                          className="inline-flex items-center gap-1 bg-sipil-base text-white py-2 px-4 rounded-md hover:bg-sipil-secondary transition-colors duration-200"
                          download
                          target="_blank"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32z" />
                            <path d="M64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64z" />
                          </svg>
                          Unduh
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center">
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
                          Tidak ada dokumen yang ditemukan
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
          {apiData && apiData.last_page > 1 && (
            <div className="px-4 py-2 md:px-6 md:py-3 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <button
                  className="px-3 py-1 md:px-4 md:py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed small-font-size"
                  onClick={() => handlePageChange(apiData.current_page - 1)}
                  disabled={!apiData.prev_page_url}
                >
                  Sebelumnya
                </button>

                <div className="flex items-center gap-1">
                  {pageNumbers.map((page, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        typeof page === "number" && handlePageChange(page)
                      }
                      className={`px-3 py-1 text-sm rounded-md ${
                        page === apiData.current_page
                          ? "bg-sipil-base text-white"
                          : page === "..."
                          ? "bg-transparent text-gray-400 cursor-default"
                          : "bg-white border border-gray-300 hover:bg-gray-50"
                      }`}
                      disabled={page === "..."}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  className="px-3 py-1 md:px-4 md:py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed small-font-size"
                  onClick={() => handlePageChange(apiData.current_page + 1)}
                  disabled={!apiData.next_page_url}
                >
                  Selanjutnya
                </button>
              </div>

              {/* Pagination info */}
              <div className="mt-2 text-center text-xs text-gray-500">
                Menampilkan {apiData.from} - {apiData.to} dari {apiData.total}{" "}
                data
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
