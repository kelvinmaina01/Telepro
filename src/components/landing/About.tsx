"use client";

import React from "react";

export const About = () => {
    return (
        <section id="about" className="py-32 bg-[#080808] relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-normal text-white tracking-tighter mb-8 italic">
                            purpose-built for the stage.
                        </h2>
                        <div className="space-y-6">
                            <p className="text-zinc-400 text-lg font-medium leading-relaxed">
                                TelePro was born out of a simple frustration: most teleprompters are either too complex or too basic. We built a tool that balances professional power with an interface that gets out of your way.
                            </p>
                            <p className="text-zinc-500 text-lg font-medium leading-relaxed">
                                Whether you're recording a YouTube tutorial, a corporate presentation, or an online course, TelePro ensures your delivery is natural and your focus stays where it matters—on your audience.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-8 mt-12">
                            <div>
                                <div className="text-3xl font-black text-white mb-2">99.9%</div>
                                <div className="text-xs font-black uppercase tracking-widest text-zinc-600">Sync Accuracy</div>
                            </div>
                            <div>
                                <div className="text-3xl font-black text-white mb-2">4K</div>
                                <div className="text-xs font-black uppercase tracking-widest text-zinc-600">Ready Feed</div>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="aspect-square bg-white shadow-[0_0_80px_rgba(255,255,255,0.05)] rounded-[40px] flex items-center justify-center overflow-hidden border border-white/10 group">
                            {/* Decorative minimalist elements */}
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-700" />
                            <div className="w-1/2 h-px bg-white/20 absolute top-1/2 left-0" />
                            <div className="w-px h-1/2 bg-white/20 absolute top-0 left-1/2" />
                            <div className="text-[200px] font-black text-white/5 select-none pointer-events-none">PRO</div>
                        </div>

                        {/* Floating badge */}
                        <div className="absolute -bottom-10 -left-10 p-8 bg-zinc-900 border border-white/10 rounded-3xl shadow-2xl max-w-[240px] hidden md:block">
                            <p className="text-sm font-bold text-white italic">
                                "The cleanest prompter interface I've used in 10 years of broadcasting."
                            </p>
                            <div className="mt-4 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-zinc-800" />
                                <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Industry Leader</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
