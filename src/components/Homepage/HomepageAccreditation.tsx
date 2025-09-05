"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import apiClient from "@/services/apiClient";
import { Standard } from "@/types";

const HomepageAccreditation = () => {
  const [standards, setStandards] = useState<Standard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getImageUrl = (imagePath: string | null) => {
    if (!imagePath) {
      return "/images/accreditations/iso-certification.jpg"; // Default fallback image
    }
    return `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000"}/storage/${imagePath}`;
  };

  const getFileUrl = (filePath: string | null) => {
    if (!filePath) {
      return "#"; // Return # if no file available
    }
    return `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000"}/storage/${filePath}`;
  };

  // Fetch data standar laboratorium
  useEffect(() => {
    const fetchStandards = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get("/standards");
        setStandards(response.data.data || response.data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch standards data:", err);
        setError("Gagal memuat data standar laboratorium.");
      } finally {
        setLoading(false);
      }
    };

    fetchStandards();
  }, []);

  if (loading) {
    return (
      <section
        id="fitur"
        className="section-padding-x pt-12 pb-12 text-dark-base dark:text-light-base bg-light-base dark:bg-dark-base scroll-mt-12 bg-gradient-to-br dark:from-dark-base dark:via-dark-base/80 dark:to-blue-imphnen-secondary/10 from-light-base via-light-base/70 to-blue-imphnen-secondary/10 relative"
      >
        <div className="mx-auto max-w-screen-xl">
          <div className="text-center mb-8 max-w-3xl mx-auto">
            <p className="px-2 py-0.5 mb-2 rounded-md text-blue-base bg-blue-tertiary font-semibold w-fit mx-auto">
              Akreditasi dan Sertifikasi
            </p>
            <h2 className="font-bold mb-2">
              Laboratorium Teknik Sipil Unsoed Memenuhi Standar Nasional dan
              Internasional
            </h2>
          </div>
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sipil-base mx-auto mb-4"></div>
              <p>Memuat data sertifikasi...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="fitur"
        className="section-padding-x pt-12 pb-12 text-dark-base dark:text-light-base bg-light-base dark:bg-dark-base scroll-mt-12 bg-gradient-to-br dark:from-dark-base dark:via-dark-base/80 dark:to-blue-imphnen-secondary/10 from-light-base via-light-base/70 to-blue-imphnen-secondary/10 relative"
      >
        <div className="mx-auto max-w-screen-xl">
          <div className="text-center mb-8 max-w-3xl mx-auto">
            <p className="px-2 py-0.5 mb-2 rounded-md text-blue-base bg-blue-tertiary font-semibold w-fit mx-auto">
              Akreditasi dan Sertifikasi
            </p>
            <h2 className="font-bold mb-2">
              Laboratorium Teknik Sipil Unsoed Memenuhi Standar Nasional dan
              Internasional
            </h2>
          </div>
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

  return (
    <section
      id="fitur"
      className="section-padding-x pt-12 pb-12 text-dark-base dark:text-light-base bg-light-base dark:bg-dark-base scroll-mt-12 bg-gradient-to-br dark:from-dark-base dark:via-dark-base/80 dark:to-blue-imphnen-secondary/10 from-light-base via-light-base/70 to-blue-imphnen-secondary/10 relative"
    >
      <div className="mx-auto max-w-screen-xl">
        <div className="text-center mb-8 max-w-3xl mx-auto">
          <p className="px-2 py-0.5 mb-2 rounded-md text-blue-base bg-blue-tertiary font-semibold w-fit mx-auto">
            Akreditasi dan Sertifikasi
          </p>
          <h2 className="font-bold mb-2">
            Laboratorium Teknik Sipil Unsoed Memenuhi Standar Nasional dan
            Internasional
          </h2>
        </div>
        {standards.length > 0 ? (
          <div className="flex flex-nowrap overflow-x-auto gap-4">
            {standards.map((item) => (
              <div
                key={item.id}
                className="flex-none w-64 border border-gray-200 bg-white p-4"
              >
                <div className="w-full mb-2 max-h-40 rounded-lg flex items-center justify-center overflow-hidden">
                  <img
                    src={getImageUrl(item.foto)}
                    alt={item.nama}
                    className="object-cover max-h-full"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1">
                    {item.nama}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {item.deskripsi}
                  </p>
                  {item.file && (
                    <Link
                      href={getFileUrl(item.file)}
                      className="text-blue-600 text-sm font-medium flex items-center"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
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
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      Unduh Sertifikat
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">
            <p>Tidak ada data sertifikasi yang tersedia</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default HomepageAccreditation;
