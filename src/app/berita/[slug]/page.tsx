"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import apiClient from "@/services/apiClient";

interface NewsDetail {
  id: number;
  title: string;
  slug: string;
  content: string;
  thumbnail: string;
  author_id: number;
  news_category_id: number;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  author: {
    id: number;
    name: string;
    email: string;
    bio: string;
    avatar: string;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
  };
  news_category: {
    id: number;
    name: string;
    slug: string;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
  };
}

export default function NewsDetail() {
  const params = useParams();
  const slug = params?.slug as string;
  const [news, setNews] = useState<NewsDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async (slug: string) => {
    try {
      const response = await apiClient.get(`/news/${slug}`);
      return response.data.data;
    } catch (error) {
      throw new Error(`Failed to fetch news data: ${error}`);
    }
  };

  // Helper function to get image URL
  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return "/images/default-news.jpg";
    return `${
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000"
    }/storage/${imagePath}`;
  };

  // Helper function to get avatar URL
  const getAvatarUrl = (avatarPath: string) => {
    if (!avatarPath) return "/images/default-avatar.jpg";
    return `${
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000"
    }/storage/${avatarPath}`;
  };

  // Helper function to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Helper function to format time
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Helper function to format content with paragraphs
  const formatContent = (content: string) => {
    return content.split("\n").map((paragraph, index) => (
      <p key={index} className="mb-4 text-gray-700 leading-relaxed">
        {paragraph}
      </p>
    ));
  };

  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchNews(slug);
        setNews(data);
      } catch (err) {
        console.error("Failed to fetch news:", err);
        setError("Gagal memuat data berita. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadNews();
    }
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-light-base">
        <section className="py-28 section-padding-x">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center items-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sipil-base mx-auto mb-4"></div>
                <p>Memuat berita...</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (error || !news) {
    return (
      <main className="min-h-screen bg-light-base">
        <section className="py-28 section-padding-x">
          <div className="max-w-4xl mx-auto">
            <div className="text-center text-red-600">
              <p>{error || "Berita tidak ditemukan"}</p>
              <Link
                href="/berita"
                className="mt-4 inline-block px-4 py-2 bg-sipil-base text-white rounded-md hover:bg-sipil-secondary"
              >
                Kembali ke Daftar Berita
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-light-base">
      {/* Breadcrumb */}
      <section className="py-6 bg-gray-50 section-padding-x mt-20">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-sipil-base">
              Beranda
            </Link>
            <span>/</span>
            <Link href="/berita" className="hover:text-sipil-base">
              Berita
            </Link>
            <span>/</span>
            <span className="text-gray-900">{news.title}</span>
          </nav>
        </div>
      </section>

      {/* News Content */}
      <section className="py-8 section-padding-x">
        <div className="max-w-4xl mx-auto">
          <article className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Header */}
            <div className="p-6 md:p-8">
              {/* Category Badge */}
              <div className="mb-4">
                <Link
                  href={`/berita/kategori/${news.news_category.slug}`}
                  className="inline-block bg-sipil-base text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-sipil-secondary transition-colors"
                >
                  {news.news_category.name}
                </Link>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {news.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-col md:flex-row md:items-center gap-4 pb-6 border-b border-gray-200">
                {/* Author */}
                <div className="flex items-center">
                  <div className="relative w-10 h-10 mr-3">
                    <Image
                      src={getAvatarUrl(news.author.avatar)}
                      alt={news.author.name}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {news.author.name}
                    </p>
                    <p className="text-sm text-gray-500">Penulis</p>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="flex items-center text-gray-500 text-sm">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>
                    {formatDate(news.created_at)} •{" "}
                    {formatTime(news.created_at)}
                  </span>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative h-64 md:h-96">
              <Image
                src={getImageUrl(news.thumbnail)}
                alt={news.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              <div className="prose prose-lg max-w-none mb-4 text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: news.content }}
              >
                {/* {formatContent(news.content)} */}
              </div>

              {/* Tags/Actions */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Share Buttons */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 mr-2">Bagikan:</span>
                    <button
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({
                            title: news.title,
                            url: window.location.href,
                          });
                        }
                      }}
                      className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      <svg
                        className="w-4 h-4 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      <svg
                        className="w-4 h-4 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Back to News */}
                  <Link
                    href="/berita"
                    className="inline-flex items-center px-4 py-2 bg-sipil-base text-white rounded-md hover:bg-sipil-secondary transition-colors"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      />
                    </svg>
                    Kembali ke Berita
                  </Link>
                </div>
              </div>
            </div>
          </article>

          {/* Author Bio */}
          {/* <div className="mt-8 bg-white rounded-lg shadow-lg p-6 md:p-8">
            <h3 className="text-xl font-bold mb-4">Tentang Penulis</h3>
            <div className="flex items-start gap-4">
              <div className="relative w-16 h-16 flex-shrink-0">
                <Image
                  src={getAvatarUrl(news.author.avatar)}
                  alt={news.author.name}
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <div>
                <h4 className="font-bold text-lg text-gray-900 mb-2">
                  {news.author.name}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {news.author.bio}
                </p>
              </div>
            </div>
          </div> */}
        </div>
      </section>
    </main>
  );
}
