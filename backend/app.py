import io
import torch
from ultralytics import YOLO
from PIL import Image
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware

# Inisialisasi Aplikasi FastAPI
app = FastAPI(title="Acne Detection API")

# Tambah CORS untuk allow request dari frontend (Next.js localhost)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "*"],  # Ganti dengan origin frontend Anda jika deploy
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Muat Model YOLOv11 custom langsung dari file .pt
model = YOLO("./models/best.pt")  # Load model custom hasil training (asumsi .pt, bukan .pth)
model.model.eval()  # Set ke mode evaluasi (opsional, tapi baik untuk inference)

# Nama kelas dari dataset (sesuaikan dengan training Anda)
# Catatan: Jika model trained dengan multiple classes, ambil dari model.names
class_names = model.names if hasattr(model, 'names') else ["acne"]  # Otomatis ambil dari model jika available

# --- LOGIKA SARAN BERDASARKAN RISET ---
def get_acne_advice(count):
    """
    Memberikan saran kesehatan kulit berdasarkan jumlah jerawat yang terdeteksi.
    Level keparahan diadaptasi dari klasifikasi umum (Mild, Moderate, Severe).
    """
    if count == 0:
        return {
            "status": "Kulit Sehat (Clear Skin) ✨",
            "title": "Pertahankan Glow-mu!",
            "message": "Wajahmu bersih! Tetap jaga hidrasi, pakai sunscreen setiap hari, dan jangan lupa double cleansing setelah beraktivitas."
        }
    
    elif count <= 5:
        # Mild Acne: Biasanya dipicu pori tersumbat ringan atau makanan
        return {
            "status": "Ringan (Mild) 🌱",
            "title": "Perhatikan Pola Makan",
            "message": "Jerawat masih sedikit. Coba kurangi makanan berminyak (gorengan) & gula tinggi. Pastikan sarung bantal diganti seminggu sekali."
        }
    
    elif count <= 10:
        # Mild to Moderate: Kemungkinan faktor lifestyle (kurang tidur/stress)
        return {
            "status": "Sedang (Moderate) ⚠️",
            "title": "Kurangi Begadang & Stress",
            "message": "Kulitmu butuh istirahat. Kurangi begadang agar hormon stabil. Gunakan basic skincare (Facewash, Moisturizer, Sunscreen) yang gentle."
        }
    
    elif count <= 20:
        # Moderate: Perlu penanganan aktif (skincare ingredients)
        return {
            "status": "Breakout Alert 🚨",
            "title": "Fokus Skincare Aktif",
            "message": "Jerawat cukup banyak. Coba skincare dengan Salicylic Acid atau Benzoyl Peroxide. Hindari memencet jerawat agar tidak berbekas!"
        }
    
    else:
        # Severe: Di atas 20 titik biasanya butuh bantuan medis
        return {
            "status": "Perlu Perhatian Khusus 🚑",
            "title": "Konsultasi ke Dokter",
            "message": "Kondisi ini mungkin butuh penanganan medis. Disarankan konsultasi ke Dermatologist (SpKK) untuk mencegah peradangan lebih lanjut."
        }

# Endpoint Prediksi
@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    image = Image.open(io.BytesIO(contents)).convert("RGB")
    
    # Jalankan prediksi dengan model YOLO
    results = model(image)[0]  # Ambil hasil untuk satu gambar
    
    # Ekstrak deteksi
    detections = []
    if results.boxes:
        for box in results.boxes:
            cls_id = int(box.cls.item())
            conf = box.conf.item()
            bbox = box.xywh[0].tolist()  # [center_x, center_y, width, height]
            
            detections.append({
                "class": class_names[cls_id] if cls_id < len(class_names) else "unknown",
                "confidence": f"{conf:.4f}",
                "bbox": bbox
            })
    total_acne = len(detections)
    
    # Panggil fungsi advice di sini
    advice = get_acne_advice(total_acne)

    return {
        "filename": file.filename,
        "num_detections": total_acne,
        "detections": detections,
        # Data saran dikirim ke frontend
        "analysis_result": {
            "status": advice["status"],
            "title": advice["title"],
            "advice": advice["message"]
        }
    }

# Endpoint Root (untuk test)
@app.get("/")
def read_root():
    return {"message": "Welcome to the Acne Detection API"}