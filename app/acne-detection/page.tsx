/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState, useRef, useEffect } from 'react';

export default function AcneDetectorPage() {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [detections, setDetections] = useState<any[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' } 
      });
      setStream(mediaStream);
      setIsCameraActive(true);
      setHasPermission(true);
    } catch (err) {
      console.error("Error accessing camera:", err);
      setHasPermission(false);
    }
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
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [stream]);

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    setStream(null);
    setIsCameraActive(false);
    setDetections([]); // Reset detections saat kamera dimatikan
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const analyzeFrame = async () => {
    if (!isCameraActive || !videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Clear canvas sebelum draw baru
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Mirror gambar karena video di-scale-x-[-1]
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      ctx.resetTransform(); // Reset transform setelah draw
    }

    // Convert canvas ke blob dan kirim ke backend
    canvas.toBlob(async (blob) => {
      if (blob) {
        const formData = new FormData();
        formData.append('file', blob, 'frame.jpg');

        try {
          const response = await fetch('http://127.0.0.1:8000/predict/', {
            method: 'POST',
            body: formData,
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          const filteredDetections = (data.detections || []).filter((det: any) => parseFloat(det.confidence) > 0.5); // Filter conf > 0.5
          setDetections(filteredDetections);
          drawBoundingBoxes(filteredDetections, canvas.width, canvas.height);
        } catch (err) {
          console.error('Error predicting:', err);
        }
      }
    }, 'image/jpeg', 0.9); // Kualitas 70% untuk balance kecepatan dan akurasi

    // Schedule frame berikutnya, throttle ke ~5 FPS untuk real-time tapi tidak overload
    setTimeout(() => {
      animationRef.current = requestAnimationFrame(analyzeFrame);
    }, 20); // 200ms delay untuk ~5 FPS, sesuaikan jika terlalu lambat
  };

  const drawBoundingBoxes = (dets: any[], width: number, height: number) => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        dets.forEach(det => {
          const [centerX, centerY, bboxWidth, bboxHeight] = det.bbox;
          const x = centerX - bboxWidth / 2;
          const y = centerY - bboxHeight / 2;

          // Karena video mirrored, sesuaikan x untuk overlay
          const adjustedX = width - (x + bboxWidth); // Mirror back

          ctx.strokeStyle = 'red';
          ctx.lineWidth = 2;
          ctx.strokeRect(adjustedX, y, bboxWidth, bboxHeight);

          // Label dengan confidence dalam persen (seperti screenshot kedua)
          const confPercent = (parseFloat(det.confidence) * 100).toFixed(0) + '%';
          ctx.font = '16px Arial';
          ctx.fillStyle = 'red';
          ctx.fillText(`${det.class} (${confPercent})`, adjustedX, y - 5);
        });
      }
    }
  };

  useEffect(() => {
    if (isCameraActive) {
      animationRef.current = requestAnimationFrame(analyzeFrame);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
      }
      setDetections([]);
    }
  }, [isCameraActive]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col">
      {/* Main Content */}
      <main className="container mx-auto px-4 md:px-6 py-8 md:py-16 grow flex flex-col items-center">
        {/* Hero Section */}
        {!isCameraActive && (
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
              Analisis kondisi kulit wajah Anda secara <span className="font-semibold text-[#98bad5]">real-time</span> menggunakan kecerdasan buatan. Privasi aman, hasil instan.
            </p>

            {/* CTA Button */}
            <div className="relative group inline-block">
              <div className="absolute -inset-1 bg-[#98bad5] rounded-full blur opacity-40 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <button
                onClick={startCamera}
                className="relative w-full sm:w-auto bg-[#98bad5] hover:bg-[#86a8c3] text-white font-semibold py-4 px-10 rounded-full shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                <span>Mulai Analisis Sekarang</span>
              </button>
            </div>

            {/* Permission Status */}
            {hasPermission === false && (
              <div className="mt-8 p-4 bg-red-50/80 backdrop-blur-sm border border-red-200/50 rounded-xl max-w-md mx-auto animate-in fade-in zoom-in duration-300">
                <div className="flex items-center gap-3 text-red-700">
                  <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <p className="text-sm font-medium">Izin kamera dibutuhkan. Mohon aktifkan di browser Anda.</p>
                </div>
              </div>
            )}
          </section>
        )}

        {/* Camera Section */}
        {isCameraActive && (
          <section className="w-full max-w-5xl mx-auto mb-16 animate-in fade-in zoom-in duration-500">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-[#98bad5]/20 overflow-hidden mx-auto relative ring-1 ring-[#98bad5]/30">
              <div className="relative bg-slate-900 aspect-[3/4] md:aspect-video group">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover transform scale-x-[-1] opacity-90"
                />
                {/* Canvas untuk overlay bounding boxes */}
                <canvas
                  ref={canvasRef}
                  className="absolute top-0 left-0 w-full h-full pointer-events-none"
                />
                
                {/* Close Button */}
                <button 
                  onClick={stopCamera}
                  className="absolute top-6 right-6 bg-black/40 hover:bg-red-500/90 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-md z-20 border border-white/10 hover:border-red-400 group-hover:scale-100 scale-90"
                  title="Matikan Kamera"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>

                {/* Decorative UI Overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-6 left-6 w-16 h-16 border-t-4 border-l-4 border-white/30 rounded-tl-2xl"></div>
                  <div className="absolute top-6 right-6 w-16 h-16 border-t-4 border-r-4 border-white/30 rounded-tr-2xl"></div>
                  <div className="absolute bottom-6 left-6 w-16 h-16 border-b-4 border-l-4 border-white/30 rounded-bl-2xl"></div>
                  <div className="absolute bottom-6 right-6 w-16 h-16 border-b-4 border-r-4 border-white/30 rounded-br-2xl"></div>
                </div>

                {/* Scanning Overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-56 h-56 md:w-80 md:h-80 border border-[#98bad5]/50 rounded-full relative animate-[pulse_3s_ease-in-out_infinite]">
                    <div className="absolute inset-0 border-t-2 border-[#98bad5] rounded-full animate-[spin_4s_linear_infinite] shadow-[0_0_20px_rgba(152,186,213,0.6)]"></div>
                  </div>
                </div>
                
                <div className="absolute top-6 left-6 bg-slate-900/60 backdrop-blur-md text-white/90 px-4 py-2 rounded-full text-xs md:text-sm font-medium border border-white/10 flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                  </span>
                  AI Analysis Active
                </div>
              </div>
              
              <div className="p-6 md:p-8 bg-white/50 backdrop-blur-sm">
                <p className="text-slate-600 text-center text-sm md:text-base font-medium">
                  Pastikan wajah Anda terlihat jelas dan pencahayaan cukup.
                </p>
              </div>
            </div>
            
            <div className="mt-8 text-center animate-in fade-in slide-in-from-top-4 duration-700 delay-200">
              <button onClick={stopCamera} className="text-slate-400 hover:text-red-500 text-sm font-medium transition-colors flex items-center justify-center gap-2 mx-auto">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Batalkan Analisis
              </button>
            </div>

            {/* Tampilkan Hasil Deteksi (seperti screenshot kedua) */}
            {detections.length > 0 && (
              <div className="mt-6 p-4 bg-white/80 rounded-xl shadow-md w-full max-w-md">
                <h3 className="text-lg font-bold mb-2">Hasil Deteksi:</h3>
                <p className="text-sm font-medium mb-2">{detections.length} objects detected</p>
                <ul>
                  {detections.map((det, index) => (
                    <li key={index} className="text-sm">
                      {det.class} - Confidence: {(parseFloat(det.confidence) * 100).toFixed(0)}%
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}

        {/* Features Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full max-w-5xl mb-16 md:mb-24 px-2">
          <div className="group bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/60 shadow-lg shadow-[#98bad5]/10 hover:shadow-xl hover:shadow-[#98bad5]/20 transition-all duration-300 hover:-translate-y-1">
            <div className="w-14 h-14 bg-[#98bad5]/10 rounded-2xl flex items-center justify-center mb-6 text-[#98bad5] group-hover:scale-110 group-hover:bg-[#98bad5] group-hover:text-white transition-all duration-300">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-[#98bad5] transition-colors">Real-Time Detection</h3>
            <p className="text-slate-600 leading-relaxed font-light">
              Analisis instan langsung dari browser Anda. Tanpa menunggu, tanpa upload ke server. Privasi Anda adalah prioritas utama kami.
            </p>
          </div>

          <div className="group bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/60 shadow-lg shadow-[#98bad5]/10 hover:shadow-xl hover:shadow-[#98bad5]/20 transition-all duration-300 hover:-translate-y-1">
            <div className="w-14 h-14 bg-[#98bad5]/10 rounded-2xl flex items-center justify-center mb-6 text-[#98bad5] group-hover:scale-110 group-hover:bg-[#98bad5] group-hover:text-white transition-all duration-300">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-[#98bad5] transition-colors">AI Akurasi Tinggi</h3>
            <p className="text-slate-600 leading-relaxed font-light">
              Didukung model Deep Learning mutakhir yang dilatih dengan ribuan dataset klinis untuk mendeteksi berbagai jenis jerawat dengan presisi tinggi.
            </p>
          </div>
        </section>

        {/* How It Works */}
        <section className="w-full max-w-5xl">
          <div className="relative overflow-hidden bg-[#98bad5] rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl group">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-white/20 rounded-full blur-3xl transition-transform duration-1000 group-hover:scale-110"></div>
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-slate-900/10 rounded-full blur-3xl transition-transform duration-1000 group-hover:scale-110"></div>
            
            <div className="relative z-10">
               <h2 className="text-2xl md:text-4xl font-black text-center mb-10 tracking-tight">
                 Ditenagai <span className="text-white drop-shadow-md">YOLOv11L</span>: <br className="md:hidden" /> Analisis Super Cepat
               </h2>
               
               <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
                  <div className="space-y-6">
                    <p className="text-blue-50 text-lg leading-relaxed font-light">
                      Menggabungkan performa <span className="font-semibold text-white">YOLOv11L</span> yang legendaris dengan optimasi Edge Computing untuk hasil instan tanpa lag.
                    </p>
                    
                    <div className="space-y-4">
                      {/* Step 1 */}
                      <div className="flex items-center gap-5 p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-[1.02] cursor-default group/item">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0 group-hover/item:rotate-12 transition-transform duration-300">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path>
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-lg">Segmentasi Wajah Otomatis</h4>
                          <p className="text-blue-100 text-sm font-light">Mengenali area wajah presisi tinggi dalam milidetik.</p>
                        </div>
                      </div>

                      {/* Step 2 */}
                      <div className="flex items-center gap-5 p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-[1.02] cursor-default group/item">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0 group-hover/item:rotate-12 transition-transform duration-300">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path>
                          </svg>
                        </div>
                         <div>
                          <h4 className="font-bold text-lg">Deteksi Fitur Inflamasi</h4>
                          <p className="text-blue-100 text-sm font-light">Melacak tanda kemerahan & tekstur kulit.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Privacy/Secure Box */}
                  <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 text-center hover:bg-white/15 transition-colors duration-300">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                      </svg>
                    </div>
                    <h3 className="font-bold text-2xl mb-2">Privasi 100% Terjaga</h3>
                    <p className="text-blue-50 text-base mb-6 font-light">
                      Tidak ada gambar yang dikirim ke cloud. Engine kami berjalan sepenuhnya di perangkat Anda.
                    </p>
                    <div className="inline-flex items-center gap-2 text-[#98bad5] text-sm font-bold bg-white px-5 py-2.5 rounded-full shadow-lg transform transition-transform hover:scale-105">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      Secure Local Processing
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}