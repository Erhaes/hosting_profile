import NewsHeader from "@/components/News/NewsHeader";
import NewsMain from "@/components/News/NewsMain";

export const metadata = {
  title: "Berita | Lab. Teknik Sipil Unsoed",
};

// Komponen utama halaman fasilitas
export default function NewsPage() {
  return (
    <main>
      <NewsHeader />
      <NewsMain />
    </main>
  );
}
