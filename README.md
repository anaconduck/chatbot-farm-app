# PoultryMind — Platform Riset & Asisten Cerdas Peternakan Unggas

PoultryMind adalah platform chatbot cerdas berbasis RAG (*Retrieval-Augmented Generation*) dan repositori riset untuk bidang peternakan ayam (layer & broiler). Aplikasi didanai oleh Program HIBAH Fakultas Peternakan Universitas Brawijaya (FAPET UB) dan dibangun dengan **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **Supabase (PostgreSQL & Auth)**, serta siap terintegrasi dengan **Dify Cloud API**.

---

## 🚀 Fitur Utama & Visual Sesuai Desain

1. **Desain & Identitas Visual**: Mengikuti bahasa visual *warm brown*, *golden/yellow*, *cream*, dan *white* sesuai panduan mockup `design_web/`.
2. **Landing Page (`/`)**: Hero modern, fitur formulasi nutrisi, biosekuriti 3 zona, manajemen kandang closed-house, alur kerja, dan CTA pendaftaran.
3. **Pusat Riset & Edukasi (`/riset`)**: Mengikuti `design_web/Riset.png` dengan filter pencarian domain, wawasan biologis (5 kartu fakta unik ayam petelur), dan *Research Library* dengan tombol unduh PDF peer-reviewed.
4. **Halaman Tentang Kami (`/about`)**: Mengikuti `design_web/About.png` dengan 2 kartu Visi & Misi komprehensif, arah landasan kerja, dan kartu profil Dewan Pakar Riset.
5. **Autentikasi Terpisah USER & ADMIN**:
   - **Login Peternak (`/login`)**: Tampilan split-layout sesuai `design_web/Login.png`.
   - **Registrasi Akun (`/register`)**: Card terpusat sesuai `design_web/Daftar Akun.png`. Otomatis menetapkan role `USER` demi keamanan.
   - **Login Administrator (`/admin/login`)**: Khusus login pengelola dengan verifikasi ketat *server-side* terhadap kolom `profiles.role`.
6. **Dashboard Peternak (`/dashboard`)**: Ucapan selamat datang personal, tombol aksi *"Tanya ChickyAI"*, riwayat percakapan, dan 8 topik populer (Nutrisi, Penyakit, Biosekuriti, Broiler, Layer, Produksi Telur, Kandang, Kesehatan).
7. **Ruang Chatbot Interaktif (`/chat`)**: Sidebar percakapan, balon obrolan dengan *greeting* ramah, indikator *loading*, dan kartu rujukan dokumen ilmiah (*source cards*).
8. **Floating Robot Chicken Chatbot**: Mascot robot ayam di pojok kanan bawah yang dapat diklik untuk membuka jendela obrolan cepat (*quick-drawer*) di seluruh halaman.
9. **Admin Panel (`/admin`)**: Mengikuti `design_web/Admin.png` lengkap dengan:
   - Metrik statistik platform (Pengunjung aktif, Unduhan riset PDF, dsb.)
   - Grafik batang interaktif kunjungan vs unduhan
   - Formulir unggah dokumen PDF riset (*drag & drop*)
   - Tabel arsip PDF terunggah beserta aksi dan penomoran halaman
10. **Admin Sub-Pages**: `/admin/documents` (manajemen dokumen RAG), `/admin/users` (manajemen aktivasi pengguna), `/admin/conversations` (log obrolan), `/admin/analytics`, dan `/admin/settings`.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js (App Router), React 19, TypeScript, Tailwind CSS, Lucide React, Zod
- **Backend & API**: Next.js Route Handlers (`/api/chat`), Server Actions & Service Modules
- **Database & Auth**: Supabase PostgreSQL dengan Row-Level Security (RLS) & Supabase Auth
- **AI / RAG**: Dify Cloud API abstraction layer dengan simulasi otomatis (*mock fallback*)
- **Deployment**: Vercel Ready

---

## 💻 Menjalankan di Komputer Lokal

### 1. Instalasi Dependensi
```bash
npm install
```

### 2. Konfigurasi Lingkungan (`.env.local`)
File `.env.local` sudah dikonfigurasikan dengan **Demo Mode** aktif:
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="ChickyAI"
NEXT_PUBLIC_DEMO_MODE=true

# Supabase (Masukkan kredensial asli saat integrasi cloud)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Dify RAG
DIFY_BASE_URL=https://api.dify.ai/v1
DIFY_CHAT_API_KEY=your-dify-chat-key
DIFY_KNOWLEDGE_API_KEY=your-dify-knowledge-key
DIFY_DATASET_ID=your-dataset-id
DIFY_MOCK_MODE=true
```

### 3. Menjalankan Server Pengembangan
```bash
npm run dev
```
Buka browser di [http://localhost:3000](http://localhost:3000).

### 4. Menguji Lint & Build Produksi
```bash
npm run lint
npm run build
```

---

## 🔑 Akun Demo (Development Mode)

| Tipe Akun | Email | Kata Sandi | Halaman Akses |
|---|---|---|---|
| **User (Peternak)** | `user@demo.local` | `demo1234` | `/login` → diarahkan ke `/dashboard` |
| **Admin** | `admin@demo.local` | `admin1234` | `/admin/login` → diarahkan ke `/admin` |

*Catatan: Tombol "Isi Otomatis" tersedia pada halaman login untuk memudahkan pengujian.*

---

## 🗄️ Database Supabase & Migrasi

Skema migrasi database SQL tersedia lengkap di:
- `supabase/migrations/20260930_initial_schema.sql` (Tabel `profiles`, `conversations`, `messages`, `documents`, Trigger `handle_new_user`, dan RLS Policies).
- `supabase/seed.sql` (Data awal jurnal penelitian unggas).
- `supabase/README.md` (Panduan konfigurasi Supabase).

---

## 🤖 Abstraksi Dify RAG (Fase Lanjutan)

Modul Dify telah diisolasi pada lapisan server-side:
- `src/lib/dify/client.ts` — Client HTTP dengan perlindungan token rahasia
- `src/lib/dify/chat.ts` — `sendChatMessage()` dengan *fallback* jawaban cerdas peternakan ayam saat mock mode aktif
- `src/lib/dify/knowledge.ts` — Stub `uploadKnowledgeDocument()`, `deleteKnowledgeDocument()`, `getDocumentStatus()`
- `src/lib/dify/types.ts` — Definisi tipe respons Dify Cloud
- `src/app/api/chat/route.ts` — Route handler POST tanpa mengekspos API key ke browser client
