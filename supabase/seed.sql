-- ====================================================================
-- TanyaTernak - Database Seed File
-- Run this in the Supabase SQL Editor or via Supabase CLI
-- ====================================================================

-- Sample Documents (Knowledge Base Initial Seeds)
INSERT INTO public.documents (
    id,
    title,
    author,
    publication_year,
    category,
    description,
    original_filename,
    storage_path,
    status,
    file_size_bytes,
    download_count
) VALUES 
(
    'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    'Optimasi Formulasi Pakan Layer Fase Puncak',
    'Dr. Ir. S. Hartono, M.Sc',
    2025,
    'Nutrisi Pakan',
    'Studi efisiensi ransum pakan unggas petelur dengan suplementasi kalsium organik mikron dan kalsit daur ulang untuk menekan rasio FCR.',
    'Optimasi_Formulasi_Pakan_Layer_Fase_Puncak.pdf',
    'documents/optimasi_pakan_2025.pdf',
    'READY',
    5033164, -- 4.8 MB
    8420
),
(
    'b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e',
    'Protokol Biosekuriti Tiga Zona Kandang Modern',
    'Balai Karantina & Vet',
    2025,
    'Penyakit & Vaksinasi',
    'Panduan operasional zonasi merah, kuning, dan hijau guna memitigasi transmisi patogen Avian Influenza dan Newcastle Disease.',
    'Protokol_Biosekuriti_Tiga_Zona_Kandang_Modern.pdf',
    'documents/biosekuriti_kandang_2025.pdf',
    'READY',
    7549747, -- 7.2 MB
    6115
),
(
    'c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f',
    'Optimalisasi Mikroklimat Kandang Closed House Menggunakan Sensor IoT Cerdas untuk Reduksi Emisi Gas Amonia',
    'Departemen Biosistem & Sensorik Kandang',
    2024,
    'Manajemen Suhu & Kandang',
    'Pengujian integrasi sistem aerasi berbasis variabel frekuensi kipas exhaust terautomasi sensor gas NH3 dan sensor kelembaban relatif.',
    'Optimalisasi_Mikroklimat_Kandang_Closed_House_IoT.pdf',
    'documents/mikroklimat_closed_house_2024.pdf',
    'READY',
    3984588, -- 3.8 MB
    4280
),
(
    'd4e5f6a7-b8c9-0d1e-2f3a-4b5c6d7e8f9a',
    'Studi Efisiensi Penggunaan Tepung Kulit Telur dan Suplementasi Kalsium Organik terhadap Ketebalan Cangkang Fase Layer Akhir',
    'Lab Nutrisi AgriLivestock & Fapet',
    2024,
    'Nutrisi Pakan',
    'Investigasi mendalam terkait suplementasi partikel kalsium organik mikron dan kalsit daur ulang terhadap sintesis kelenjar uterus pada flok ayam petelur.',
    'Studi_Efisiensi_Tepung_Kulit_Telur_Kalsium_Organik.pdf',
    'documents/kalsium_cangkang_telur_2024.pdf',
    'READY',
    2516582, -- 2.4 MB
    9510
);

-- Note for Admin & User Account setup:
-- Supabase requires passwords to be hashed through auth.users.
-- To create an ADMIN user, register through /register or create a user in Supabase Studio,
-- then run:
-- UPDATE public.profiles SET role = 'ADMIN' WHERE email = 'your-admin@email.com';
