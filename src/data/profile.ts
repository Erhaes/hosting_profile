import {
  Dosen,
  Laboratorium,
  StrukturJabatan,
  Prestasi,
  Sertifikasi,
  KerjasamaIndustri,
} from "@/types";

const dosenList: Dosen[] = [
  {
    id: 1,
    nama: "Dr. Ir. Nama Dosen, M.T.",
    nip: "196001011990031001",
    bidangKeahlian: "Struktur Bangunan",
    foto: "/images/dosen/dosen1.jpg",
    email: "namadosen@unsoed.ac.id",
  },
  {
    id: 2,
    nama: "Prof. Dr. Nama Dosen Lain, M.Eng.",
    nip: "197005061995021002",
    bidangKeahlian: "Geoteknik",
    foto: "/images/dosen/dosen2.jpg",
    email: "namadosenlain@unsoed.ac.id",
  },
  {
    id: 3,
    nama: "Dr. Nama Dosen Ketiga, S.T., M.T.",
    nip: "198104122006041003",
    bidangKeahlian: "Manajemen Konstruksi",
    foto: "/images/dosen/dosen3.jpg",
    email: "dosenketiga@unsoed.ac.id",
  },
  {
    id: 4,
    nama: "Ir. Nama Dosen Keempat, M.Sc.",
    nip: "198509172010121004",
    bidangKeahlian: "Rekayasa Sumber Daya Air",
    foto: "/images/dosen/dosen4.jpg",
    email: "dosenkeempat@unsoed.ac.id",
  },
  {
    id: 5,
    nama: "Dr. Nama Dosen Kelima, S.T., M.T.",
    nip: "199001202015041005",
    bidangKeahlian: "Transportasi",
    foto: "/images/dosen/dosen5.jpg",
    email: "dosenkelima@unsoed.ac.id",
  },
  {
    id: 6,
    nama: "Nama Dosen Keenam, S.T., M.Eng.",
    nip: "199108052018031006",
    bidangKeahlian: "Teknik Lingkungan",
    foto: "/images/dosen/dosen6.jpg",
    email: "dosenkeenam@unsoed.ac.id",
  },
];

const labList: Laboratorium[] = [
  {
    id: 1,
    nama: "Laboratorium Mekanika Tanah",
    kepalaLab: "Dr. Ir. Nama Kepala Lab, M.T.",
    teknisi: ["Nama Teknisi 1, A.Md.", "Nama Teknisi 2, S.T."],
    fasilitas: [
      "Alat Uji Triaxial",
      "Alat Uji CBR",
      "Alat Uji Direct Shear",
      "Alat Uji Konsolidasi",
    ],
    foto: "/images/lab/lab-mekanika-tanah.jpg",
  },
  {
    id: 2,
    nama: "Laboratorium Struktur",
    kepalaLab: "Prof. Dr. Nama Kepala Lab Struktur, M.Eng.",
    teknisi: ["Nama Teknisi Struktur, A.Md."],
    fasilitas: [
      "Universal Testing Machine",
      "Loading Frame",
      "Compression Testing Machine",
      "Alat Uji Kuat Lentur",
    ],
    foto: "/images/lab/lab-struktur.jpg",
  },
  {
    id: 3,
    nama: "Laboratorium Hidrolika",
    kepalaLab: "Dr. Nama Kepala Lab Hidrolika, S.T., M.T.",
    teknisi: [
      "Nama Teknisi Hidrolika 1, A.Md.",
      "Nama Teknisi Hidrolika 2, S.T.",
    ],
    fasilitas: [
      "Flume",
      "Rainfall Simulator",
      "Model Hidrolik",
      "Current Meter",
    ],
    foto: "/images/lab/lab-hidrolika.jpg",
  },
  {
    id: 4,
    nama: "Laboratorium Transportasi",
    kepalaLab: "Dr. Nama Kepala Lab Transportasi, S.T., M.T.",
    teknisi: ["Nama Teknisi Transportasi, A.Md."],
    fasilitas: [
      "Marshall Test",
      "Los Angeles Abrasion Test",
      "Penetrometer",
      "Alat Uji Agregat",
    ],
    foto: "/images/lab/lab-transportasi.jpg",
  },
];

const strukturOrganisasi: StrukturJabatan[] = [
  {
    jabatan: "Ketua Program Studi",
    nama: "Dr. Ir. Nama Kaprodi, M.T.",
    foto: "/images/struktur/kaprodi.jpg",
  },
  {
    jabatan: "Sekretaris Program Studi",
    nama: "Dr. Nama Sekprodi, S.T., M.Eng.",
    foto: "/images/struktur/sekprodi.jpg",
  },
  {
    jabatan: "Koordinator Bidang Akademik",
    nama: "Dr. Nama Koordinator Akademik, M.T.",
    foto: "/images/struktur/koor-akademik.jpg",
  },
  {
    jabatan: "Koordinator Bidang Kemahasiswaan",
    nama: "Ir. Nama Koor Kemahasiswaan, M.Sc.",
    foto: "/images/struktur/koor-kemahasiswaan.jpg",
  },
  {
    jabatan: "Koordinator Bidang Kerjasama dan Alumni",
    nama: "Dr. Nama Koor Kerjasama, S.T., M.T.",
    foto: "/images/struktur/koor-kerjasama.jpg",
  },
];

const prestasiList: Prestasi[] = [
  {
    id: 1,
    judul: "Juara 1 Kompetisi Jembatan Indonesia",
    tahun: "2023",
    deskripsi:
      "Tim mahasiswa Teknik Sipil UNSOED berhasil meraih juara 1 dalam Kompetisi Jembatan Indonesia (KJI) kategori Jembatan Beton yang diselenggarakan oleh Direktorat Jenderal Pendidikan Tinggi.",
    kategori: "mahasiswa",
  },
  {
    id: 2,
    judul:
      "Best Paper Award pada International Conference on Civil Engineering",
    tahun: "2022",
    deskripsi:
      "Dr. Nama Dosen menerima Best Paper Award pada International Conference on Civil Engineering di Singapura untuk penelitian tentang Material Beton Berkelanjutan.",
    kategori: "dosen",
  },
  {
    id: 3,
    judul: "Akreditasi Internasional IABEE",
    tahun: "2021",
    deskripsi:
      "Program Studi Teknik Sipil UNSOED mendapatkan akreditasi internasional dari Indonesian Accreditation Board for Engineering Education (IABEE).",
    kategori: "jurusan",
  },
];

const sertifikasiList: Sertifikasi[] = [
  {
    id: 1,
    nama: 'Akreditasi "Unggul" BAN-PT',
    tahun: "2020-2025",
    deskripsi:
      'Program Studi Teknik Sipil UNSOED mendapatkan akreditasi dengan peringkat "Unggul" dari Badan Akreditasi Nasional Perguruan Tinggi (BAN-PT).',
    logo: "/images/sertifikasi/ban-pt.png",
  },
  {
    id: 2,
    nama: "Sertifikasi ISO 9001:2015",
    tahun: "2021-2024",
    deskripsi:
      "Laboratorium Teknik Sipil UNSOED telah tersertifikasi ISO 9001:2015 untuk sistem manajemen mutu.",
    logo: "/images/sertifikasi/iso.png",
  },
  {
    id: 3,
    nama: "Akreditasi IABEE",
    tahun: "2021-2026",
    deskripsi:
      "Program Studi Teknik Sipil UNSOED terakreditasi oleh Indonesian Accreditation Board for Engineering Education (IABEE).",
    logo: "/images/sertifikasi/iabee.png",
  },
];

const kerjasamaList: KerjasamaIndustri[] = [
  {
    id: 1,
    namaPerusahaan: "PT. Wijaya Karya (Persero) Tbk.",
    bidang: "Konstruksi",
    tahunMulai: "2020",
    logo: "/images/kerjasama/wika.png",
  },
  {
    id: 2,
    namaPerusahaan: "PT. Pembangunan Perumahan (Persero) Tbk.",
    bidang: "Konstruksi",
    tahunMulai: "2019",
    logo: "/images/kerjasama/pp.png",
  },
  {
    id: 3,
    namaPerusahaan: "Dinas Pekerjaan Umum Provinsi Jawa Tengah",
    bidang: "Pemerintahan",
    tahunMulai: "2018",
    logo: "/images/kerjasama/pu-jateng.png",
  },
  {
    id: 4,
    namaPerusahaan: "Ikatan Alumni Teknik Sipil UNSOED",
    bidang: "Alumni",
    tahunMulai: "2010",
    logo: "/images/kerjasama/ikatan-alumni.png",
  },
];

export {
  dosenList,
  labList,
  strukturOrganisasi,
  prestasiList,
  sertifikasiList,
  kerjasamaList,
};
