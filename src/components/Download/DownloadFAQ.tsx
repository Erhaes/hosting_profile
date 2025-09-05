export default function DownloadFAQ() {
  return (
    <section className="py-16 bg-gray-50 section-padding-x pt-28 pb-12">
      <div className="max-w-screen-xl mx-auto">
        <div className="text-center mb-4">
          <h2 className="font-bold mb-1">Panduan Unduhan</h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Berikut adalah panduan singkat untuk mengunduh dokumen dari website
            kami.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm text-center">
            <div className="bg-blue-100 text-sipil-base rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
              </svg>
            </div>
            <h3 className="font-bold text-sipil-base mb-2">Cari Dokumen</h3>
            <p className="text-gray-600 small-font-size">
              Gunakan fitur pencarian dan filter kategori untuk menemukan
              dokumen yang Anda butuhkan.
            </p>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm text-center">
            <div className="bg-blue-100 text-sipil-base rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32z" />
              </svg>
            </div>
            <h3 className="font-bold text-sipil-base mb-2">
              Klik Tombol Unduh
            </h3>
            <p className="text-gray-600 small-font-size">
              Klik tombol Unduh pada dokumen yang ingin Anda download ke
              perangkat Anda.
            </p>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm text-center">
            <div className="bg-blue-100 text-sipil-base rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM216 232V334.1l31-31c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-72 72c-9.4 9.4-24.6 9.4-33.9 0l-72-72c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l31 31V232c0-13.3 10.7-24 24-24s24 10.7 24 24z" />
              </svg>
            </div>
            <h3 className="font-bold text-sipil-base mb-2">Simpan File</h3>
            <p className="text-gray-600 small-font-size">
              Pilih lokasi di perangkat Anda untuk menyimpan file yang telah
              diunduh.
            </p>
          </div>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <h3 className="font-bold text-sipil-base mb-4">Catatan Penting</h3>
          <ul className="list-disc list-outside pl-4 md:pl-6 space-y-2 text-gray-600 small-font-size">
            <li>
              Dokumen yang dapat diunduh pada laman ini merupakan dokumen terbuka yang dapat diakses oleh umum.
            </li>
            <li>
              Pastikan Anda memiliki aplikasi yang sesuai untuk membuka file
              yang diunduh (PDF Reader, Microsoft Word, dll).
            </li>
            <li>
              Jika Anda mengalami masalah dalam mengunduh dokumen, silakan
              hubungi admin di{" "}
              <span className="text-sipil-base">laboratoriumsipi.unsoed@gmail.com</span>.
            </li>
            {/* <li>
              Dokumen resmi seperti surat keterangan, transkrip, dan ijazah
              tidak tersedia untuk diunduh dari website ini.
            </li> */}
          </ul>
        </div>
      </div>
    </section>
  );
}
