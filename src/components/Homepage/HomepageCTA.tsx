export default function HomepageCTA() {
  return (
    <section
      id="cta"
      className="section-padding-x pt-12 pb-12 text-dark-base dark:text-light-base bg-light-base dark:bg-dark-base scroll-mt-12"
    >
      <div className="mx-auto max-w-screen-xl">
        <div className="text-center mb-8 max-w-3xl mx-auto p-4 md:p-8 lg:p-12 xl:p-16 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 shadow-md">
          <h2 className="font-bold mb-2 text-2xl md:text-3xl lg:text-4xl">
            Butuh Hasil Pengujian yang Akurat dan Terpercaya?
          </h2>
          <p className="text-gray-500 mb-6 md:text-lg">
            Laboratorium Teknik Sipil UNSOED siap membantu proyek Anda dengan layanan pengujian yang lengkap dan hasil pengujian yang akurat.
             Lihat daftar pengujian kami dan lakukan reservasi dengan mudah.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://reservasi.labsipilunsoed.com/"
              className="text-light-base bg-gradient-to-br from-sipil-base to-sipil-secondary px-4 py-2 md:px-6 md:py-3 rounded-xl font-semibold transition-all duration-300 shadow hover:shadow-lg"
            >
              Reservasi Pengujian
            </a>
            <a
              href="/profil"
              className="px-4 py-2 md:px-6 md:py-3 border border-sipil-base rounded-xl font-semibold transition-all duration-300 text-sipil-base hover:bg-sipil-base hover:text-white"
            >
              Profil Laboratorium
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
