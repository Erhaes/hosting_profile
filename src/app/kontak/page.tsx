import ContactFAQ from "@/components/Contact/ContactFAQ";
import ContactHeader from "@/components/Contact/ContactHeader";
import ContactMain from "@/components/Contact/ContactMain";

export const metadata = {
  title: "Kontak | Lab. Teknik Sipil Unsoed",
};

export default function ContactPage() {
  return (
    <main>
      <ContactHeader />
      <ContactMain />
      <ContactFAQ />
    </main>
  );
}
