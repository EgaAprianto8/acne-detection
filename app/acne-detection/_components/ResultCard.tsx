// ResultCard.tsx

import React, { RefObject } from 'react';

interface AnalysisResult {
    num_detections: number;
    analysis_result: {
      status: string;
      title: string;
      advice: string;
    };
}

interface ResultCardProps {
    result: AnalysisResult;
    resultRef: RefObject<HTMLDivElement | null>;
}

export default function ResultCard({ result, resultRef }: ResultCardProps) {
    return (
        <section ref={resultRef} className="w-full max-w-4xl mx-auto mb-16 animate-in slide-in-from-bottom-10 fade-in duration-3000 scroll-mt-24">
            <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-blue-100">
                <div className="bg-slate-900 text-white p-6 md:p-8 flex items-center justify-between">
                    <div>
                        <p className="text-blue-200 text-sm font-medium uppercase tracking-wider mb-1">Hasil Analisis AI</p>
                        <h2 className="text-2xl md:text-3xl font-bold">{result.analysis_result.status}</h2>
                    </div>
                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-2xl">✨</div>
                </div>

                <div className="p-6 md:p-8 grid md:grid-cols-3 gap-8 md:gap-12 items-start">
                    <div className="md:col-span-1 text-center md:text-left border-b md:border-b-0 md:border-r border-slate-100 pb-6 md:pb-0 md:pr-6">
                        <p className="text-slate-500 font-medium mb-2">Total Jerawat Terdeteksi</p>
                        <div className="flex items-baseline justify-center md:justify-start gap-2">
                            <span className="text-6xl font-black text-[#98bad5] leading-none">{result.num_detections}</span>
                            <span className="text-slate-400 text-lg">titik</span>
                        </div>
                        <div className="mt-4 inline-block px-4 py-1.5 bg-blue-50 text-[#98bad5] rounded-full text-sm font-bold">Confidence Level: High</div>
                    </div>

                    <div className="md:col-span-2">
                        <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                            {/* Icon */}
                            {result.analysis_result.title}
                        </h3>
                        <p className="text-slate-600 leading-relaxed text-lg">{result.analysis_result.advice}</p>
                        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-100 rounded-xl flex gap-3">
                            {/* Disclaimer Icon */}
                            <p className="text-sm text-yellow-700"><strong>Disclaimer:</strong> Hasil ini adalah estimasi AI. Selalu konsultasikan dengan dokter kulit untuk diagnosis medis yang akurat.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}