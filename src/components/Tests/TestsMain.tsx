"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import apiClient from "@/services/apiClient";
import { Facility } from "@/types";

interface Test {
  id: number;
  name: string;
  slug: string;
  price: number;
  description: string;
  images: string[];
  minimum_unit: number;
  daily_slot: number;
  is_active: boolean;
  category_id: number;
  laboratory_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  laboratory: {
    id: number;
    name: string;
    code: string;
    slug: string;
  };
  category: {
    id: number;
    name: string;
  };
}

interface ApiResponse {
  current_page: number;
  data: Test[];
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

const fetchTests = async (
  page: number = 1,
  perPage: number = 8,
  search: string = "",
  labId: string = "",
  activeOnly: boolean = true
) => {
  const params = new URLSearchParams({
    page: page.toString(),
    per_page: perPage.toString(),
  });

  if (search.trim() !== "") {
    params.append("search", search);
  }

  if (labId && labId !== "all") {
    params.append("laboratory_id", labId);
  }

  if (activeOnly) {
    params.append("is_active", "1");
  }

  const response = await apiClient.get(`/tests?${params.toString()}`);
  return response.data;
};

export default function TestsMain() {
  // const [searchQuery, setSearchQuery] = useState<string>("");
  const searchQuery: string = ""; // Explicit typing for consistency
  // const [selectedLab, setSelectedLab] = useState<string>("all");
  const selectedLab: string = "all"; // Explicit typing for consistency
  // const [showActiveOnly, setShowActiveOnly] = useState<boolean>(true);
  const showActiveOnly: boolean = true; // Explicit typing for consistency
  const [apiData, setApiData] = useState<ApiResponse | null>(null);
  const [laboratories, setLaboratories] = useState<
    Array<{ id: string; name: string }>
  >([{ id: "all", name: "Semua Laboratorium" }]);
  console.log("Initial laboratories:", laboratories);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  console.log("Initial laboratories:", dropdownOpen);
  const [currentPage, setCurrentPage] = useState<number>(1);
  // const [itemsPerPage, setItemsPerPage] = useState<number>(8);
  const itemsPerPage: number = 8; // Fixed items per page for simplicity
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  // Fetch laboratories for filter dropdown
  useEffect(() => {
    const fetchLaboratories = async () => {
      try {
        const response = await apiClient.get("/labs");
        const labs = response.data.data.map((lab: Facility) => ({
          id: lab.id.toString(),
          name: lab.name,
        }));
        setLaboratories([{ id: "all", name: "Semua Laboratorium" }, ...labs]);
      } catch (err) {
        console.error("Failed to fetch laboratories:", err);
      }
    };

    fetchLaboratories();
  }, []);

  // Fetch tests data from API
  useEffect(() => {
    const loadTests = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchTests(
          currentPage,
          itemsPerPage,
          searchQuery,
          selectedLab,
          showActiveOnly
        );
        setApiData(data);
      } catch (err) {
        console.error("Failed to fetch tests:", err);
        setError("Gagal memuat data pengujian. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    };

    loadTests();
  }, [currentPage, itemsPerPage, selectedLab, showActiveOnly]);

  // Handle search with debounce
  useEffect(() => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const timeout = setTimeout(() => {
      const loadSearchResults = async () => {
        try {
          setLoading(true);
          setError(null);
          setCurrentPage(1); // Reset to first page on search
          const data = await fetchTests(
            1,
            itemsPerPage,
            searchQuery,
            selectedLab,
            showActiveOnly
          );
          setApiData(data);
        } catch (err) {
          console.error("Failed to search tests:", err);
          setError("Gagal mencari pengujian. Silakan coba lagi.");
        } finally {
          setLoading(false);
        }
      };

      loadSearchResults();
    }, 500); // 500ms debounce

    setSearchTimeout(timeout);

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [searchQuery, itemsPerPage, selectedLab, showActiveOnly]);

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
  //   setCurrentPage(1); // Reset to first page
  // };

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

  // Get selected lab name for display
  // const selectedLabName =
  //   laboratories.find((lab) => lab.id === selectedLab)?.name ||
  //   "Semua Laboratorium";

  const pageNumbers = generatePageNumbers();
  const tests = apiData?.data || [];

  console.log("Tests data:", tests);

  return (
    <section className="bg-light-base text-dark-base section-padding-x py-16">
      <div className="max-w-screen-xl mx-auto">
        {/* Filter Controls */}
        <div className="mb-4">
          {/* <div className="flex flex-col md:flex-row gap-4 md:items-center mb-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Cari pengujian..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-sipil-base"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="relative w-full md:w-64" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex justify-between items-center w-full px-4 py-2 text-sm font-medium bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-sipil-base"
              >
                <span>{selectedLabName}</span>
                <svg
                  className="w-5 h-5 ml-2 -mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md overflow-auto focus:outline-none">
                  <div className="py-1">
                    {laboratories.map((lab) => (
                      <button
                        key={lab.id}
                        onClick={() => {
                          setSelectedLab(lab.id);
                          setDropdownOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                          selectedLab === lab.id
                            ? "bg-gray-100 text-sipil-base font-medium"
                            : "text-gray-700"
                        }`}
                      >
                        {lab.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={showActiveOnly}
                  onChange={() => setShowActiveOnly(!showActiveOnly)}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-sipil-base rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-sipil-base"></div>
                <span className="ms-3 text-sm font-medium text-gray-700">
                  Aktif saja
                </span>
              </label>
            </div>
          </div>
          <div className="flex flex-wrap justify-between items-center text-sm">
            <div className="text-gray-600 flex items-center mb-2 md:mb-0">
              {apiData && (
                <>
                  <span>Menampilkan </span>
                  <select
                    className="mx-2 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-sipil-base"
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                  >
                    <option value="4">4</option>
                    <option value="8">8</option>
                    <option value="12">12</option>
                  </select>
                  <span>
                    dari {apiData.total} pengujian ({apiData.from || 0}-
                    {apiData.to || 0})
                  </span>
                </>
              )}
            </div>
          </div> */}
        </div>

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
            <p className="text-gray-600">Memuat data pengujian...</p>
          </div>
        )}

        {/* Tests Grid */}
        {!loading && tests.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tests.map((test) => (
              <div
                key={test.id}
                className={`group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow ${
                  !test.is_active ? "opacity-70" : ""
                }`}
              >
                <div className="relative h-48">
                  <img
                    src={`${
                      process.env.NEXT_PUBLIC_API_BASE_URL ||
                      "https://reservasi.labsipilunsoed.com"
                    }/storage/${test.images[0]}`}
                    alt={test.name}
                    className="object-cover w-full h-full"
                  />

                  {!test.is_active && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="px-3 py-1 bg-red-500 text-white text-sm font-medium rounded-full">
                        Tidak Tersedia
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-lg font-bold text-sipil-base">
                      {test.name}
                    </h2>
                    {test.is_active && (
                      <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        Tersedia
                      </span>
                    )}
                  </div>

                  <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                    {test.description}
                  </p>

                  <div className="flex flex-col gap-2 mb-4 text-sm">
                    <div className="flex items-center gap-1 text-gray-600">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                      <span>{test.laboratory.name}</span>
                    </div>

                    <div className="flex items-center gap-1 text-gray-600">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                      <span>Min. {test.minimum_unit} sampel</span>
                    </div>

                    <div className="flex items-center gap-1 text-gray-600">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span>{test.daily_slot} slot per hari</span>
                    </div>
                  </div>

                  <Link
                    href={`/pengujian/${test.slug}`}
                    className={`inline-flex items-center px-4 py-2 bg-sipil-base text-white rounded-md hover:bg-sipil-secondary transition-colors ${
                      !test.is_active
                        ? "opacity-50 cursor-not-allowed pointer-events-none"
                        : ""
                    }`}
                  >
                    <span>Detail Pengujian</span>
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state when no tests match the filter */}
        {!loading && tests.length === 0 && (
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
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Tidak ada layanan pengujian ditemukan
            </h3>
            <p className="text-gray-500">
              {searchQuery
                ? `Tidak ada pengujian yang cocok dengan pencarian "${searchQuery}"`
                : "Tidak ada layanan pengujian yang sesuai dengan filter Anda"}
            </p>
          </div>
        )}

        {!loading && apiData && apiData.last_page > 1 && (
          <div className="flex justify-center mt-8">
            <nav className="flex items-center">
              <button
                onClick={() => handlePageChange(apiData.current_page - 1)}
                disabled={!apiData.prev_page_url}
                className="px-3 py-2 border border-gray-300 bg-white rounded-l-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                &laquo; Prev
              </button>

              <div className="hidden md:flex">
                {pageNumbers.map((pageNum, index) => {
                  const prevPage = pageNumbers[index - 1];
                  const showEllipsis = prevPage && pageNum - prevPage > 1;

                  return (
                    <div key={pageNum} className="flex">
                      {showEllipsis && (
                        <span className="px-4 py-2 border-t border-b border-gray-300 bg-white">
                          ...
                        </span>
                      )}
                      <button
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-4 py-2 border-t border-b border-gray-300 ${
                          apiData.current_page === pageNum
                            ? "bg-sipil-base text-white"
                            : "bg-white text-gray-700"
                        }`}
                      >
                        {pageNum}
                      </button>
                    </div>
                  );
                })}
              </div>

              <span className="md:hidden px-4 py-2 border-t border-b border-gray-300 bg-white">
                {apiData.current_page} / {apiData.last_page}
              </span>

              <button
                onClick={() => handlePageChange(apiData.current_page + 1)}
                disabled={!apiData.next_page_url}
                className="px-3 py-2 border border-gray-300 bg-white rounded-r-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next &raquo;
              </button>
            </nav>
          </div>
        )}
      </div>
    </section>
  );
}
