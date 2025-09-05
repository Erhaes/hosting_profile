import laboratories from "@/data/laboratories";

export default function HomepageLaboratories() {
  return (
    <section
      id="komunitas"
      className="section-padding-x pt-12 pb-12 text-dark-base dark:text-light-base bg-light-base dark:bg-slate-950 scroll-mt-12"
    >
      <div className="mx-auto max-w-screen-xl">
        <div className="text-center mb-8 max-w-3xl mx-auto">
          <p className="px-2 py-0.5 mb-2 rounded-md text-blue-base bg-blue-tertiary font-semibold w-fit mx-auto small-font-size">
            Laboratorium
          </p>
          <h2 className="font-bold mb-2">
            Dilengkapi dengan Berbagai Laboratorium Modern untuk Mendukung
            Kegiatan Penelitian.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {laboratories.map((lab, index) => (
            <div
              key={index}
              className="shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300 bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden"
            >
              <div className="relative">
                <img
                  src={lab.foto}
                  alt={lab.nama}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-900" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-1">{lab.nama}</h3>
                <p
                  className="text-gray-500 mb-4 line-clamp-3"
                  style={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  }}
                >
                  {lab.deskripsi}
                </p>
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-block py-1 px-3 text-center border border-gray-400 rounded-md transition-all duration-300 hover:bg-sipil-base hover:text-light-base hover:border-sipil-base text-gray-700 dark:text-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-sipil-base dark:hover:text-light-base"
                >
                  Lihat Laboratorium
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
