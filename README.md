# 🌾 FarmAI — Chatbot RAG Berbasis Knowledge Base PDF

<div align="center">

![Python](https://img.shields.io/badge/Python-3.10%2B-blue?style=for-the-badge&logo=python&logoColor=white)
![Streamlit](https://img.shields.io/badge/Streamlit-FF4B4B?style=for-the-badge&logo=Streamlit&logoColor=white)
![LangChain](https://img.shields.io/badge/LangChain-1C3C3C?style=for-the-badge&logo=langchain&logoColor=white)
![VectorDB](https://img.shields.io/badge/Vector_DB-ChromaDB-orange?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

<p align="center">
  <b>Sistem Chatbot Cerdas berbasis RAG (Retrieval-Augmented Generation) dengan basis pengetahuan dokumen PDF yang dikelola langsung oleh Admin.</b>
</p>

</div>

---

## 📌 Gambaran Umum

**FarmAI Chatbot** adalah aplikasi chatbot interaktif berbasis AI yang menggunakan arsitektur **Retrieval-Augmented Generation (RAG)**. Chatbot ini dirancang untuk menjawab setiap pertanyaan pengguna secara akurat, kontekstual, dan minim halusinasi karena seluruh pengetahuannya bersumber langsung dari dokumen PDF yang diunggah oleh **Admin** ke dalam Vector Database.

Aplikasi ini dibangun menggunakan **Streamlit** (Multi-page App), **LangChain**, dan **Vector Store (ChromaDB / FAISS)**.

---

## ✨ Fitur Utama

- 👨‍💼 **Admin Dashboard (Upload & Manajemen Dokumen)**
  - Upload file PDF baru ke sistem secara mudah melalui antarmuka web.
  - Pemrosesan otomatis dokumen (ekstraksi teks, chunking, dan pembuatan embedding).
  - Monitoring dan sinkronisasi berkas knowledge base ke dalam Vector Database.
- 🤖 **Chatbot Interaktif (User Experience)**
  - Tanya jawab cerdas berbasis konteks PDF yang diunggah.
  - Menampilkan sitasi / sumber referensi dokumen untuk transparansi jawaban.
  - Riwayat percakapan (*chat history*) interaktif.
- ⚡ **Penyimpanan Vektor Persisten (*Vector Store*)**
  - Menggunakan ChromaDB / FAISS untuk pencarian similaritas vektor dokumen dengan latensi rendah.
- 🧪 **Notebook Eksperimen RAG**
  - Dilengkapi Jupyter Notebook untuk memvalidasi *chunk size*, *overlap*, serta pengujian performa prompt LLM.

---

## 🚀 Panduan Instalasi & Menjalankan

### 1. Prasyarat
- **Python 3.10** atau versi yang lebih baru.
- Akun & API Key penyedia LLM (seperti **OpenAI** atau **Google Gemini**).
- Git terpasang di komputer Anda.

---

### 2. Clone Repository
```bash
git clone https://github.com/username-anda/Chatbot_Farm.git
cd Chatbot_Farm
```

---

### 3. Buat dan Aktifkan Virtual Environment

- **Windows (Command Prompt / PowerShell):**
  ```powershell
  python -m venv venv
  .\venv\Scripts\activate
  ```

- **Linux / macOS:**
  ```bash
  python3 -m venv venv
  source venv/bin/activate
  ```

---

### 4. Install Dependensi
```bash
pip install -r requirements.txt
```

---

### 5. Konfigurasi Environment Variables
Salin file `.env.example` menjadi `.env`, lalu masukkan API Key yang Anda miliki:

- **Windows (PowerShell):**
  ```powershell
  Copy-Item .env.example .env
  ```
- **Linux / macOS:**
  ```bash
  cp .env.example .env
  ```

Buka file `.env` dan lengkapi konfigurasi:
```env
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxx
LLM_MODEL=gpt-4o-mini
EMBEDDING_MODEL=text-embedding-3-small
ADMIN_PASSWORD=admin123
VECTOR_DB_PATH=./data/vector_db
RAW_PDF_PATH=./data/raw_pdfs
CHUNK_SIZE=1000
CHUNK_OVERLAP=200
```

---

### 6. Jalankan Aplikasi
Jalankan aplikasi Streamlit dengan perintah:
```bash
streamlit run app.py
```

Aplikasi akan otomatis terbuka di browser Anda pada alamat: `http://localhost:8501`.

---

## 📖 Cara Penggunaan

### 1. Menambahkan Dokumen Pengetahuan (Admin)
1. Buka menu navigasi di sidebar dan pilih **`Admin`** (atau `pages/admin.py`).
2. Masukkan kata sandi admin yang telah dikonfigurasi di file `.env`.
3. Unggah satu atau beberapa file **PDF** yang memuat materi atau pengetahuan yang diinginkan.
4. Klik tombol **"Proses & Simpan ke Vector DB"**. Sistem akan mengekstrak teks, membagi menjadi chunk, membuat embedding, dan memperbarui basis data vektor.

### 2. Berinteraksi dengan Chatbot (User)
1. Buka menu **`Chatbot`** (atau `pages/chatbot.py`).
2. Ajukan pertanyaan seputar isi dokumen PDF yang telah diunggah oleh admin.
3. Chatbot akan memberikan jawaban berdasarkan konteks dokumen beserta kutipan sumber dokumen yang relevan.

---

## 🛠️ Rekomendasi Dependensi (`requirements.txt`)

Jika belum mengisi `requirements.txt`, Anda dapat menggunakan paket-paket berikut:

```txt
streamlit>=1.30.0
langchain>=0.2.0
langchain-community>=0.2.0
langchain-openai>=0.1.0
chromadb>=0.5.0
pypdf>=4.0.0
python-dotenv>=1.0.0
tiktoken>=0.7.0
```

---

## 🔒 Keamanan & Praktik Terbaik

- **Jangan pernah melakukan commit pada file `.env`** yang berisi API Key asli ke GitHub repository publik.
- Gunakan file `.gitignore` yang sudah disediakan untuk mencegah terunggahnya file sensitif, file cache, dan basis data lokal.
