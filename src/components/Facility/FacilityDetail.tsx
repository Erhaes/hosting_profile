"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
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
  image: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  equipments: Equipment[];
  packages: Package[];
  tests: Test[];
}

interface FacilityDetailProps {
  slug: string;
}

export default function FacilityDetail({ slug }: FacilityDetailProps) {
  const [facility, setFacility] = useState<Laboratory | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFacility = async (slug: string) => {
    try {
      const response = await apiClient.get(`/labs/${slug}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch facility data' + (error instanceof Error ? error.message : ''));
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
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sipil-base mx-auto mb-4"></div>
        <p className="text-gray-600">Memuat data fasilitas...</p>
      </div>
    );
  }

  if (error || !facility) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error || "Fasilitas tidak ditemukan"}
        </div>
        <Link
          href="/fasilitas"
          className="text-sipil-base hover:underline"
        >
          Kembali ke Daftar Fasilitas
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Facility Image */}
      <div className="md:w-1/2">
        <div className="relative w-full h-64 md:h-80 overflow-hidden rounded-lg">
          <Image
            src={`${process.env.NEXT_PUBLIC_STORAGE_URL || 'https://reservasi.labsipilunsoed.com/'}/storage/${facility.image}`}
            alt={facility.name}
            fill
            className="object-cover"
            priority
            onError={(e) => {
              e.currentTarget.src = '/images/facilities/default.jpg';
            }}
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

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Jumlah Pengujian:</span>
            <span className="bg-blue-500 bg-opacity-20 text-xs font-medium px-2 py-1 rounded-full">
              {facility.tests.length} Test
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Paket Tersedia:</span>
            <span className="bg-green-500 bg-opacity-20 text-xs font-medium px-2 py-1 rounded-full">
              {facility.packages.length} Paket
            </span>
          </div>
        </div>

        {/* Tests Section */}
        {facility.tests.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Pengujian Tersedia</h3>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {facility.tests.slice(0, 3).map((test) => (
                <div key={test.id} className="flex justify-between items-center p-2 bg-white bg-opacity-10 rounded">
                  <span className="text-sm">{test.name}</span>
                  <span className="text-xs text-blue-300">Rp {test.price?.toLocaleString('id-ID')}</span>
                </div>
              ))}
              {facility.tests.length > 3 && (
                <p className="text-xs text-blue-300">
                  +{facility.tests.length - 3} pengujian lainnya
                </p>
              )}
            </div>
          </div>
        )}

        {/* Packages Section */}
        {facility.packages.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Paket Tersedia</h3>
            <div className="space-y-2">
              {facility.packages.map((pkg) => (
                <div key={pkg.id} className="flex justify-between items-center p-2 bg-white bg-opacity-10 rounded">
                  <span className="text-sm">{pkg.name}</span>
                  <span className="text-xs text-green-300">Rp {pkg.price.toLocaleString('id-ID')}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}