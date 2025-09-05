import { News } from "@/types";

const news: News[] = [
    {
        id: 1,
        title: "Pembangunan Jembatan Suramadu Fase 2 Dimulai",
        content: "Pembangunan fase kedua dari Jembatan Suramadu telah dimulai. Proyek ini diperkirakan akan selesai dalam waktu 3 tahun dan akan meningkatkan konektivitas antara Surabaya dan Madura.",
        thumbnail: "/images/news/suramadu-bridge.jpg",
        date: "2023-05-15",
        category: {
            id: 1,
            name: "Infrastruktur"
        },
        user: {
            id: 1,
            name: "Ahmad Faisal",
            email: "ahmad.faisal@example.com",
            photo: "/images/users/ahmad.jpg"
        }
    },
    {
        id: 2,
        title: "Perusahaan Memenangkan Tender Proyek Bendungan",
        content: "PT Sipil Jaya berhasil memenangkan tender untuk proyek pembangunan bendungan di Jawa Barat. Proyek senilai 2 triliun rupiah ini akan menjadi salah satu bendungan terbesar di Indonesia.",
        thumbnail: "/images/news/dam-project.jpg",
        date: "2023-06-22",
        category: {
            id: 2,
            name: "Proyek"
        },
        user: {
            id: 2,
            name: "Siti Rahma",
            email: "siti.rahma@example.com",
            photo: "/images/users/siti.jpg"
        }
    },
    {
        id: 3,
        title: "Teknologi Baru dalam Konstruksi Ramah Lingkungan",
        content: "Inovasi terbaru dalam teknologi konstruksi ramah lingkungan telah diperkenalkan dalam pameran tahunan. Material bangunan ini dapat mengurangi emisi karbon hingga 40%.",
        thumbnail: "/images/news/eco-construction.jpg",
        date: "2023-07-10",
        category: {
            id: 3,
            name: "Teknologi"
        },
        user: {
            id: 3,
            name: "Budi Santoso",
            email: "budi.santoso@example.com",
            photo: "/images/users/budi.jpg"
        }
    },
    {
        id: 4,
        title: "Pelatihan Teknik Sipil untuk Mahasiswa",
        content: "Program pelatihan teknik sipil untuk mahasiswa telah diluncurkan sebagai bagian dari kerjasama antara industri dan perguruan tinggi untuk meningkatkan kualitas lulusan.",
        thumbnail: "/images/news/civil-training.jpg",
        date: "2023-08-05",
        category: {
            id: 4,
            name: "Pendidikan"
        },
        user: {
            id: 4,
            name: "Diana Putri",
            email: "diana.putri@example.com",
            photo: "/images/users/diana.jpg"
        }
    },
    {
        id: 5,
        title: "Proyek Renovasi Gedung Bersejarah",
        content: "Renovasi gedung bersejarah di pusat kota telah dimulai. Proyek ini bertujuan untuk melestarikan nilai sejarah sambil meningkatkan struktur dan keamanan gedung.",
        thumbnail: "/images/news/historical-building.jpg",
        date: "2023-09-18",
        category: {
            id: 5,
            name: "Konservasi"
        },
        user: {
            id: 5,
            name: "Rudi Hartono",
            email: "rudi.hartono@example.com",
            photo: "/images/users/rudi.jpg"
        }
    }
];

export default news;