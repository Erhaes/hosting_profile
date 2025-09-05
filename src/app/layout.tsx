import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "Teknik Sipil Unsoed",
  description: "Website Resmi Teknik Sipil Universitas Jenderal Soedirman",
  icons: {
    icon: "/unsoed.png",
    
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <head>
        <link rel="icon" href="/unsoed.png" />
      </head>
      <body
        className={`${poppins.className} antialiased bg-light-base dark:bg-dark-base`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
