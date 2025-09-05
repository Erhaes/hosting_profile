import FacilityHeader from "@/components/Facility/FacilityHeader";
import FacilityMain from "@/components/Facility/FacilityMain";

export const metadata = {
  title: "Fasilitas | Lab. Teknik Sipil Unsoed",
};

// Komponen utama halaman fasilitas
export default function FacilitiesPage() {
  return (
    <main>
      <FacilityHeader />
      <FacilityMain />
    </main>
  );
}
