export default function DownloadHeader() {
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
              <path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" />
            </svg>
            <p className="extra-small-font-size">Pusat Unduhan</p>
          </span>
          <h1 className="font-bold mb-6">Unduhan Dokumen Laboratorium Teknik Sipil</h1>
          <p className="mb-6">
            Akses dan unduh dokumen resmi, formulir, template, pedoman
            praktikum, dan berbagai materi pembelajaran yang relevan untuk
            mahasiswa Teknik Sipil Unsoed dan masyarakat umum.
          </p>
        </div>
      </div>
    </section>
  );
}
