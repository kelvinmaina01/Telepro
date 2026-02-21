"use client";

import React from "react";
import Link from "next/link";

export const Pricing = () => {
    return (
        <section id="pricing" className="py-32 bg-black relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-normal text-white tracking-tighter mb-6">completely free</h2>
                    <p className="text-zinc-500 max-w-xl mx-auto font-medium mb-12">
                        Telepro is now 100% free forever! All features unlocked for everyone.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row justify-center gap-8 max-w-5xl mx-auto">
                    {/* Free Tier - Now the only tier */}
                    <div className="flex-1 p-10 rounded-[32px] border bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-white/10 transition-all shadow-2xl">
                        <h3 className="text-sm tracking-[0.2em] mb-4 text-white lowercase">telepro</h3>
                        <div className="flex items-baseline gap-1 mb-6">
                            <span className="text-5xl font-normal tracking-tight text-white lowercase">free forever</span>
                        </div>
                        <p className="font-medium mb-10 leading-relaxed text-zinc-300">
                            Everything you need for professional video creation.
                        </p>
                        <div className="space-y-4 mb-12">
                            {[
                                "Unlimited script length",
                                "No recording time limits",
                                "All camera support (OBS, DroidCam, Pro Cam)",
                                "High-quality video export",
                                "Custom script themes",
                                "No account required",
                                "All premium features unlocked",
                                "100% free forever",
                            ].map((feature, fIndex) => (
                                <div key={fIndex} className="flex items-center gap-3">
                                    <svg className="w-5 h-5 shrink-0 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                        <path d="M20 6L9 17l-5-5" />
                                    </svg>
                                    <span className="text-sm font-normal text-white">{feature}</span>
                                </div>
                            ))}
                        </div>
                        <Link href="/prompter" className="w-full h-16 rounded-2xl flex items-center justify-center font-normal text-lg transition-all active:scale-95 bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90 shadow-xl lowercase cursor-pointer">
                            start creating now
                        </Link>
                    </div>
                </div>

                <div className="text-center mt-12 pt-12 border-t border-white/10">
                    <p className="text-zinc-500 text-sm">
                        <span className="text-emerald-400">🎉</span> No payments, no subscriptions, no hidden fees. 
                        Telepro is completely free for everyone! <span className="text-emerald-400">🎉</span>
                    </p>
                </div>
            </div>
        </section>
    );
};
