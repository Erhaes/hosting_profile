"use client";

import { useState } from "react";
import Link from "next/link";
import { Equipment, Package, Test, Facility } from "@/types";

interface FacilityDetailProps {
  facility: Facility;
}

export default function FacilityDetail({ facility }: FacilityDetailProps) {
  if (!facility) {
    return (
      <main>
        <section className="bg-sipil-base text-light-base section-padding-x pt-28 pb-16">
          <div className="max-w-screen-xl mx-auto">
            <div className="text-center py-12">
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                Fasilitas tidak ditemukan
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
                  src={facility.image}
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
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}