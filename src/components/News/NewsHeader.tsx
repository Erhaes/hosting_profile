export default function NewsHeader() {
  return (
    <section className="bg-sipil-base text-light-base section-padding-x pt-28 pb-12">
      <div className="max-w-screen-xl mx-auto">
        <div className="max-w-3xl">
          <span className="gradient-to-r text-dark-base from-blue-quaternary to-light-base bg-gradient-to-br flex items-center gap-2 mb-4 w-fit py-1 px-3 rounded-md">
            <svg
              className="w-4"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
            </svg>
            <p className="extra-small-font-size">
              Berita Terkini
            </p>
          </span>
          <h1 className="font-bold mb-1">
            Berita dan Informasi Terbaru
          </h1>
          <p>
            Temukan berita terbaru, artikel, dan informasi terkini seputar
            Teknik Sipil Universitas Jenderal Soedirman. Kami menyajikan
            informasi yang relevan dan bermanfaat untuk mahasiswa, dosen, dan
            masyarakat umum.
          </p>
        </div>
      </div>
    </section>
  );
}
