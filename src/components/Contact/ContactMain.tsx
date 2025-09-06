"use client";

import apiClient from "@/services/apiClient";
import { useState, FormEvent } from "react";

type FormData = {
  name: string;
  email: string;
  subject: string;
  content: string;
};

export default function Header() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    content: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulasi pengiriman data (ganti dengan kode integrasi API sebenarnya)
    // Contoh penggunaan untuk form submission
    try {
      const response = await apiClient.post("/contact", {
        name: "Muhammad Zaki Dzulfikar",
        email: "zaki@gmail.com",
        subject: "Testing Saja",
        content: "https://reservasi.labsipilunsoed.com/api/contact",
      });
      setSubmitMessage("Pesan berhasil dikirim!");
      
      console.log("Success:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-light-base text-dark-base dark:bg-dark-base dark:text-light-base section-padding-x">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 md:p-6 shadow-md">
              <h3 className="font-bold  dark:text-sipil-blue-accent mb-2">
                Informasi Kontak
              </h3>
              <div className="space-y-4">
                {/* Address */}
                <div className="flex items-start gap-2 md:gap-3">
                  <div className="p-2 bg-sipil-base/10 rounded-md  dark:text-sipil-blue-accent">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512"
                    >
                      <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Alamat</h4>
                    <p className="small-font-size">
                      Gedung D Lt. 1 Fakultas Teknik, Universitas Jenderal Soedirman Jl. Mayjen
                      Sungkono KM 5, Blater Purbalingga, Jawa Tengah 53371
                    </p>
                  </div>
                </div>
                {/* Phone */}
                <div className="flex items-start gap-2 md:gap-3">
                  <div className="p-2 bg-sipil-base/10 rounded-md  dark:text-sipil-blue-accent">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Telepon</h4>
                    <p className="small-font-size">0813-9313-3408</p>
                  </div>
                </div>
                {/* Email */}
                <div className="flex items-start gap-2 md:gap-3">
                  <div className="p-2 bg-sipil-base/10 rounded-md  dark:text-sipil-blue-accent">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <p className="small-font-size">laboratoriumsipil.unsoed@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Social Media */}
            <div className="bg-white rounded-lg p-4 md:p-6 shadow-md">
              <h3 className="font-bold  dark:text-sipil-blue-accent mb-2">
                Media Sosial
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <a
                  href="https://instagram.com/tekniksipil.unsoed"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-br from-purple-600 to-pink-500 text-white hover:opacity-90 transition duration-300"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                  </svg>
                  <span className="font-medium">@tekniksipil</span>
                </a>

                {/* <a
                  href="https://facebook.com/tekniksipil.unsoed"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg bg-blue-600 text-white hover:opacity-90 transition duration-300"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
                  </svg>
                  <span className="font-medium">Teknik Sipil</span>
                </a> */}

                {/* <a
                  href="https://linkedin.com/tekniksipil_unsoed"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg bg-blue-800 text-white hover:opacity-90 transition duration-300"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
                  </svg>
                  <span className="font-medium">Teknik Sipil</span>
                </a> */}

                <a
                  href="https://youtube.com/tekniksipil_unsoed"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg bg-red-600 text-white hover:opacity-90 transition duration-300"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
                  </svg>
                  <span className="font-medium">Teknik Sipil</span>
                </a>
              </div>
            </div>
            {/* Office Hours */}
            <div className="bg-white rounded-lg p-4 md:p-6 shadow-md">
              <h3 className="font-bold  dark:text-sipil-blue-accent mb-2">
                Jam Operasional
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Senin - Kamis</span>
                  <span className="font-medium">08:00 - 16:00 WIB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Jumat</span>
                  <span className="font-medium">08:00 - 15:00 WIB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sabtu - Minggu</span>
                  <span className="font-medium">Tutup</span>
                </div>
              </div>
            </div>
          </div>
          {/* Contact Form & Map */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Form */}
            <div className="bg-white rounded-lg p-4 md:p-6 shadow-md">
              <h3 className="font-bold  dark:text-sipil-blue-accent mb-2">
                Formulir Kontak
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-1 text-gray-700 font-medium"
                  >
                    Nama Lengkap <span className="text-red-base">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sipil-base"
                    placeholder="Masukkan nama lengkap Anda"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block mb-1 text-gray-700 font-medium"
                  >
                    Email <span className="text-red-base">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sipil-base"
                    placeholder="Masukkan alamat email Anda"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block mb-1 text-gray-700 font-medium"
                  >
                    Subjek <span className="text-red-base">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sipil-base"
                    placeholder="Masukkan subjek pesan Anda"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="content"
                    className="block mb-1 text-gray-700 font-medium"
                  >
                    Pesan <span className="text-red-base">*</span>
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sipil-base"
                    placeholder="Tulis pesan Anda di sini..."
                    required
                  ></textarea>
                </div>

                {submitMessage && (
                  <div
                    className={`p-4 rounded-md ${
                      submitMessage.includes("berhasil")
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {submitMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 bg-sipil-base text-white font-medium rounded-md hover:bg-sipil-secondary transition duration-300 flex justify-center items-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Mengirim...
                    </>
                  ) : (
                    "Kirim Pesan"
                  )}
                </button>
              </form>
            </div>

            {/* Google Map */}
            <div className="bg-white rounded-lg p-4 md:p-6 shadow-md">
              <h3 className="font-bold  dark:text-sipil-blue-accent mb-2">
                Lokasi Kami
              </h3>
              <div className="h-80 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.330504287398!2d109.33501537500132!3d-7.428629792582002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e655986a5294e97%3A0x6ed179e2743fcd16!2sGedung%20Laboratorium%20Bersama%20FT%20UNSOED!5e0!3m2!1sid!2sid!4v1750268049029!5m2!1sid!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
