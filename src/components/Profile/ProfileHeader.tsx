export default function ProfileHeader() {
  return (
    <section className="bg-sipil-base text-light-base section-padding-x pt-28 pb-12">
      <div className="max-w-screen-xl mx-auto">
        <div className="max-w-3xl">
          <span className="gradient-to-r text-dark-base from-blue-quaternary to-light-base bg-gradient-to-br flex items-center gap-2 mb-4 w-fit py-1 px-3 rounded-md">
            <svg
              className="w-4"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
            </svg>
            <p className="extra-small-font-size">Profil</p>
          </span>
          <h1 className="font-bold mb-1">
            Profil Laboratorium Teknik Sipil Unsoed
          </h1>
          <p>
            Laboratorium Teknik Sipil Universitas Jenderal Soedirman (Unsoed) menyediakan layanan pengujian yang andal 
            dan akurat untuk mendukung kebutuhan akademisi serta mitra industri.
          </p>
        </div>
      </div>
    </section>
  );
}
