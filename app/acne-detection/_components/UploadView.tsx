// UploadView.tsx

/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { RefObject } from 'react';

interface AnalysisResult {
    num_detections: number;
    analysis_result: {
      status: string;
      title: string;
      advice: string;
    };
}

interface UploadViewProps {
    selectedImage: string;
    // TAMBAHKAN | null di sini
    imageRef: RefObject<HTMLImageElement | null>;
    uploadCanvasRef: RefObject<HTMLCanvasElement | null>;
    analyzeImage: () => Promise<void>;
    isAnalyzing: boolean;
    setSelectedImage: (image: string | null) => void;
    setDetections: (detections: any[]) => void;
    setResult: (result: AnalysisResult | null) => void;
}

export default function UploadView({
    selectedImage,
    imageRef,
    uploadCanvasRef,
    analyzeImage,
    isAnalyzing,
    setSelectedImage,
    setDetections,
    setResult,
}: UploadViewProps) {
    const handleClearImage = () => {
        setSelectedImage(null);
        setDetections([]);
        setResult(null);
    };

    return (
        <section className="w-full max-w-4xl mx-auto mb-16 animate-in fade-in zoom-in duration-500">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-4 md:p-6 ring-1 ring-[#98bad5]/30">
                <div className="relative rounded-2xl overflow-hidden bg-slate-100 ring-1 ring-slate-200">
                    <div className="relative flex justify-center">
                        <img ref={imageRef} src={selectedImage} alt="Uploaded" className="hidden" 
                            onLoad={() => { 
                                if (uploadCanvasRef.current && imageRef.current) {
                                    uploadCanvasRef.current.width = imageRef.current.naturalWidth;
                                    uploadCanvasRef.current.height = imageRef.current.naturalHeight;
                                    const ctx = uploadCanvasRef.current.getContext('2d');
                                    ctx?.drawImage(imageRef.current, 0, 0);
                                }
                            }} 
                        />
                        <canvas ref={uploadCanvasRef} className="max-w-full h-auto max-h-[70vh] object-contain shadow-lg" />
                    </div>
                    <button onClick={handleClearImage} className="absolute top-4 right-4 bg-white/80 hover:bg-white text-slate-800 p-2 rounded-full shadow-md transition-all">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
                
                <div className="mt-8 text-center">
                    <button onClick={analyzeImage} disabled={isAnalyzing} className={`bg-[#98bad5] hover:bg-[#86a8c3] text-white font-bold py-3 px-10 rounded-full shadow-lg transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3 mx-auto ${isAnalyzing ? 'opacity-70 cursor-wait' : ''}`}>
                        {isAnalyzing ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                Menganalisis...
                            </>
                        ) : (
                            <>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span>Analisis Foto</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </section>
    );
}