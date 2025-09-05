import TestsHeader from "@/components/Tests/TestsHeader";
import TestsMain from "@/components/Tests/TestsMain";

export const metadata = {
  title: "Pengujian | Lab. Teknik Sipil Unsoed",
};

// Komponen utama halaman pengujian
export default function FacilitiesPage() {
  return (
    <main>
      <TestsHeader />
      <TestsMain />
    </main>
  );
}
