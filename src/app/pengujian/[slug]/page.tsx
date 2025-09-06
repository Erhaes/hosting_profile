"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import apiClient from "@/services/apiClient";
import { Package } from "@/types";

type Test = {
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
  category: {
    id: number;
    name: string;
    description?: string;
  };
  laboratory: {
    id: number;
    code: string;
    name: string;
    room: string;
    description?: string;
    images: string[];
  };
  packages: Package[];
};

export default function TestDetail() {
  const [imageIndex, setImageIndex] = useState(0);

  // Function to handle image click and set the current image index
  const handleImageClick = (index: number) => {
    setImageIndex(index);
  };

  const params = useParams();
  const slug = params?.slug as string;
  const [test, setTest] = useState<Test | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTest = async (slug: string) => {
    try {
      const response = await apiClient.get(`/tests/${slug}`);
      return response.data.data;
    } catch (error) {
      throw new Error("Failed to fetch test data" + error);
    }
  };

  // Helper function to get image URL
  const getImageUrl = (imagePath: string) => {
    return `${
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000"
    }/storage/${imagePath}`;
  };

  // Helper function to format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  useEffect(() => {
    const loadTest = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchTest(slug);
        setTest(data);
      } catch (err) {
        console.error("Failed to fetch Test:", err);
        setError("Gagal memuat data pengujian. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadTest();
    }
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-light-base">
        <section className="py-28 section-padding-x">
          <div className="max-w-screen-xl mx-auto">
            <div className="flex justify-center items-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sipil-base mx-auto mb-4"></div>
                <p>Memuat data pengujian...</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (error || !test) {
    return (
      <main className="min-h-screen bg-light-base">
        <section className="py-28 section-padding-x">
          <div className="max-w-screen-xl mx-auto">
            <div className="text-center text-red-600">
              <p>{error || "Data pengujian tidak ditemukan"}</p>
              <Link
                href="/pengujian"
                className="mt-4 inline-block px-4 py-2 bg-sipil-base text-white rounded-md hover:bg-sipil-secondary"
              >
                Kembali ke Daftar Pengujian
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      {/* Header Section with Test Name and Main Info */}
      <section className="bg-sipil-base text-light-base section-padding-x pt-28 pb-12">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Test Image Gallery */}
            <div className="md:w-1/2">
              <div className="relative w-full h-72 overflow-hidden rounded-lg">
                <img
                  src={getImageUrl(test.images[imageIndex])}
                  alt={test.name}
                  className="object-cover"
                />

                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  {test.is_active ? (
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Tersedia
                    </span>
                  ) : (
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Tidak Tersedia
                    </span>
                  )}
                </div>

                {/* Price Badge */}
                <div className="absolute bottom-4 left-4">
                  <span className="bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {formatPrice(test.price)}
                  </span>
                </div>
              </div>

              {/* Thumbnail Gallery */}
              {test.images.length > 1 && (
                <div className="flex mt-4 gap-2 overflow-x-auto pb-2">
                  {test.images.map((imagePath, index) => (
                    <div
                      key={index}
                      className={`relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 cursor-pointer transition-all ${
                        imageIndex === index
                          ? "border-blue-300"
                          : "border-gray-300 hover:border-blue-200"
                      }`}
                      onClick={() => handleImageClick(index)}
                    >
                      <img
                        src={getImageUrl(imagePath)}
                        alt={`${test.name} - gambar ${index + 1}`}
                        className="w-full h-full object-cover"
                        // className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Test Information */}
            <div className="md:w-1/2">
              <div className="flex items-center gap-4 mb-4">
                <a
                  href="/pengujian"
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
                  Kembali ke Daftar Pengujian
                </a>
              </div>

              <h1 className="text-3xl font-bold mb-2">{test.name}</h1>

              {/* Category Badge */}
              <div className="mb-4">
                <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                  {test.category.name}
                </span>
              </div>

              <p className="text-light-base/80 mb-6 leading-relaxed">
                {test.description}
              </p>

              <div className="space-y-4">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-3 text-blue-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  <div>
                    <p className="text-sm text-blue-300">Laboratorium</p>
                    <p className="font-medium">{test.laboratory.name}</p>
                    <p className="text-sm text-blue-200">
                      Ruangan: {test.laboratory.room}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-3 text-blue-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                  <div>
                    <p className="text-sm text-blue-300">Harga</p>
                    <p className="font-medium text-lg">
                      {formatPrice(test.price)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-3 text-blue-300"
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
                  <div>
                    <p className="text-sm text-blue-300">Minimum Pengujian</p>
                    <p className="font-medium">{test.minimum_unit} {test.category.name}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-3 text-blue-300"
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
                  <div>
                    <p className="text-sm text-blue-300">Kapasitas Harian</p>
                    <p className="font-medium">{test.daily_slot} Slot</p>
                  </div>
                </div>
              </div>

              {/* <div className="mt-8">
                {test.is_active ? (
                  <a
                    href="#booking-section"
                    className="inline-block bg-sipil-secondary hover:bg-sipil-secondary/90 text-white px-6 py-3 rounded-md font-medium transition-colors"
                  >
                    Ajukan Pengujian
                  </a>
                ) : (
                  <span className="inline-block bg-gray-500 text-white px-6 py-3 rounded-md font-medium cursor-not-allowed">
                    Tidak Tersedia
                  </span>
                )}
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      {test.packages && test.packages.length > 0 && (
        <section className="py-16 bg-light-base text-dark-base section-padding-x">
          <div className="max-w-screen-xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Paket Pengujian Terkait</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {test.packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={getImageUrl(pkg.images[0])}
                      alt={pkg.name}
                      className="object-cover w-full"
                    />
                    <div className="absolute bottom-2 right-2">
                      <span className="bg-black/70 text-white px-2 py-1 rounded text-sm">
                        {formatPrice(pkg.price)}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">{pkg.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {pkg.description}
                    </p>
                    {/* <Link
                      href={`/paket/${pkg.slug}`}
                      className="inline-block bg-sipil-base text-white px-4 py-2 rounded-md text-sm hover:bg-sipil-secondary transition-colors"
                    >
                      Lihat Detail
                    </Link> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
