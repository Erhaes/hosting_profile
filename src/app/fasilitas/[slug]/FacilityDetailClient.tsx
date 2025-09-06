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

interface FacilityDetailClientProps {
  slug: string;
}

export default function FacilityDetailClient({ slug }: FacilityDetailClientProps) {
  const [facility, setFacility] = useState<Laboratory | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFacility = async (slug: string) => {
    try {
      const response = await apiClient.get(`/labs/${slug}`);
      return response.data.data;
    } catch (error) {
      throw new Error("Failed to fetch facility data: " + error);
    }
  };

  useEffect(() => {
    const loadFacility = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchFacility(slug);
        setFacility(data);
      } catch (err) {
        console.error("Failed to fetch facility:", err);
        setError("Gagal memuat data fasilitas. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadFacility();
    }
  }, [slug]);

  if (loading) {
    return (
      <main>
        <section className="bg-sipil-base text-light-base section-padding-x pt-28 pb-16">
          <div className="max-w-screen-xl mx-auto">
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-light-base mx-auto mb-4"></div>
              <p className="text-light-base">Memuat data fasilitas...</p>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (error || !facility) {
    return (
      <main>
        <section className="bg-sipil-base text-light-base section-padding-x pt-28 pb-16">
          <div className="max-w-screen-xl mx-auto">
            <div className="text-center py-12">
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error || "Fasilitas tidak ditemukan"}
              </div>
              <Link
                href="/fasilitas"
                className="text-light-base hover:underline"
              >
                Kembali ke Daftar Fasilitas
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      {/* Header Section */}
      <section className="bg-sipil-base text-light-base section-padding-x pt-28 pb-16">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Facility Image */}
            <div className="md:w-1/2">
              <div className="relative w-full h-64 md:h-80 overflow-hidden rounded-lg">
                <img
                  src={`${
                    process.env.NEXT_PUBLIC_STORAGE_URL ||
                    "https://reservasi.labsipilunsoed.com/"
                  }/storage/${facility.images[0]}`}
                  alt={facility.name}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            {/* Facility Details */}
            <div className="md:w-1/2">
              <div className="flex items-center gap-4 mb-4">
                <Link
                  href="/fasilitas"
                  className="text-blue-300 hover:text-white flex items-center text-sm"
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
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Kembali ke Fasilitas
                </Link>
                <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-500 bg-opacity-20 text-blue-100 rounded-full">
                  {facility.code}
                </span>
              </div>

              <h1 className="text-3xl font-bold mb-2">{facility.name}</h1>

              <div className="flex items-center text-sm mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                <span>Ruangan: {facility.room}</span>
              </div>

              <p className="text-light-base/80 mb-6 leading-relaxed">
                {facility.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-light-base bg-opacity-10 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {facility.tests?.length}
                  </div>
                  <div className="text-sm text-dark-base">
                    Pengujian Tersedia
                  </div>
                </div>
                <div className="bg-light-base bg-opacity-10 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {facility.packages?.length}
                  </div>
                  <div className="text-sm text-dark-base">Paket Layanan</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tests Detail Section */}
      {facility.tests?.length > 0 && (
        <section className="bg-gradient-to-b from-gray-50 to-white section-padding-x py-8">
          <div className="max-w-screen-xl mx-auto">
            <div className="text-center mb-4">
              <h2 className="text-4xl font-bold text-dark-base mb-4">
                Layanan Pengujian Lengkap
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Berbagai layanan pengujian profesional dengan standar kualitas
                tinggi di {facility.name}
              </p>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
              {facility.tests.map((test, index) => (
                <div
                  key={test.id}
                  className="group bg-light-base rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-sipil-base/20 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-sipil-base/5 to-blue-500/5 rounded-bl-2xl"></div>

                  <div className="relative">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-semibold text-sipil-base bg-sipil-base/10 px-2 py-1 rounded-full">
                            #{String(index + 1).padStart(2, "0")}
                          </span>
                          <span
                            className={`text-xs px-2 py-1 rounded-full font-medium ${
                              test.is_active
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {test.is_active ? "Tersedia" : "Tidak Tersedia"}
                          </span>
                        </div>
                        <a href={`/pengujian/${test.slug}`}>
                          <h3 className="text-xl font-bold text-dark-base mb-2 group-hover:text-sipil-base transition-colors">
                            {test.name}
                          </h3>
                        </a>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-6 leading-relaxed line-clamp-3">
                      {test.description}
                    </p>

                    <div className="space-y-4 mb-6">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-5 h-5 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                            />
                          </svg>
                          <span className="text-sm font-medium text-gray-700">
                            Harga
                          </span>
                        </div>
                        <span className="text-lg font-bold text-sipil-base">
                          Rp {test.price?.toLocaleString("id-ID")}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                          <svg
                            className="w-4 h-4 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                            />
                          </svg>
                          <div>
                            <div className="text-xs text-gray-500">
                              Min. Unit
                            </div>
                            <div className="text-sm font-semibold text-gray-700">
                              {test.minimum_unit}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg">
                          <svg
                            className="w-4 h-4 text-purple-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <div>
                            <div className="text-xs text-gray-500">
                              Slot/Hari
                            </div>
                            <div className="text-sm font-semibold text-gray-700">
                              {test.daily_slot}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Packages Detail Section */}
      {facility.packages?.length > 0 && (
        <section className="bg-white section-padding-x py-16">
          <div className="max-w-screen-xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-dark-base mb-4">
                Paket Layanan Terintegrasi
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Solusi paket lengkap dengan harga terjangkau untuk kebutuhan
                pengujian di {facility.name}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {facility.packages.map((pkg, index) => (
                <div
                  key={pkg.id}
                  className="group bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-green-100 hover:border-green-200 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-400/10 to-blue-400/10 rounded-bl-3xl"></div>

                  <div className="relative">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full">
                            PAKET #{String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="text-xs px-2 py-1 rounded-full font-medium bg-blue-100 text-blue-700">
                            Hemat & Efisien
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-dark-base mb-3 group-hover:text-green-700 transition-colors">
                          {pkg.name}
                        </h3>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                      {pkg.description}
                    </p>

                    <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-xl p-6 mb-6 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm opacity-90 mb-1">
                            Harga Paket
                          </div>
                          <div className="text-3xl font-bold">
                            Rp {pkg.price.toLocaleString("id-ID")}
                          </div>
                        </div>
                        <div className="text-right">
                          <svg
                            className="w-12 h-12 opacity-20"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M20 7l-8-4-8 4m16 0l-8 4-8-4m16 0v10l-8 4-8-4V7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-700">
                            Paket Lengkap
                          </div>
                          <div className="text-xs text-gray-500">
                            Semua pengujian dalam satu paket
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                            />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-700">
                            Harga Hemat
                          </div>
                          <div className="text-xs text-gray-500">
                            Lebih ekonomis dari pengujian terpisah
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-purple-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-700">
                            Standar Tinggi
                          </div>
                          <div className="text-xs text-gray-500">
                            Mengikuti standar internasional
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section className="bg-gray-50 section-padding-x py-16">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-dark-base mb-4">
            Tertarik dengan Layanan Kami?
          </h2>
          <p className="text-gray-600 mb-8">
            Hubungi kami untuk informasi lebih lanjut tentang layanan pengujian
            dan konsultasi
          </p>
          <Link
            href="/kontak"
            className="inline-flex items-center px-6 py-3 bg-sipil-base text-white font-medium rounded-lg hover:bg-sipil-base/90 transition-colors"
          >
            Hubungi Kami
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
}
