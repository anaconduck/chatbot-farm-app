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

- **Admin Dashboard (Upload & Manajemen Dokumen)**
  - Upload file PDF baru ke sistem secara mudah melalui antarmuka web.
  - Pemrosesan otomatis dokumen (ekstraksi teks, chunking, dan pembuatan embedding).
  - Monitoring dan sinkronisasi berkas knowledge base ke dalam Vector Database.
- **Chatbot Interaktif (User Experience)**
  - Tanya jawab cerdas berbasis konteks PDF yang diunggah.
  - Menampilkan sitasi / sumber referensi dokumen untuk transparansi jawaban.
  - Riwayat percakapan (*chat history*) interaktif.
- **Penyimpanan Vektor Persisten (*Vector Store*)**
  - Menggunakan ChromaDB / FAISS untuk pencarian similaritas vektor dokumen dengan latensi rendah.
- **Notebook Eksperimen RAG**
  - Dilengkapi Jupyter Notebook untuk memvalidasi *chunk size*, *overlap*, serta pengujian performa prompt LLM.

---

## 🚀 Cara Penggunaan

### 1. Menambahkan Dokumen Pengetahuan (Admin)
1. Buka menu navigasi di sidebar dan pilih **`Admin`** (atau `pages/admin.py`).
2. Masukkan kata sandi admin yang telah dikonfigurasi di file `.env`.
3. Unggah satu atau beberapa file **PDF** yang memuat materi atau pengetahuan yang diinginkan.
4. Klik tombol **"Proses & Simpan ke Vector DB"**. Sistem akan mengekstrak teks, membagi menjadi chunk, membuat embedding, dan memperbarui basis data vektor.

### 2. Berinteraksi dengan Chatbot (User)
1. Buka menu **`Chatbot`** (atau `pages/chatbot.py`).
2. Ajukan pertanyaan seputar isi dokumen PDF yang telah diunggah oleh admin.
3. Chatbot akan memberikan jawaban berdasarkan konteks dokumen beserta kutipan sumber dokumen yang relevan.

