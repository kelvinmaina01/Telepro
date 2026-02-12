"use client";

import React from "react";
import Link from "next/link";

export const Hero = () => {
    return (
        <section className="relative pt-32 pb-20 overflow-hidden bg-black">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-white/[0.02] rounded-[100%] blur-[120px] -z-10 animate-pulse" />
            <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-white/[0.01] rounded-[100%] blur-[80px] -z-10" />

            <div className="max-w-7xl mx-auto px-6 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    <span className="text-[10px] font-black text-white/60 tracking-[0.2em] uppercase">Built for Professionals</span>
                </div>

                <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.9] animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
                    SCRIPT BETTER.<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">PRESENT SMARTER.</span>
                </h1>

                <p className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-400 font-medium mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
                    The ultra-minimal teleprompter designed for creators, speakers, and professionals.
                    Clean interface, precise controls, and zero distractions.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-300">
                    <Link
                        href="/prompter"
                        className="group relative px-10 h-16 bg-white text-black font-black text-lg rounded-2xl hover:scale-[1.02] transition-all active:scale-95 flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                    >
                        START RECORDING
                        <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                    <Link
                        href="#features"
                        className="px-10 h-16 bg-white/5 text-white font-black text-lg rounded-2xl hover:bg-white/10 border border-white/5 transition-all flex items-center justify-center"
                    >
                        SEE FEATURES
                    </Link>
                </div>

                {/* Dashboard Preview Mockup */}
                <div className="mt-20 relative px-4 md:px-0 animate-in fade-in slide-in-from-bottom-24 duration-1000 delay-500">
                    <div className="relative mx-auto max-w-5xl aspect-video rounded-3xl overflow-hidden border border-white/10 bg-zinc-900 shadow-[0_0_80px_rgba(0,0,0,1)]">
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/20">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-black" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        {/* Mock UI Elements */}
                        <div className="absolute bottom-10 left-10 right-10 flex items-center justify-center gap-4">
                            <div className="w-32 h-10 bg-white/10 rounded-xl border border-white/10" />
                            <div className="w-48 h-12 bg-white/20 rounded-2xl border border-white/20" />
                            <div className="w-32 h-10 bg-white/10 rounded-xl border border-white/10" />
                        </div>
                    </div>
                    {/* Shadow underneath */}
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-20 bg-white/5 blur-3xl opacity-50 -z-10" />
                </div>
            </div>
        </section>
    );
};
