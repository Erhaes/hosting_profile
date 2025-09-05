import HomepageFacilities from "@/components/Homepage/HomapageFacilities";
import HomepageHero from "@/components/Homepage/HomepageHero";
import HomepageAbout from "@/components/Homepage/HomepageAbout";
import HomepageTestimonial from "@/components/Homepage/HomepageTestimonial";
import HomepageCTA from "@/components/Homepage/HomepageCTA";
import HomepageAccreditation from "@/components/Homepage/HomepageAccreditation";

export const metadata = {
  title: "Beranda | Lab. Teknik Sipil Unsoed",
};

export default function Home() {
  return (
    <main>
      <HomepageHero />
      <HomepageAbout />
      <HomepageFacilities />
      <HomepageAccreditation />
      <HomepageTestimonial />
      <HomepageCTA />
    </main>
  );
}
