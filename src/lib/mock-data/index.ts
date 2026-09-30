import type { KnowledgeDocument, UserRole } from "@/types";

export interface PoultryFact {
  id: string;
  badge: string;
  factNumber: string;
  title: string;
  description: string;
  footerLabel: string;
  footerValue: string;
}

export const MOCK_FACTS: PoultryFact[] = [
  {
    id: "fact-1",
    badge: "Fotoperiodisme & Kelenjar Pineal",
    factNumber: "Fakta #01",
    title: "Pengaruh Spektrum Cahaya terhadap Siklus Bertelur",
    description:
      "Ayam memiliki reseptor visual ekstra-retinal khusus yang sangat peka terhadap spektrum cahaya merah dan jingga (panjang gelombang 630–660 nm). Radiasi foton ini menembus batok kepala secara langsung untuk merangsang hipotalamus, memicu pelepasan hormon GnRH yang mengatur sintesis ovulasi dan produksi telur harian secara optimal.",
    footerLabel: "Spektrum Efektif: 630–660 nm",
    footerValue: "Tingkat Stimulasi +18%",
  },
  {
    id: "fact-2",
    badge: "Struktur Kalsium",
    factNumber: "Fakta #02",
    title: "Anatomi Cangkang Telur & Porositas Mikro",
    description:
      "Meskipun tampak padat dan kaku, sebutir cangkang telur memiliki lebih dari 7.000 hingga 17.000 pori mikro berbentuk corong. Struktur mikroskopis ini memfasilitasi respirasi difusi pertukaran gas oksigen, uap air, dan karbon dioksida selama pembentukan embrio dan penyimpanan.",
    footerLabel: "Kepadatan Pori",
    footerValue: "7.000 - 17.000 / Butir",
  },
  {
    id: "fact-3",
    badge: "Kognisi Sosial",
    factNumber: "Fakta #03",
    title: "Daya Ingat & Pengenalan Wajah",
    description:
      "Ayam memiliki memori asosiatif yang luar biasa tajam. Penelitian neurobiologi mengonfirmasi unggas mampu membedakan dan mengingat lebih dari 100 wajah individu sesama ayam maupun penjaga kandang manusia dalam tatanan hierarki sosial (pecking order).",
    footerLabel: "Memori Identitas",
    footerValue: "100+ Wajah",
  },
  {
    id: "fact-4",
    badge: "Termoregulasi",
    factNumber: "Fakta #04",
    title: "Fisiologi Suhu Internal & Keringat",
    description:
      "Ayam tidak memiliki kelenjar keringat di lapisan dermisnya. Untuk menjaga suhu inti 41°C–42°C saat terpapar panas, ayam sepenuhnya mengandalkan evaporasi melalui pernapasan cepat ('panting') serta pemuaian pembuluh darah pada pial dan jengger.",
    footerLabel: "Metode Pendinginan",
    footerValue: "Evaporatif Panting",
  },
  {
    id: "fact-5",
    badge: "Bio-Pigmentasi",
    factNumber: "Fakta #05",
    title: "Kualitas Pigmen Kuning Telur",
    description:
      "Kedalaman rona kuning telur tidak dihasilkan secara genetik internal murni, melainkan akumulasi karotenoid alami (lutein, zeaxanthin, dan capsanthin) dari pakan nabati seperti jagung kuning dan alfalfa yang diserap sempurna oleh saluran cerna.",
    footerLabel: "Skala Yolk Roche",
    footerValue: "12–15 Optimal",
  },
];

export const MOCK_DOCUMENTS: KnowledgeDocument[] = [
  {
    id: "doc-1",
    title: "Optimasi_Formulasi_Pakan_Layer_Fase_Puncak.pdf",
    author: "Dr. Ir. S. Hartono, M.Sc",
    publication_year: 2025,
    category: "Nutrisi Pakan",
    description: "ID Riset: AGR-2025-089 • Penulis: Dr. Ir. S. Hartono, M.Sc",
    original_filename: "Optimasi_Formulasi_Pakan_Layer_Fase_Puncak.pdf",
    status: "READY",
    file_size_bytes: 4.8 * 1024 * 1024,
    download_count: 8420,
    created_at: "2025-10-24T10:00:00Z",
    updated_at: "2025-10-24T10:00:00Z",
  },
  {
    id: "doc-2",
    title: "Protokol_Biosekuriti_Tiga_Zona_Kandang_Modern.pdf",
    author: "Balai Karantina & Vet",
    publication_year: 2025,
    category: "Penyakit & Vaksinasi",
    description: "ID Riset: AGR-2025-072 • Balai Karantina & Vet",
    original_filename: "Protokol_Biosekuriti_Tiga_Zona_Kandang_Modern.pdf",
    status: "READY",
    file_size_bytes: 7.2 * 1024 * 1024,
    download_count: 6115,
    created_at: "2025-10-18T14:30:00Z",
    updated_at: "2025-10-18T14:30:00Z",
  },
  {
    id: "doc-3",
    title: "Studi Efisiensi Penggunaan Tepung Kulit Telur dan Suplementasi Kalsium Organik terhadap Ketebalan Cangkang Fase Layer Akhir (2024)",
    author: "Lab Nutrisi AgriLivestock & Fapet",
    publication_year: 2024,
    category: "Nutrisi & Kalsifikasi",
    description: "Investigasi mendalam terkait suplementasi partikel kalsium organik mikron dan kalsit daur ulang terhadap sintesis kelenjar uterus pada flok ayam petelur berumur di atas 68 minggu.",
    original_filename: "Studi_Efisiensi_Tepung_Kulit_Telur_Kalsium_Organik.pdf",
    status: "READY",
    file_size_bytes: 2.4 * 1024 * 1024,
    download_count: 9510,
    created_at: "2024-09-15T08:00:00Z",
    updated_at: "2024-09-15T08:00:00Z",
  },
  {
    id: "doc-4",
    title: "Optimalisasi Mikroklimat Kandang Closed House Menggunakan Sensor IoT Cerdas untuk Reduksi Emisi Gas Amonia (2024)",
    author: "Departemen Biosistem & Sensorik Kandang",
    publication_year: 2024,
    category: "Smart Poultry IoT",
    description: "Pengujian integrasi sistem aerasi berbasis variabel frekuensi kipas exhaust terautomasi sensor gas NH3 dan sensor kelembaban relatif guna menurunkan resiko infeksi pernapasan kronis (CRD).",
    original_filename: "Optimalisasi_Mikroklimat_Kandang_Closed_House_IoT.pdf",
    status: "READY",
    file_size_bytes: 3.8 * 1024 * 1024,
    download_count: 4280,
    created_at: "2024-06-10T11:00:00Z",
    updated_at: "2024-06-10T11:00:00Z",
  },
];

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialtyBadge: string;
  description: string;
  achievement: string;
  image: string;
}

export const MOCK_TEAM: TeamMember[] = [
  {
    id: "team-1",
    name: "drh. Ratna Wardani, M.Sc.",
    role: "Kepala Riset Klinis & Biosekuriti Kandang",
    specialtyBadge: "KESEHATAN UNGGAS",
    description:
      "Pengalaman lebih dari 16 tahun dalam mitigasi penyakit avian, formulasi vaksinasi layer, dan standardisasi kebersihan mikrobiologis flock.",
    achievement: "18 Publikasi Jurnal",
    image: "/images/team/ratna.jpg",
  },
  {
    id: "team-2",
    name: "Ir. Hendro Suwandi, Ph.D.",
    role: "Spesialis Formulasi Nutrisi & Substitusi Pakan",
    specialtyBadge: "NUTRISI PAKAN",
    description:
      "Pakar riset rasio asam amino esensial dan pemanfaatan fermentasi bungkil kelapa sawit lokal untuk menurunkan rasio konversi pakan (FCR).",
    achievement: "22 Formularium Teruji",
    image: "/images/team/hendro.jpg",
  },
  {
    id: "team-3",
    name: "Dr. Maya Kusumo, S.P., M.T.",
    role: "Lead Agronom & Arsitektur IoT Kandang",
    specialtyBadge: "SISTEM AGRIBISNIS",
    description:
      "Merancang sensor mikroklimat cerdas hemat energi untuk kandang semi-terbuka dan closed-house ramah lingkungan di iklim tropis lembap.",
    achievement: "14 Paten Kandang Cerdas",
    image: "/images/team/maya.jpg",
  },
];

export const MOCK_ADMIN_STATS = {
  activeVisitors: 48250,
  activeVisitorsMoM: "+14.2% MoM",
  pdfDownloads: 28910,
  pdfDownloadsLabel: "+22.8% literatur ilmiah",
  totalDocuments: 42,
  monthlyTrends: [
    { month: "Jan", visits: 110, downloads: 70 },
    { month: "Feb", visits: 125, downloads: 85 },
    { month: "Mar", visits: 140, downloads: 95 },
    { month: "Apr", visits: 130, downloads: 90 },
    { month: "Mei", visits: 155, downloads: 110 },
    { month: "Jun", visits: 180, downloads: 145 },
  ],
};

export interface MockUserRecord {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: "Aktif" | "Nonaktif";
  joinedAt: string;
  phone: string;
}

export const MOCK_USERS: MockUserRecord[] = [
  {
    id: "u-1",
    name: "Administrator Demo",
    email: "admin@demo.local",
    role: "ADMIN",
    status: "Aktif",
    joinedAt: "12 Jan 2024",
    phone: "081234567890",
  },
  {
    id: "u-2",
    name: "Budi Santoso (Peternak Layer)",
    email: "user@demo.local",
    role: "USER",
    status: "Aktif",
    joinedAt: "05 Feb 2024",
    phone: "081398765432",
  },
  {
    id: "u-3",
    name: "drh. Siti Rahmawati",
    email: "siti.rahmawati@poultryvet.id",
    role: "USER",
    status: "Aktif",
    joinedAt: "18 Mar 2024",
    phone: "081223344556",
  },
  {
    id: "u-4",
    name: "Ahmad Zulkarnain",
    email: "ahmad.farm@blitar-layer.com",
    role: "USER",
    status: "Aktif",
    joinedAt: "22 Apr 2024",
    phone: "081556677889",
  },
  {
    id: "u-5",
    name: "Dewi Lestari (CV Unggas Makmur)",
    email: "dewi@unggas-makmur.co.id",
    role: "USER",
    status: "Nonaktif",
    joinedAt: "01 Mei 2024",
    phone: "081778899001",
  },
];
