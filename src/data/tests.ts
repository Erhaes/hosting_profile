import type { Test } from "@/types"

const testsData: Test[] = [
  {
    id: 1,
    name: "Uji Kuat Tekan Beton",
    slug: "uji-kuat-tekan-beton",
    description: "Pengujian untuk menentukan kekuatan tekan beton dengan menggunakan mesin uji tekan. Sampel beton berbentuk silinder atau kubus diletakkan di mesin dan diberi beban sampai hancur.",
    images: [
      { id: 1, image: "/images/tests/uji-tekan-beton-1.jpg" },
      { id: 2, image: "/images/tests/uji-tekan-beton-2.jpg" }
    ],
    minimum_unit: 3,
    daily_slot: 8,
    is_active: true,
    laboratory: {
      id: 2,
      name: "Laboratorium Bahan Bangunan",
      slug: "laboratorium-bahan-bangunan",
      description: "Laboratorium untuk pengujian berbagai material bangunan termasuk beton, baja, kayu, dan agregat.",
      image: "/images/facilities/lab-bahan.jpg",
      type: {
        id: 1,
        name: "Laboratorium"
      },
      gears: [
        {
          id: 5,
          name: "Mesin Uji Tekan",
          description: "Alat untuk mengukur kekuatan tekan material",
          image: "/images/facilities/mesin-uji-tekan.jpg"
        }
      ],
      room: "B.202"
    },
    unit: {
      id: 1,
      name: "Sampel"
    }
  },
  {
    id: 2,
    name: "Uji CBR (California Bearing Ratio)",
    slug: "uji-cbr",
    description: "Pengujian untuk mengevaluasi kekuatan tanah dasar untuk pembangunan jalan dan landasan pacu. Sampel tanah dipadatkan dan diuji penetrasinya.",
    images: [
      { id: 3, image: "/images/tests/uji-cbr-1.jpg" },
      { id: 4, image: "/images/tests/uji-cbr-2.jpg" }
    ],
    minimum_unit: 1,
    daily_slot: 5,
    is_active: true,
    laboratory: {
      id: 1,
      name: "Laboratorium Geoteknik",
      slug: "laboratorium-geoteknik",
      description: "Laboratorium untuk pengujian tanah dan analisis pondasi.",
      image: "/images/facilities/geoteknik.jpg",
      type: {
        id: 1,
        name: "Laboratorium"
      },
      gears: [
        {
          id: 1,
          name: "Alat Uji CBR",
          description: "Alat untuk mengukur daya dukung tanah",
          image: "/images/facilities/alat-cbr.jpg"
        }
      ],
      room: "D.101"
    },
    unit: {
      id: 2,
      name: "Titik"
    }
  },
  {
    id: 3,
    name: "Uji Tarik Baja",
    slug: "uji-tarik-baja",
    description: "Pengujian untuk menentukan kekuatan tarik, elastisitas, dan keuletan baja tulangan dengan mesin uji tarik universal.",
    images: [
      { id: 5, image: "/images/tests/uji-tarik-baja-1.jpg" },
      { id: 6, image: "/images/tests/uji-tarik-baja-2.jpg" }
    ],
    minimum_unit: 2,
    daily_slot: 6,
    is_active: true,
    laboratory: {
      id: 2,
      name: "Laboratorium Bahan Bangunan",
      slug: "laboratorium-bahan-bangunan",
      description: "Laboratorium untuk pengujian berbagai material bangunan termasuk beton, baja, kayu, dan agregat.",
      image: "/images/facilities/lab-bahan.jpg",
      type: {
        id: 1,
        name: "Laboratorium"
      },
      gears: [
        {
          id: 6,
          name: "Mesin Uji Tarik Universal",
          description: "Alat untuk mengukur kekuatan tarik material",
          image: "/images/facilities/mesin-uji-tarik.jpg"
        }
      ],
      room: "B.202"
    },
    unit: {
      id: 3,
      name: "Batang"
    }
  },
  {
    id: 4,
    name: "Uji Dinamika Struktur",
    slug: "uji-dinamika-struktur",
    description: "Pengujian untuk mengevaluasi respon struktur terhadap beban dinamis seperti gempa bumi atau getaran mekanis.",
    images: [
      { id: 7, image: "/images/tests/uji-dinamika-struktur-1.jpg" },
      { id: 8, image: "/images/tests/uji-dinamika-struktur-2.jpg" }
    ],
    minimum_unit: 1,
    daily_slot: 3,
    is_active: true,
    laboratory: {
      id: 3,
      name: "Laboratorium Struktur",
      slug: "laboratorium-struktur",
      description: "Laboratorium untuk menguji dan menganalisis perilaku struktur dan komponen struktural.",
      image: "/images/facilities/lab-struktur.jpg",
      type: {
        id: 1,
        name: "Laboratorium"
      },
      gears: [
        {
          id: 7,
          name: "Shaking Table",
          description: "Alat untuk mensimulasikan getaran gempa pada model struktur",
          image: "/images/facilities/shaking-table.jpg"
        }
      ],
      room: "C.301"
    },
    unit: {
      id: 4,
      name: "Model"
    }
  },
  {
    id: 5,
    name: "Uji Permeabilitas Tanah",
    slug: "uji-permeabilitas-tanah",
    description: "Pengujian untuk mengukur kemampuan tanah dalam meloloskan air, penting untuk desain drainase dan struktur tanah.",
    images: [
      { id: 9, image: "/images/tests/uji-permeabilitas-1.jpg" },
      { id: 10, image: "/images/tests/uji-permeabilitas-2.jpg" }
    ],
    minimum_unit: 2,
    daily_slot: 4,
    is_active: true,
    laboratory: {
      id: 1,
      name: "Laboratorium Geoteknik",
      slug: "laboratorium-geoteknik",
      description: "Laboratorium untuk pengujian tanah dan analisis pondasi.",
      image: "/images/facilities/geoteknik.jpg",
      type: {
        id: 1,
        name: "Laboratorium"
      },
      gears: [
        {
          id: 2,
          name: "Permeameter",
          description: "Alat untuk mengukur permeabilitas tanah",
          image: "/images/facilities/permeameter.jpg"
        }
      ],
      room: "D.101"
    },
    unit: {
      id: 2,
      name: "Titik"
    }
  },
  {
    id: 6,
    name: "Uji Kualitas Air",
    slug: "uji-kualitas-air",
    description: "Pengujian parameter fisik, kimia, dan biologis air untuk menilai kesesuaiannya untuk keperluan konstruksi atau lingkungan.",
    images: [
      { id: 11, image: "/images/tests/uji-air-1.jpg" },
      { id: 12, image: "/images/tests/uji-air-2.jpg" }
    ],
    minimum_unit: 1,
    daily_slot: 10,
    is_active: false,
    laboratory: {
      id: 4,
      name: "Laboratorium Lingkungan",
      slug: "laboratorium-lingkungan",
      description: "Laboratorium untuk pengujian kualitas air, udara, dan dampak lingkungan dari proyek infrastruktur.",
      image: "/images/facilities/lab-lingkungan.jpg",
      type: {
        id: 1,
        name: "Laboratorium"
      },
      gears: [
        {
          id: 8,
          name: "Spektrofotometer",
          description: "Alat untuk menganalisis kandungan zat dalam air",
          image: "/images/facilities/spektrofotometer.jpg"
        }
      ],
      room: "E.105"
    },
    unit: {
      id: 5,
      name: "Sampel"
    }
  },
  {
    id: 7,
    name: "Uji Gradasi Agregat",
    slug: "uji-gradasi-agregat",
    description: "Pengujian untuk menentukan distribusi ukuran butiran agregat yang digunakan dalam campuran beton atau aspal.",
    images: [
      { id: 13, image: "/images/tests/uji-gradasi-1.jpg" },
      { id: 14, image: "/images/tests/uji-gradasi-2.jpg" }
    ],
    minimum_unit: 2,
    daily_slot: 8,
    is_active: true,
    laboratory: {
      id: 5,
      name: "Laboratorium Transportasi",
      slug: "laboratorium-transportasi",
      description: "Laboratorium untuk pengujian material perkerasan jalan, aspal, dan analisis transportasi.",
      image: "/images/facilities/lab-transportasi.jpg",
      type: {
        id: 1,
        name: "Laboratorium"
      },
      gears: [
        {
          id: 9,
          name: "Sieve Shaker",
          description: "Alat untuk analisis gradasi ukuran agregat",
          image: "/images/facilities/sieve-shaker.jpg"
        }
      ],
      room: "F.201"
    },
    unit: {
      id: 5,
      name: "Sampel"
    }
  },
  {
    id: 8,
    name: "Uji Konsolidasi Tanah",
    slug: "uji-konsolidasi-tanah",
    description: "Pengujian untuk menentukan laju dan besarnya penurunan tanah ketika dibebani, penting untuk perencanaan pondasi bangunan.",
    images: [
      { id: 15, image: "/images/tests/uji-konsolidasi-1.jpg" },
      { id: 16, image: "/images/tests/uji-konsolidasi-2.jpg" }
    ],
    minimum_unit: 1,
    daily_slot: 3,
    is_active: true,
    laboratory: {
      id: 1,
      name: "Laboratorium Geoteknik",
      slug: "laboratorium-geoteknik",
      description: "Laboratorium untuk pengujian tanah dan analisis pondasi.",
      image: "/images/facilities/geoteknik.jpg",
      type: {
        id: 1,
        name: "Laboratorium"
      },
      gears: [
        {
          id: 3,
          name: "Alat Uji Konsolidasi",
          description: "Alat untuk mengukur pemampatan tanah",
          image: "/images/facilities/konsolidometer.jpg"
        }
      ],
      room: "D.101"
    },
    unit: {
      id: 2,
      name: "Titik"
    }
  }
];

export default testsData;