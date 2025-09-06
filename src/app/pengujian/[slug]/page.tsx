import testsData from "@/data/tests";
import TestDetailClient from "./TestDetailClient";

// Generate static params for tests
export async function generateStaticParams() {
  return testsData.map((test) => ({
    slug: test.slug,
  }));
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function TestDetailPage({ params }: PageProps) {
  const { slug } = await params;
  return <TestDetailClient slug={slug} />;
}