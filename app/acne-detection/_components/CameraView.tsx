// CameraView.tsx

import React, { RefObject } from 'react';

interface CameraViewProps {
    videoRef: RefObject<HTMLVideoElement | null>;
    canvasRef: RefObject<HTMLCanvasElement | null>;
    stopCamera: () => void;
    captureAndPredict: () => Promise<void>;
    isAnalyzing: boolean;
}

export default function CameraView({
    videoRef,
    canvasRef,
    stopCamera,
    captureAndPredict,
    isAnalyzing,
}: CameraViewProps) {
    return (
        <section className="w-full max-w-5xl mx-auto mb-16 animate-in fade-in zoom-in duration-500">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-[#98bad5]/20 overflow-hidden mx-auto relative ring-1 ring-[#98bad5]/30">
               {/* UBAH ASPECT RATIO DARI aspect-3/4 atau aspect-video MENJADI aspect-square (1:1) */}
                <div className="relative bg-slate-900 aspect-square group">
                    <video 
                        ref={videoRef} 
                        autoPlay 
                        playsInline 
                        // Tambahkan object-cover agar gambar video tetap memenuhi bingkai persegi
                        className="w-full h-full object-cover transform scale-x-[-1] opacity-90" 
                    />
                    <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none" />
                    <button onClick={stopCamera} className="absolute top-6 right-6 bg-black/40 hover:bg-red-500/90 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-md z-20 border border-white/10 hover:border-red-400 group-hover:scale-100 scale-90" title="Matikan Kamera">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>

                    <div className="absolute top-6 left-6 bg-slate-900/60 backdrop-blur-md text-white/90 px-4 py-2 rounded-full text-xs md:text-sm font-medium border border-white/10 flex items-center gap-2">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                        </span>
                        Live Analysis
                    </div>
                </div>
            </div>
            
            <div className="mt-8 text-center animate-in fade-in slide-in-from-top-4 duration-700 delay-200">
                <button onClick={captureAndPredict} disabled={isAnalyzing} className={`bg-[#98bad5] hover:bg-[#86a8c3] text-white font-semibold py-3 px-8 rounded-full shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3 mx-auto mb-4 ${isAnalyzing ? 'opacity-70 cursor-wait' : ''}`}>
                    {isAnalyzing ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                            Menganalisis...
                        </>
                    ) : (
                        <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            <span>Capture & Analyze</span>
                        </>
                    )}
                </button>
            </div>
        </section>
    );
}