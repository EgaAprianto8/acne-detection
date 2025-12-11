# Sistem Deteksi Jerawat Real-Time Berbasis YOLOv11

Proyek ini adalah aplikasi web fullstack yang dirancang untuk mendeteksi jerawat pada wajah secara real-time atau melalui unggah gambar. Sistem ini mengintegrasikan kecerdasan buatan (YOLOv11) dengan antarmuka web modern (Next.js) dan layanan backend yang cepat (FastAPI).

Diajukan untuk memenuhi Tugas Akhir Mata Kuliah Visi Komputer dan Robotika.

---

## 🛠️ Teknologi yang Digunakan

- Frontend: Next.js 14 (App Router), React, Tailwind CSS.
- Backend: FastAPI, Uvicorn.
- AI/ML Engine: Ultralytics YOLOv11, PyTorch.
- Environment: Python 3.10+, Node.js 18+.

---

## 📂 Struktur Direktori

.
├── backend/ # Server Python & Model YOLO
│ ├── main.py # Entry point FastAPI
│ ├── models/ # Folder penyimpan file .pt (weights)
│ └── requirements.txt # Daftar library Python
├── frontend/ # Aplikasi Next.js
│ ├── app/ # Halaman & Routing
│ ├── components/ # Komponen UI (Camera, Uploader)
│ └── package.json # Daftar library Node.js
└── README.md # Dokumentasi Proyek

---

## ⚡ Cara Instalasi & Menjalankan (Getting Started)

Untuk menjalankan proyek ini di komputer lokal, Anda perlu menjalankan dua server secara bersamaan: Backend (Python) dan Frontend (Node.js). Pastikan Anda sudah menginstal Python dan Node.js.

### Langkah 1: Menjalankan Backend (FastAPI)

Backend bertugas memproses logika AI.

1. Buka terminal/CMD, lalu masuk ke folder backend:
   cd backend

2. Buat dan aktifkan Virtual Environment (Disarankan agar library tidak bentrok):

   - Windows:
     python -m venv venv
     venv\Scripts\activate
   - Mac/Linux:
     python3 -m venv venv
     source venv/bin/activate

3. Install library yang dibutuhkan:
   pip install -r requirements.txt
   (Pastikan file requirements.txt berisi: fastapi, uvicorn, ultralytics, python-multipart, pillow)

4. Jalankan server Backend:
   uvicorn main:app --reload

   ✅ Server akan berjalan di: http://localhost:8000

---

### Langkah 2: Menjalankan Frontend (Next.js)

Frontend bertugas menampilkan halaman website.

1. Buka terminal baru (jangan matikan terminal backend), lalu masuk ke folder frontend:
   cd frontend

2. Install library JavaScript:
   npm install

   # atau jika menggunakan yarn:

   yarn install

3. (Opsional) Konfigurasi Environment:
   Buat file .env.local di dalam folder frontend, lalu isi kode berikut agar Frontend tahu alamat Backend:
   NEXT_PUBLIC_API_URL=http://localhost:8000

4. Jalankan server Frontend:
   npm run dev

   ✅ Website akan berjalan di: http://localhost:3000

---

## 📝 Catatan Penting (Troubleshooting)

**Masalah CORS (Gagal Fetch Data)**
Jika website tidak bisa mengambil data dari API, biasanya karena masalah izin akses (CORS Policy). Pastikan Anda sudah menambahkan kode ini di backend/main.py:

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
CORSMiddleware,
allow_origins=["http://localhost:3000"], # Izinkan akses dari port Next.js
allow_credentials=True,
allow_methods=["*"],
allow_headers=["*"],
)

---

## 👥 Anggota Kelompok

Program Studi Informatika - Fakultas Teknik - Universitas Siliwangi

| Nama Anggota       | NPM       |
| :----------------- | :-------- |
| Rahma Agustin      | 227006013 |
| Pandu Pangestu     | 227006017 |
| Ega Aprianto       | 227006018 |
| Salma Nurfithriyah | 227006022 |
| Irsalina Yumna     | 227006030 |
| Yosep Adriana      | 227006033 |

---

2025 - Implementasi Model YOLO11 untuk Sistem Deteksi Jerawat Berbasis Citra Wajah Secara Real-Time
