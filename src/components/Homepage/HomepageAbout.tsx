"use client";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import apiClient from "@/services/apiClient";
import { Laboratory } from "@/types";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function HomepageAbout() {
  const [laboratoryData, setLaboratoryData] = useState<Laboratory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getImageUrl = (imagePath: string) => {
    if (!imagePath) {
      return "/images/backgrounds/lobby.jpeg"; // Default fallback image
    }
    return `${process.env.NEXT_PUBLIC_STORAGE_URL || "https://reservasi.labsipilunsoed.com/"}/storage/${imagePath}`;
  };

  // Parse images string to array
  const parseImages = (imagesString: string): string[] => {
    try {
      return JSON.parse(imagesString);
    } catch {
      return [imagesString]; // If not JSON, treat as single image
    }
  };

  // Fetch laboratory data
  useEffect(() => {
    const fetchLaboratories = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get("/carousel/laboratories");
        const data = response.data.data || response.data;
        setLaboratoryData(data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch laboratory data:", err);
        setError("Gagal memuat data laboratorium.");
      } finally {
        setLoading(false);
      }
    };

    fetchLaboratories();
  }, []);

  return (
    <section
      id="about"
      className="bg-light-base text-dark-base dark:bg-dark-base dark:text-light-base section-padding-x py-20 scroll-mt-12 relative"
    >
      <div className="max-w-screen-xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="gradient-to-r text-light-base from-sipil-base to-sipil-secondary bg-gradient-to-br flex items-center gap-2 mb-2 w-fit py-1 px-3 rounded-md mx-auto">
            <svg
              className="w-4"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M256 0c4.6 0 9.2 1 13.4 2.9L457.7 82.8c22 9.3 38.4 31 38.3 57.2c-.5 99.2-41.3 280.7-213.6 363c-16.7 8-36.1 8-52.8 0C57.3 420.7 16.5 239.2 16 140c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0z" />
            </svg>
            <h2 className="extra-small-font-size">Visi dan Misi</h2>
          </span>
          <h2 className="font-bold">
            Visi dan Misi Laboratorium Teknik Sipil Unsoed
          </h2>
          <p className="max-w-3xl mx-auto">
            Laboratorium bidang Teknik Sipil Universitas Jenderal Soedirman didirikan
            untuk menjawab kebutuhan akan tenaga profesional di bidang teknik
            sipil yang kompeten dan berintegritas.
          </p>
        </div>

        {/* About Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Column - Image Carousel */}
          <div className="relative rounded-lg overflow-hidden h-full">
            {loading ? (
              <div className="rounded-lg shadow-lg w-full h-64 bg-gray-200 animate-pulse flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sipil-base mx-auto mb-4"></div>
                  <p>Memuat laboratorium...</p>
                </div>
              </div>
            ) : error ? (
              <div className="rounded-lg shadow-lg w-full h-64 bg-gray-200 flex items-center justify-center">
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
            ) : laboratoryData.length > 0 ? (
              <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="rounded-lg shadow-lg"
              >
                {laboratoryData.map((lab) => {
                  const images = parseImages(lab.images);
                  return images.map((image, index) => (
                    <SwiperSlide key={`${lab.id}-${index}`}>
                      <div className="relative aspect-video">
                        <img
                          src={getImageUrl(image)}
                          alt={lab.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4 bg-sipil-base text-light-base py-1 px-3 rounded-md shadow-md small-font-size font-medium">
                          {lab.name}
                        </div>
                      </div>
                    </SwiperSlide>
                  ));
                })}
              </Swiper>
            ) : (
              <div className="rounded-lg shadow-lg w-full h-64 bg-gray-200 flex items-center justify-center">
                <p className="text-gray-500">Tidak ada data laboratorium</p>
              </div>
            )}
          </div>

          {/* Right Column - Text Content */}
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <h3 className="font-bold mb-3 text-sipil-base dark:text-sipil-blue-accent">
                Visi
              </h3>
              <p className="">
                Menjadi laboratorium Teknik Sipil yang bermutu dan maju untuk
                mendukung kegiatan akademik, penelitian dan industri konstruksi
                sehingga dapat berkontribusi bagi pembangunan bangsa dan negara.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <h3 className="font-bold mb-3 text-sipil-base dark:text-sipil-blue-accent">
                Misi
              </h3>
              <ul className="list-disc list-outside pl-4 space-y-2">
                <li>Memberikan pelayanan praktikum kepada mahasiswa</li>
                <li>
                  Memberikan pelayanan penelitian kepada dosen dan mahasiswa
                </li>
                <li>
                  Memberi pelayanan pengujian kepada kontraktor dan konsultan
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="#"
                className="rounded-md bg-blue-base text-light-base py-2 px-4 font-semibold text-center hover:bg-blue-quaternary hover:text-blue-base transition duration-300 small-font-size"
              >
                Lihat Fasilitas
              </a>
              <a
                href="#"
                className="rounded-md border border-blue-base text-blue-base py-2 px-4 font-semibold text-center hover:bg-blue-quaternary transition duration-300 small-font-size"
              >
                Lihat Pengujian
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
