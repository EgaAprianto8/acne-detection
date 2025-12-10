// AcneDetectorPage.tsx
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState, useRef, useEffect } from 'react';
import CameraView from './_components/CameraView';
import UploadView from './_components/UploadView';
import ResultCard from './_components/ResultCard';

interface AnalysisResult {
  num_detections: number;
  analysis_result: {
    status: string;
    title: string;
    advice: string;
  };
}

export default function AcneDetectorPage() {
  const [mode, setMode] = useState<'camera' | 'upload'>('camera');
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [detections, setDetections] = useState<any[]>([]);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Refs untuk Camera/Live Mode
  // Perlu diingat untuk mengatasi error TypeScript 2322, tipe ini di komponen anak harus diizinkan null.
  const videoRef = useRef<HTMLVideoElement>(null); 
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Refs untuk Upload Mode
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const uploadCanvasRef = useRef<HTMLCanvasElement>(null);

  // Ref untuk Auto Scroll
  const resultRef = useRef<HTMLDivElement>(null); 
  
  // Fitur auto-scroll ke hasil dihilangkan sesuai permintaan user sebelumnya
  /*
  useEffect(() => {
    if (result && resultRef.current) {
        setTimeout(() => {
            resultRef.current?.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }, 100);
    }
  }, [result]); 
  */

  // --- Fungsi Kamera/Mode Utama ---

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' } 
      });
      setStream(mediaStream);
      setIsCameraActive(true);
      setHasPermission(true);
      setResult(null);
    } catch (err) {
      console.error("Error accessing camera:", err);
      setHasPermission(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    setStream(null);
    setIsCameraActive(false);
    setDetections([]);
    setResult(null); 
  };
  
  useEffect(() => {
    if (isCameraActive && stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [isCameraActive, stream]);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const handleModeChange = (newMode: 'camera' | 'upload') => {
    if (mode === 'camera' && isCameraActive) {
      stopCamera();
    }
    setMode(newMode);
    setDetections([]);
    setResult(null); 
    if (newMode === 'upload') {
        setSelectedImage(null);
        setImageFile(null);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setDetections([]);
      setResult(null);
    }
  };
  
  // --- Fungsi Bounding Box & Prediksi ---

const drawBoundingBoxes = (dets: any[], width: number, height: number) => {
    if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
            ctx.clearRect(0, 0, width, height); 
            dets.forEach(det => {
                const [centerX, centerY, bboxWidth, bboxHeight] = det.bbox;
                
                // Hitung titik awal (x, y)
                const x = centerX - bboxWidth / 2;
                const y = centerY - bboxHeight / 2;
                
                // [PERBAIKAN 2] Gunakan koordinat x apa adanya (karena gambar yang dikirim sudah di-mirror)
                const adjustedX = x; 
                
                ctx.strokeStyle = '#ef4444'; 
                // UBAH: Ketebalan garis (Line Width) dari 3 menjadi 2
                ctx.lineWidth = 2; 
                ctx.strokeRect(adjustedX, y, bboxWidth, bboxHeight);
                
                // UBAH: Ukuran Font dari 16px menjadi 14px
                ctx.font = 'bold 14px Inter, sans-serif'; 
                ctx.fillStyle = '#ef4444';
                ctx.fillText(`${det.class} (${det.confidence})`, adjustedX, y - 5);
            });
        }
    }
};

  const drawStaticBoundingBoxes = (dets: any[], width: number, height: number) => {
      if (uploadCanvasRef.current) {
          const ctx = uploadCanvasRef.current.getContext('2d');
          if (ctx) {
              // Gambar ulang gambar asli di canvas
              if (imageRef.current) {
                ctx.clearRect(0, 0, width, height);
                ctx.drawImage(imageRef.current, 0, 0, width, height);
              }

              dets.forEach(det => {
                const [centerX, centerY, bboxWidth, bboxHeight] = det.bbox;
                const x = centerX - bboxWidth / 2;
                const y = centerY - bboxHeight / 2;
                ctx.strokeStyle = '#ef4444';
                ctx.lineWidth = 3;
                ctx.strokeRect(x, y, bboxWidth, bboxHeight);
                ctx.font = 'bold 18px Inter, sans-serif';
                const text = `${det.class} ${det.confidence}`;
                const textWidth = ctx.measureText(text).width;
                ctx.fillStyle = 'rgba(239, 68, 68, 0.9)'; 
                ctx.fillRect(x, y - 25, textWidth + 10, 25);
                ctx.fillStyle = 'white';
                ctx.fillText(text, x + 5, y - 7);
              });
          }
      }
  };

  const sendPredictionRequest = async (file: Blob, isMirrored: boolean, width: number, height: number) => {
    setIsAnalyzing(true);
    const formData = new FormData();
    formData.append('file', file, 'image.jpg');

    try {
      // Mengirim ke backend Python/FastAPI (port 8000)
      const response = await fetch('http://127.0.0.1:8000/predict/', { 
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      
      setDetections(data.detections);
      setResult(data); 
      
      if (isMirrored) {
          drawBoundingBoxes(data.detections, width, height);
      } else {
          drawStaticBoundingBoxes(data.detections, width, height);
      }

    } catch (err) {
      console.error('Error predicting:', err);
      alert('Gagal melakukan prediksi. Pastikan backend berjalan.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const captureAndPredict = async () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // [PERBAIKAN 1]: Tentukan ukuran terkecil untuk membuat Center Crop 1:1
      const size = Math.min(video.videoWidth, video.videoHeight);
      canvas.width = size;
      canvas.height = size; 

      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Hitung offset untuk memposisikan pemotongan di tengah
        const xOffset = (video.videoWidth - size) / 2;
        const yOffset = (video.videoHeight - size) / 2;
        
        // Logika cermin untuk gambar yang akan dikirim ke AI
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        
        // Menggunakan drawImage untuk memotong dan menggambar 1:1
        ctx.drawImage(
          video, 
          xOffset, yOffset, // Koordinat & ukuran potong sumber
          size, size,        
          0, 0,              // Koordinat & ukuran di kanvas tujuan
          size, size         
        );
        
        ctx.resetTransform(); 
      }

      canvas.toBlob(async (blob) => {
        if (blob) {
          await sendPredictionRequest(blob, true, canvas.width, canvas.height);
        }
      }, 'image/jpeg');
    }
  };

  const analyzeImage = async () => {
      if (imageFile && imageRef.current && uploadCanvasRef.current) {
          const img = imageRef.current;
          const canvas = uploadCanvasRef.current;
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const ctx = canvas.getContext('2d');
          if (ctx) {
              ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          }

          await sendPredictionRequest(imageFile, false, canvas.width, canvas.height);
      }
  };

  // --- Rendering UI Utama ---

  return (
    <div className="min-h-screen pt-16 md:pt-12 bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col font-sans">
      <main className="container mx-auto px-4 md:px-6 py-8 md:py-16 grow flex flex-col items-center">
        
        {/* Navigation Tabs */}
        <div className="bg-white p-1.5 rounded-full shadow-md mb-10 flex w-full max-w-xs ring-1 ring-[#98bad5]/30">
            <button 
                onClick={() => handleModeChange('camera')}
                className={`cursor-pointer flex-1 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${mode === 'camera' ? 'bg-[#98bad5] text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
            >
                Live Camera
            </button>
            <button 
                onClick={() => handleModeChange('upload')}
                className={`cursor-pointer flex-1 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${mode === 'upload' ? 'bg-[#98bad5] text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
            >
                Upload Image
            </button>
        </div>

        {/* Hero Section / Initial State */}
        {!isCameraActive && !selectedImage && (
          <section className="text-center mb-16 md:mb-24 w-full max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="inline-flex p-4 bg-white rounded-2xl shadow-inner mb-6 md:mb-8 ring-1 ring-[#98bad5]/30">
              <svg className="w-12 h-12 md:w-16 md:h-16 text-[#98bad5] drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-800 mb-6 tracking-tight leading-tight">
              Deteksi Jerawat <br className="hidden md:block"/>
              <span className="text-[#98bad5]">Lebih Cerdas & Cepat</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              Analisis kondisi kulit wajah Anda secara <span className="font-semibold text-[#98bad5]">real-time</span> atau melalui <span className="font-semibold text-[#98bad5]">foto</span>. Privasi aman, hasil instan.
            </p>

            {mode === 'camera' ? (
                <div className="relative group inline-block">
                <div className="absolute -inset-1 bg-[#98bad5] rounded-full blur opacity-40 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <button onClick={startCamera} className="relative w-full sm:w-auto bg-[#98bad5] hover:bg-[#86a8c3] text-white font-semibold py-4 px-10 rounded-full shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    <span>Mulai Kamera</span>
                </button>
                </div>
            ) : (
                <div className="w-full max-w-md mx-auto">
                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-[#98bad5] border-dashed rounded-3xl cursor-pointer bg-white/50 hover:bg-white/80 transition-all duration-300">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-12 h-12 mb-4 text-[#98bad5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                            <p className="mb-2 text-sm text-slate-600"><span className="font-bold">Klik untuk upload</span> atau drag and drop</p>
                            <p className="text-xs text-slate-500">JPG, PNG (MAX. 5MB)</p>
                        </div>
                        <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                    </label>
                </div>
            )}

            {hasPermission === false && mode === 'camera' && (
              <div className="mt-8 p-4 bg-red-50/80 backdrop-blur-sm border border-red-200/50 rounded-xl max-w-md mx-auto animate-in fade-in zoom-in duration-300">
                <div className="flex items-center gap-3 text-red-700">
                  <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                  <p className="text-sm font-medium">Izin kamera dibutuhkan. Mohon aktifkan di browser Anda.</p>
                </div>
              </div>
            )}
          </section>
        )}

        {/* Camera View Component */}
        {mode === 'camera' && isCameraActive && (
            <CameraView
                videoRef={videoRef}
                canvasRef={canvasRef}
                stopCamera={stopCamera}
                captureAndPredict={captureAndPredict}
                isAnalyzing={isAnalyzing}
            />
        )}

        {/* Upload View Component */}
        {mode === 'upload' && selectedImage && (
            <UploadView
                selectedImage={selectedImage}
                imageRef={imageRef}
                uploadCanvasRef={uploadCanvasRef}
                analyzeImage={analyzeImage}
                isAnalyzing={isAnalyzing}
                setSelectedImage={setSelectedImage}
                setDetections={setDetections}
                setResult={setResult as any} // Cast untuk mengatasi perbedaan tipe lokal vs import
            />
        )}

        {/* Result Card Component */}
        {result && (
          <ResultCard 
            result={result} 
            resultRef={resultRef}
          />
        )}

        {/* Features & How It Works (Bagian yang harus tetap ada) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full max-w-5xl mb-16 md:mb-24 px-2">
            <div className="group bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/60 shadow-lg shadow-[#98bad5]/10 hover:shadow-xl hover:shadow-[#98bad5]/20 transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 bg-[#98bad5]/10 rounded-2xl flex items-center justify-center mb-6 text-[#98bad5] group-hover:scale-110 group-hover:bg-[#98bad5] group-hover:text-white transition-all duration-300"><svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg></div>
                <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-[#98bad5] transition-colors">Real-Time Detection</h3>
                <p className="text-slate-600 leading-relaxed font-light">Analisis instan langsung dari browser Anda. Tanpa menunggu, tanpa upload ke server.</p>
            </div>
            <div className="group bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/60 shadow-lg shadow-[#98bad5]/10 hover:shadow-xl hover:shadow-[#98bad5]/20 transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 bg-[#98bad5]/10 rounded-2xl flex items-center justify-center mb-6 text-[#98bad5] group-hover:scale-110 group-hover:bg-[#98bad5] group-hover:text-white transition-all duration-300"><svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg></div>
                <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-[#98bad5] transition-colors">AI Akurasi Tinggi</h3>
                <p className="text-slate-600 leading-relaxed font-light">Didukung model Deep Learning mutakhir yang dilatih dengan ribuan dataset klinis.</p>
            </div>
        </section>

        <section className="w-full max-w-5xl">
          <div className="relative overflow-hidden bg-[#98bad5] rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl group">
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-white/20 rounded-full blur-3xl transition-transform duration-1000 group-hover:scale-110"></div>
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-slate-900/10 rounded-full blur-3xl transition-transform duration-1000 group-hover:scale-110"></div>
            <div className="relative z-10">
                <h2 className="text-2xl md:text-4xl font-black text-center mb-10 tracking-tight">Ditenagai <span className="text-white drop-shadow-md">YOLOv11L</span>: <br className="md:hidden" /> Analisis Super Cepat</h2>
                <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
                    <div className="space-y-6">
                      <p className="text-blue-50 text-lg leading-relaxed font-light">Menggabungkan performa <span className="font-semibold text-white">YOLOv11L</span> yang legendaris dengan optimasi Edge Computing untuk hasil instan tanpa lag.</p>
                      <div className="space-y-4">
                        <div className="flex items-center gap-5 p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-[1.02] cursor-default group/item">
                          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0 group-hover/item:rotate-12 transition-transform duration-300"><svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path></svg></div>
                          <div><h4 className="font-bold text-lg">Segmentasi Wajah Otomatis</h4><p className="text-blue-100 text-sm font-light">Mengenali area wajah presisi tinggi dalam milidetik.</p></div>
                        </div>
                        <div className="flex items-center gap-5 p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-[1.02] cursor-default group/item">
                          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0 group-hover/item:rotate-12 transition-transform duration-300"><svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg></div>
                          <div><h4 className="font-bold text-lg">Deteksi Fitur Inflamasi</h4><p className="text-blue-100 text-sm font-light">Melacak tanda kemerahan & tekstur kulit.</p></div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 text-center hover:bg-white/15 transition-colors duration-300">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner"><svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg></div>
                      <h3 className="font-bold text-2xl mb-2">Privasi 100% Terjaga</h3>
                      <p className="text-blue-50 text-base mb-6 font-light">Tidak ada gambar yang dikirim ke cloud. Engine kami berjalan sepenuhnya di perangkat Anda.</p>
                      <div className="inline-flex items-center gap-2 text-[#98bad5] text-sm font-bold bg-white px-5 py-2.5 rounded-full shadow-lg transform transition-transform hover:scale-105"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>Secure Local Processing</div>
                    </div>
                </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}