import news from "@/data/news";
import NewsDetailClient from "./NewsDetailClient";

// Generate static params for news articles
export async function generateStaticParams() {
  return news.map((article) => ({
    slug: article.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim(),
  }));
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  return <NewsDetailClient slug={slug} />;
}
