"use client";

import React from "react";

export const About = () => {
    return (
        <section id="about" className="py-32 bg-[#080808] relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-normal text-white tracking-tighter mb-8">
                            purpose-built for the stage.
                        </h2>
                        <div className="space-y-6">
                            <p className="text-zinc-500 text-lg font-medium leading-relaxed">
                                Whether you're recording a YouTube tutorial, a corporate presentation, or an online course, TelePro ensures your delivery is natural and your focus stays where it matters—on your audience.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-8 mt-12 lowercase">
                            <div>
                                <div className="text-3xl font-normal text-white mb-2">99.9%</div>
                                <div className="text-xs font-normal tracking-widest text-zinc-600">sync accuracy</div>
                            </div>
                            <div>
                                <div className="text-3xl font-normal text-white mb-2">4k</div>
                                <div className="text-xs font-normal tracking-widest text-zinc-600">ready feed</div>
                            </div>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="aspect-video w-full bg-zinc-900 rounded-[32px] overflow-hidden border border-white/10 shadow-2xl relative">
                            {/* LinkedIn Image */}
                            <img
                                src="https://media.licdn.com/dms/image/v2/D4D22AQGbNJl9nSqhFQ/feedshare-shrink_2048_1536/B4DZyCG3NjJoAk-/0/1771709363341?e=1773273600&v=beta&t=-GDaIdY3iOTCzvDQHwAsJTlVskMP8gVi_bwkf-QAMmc"
                                alt="TelePro Professional Teleprompter in Action"
                                className="absolute inset-0 w-full h-full object-cover"
                            />

                            {/* Subtle overlay to match aesthetics when not playing */}
                            <div className="absolute inset-0 bg-black/10 pointer-events-none group-hover:bg-transparent transition-all duration-700" />
                        </div>

                        {/* Decorative background glow */}
                        <div className="absolute -inset-4 bg-white/5 blur-2xl rounded-[40px] -z-10 group-hover:bg-white/10 transition-all" />
                    </div>
                </div>
            </div>
        </section>
    );
};
