import { RuangLaboratorium } from "@/types";

const laboratories: RuangLaboratorium[] = [
  {
    id: 1,
    ruang: "D 101",
    kode: "LT",
    nama: "Laboratorium Tanah",
    deskripsi:
      "Laboratorium Tanah adalah laboratorium yang digunakan untuk melakukan pengujian dan analisis terhadap tanah, termasuk sifat fisik, kimia, dan mekanik tanah.",
    foto: "/images/labs/lab-tanah.jpg",
  },
  {
    id: 2,
    ruang: "D 102",
    kode: "LH",
    nama: "Laboratorium Hidrologi",
    deskripsi:
      "Laboratorium Hidrologi adalah laboratorium yang digunakan untuk melakukan pengujian dan analisis terhadap air, termasuk kualitas air, aliran sungai, dan siklus hidrologi.",
    foto: "/images/labs/lab-hidrologi.jpg",
  },
  {
    id: 3,
    ruang: "D 103",
    kode: "LSBB",
    nama: "Laboratorium Struktur dan Bahan Bangunan",
    deskripsi:
      "Laboratorium Struktur dan Bahan Bangunan adalah laboratorium yang digunakan untuk melakukan pengujian dan analisis terhadap bahan bangunan, termasuk beton, baja, dan material lainnya.",
    foto: "/images/labs/lab-struktur-bahan-bangunan.jpg",
  },
  {
    id: 4,
    ruang: "D 104",
  kode: "LP",
    nama: "Laboratorium Pemetaan",
    deskripsi:
      "Laboratorium Pemetaan adalah laboratorium yang digunakan untuk melakukan pengujian dan analisis terhadap data pemetaan, termasuk survei tanah, pemetaan topografi, dan pemetaan geospasial.",
    foto: "/images/labs/lab-pemetaan.jpg",
  },
  {
    id: 5,
    ruang: "D 105",
    kode: "LMT",
    nama: "Laboratorium Mekanika Tanah",
    deskripsi:
      "Laboratorium Mekanika Tanah adalah laboratorium yang digunakan untuk melakukan pengujian dan analisis terhadap sifat mekanik tanah, termasuk kekuatan, kepadatan, dan permeabilitas tanah.",
    foto: "/images/labs/lab-mekanika-tanah.jpg",
  },
];

export default laboratories;
