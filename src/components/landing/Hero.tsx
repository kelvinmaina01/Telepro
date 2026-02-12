"use client";

import React from "react";
import Link from "next/link";

export const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-40">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 blur-[120px] rounded-full animate-pulse delay-700" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                <h1 className="text-6xl md:text-8xl lg:text-[120px] font-normal tracking-tighter leading-[0.9] text-white mb-8 animate-title">
                    speak with <span className="text-zinc-500">absolute</span><br />
                    confidence.
                </h1>

                <p className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-400 mb-12 font-medium leading-relaxed animate-fade-up">
                    The world's most elegant teleprompter designed for creators,
                    executives, and professional speakers. No distractions, just performance.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-up delay-200">
                    <Link
                        href="/prompter"
                        className="group relative px-10 h-16 bg-white text-black font-normal text-lg rounded-2xl hover:scale-[1.02] transition-all active:scale-95 flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.2)] lowercase"
                    >
                        start recording
                        <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>

                    <Link
                        href="#features"
                        className="px-10 h-16 bg-transparent text-white font-normal text-lg rounded-2xl border-2 border-white hover:bg-white hover:text-black transition-all active:scale-95 flex items-center justify-center lowercase"
                    >
                        view features
                    </Link>
                </div>

                <div className="mt-20 pt-20 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-50 grayscale contrast-125 lowercase">
                    <div className="text-sm font-normal tracking-widest">recording</div>
                    <div className="text-sm font-normal tracking-widest">playback</div>
                    <div className="text-sm font-normal tracking-widest">scripting</div>
                    <div className="text-sm font-normal tracking-widest">mirroring</div>
                </div>
            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black to-transparent z-10" />
        </section>
    );
};
