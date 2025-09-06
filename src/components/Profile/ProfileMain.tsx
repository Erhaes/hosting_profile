"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import apiClient from "@/services/apiClient";
import { TeamMember, Standard } from "@/types";

// Type definitions for Research
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

interface ResearchApiResponse {
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

export default function ProfileMain() {
  const [activeTab, setActiveTab] = useState("struktur");

  // State untuk data pejabat struktural dari API
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [teamLoading, setTeamLoading] = useState<boolean>(true);
  const [teamError, setTeamError] = useState<string | null>(null);

  // State untuk data standar laboratorium dari API
  const [standards, setStandards] = useState<Standard[]>([]);
  const [standardsLoading, setStandardsLoading] = useState<boolean>(false);
  const [standardsError, setStandardsError] = useState<string | null>(null);

  // Research states
  const [currentPage, setCurrentPage] = useState<number>(1);
  // const [itemsPerPage, setItemsPerPage] = useState<number>(8);
  const itemsPerPage = 8; // Fixed items per page for simplicity
  const [researchData, setResearchData] = useState<ResearchApiResponse | null>(
    null
  );
  const [researchLoading, setResearchLoading] = useState<boolean>(false);
  const [researchError, setResearchError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Data dummy untuk struktur organisasi
  // const strukturOrganisasi = [
  //   { nama: "Dr. Ir. Ahmad Susanto, M.T.", jabatan: "Ketua Program Studi" },
  //   { nama: "Dr. Ir. Budi Santoso, M.T.", jabatan: "Sekretaris Program Studi" },
  //   { nama: "Dr. Ir. Citra Dewi, M.T.", jabatan: "Koordinator Akademik" },
  //   { nama: "Ir. Diana Sari, M.T.", jabatan: "Koordinator Laboratorium" },
  //   { nama: "Dr. Ir. Eko Prasetyo, M.T.", jabatan: "Koordinator Penelitian" },
  //   { nama: "Ir. Fauzi Rahman, M.T.", jabatan: "Koordinator Pengabdian" },
  // ];

  // Helper function untuk mendapatkan URL gambar standar
  const getStandardImageUrl = (imagePath: string | null) => {
    if (!imagePath) {
      return "/images/accreditations/iso-certification.jpg"; // Default fallback image
    }
    return `${process.env.NEXT_PUBLIC_STORAGE_URL || "https://reservasi.labsipilunsoed.com/"}/storage/${imagePath}`;
  };

  // Helper function untuk mendapatkan URL file standar
  const getStandardFileUrl = (filePath: string | null) => {
    if (!filePath) {
      return "#"; // Return # if no file available
    }
    return `${process.env.NEXT_PUBLIC_STORAGE_URL || "https://reservasi.labsipilunsoed.com/"}/storage/${filePath}`;
  };

  // Fetch data pejabat struktural
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        setTeamLoading(true);
        const response = await apiClient.get("/team");
        setTeam(response.data.data);
        setTeamError(null);
      } catch (err) {
        console.error("Failed to fetch team data:", err);
        setTeamError("Gagal memuat data pejabat struktural.");
      } finally {
        setTeamLoading(false);
      }
    };

    if (activeTab === "struktur") {
      fetchTeam();
    }
  }, [activeTab]);

  // Fetch data standar laboratorium
  useEffect(() => {
    const fetchStandards = async () => {
      try {
        setStandardsLoading(true);
        const response = await apiClient.get("/standards");
        setStandards(response.data.data || response.data);
        setStandardsError(null);
      } catch (err) {
        console.error("Failed to fetch standards data:", err);
        setStandardsError("Gagal memuat data standar laboratorium.");
      } finally {
        setStandardsLoading(false);
      }
    };

    if (activeTab === "sertifikasi") {
      fetchStandards();
    }
  }, [activeTab]);

  // Fetch research data
  useEffect(() => {
    if (activeTab === "penelitian") {
      const loadResearch = async () => {
        try {
          setResearchLoading(true);
          setResearchError(null);
          const data = await fetchResearch(
            currentPage,
            itemsPerPage,
            searchTerm
          );
          setResearchData(data);
        } catch (err) {
          console.error("Failed to fetch research:", err);
          setResearchError("Gagal memuat data penelitian. Silakan coba lagi.");
        } finally {
          setResearchLoading(false);
        }
      };

      const timeoutId = setTimeout(loadResearch, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [activeTab, currentPage, itemsPerPage, searchTerm]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Generate page numbers for pagination
  const generatePageNumbers = () => {
    if (!researchData) return [];

    const totalPages = researchData.last_page;
    const current = researchData.current_page;
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

  const getImageUrl = (imagePath: string | null) => {
    if (!imagePath) {
      // Return path ke gambar placeholder jika tidak ada foto
      return "/images/staff/placeholder-profile.jpg"; 
    }
    return `${process.env.NEXT_PUBLIC_STORAGE_URL || "https://reservasi.labsipilunsoed.com/"}/storage/${imagePath}`;
  };

  return (
    <section className="py-8 bg-light-base text-dark-base section-padding-x">
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        {/* <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-sipil-base mb-4">
            Profil Program Studi
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Program Studi Teknik Sipil - Membangun Masa Depan dengan Fondasi
            yang Kuat
          </p>
        </div> */}

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto scrollbar-hide py-2 space-x-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => {
              setActiveTab("struktur");
              if (activeTab === "penelitian") {
                setCurrentPage(1);
                setSearchTerm("");
              }
            }}
            className={`py-2 px-4 font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === "struktur"
                ? "border-sipil-base text-sipil-base"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Struktur Organisasi
          </button>
          <button
            onClick={() => {
              setActiveTab("penelitian");
              setCurrentPage(1);
              setSearchTerm("");
            }}
            className={`py-2 px-4 font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === "penelitian"
                ? "border-sipil-base text-sipil-base"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Penelitian
          </button>
          <button
            onClick={() => {
              setActiveTab("sertifikasi");
              if (activeTab === "penelitian") {
                setCurrentPage(1);
                setSearchTerm("");
              }
            }}
            className={`py-2 px-4 font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === "sertifikasi"
                ? "border-sipil-base text-sipil-base"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Standar Laboratorium
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white p-2 md:p-4">
          {/* Struktur Organisasi */}
          {activeTab === "struktur" && (
            <div>
              {/* <h2 className="text-3xl font-bold mb-6 text-gray-800">
                Struktur Organisasi
              </h2> */}
              <div className="mb-8">
                {/* <h3 className="text-xl font-semibold mb-4 text-gray-700">
                  Diagram Struktur Organisasi
                </h3> */}
                <div className="bg-gray-100 p-4 rounded flex justify-center">
                  <div className="w-full max-w-3xl h-80 bg-white border rounded-lg flex items-center justify-center">
                    {/* <p className="text-gray-500">
                      Diagram Struktur Organisasi Teknik Sipil UNSOED
                    </p> */}
                    <img src="/images/staff/struktur-organisasi.png" className="w-full h-full" alt="Struktur Organisasi Laboratorium Teknik Sipil Unsoed" />
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-4 text-gray-700">
                Pejabat Struktural
              </h3>
              {teamLoading && <p>Memuat data...</p>}
              {teamError && <p className="text-red-500">{teamError}</p>}
              
              {!teamLoading && !teamError && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {team.map((pejabat) => (
                    <div
                      key={pejabat.id}
                      className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="aspect-w-1 aspect-h-1 bg-gray-200">
                        <img 
                          src={getImageUrl(pejabat.photo)} 
                          alt={`Foto ${pejabat.name}`} 
                          // className="w-full h-48 object-cover"
                          className="w-full h-full aspect-square" 
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-lg text-gray-800">
                          {pejabat.name}
                        </h4>
                        <p className="text-sipil-base">{pejabat.position.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Penelitian */}
          {activeTab === "penelitian" && (
            <div className="space-y-6">
              {researchLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sipil-base mx-auto mb-4"></div>
                    <p>Memuat data penelitian...</p>
                  </div>
                </div>
              ) : researchError ? (
                <div className="text-center text-red-600">
                  <p>{researchError}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-sipil-base text-white rounded-md hover:bg-sipil-secondary"
                  >
                    Coba Lagi
                  </button>
                </div>
              ) : (
                <>
                  {/* Research Table */}
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-sipil-base text-white">
                            <th className="px-4 py-3 text-left w-12">No</th>
                            <th className="px-4 py-3 text-left">
                              Judul & Penulis
                            </th>
                            <th className="px-4 py-3 text-left">Abstrak</th>
                            <th className="px-4 py-3 text-left">Kata Kunci</th>
                            <th className="px-4 py-3 text-center">Publikasi</th>
                            <th className="px-4 py-3 text-center">Aksi</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {researchData?.data && researchData.data.length > 0 ? (
                            researchData.data.map((item, index) => (
                              <tr key={item.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3 whitespace-nowrap">
                                  {(researchData?.from || 0) + index}
                                </td>
                                <td className="px-4 py-3">
                                  <div className="font-medium text-sipil-base">
                                    {item.title}
                                  </div>
                                  <div className="text-xs text-gray-500 mt-1">
                                    <div>
                                      Penulis: {formatAuthors(item.author)}
                                    </div>
                                    <div>Tahun: {item.year}</div>
                                  </div>
                                </td>
                                <td className="px-4 py-3">
                                  <p className="text-gray-600 line-clamp-3 text-sm">
                                    {item.abstract}
                                  </p>
                                </td>
                                <td className="px-4 py-3">
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
                                <td className="px-4 py-3 text-center">
                                  <span className="text-gray-600 text-sm line-clamp-2">
                                    {item.publication}
                                  </span>
                                </td>
                                <td className="px-4 py-3 text-center whitespace-nowrap">
                                  <Link
                                    href={item.link}
                                    className="inline-flex items-center gap-1 bg-sipil-base text-white py-2 px-4 rounded-md hover:bg-sipil-secondary transition-colors duration-200"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <svg
                                      className="w-4 h-4"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
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
                              <td
                                colSpan={6}
                                className="px-6 py-12 text-center"
                              >
                                <div className="flex flex-col items-center justify-center">
                                  <svg
                                    className="w-12 h-12 text-gray-300 mb-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                  </svg>
                                  <p className="text-gray-500 text-lg font-medium">
                                    Tidak ada penelitian yang ditemukan
                                  </p>
                                  <p className="text-gray-400 mt-1">
                                    Coba ubah kata kunci pencarian Anda
                                  </p>
                                </div>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination */}
                    {researchData && researchData.last_page > 1 && (
                      <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                        <button
                          className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          Sebelumnya
                        </button>

                        <div className="hidden md:flex items-center gap-1">
                          {generatePageNumbers().map((page, index) => (
                            <button
                              key={index}
                              onClick={() =>
                                typeof page === "number" &&
                                handlePageChange(page)
                              }
                              disabled={page === "..."}
                              className={`px-3 py-1 text-sm rounded-md ${
                                currentPage === page
                                  ? "bg-sipil-base text-white"
                                  : page === "..."
                                  ? "cursor-default"
                                  : "bg-white border border-gray-300 hover:bg-gray-50"
                              }`}
                            >
                              {page}
                            </button>
                          ))}
                        </div>

                        <button
                          className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === researchData.last_page}
                        >
                          Selanjutnya
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  {researchData && (
                    <div className="text-center text-sm text-gray-600">
                      Menampilkan {researchData.from} - {researchData.to} dari{" "}
                      {researchData.total} penelitian
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* Sertifikasi & Akreditasi */}
          {activeTab === "sertifikasi" && (
            <div>
              {standardsLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sipil-base mx-auto mb-4"></div>
                    <p>Memuat data standar laboratorium...</p>
                  </div>
                </div>
              ) : standardsError ? (
                <div className="text-center text-red-600">
                  <p>{standardsError}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-sipil-base text-white rounded-md hover:bg-sipil-secondary"
                  >
                    Coba Lagi
                  </button>
                </div>
              ) : standards.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {standards.map((standard) => (
                    <div
                      key={standard.id}
                      className="flex bg-gray-50 rounded-lg overflow-hidden shadow-sm p-4"
                    >
                      <div className="w-16 h-16 bg-white rounded-md flex-shrink-0 flex items-center justify-center border overflow-hidden">
                        <img
                          src={getStandardImageUrl(standard.foto)}
                          alt={standard.nama}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="font-semibold text-lg text-gray-800">
                          {standard.nama}
                        </h3>
                        <p className="text-gray-600 mt-2 text-sm">
                          {standard.deskripsi}
                        </p>
                        {standard.file && (
                          <Link
                            href={getStandardFileUrl(standard.file)}
                            className="inline-flex items-center mt-3 text-sipil-base text-sm font-medium hover:text-sipil-secondary"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                            Unduh Dokumen
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-12">
                  <p>Tidak ada data standar laboratorium yang tersedia</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
