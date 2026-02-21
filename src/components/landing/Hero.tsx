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
                    speak with <span style={{ color: '#0000F7', filter: 'drop-shadow(0 0 10px rgba(0, 0, 247, 0.5))' }}>absolute</span><br />
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

                    <a
                        href="/extension"
                        className="group relative px-10 h-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-normal text-lg rounded-2xl hover:scale-[1.02] transition-all active:scale-95 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.3)] lowercase"
                    >
                        <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                        </svg>
                        add to chrome
                        <span className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                            COMING SOON
                        </span>
                    </a>
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
