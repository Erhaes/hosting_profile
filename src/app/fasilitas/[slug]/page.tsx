import facilitiesData from "@/data/facilities";
import FacilityDetailClient from "./FacilityDetailClient";

// Generate static params for facilities
export async function generateStaticParams() {
  return facilitiesData.map((facility) => ({
    slug: facility.name
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

export default async function FacilityDetailPage({ params }: PageProps) {
  const { slug } = await params;
  return <FacilityDetailClient slug={slug} />;
}