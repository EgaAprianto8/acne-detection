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
    
    return {
        "filename": file.filename,
        "detections": detections,
        "num_detections": len(detections)
    }

# Endpoint Root (untuk test)
@app.get("/")
def read_root():
    return {"message": "Welcome to the Acne Detection API"}