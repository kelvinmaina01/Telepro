"use client";

import React from "react";

interface VideoReviewModalProps {
    isOpen: boolean;
    videoUrl: string | null;
    onDownload: () => void;
    onReRecord: () => void;
    onDiscard: () => void;
}

const DownloadIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
    </svg>
);

const ReRecordIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
    </svg>
);

const TrashIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
    </svg>
);

export const VideoReviewModal: React.FC<VideoReviewModalProps> = ({
    isOpen,
    videoUrl,
    onDownload,
    onReRecord,
    onDiscard,
}) => {
    if (!isOpen || !videoUrl) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/95 backdrop-blur-md" />

            {/* Modal */}
            <div
                className="relative w-full max-w-4xl bg-[#0f0f0f] rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col max-h-[90vh]"
                style={{
                    boxShadow: '0 0 50px -12px rgba(30, 58, 138, 0.4)',
                }}
            >
                {/* Header */}
                <div className="px-8 py-6 border-b border-white/5 bg-white/5">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                            <span className="text-2xl">🎉</span>
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-white tracking-tight">Congrats! Take Completed.</h2>
                            <p className="text-zinc-400 font-medium">Review your recording before deciding what to do next.</p>
                        </div>
                    </div>
                </div>

                {/* Video Content */}
                <div className="flex-1 min-h-0 bg-black/20 flex items-center justify-center relative">
                    <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8">
                        <div className="relative w-full h-full flex items-center justify-center">
                            <video
                                src={videoUrl}
                                controls
                                className="max-h-full max-w-full rounded-2xl shadow-2xl border border-white/10 object-contain bg-black/60"
                                autoPlay
                            />
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-8 border-t border-white/5 bg-white/5">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={onDiscard}
                                className="flex items-center gap-2 px-6 h-14 rounded-2xl bg-white/5 text-zinc-400 hover:bg-red-500/10 hover:text-red-500 transition-all duration-300 font-bold border border-white/10 hover:border-red-500/30 group"
                            >
                                <div className="group-hover:rotate-12 transition-transform">
                                    <TrashIcon />
                                </div>
                                DISCARD
                            </button>

                            <button
                                onClick={onReRecord}
                                className="flex items-center gap-2 px-6 h-14 rounded-2xl bg-blue-600/10 text-blue-400 hover:bg-blue-600/20 transition-all duration-300 font-bold border border-blue-600/20 hover:border-blue-500/40 group"
                            >
                                <div className="group-hover:rotate-180 transition-transform duration-500">
                                    <ReRecordIcon />
                                </div>
                                RE-RECORD
                            </button>
                        </div>

                        <button
                            onClick={onDownload}
                            className="w-full md:w-auto flex items-center justify-center gap-3 px-10 h-16 rounded-2xl bg-emerald-600 text-white hover:bg-emerald-500 transition-all duration-300 font-black text-lg shadow-lg shadow-emerald-900/40 hover:scale-[1.02] active:scale-95 group"
                        >
                            <div className="group-hover:translate-y-1 transition-transform">
                                <DownloadIcon />
                            </div>
                            DOWNLOAD VIDEO
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
