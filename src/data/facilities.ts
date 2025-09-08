import { Facility } from "@/types";

const facilitiesData: Facility[] = [
    {
        id: 1,
        name: "Laboratorium Geoteknik",
        slug: "laboratorium-geoteknik",
        description:
            "Laboratorium Geoteknik adalah fasilitas yang digunakan untuk penelitian dan pengujian material tanah, serta analisis stabilitas lereng dan pondasi.",
        image: "/images/facilities/geoteknik.jpg",
        type: {
            id: 1,
            name: "Laboratorium",
        },
        gears: [
            {
                id: 1,
                name: "Alat Uji Tanah",
                description:
                    "Alat yang digunakan untuk menguji sifat fisik dan mekanik tanah.",
                image: "/images/facilities/alat-uji-tanah.jpg",
            },
            {
                id: 2,
                name: "Alat Uji Pondasi",
                description:
                    "Alat yang digunakan untuk menguji kekuatan dan stabilitas pondasi.",
                image: "/images/facilities/alat-uji-pondasi.jpg",
            },
        ],
        room: "D.101",
    },
    {
        id: 2,
        name: "Laboratorium Hidrolika",
        slug: "laboratorium-hidrolika",
        description:
            "Laboratorium Hidrolika adalah fasilitas yang digunakan untuk penelitian dan pengujian aliran fluida, serta analisis sistem drainase.",
        image: "/images/facilities/hidrolika.jpg",
        type: {
            id: 1,
            name: "Laboratorium",
        },
        gears: [
            {
                id: 3,
                name: "Flume Channel",
                description: "Saluran air untuk simulasi aliran dan pengujian model hidrolika.",
                image: "/images/facilities/flume-channel.jpg",
            },
            {
                id: 4,
                name: "Pompa Air",
                description: "Pompa untuk mengalirkan air dalam eksperimen hidrolika.",
                image: "/images/facilities/pompa-air.jpg",
            },
        ],
        room: "D.102",
    },
    {
        id: 3,
        name: "Laboratorium Struktur",
        slug: "laboratorium-struktur",
        description:
            "Laboratorium Struktur adalah fasilitas yang digunakan untuk penelitian dan pengujian struktur bangunan, termasuk analisis kekuatan dan ketahanan struktur.",
        image: "/images/facilities/struktur.jpg",
        type: {
            id: 1,
            name: "Laboratorium",
        },
        gears: [
            {
                id: 5,
                name: "Universal Testing Machine",
                description: "Mesin untuk menguji kekuatan tarik dan tekan material.",
                image: "/images/facilities/utm.jpg",
            },
            {
                id: 6,
                name: "Strain Gauge",
                description: "Alat untuk mengukur regangan pada struktur.",
                image: "/images/facilities/strain-gauge.jpg",
            },
        ],
        room: "D.103",
    },
    {
        id: 4,
        name: "Laboratorium Bahan Bangunan",
        slug: "laboratorium-bahan-bangunan",
        description:
            "Laboratorium Bahan Bangunan digunakan untuk pengujian kualitas dan karakteristik material konstruksi seperti beton, baja, dan aspal.",
        image: "/images/facilities/bahan-bangunan.jpg",
        type: {
            id: 1,
            name: "Laboratorium",
        },
        gears: [
            {
                id: 7,
                name: "Mixer Beton",
                description: "Alat untuk mencampur bahan-bahan beton.",
                image: "/images/facilities/mixer-beton.jpg",
            },
            {
                id: 8,
                name: "Slump Test Set",
                description: "Alat untuk menguji konsistensi beton segar.",
                image: "/images/facilities/slump-test.jpg",
            },
        ],
        room: "D.104",
    },
    {
        id: 5,
        name: "Laboratorium Transportasi",
        slug: "laboratorium-transportasi",
        description:
            "Laboratorium Transportasi digunakan untuk penelitian dan pengujian terkait sistem transportasi, lalu lintas, dan perkerasan jalan.",
        image: "/images/facilities/transportasi.jpg",
        type: {
            id: 1,
            name: "Laboratorium",
        },
        gears: [
            {
                id: 9,
                name: "Marshall Test Apparatus",
                description: "Alat untuk menguji stabilitas campuran aspal.",
                image: "/images/facilities/marshall-test.jpg",
            },
            {
                id: 10,
                name: "Traffic Counter",
                description: "Alat untuk menghitung volume lalu lintas.",
                image: "/images/facilities/traffic-counter.jpg",
            },
        ],
        room: "D.105",
    },
    {
        id: 6,
        name: "Laboratorium Lingkungan",
        slug: "laboratorium-lingkungan",
        description:
            "Laboratorium Lingkungan digunakan untuk pengujian kualitas air, udara, dan tanah serta analisis dampak lingkungan.",
        image: "/images/facilities/lingkungan.jpg",
        type: {
            id: 1,
            name: "Laboratorium",
        },
        gears: [
            {
                id: 11,
                name: "Spektrofotometer",
                description: "Alat untuk analisis kimia air dan tanah.",
                image: "/images/facilities/spektrofotometer.jpg",
            },
            {
                id: 12,
                name: "pH Meter",
                description: "Alat untuk mengukur tingkat keasaman air.",
                image: "/images/facilities/ph-meter.jpg",
            },
        ],
        room: "D.106",
    },
    {
        id: 7,
        name: "Laboratorium Survey dan Pemetaan",
        slug: "laboratorium-survey-dan-pemetaan",
        description:
            "Laboratorium Survey dan Pemetaan digunakan untuk pelatihan dan pengujian alat ukur tanah serta pemetaan topografi.",
        image: "/images/facilities/survey.jpg",
        type: {
            id: 1,
            name: "Laboratorium",
        },
        gears: [
            {
                id: 13,
                name: "Total Station",
                description: "Alat ukur elektronik untuk survei dan pemetaan.",
                image: "/images/facilities/total-station.jpg",
            },
            {
                id: 14,
                name: "Theodolite",
                description: "Alat untuk mengukur sudut horizontal dan vertikal.",
                image: "/images/facilities/theodolite.jpg",
            },
        ],
        room: "D.107",
    },
    {
        id: 8,
        name: "Laboratorium Mekanika Fluida",
        slug: "laboratorium-mekanika-fluida",
        description:
            "Laboratorium Mekanika Fluida digunakan untuk mempelajari perilaku fluida dan aplikasinya dalam teknik sipil.",
        image: "/images/facilities/mekanika-fluida.jpg",
        type: {
            id: 1,
            name: "Laboratorium",
        },
        gears: [
            {
                id: 15,
                name: "Viscometer",
                description: "Alat untuk mengukur viskositas fluida.",
                image: "/images/facilities/viscometer.jpg",
            },
            {
                id: 16,
                name: "Flow Meter",
                description: "Alat untuk mengukur laju aliran fluida.",
                image: "/images/facilities/flow-meter.jpg",
            },
        ],
        room: "D.108",
    },
    {
        id: 9,
        name: "Laboratorium Komputasi Teknik Sipil",
        slug: "laboratorium-komputasi-teknik-sipil",
        description:
            "Laboratorium Komputasi menyediakan fasilitas perangkat lunak dan perangkat keras untuk simulasi dan analisis struktur serta transportasi.",
        image: "/images/facilities/komputasi.jpg",
        type: {
            id: 2,
            name: "Komputasi",
        },
        gears: [
            {
                id: 17,
                name: "Komputer Workstation",
                description: "Komputer dengan spesifikasi tinggi untuk simulasi teknik.",
                image: "/images/facilities/workstation.jpg",
            },
            {
                id: 18,
                name: "Software Analisis Struktur",
                description: "Perangkat lunak untuk analisis dan desain struktur.",
                image: "/images/facilities/software-struktur.jpg",
            },
        ],
        room: "D.109",
    },
    {
        id: 10,
        name: "Laboratorium Manajemen Konstruksi",
        slug: "laboratorium-manajemen-konstruksi",
        description:
            "Laboratorium ini digunakan untuk simulasi manajemen proyek konstruksi, termasuk penjadwalan dan estimasi biaya.",
        image: "/images/facilities/manajemen-konstruksi.jpg",
        type: {
            id: 1,
            name: "Laboratorium",
        },
        gears: [
            {
                id: 19,
                name: "Software Manajemen Proyek",
                description: "Perangkat lunak untuk penjadwalan dan pengelolaan proyek.",
                image: "/images/facilities/software-manajemen.jpg",
            },
            {
                id: 20,
                name: "Model Miniatur Proyek",
                description: "Model fisik untuk simulasi proyek konstruksi.",
                image: "/images/facilities/model-proyek.jpg",
            },
        ],
        room: "D.110",
    },
    {
        id: 11,
        name: "Laboratorium Jalan Raya",
        slug: "laboratorium-jalan-raya",
        description:
            "Laboratorium Jalan Raya digunakan untuk pengujian material perkerasan dan analisis struktur jalan.",
        image: "/images/facilities/jalan-raya.jpg",
        type: {
            id: 1,
            name: "Laboratorium",
        },
        gears: [
            {
                id: 21,
                name: "Coring Machine",
                description: "Alat untuk mengambil sampel inti perkerasan jalan.",
                image: "/images/facilities/coring-machine.jpg",
            },
            {
                id: 22,
                name: "Penetrometer",
                description: "Alat untuk mengukur kekuatan permukaan jalan.",
                image: "/images/facilities/penetrometer.jpg",
            },
        ],
        room: "D.111",
    },
    {
        id: 12,
        name: "Laboratorium Beton",
        slug: "laboratorium-beton",
        description:
            "Laboratorium Beton digunakan untuk pengujian mutu beton, mulai dari bahan baku hingga produk akhir.",
        image: "/images/facilities/beton.jpg",
        type: {
            id: 1,
            name: "Laboratorium",
        },
        gears: [
            {
                id: 23,
                name: "Compression Testing Machine",
                description: "Mesin untuk menguji kekuatan tekan beton.",
                image: "/images/facilities/compression-machine.jpg",
            },
            {
                id: 24,
                name: "Mould Silinder Beton",
                description: "Cetakan untuk pembuatan sampel beton silinder.",
                image: "/images/facilities/mould-beton.jpg",
            },
        ],
        room: "D.112",
    },
];

export default facilitiesData;
