"use client";

import React from "react";
import Link from "next/link";

export const Pricing = () => {
    const [isYearly, setIsYearly] = React.useState(false);

    const monthlyPrice = 3.99;
    const yearlyPrice = 3.19; // ~20% discount

    return (
        <section id="pricing" className="py-32 bg-black relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-normal text-white tracking-tighter mb-6">simple pricing</h2>
                    <p className="text-zinc-500 max-w-xl mx-auto font-medium mb-12">
                        Start for free, upgrade when you're ready for more. No hidden fees.
                    </p>

                    {/* Billing Toggle */}
                    <div className="flex items-center justify-center gap-4 mb-8">
                        <span className={`text-sm font-bold transition-colors ${!isYearly ? 'text-white' : 'text-zinc-500'}`}>Monthly</span>
                        <button
                            onClick={() => setIsYearly(!isYearly)}
                            className="w-14 h-8 bg-zinc-800 rounded-full relative p-1 transition-all"
                        >
                            <div className={`w-6 h-6 bg-white rounded-full transition-all ${isYearly ? 'translate-x-6' : 'translate-x-0'}`} />
                        </button>
                        <span className={`text-sm font-bold transition-colors ${isYearly ? 'text-white' : 'text-zinc-500'}`}>Yearly</span>
                        <span className="px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-wider">Save 20%</span>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-center gap-8 max-w-5xl mx-auto">
                    {/* Free Tier */}
                    <div className="flex-1 p-10 rounded-[32px] border bg-zinc-900/50 border-white/5 transition-all">
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-4 text-zinc-500">Starter</h3>
                        <div className="flex items-baseline gap-1 mb-6">
                            <span className="text-5xl font-black tracking-tight text-white">Free</span>
                        </div>
                        <p className="font-medium mb-10 leading-relaxed text-zinc-400">
                            Perfect for casual creators and beginners.
                        </p>
                        <div className="space-y-4 mb-12">
                            {[
                                "Up to 2,000 words per script",
                                "30 min max recording duration",
                                "Default & OBS Camera access",
                                "Standard Export",
                                "No account required",
                            ].map((feature, fIndex) => (
                                <div key={fIndex} className="flex items-center gap-3">
                                    <svg className="w-5 h-5 shrink-0 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                        <path d="M20 6L9 17l-5-5" />
                                    </svg>
                                    <span className="text-sm font-bold text-zinc-400">{feature}</span>
                                </div>
                            ))}
                        </div>
                        <Link href="/prompter" className="w-full h-16 rounded-2xl flex items-center justify-center font-black text-lg transition-all active:scale-95 bg-white text-black hover:bg-zinc-100">
                            Start for Free
                        </Link>
                    </div>

                    {/* Pro Tier */}
                    <div className="flex-1 p-10 rounded-[32px] border bg-white border-white transition-all shadow-xl scale-105">
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-4 text-black/60">Professional</h3>
                        <div className="flex items-baseline gap-1 mb-6">
                            <span className="text-5xl font-black tracking-tight text-black">
                                ${isYearly ? yearlyPrice : monthlyPrice}
                            </span>
                            <span className="text-lg font-bold text-black/40">/month</span>
                        </div>
                        <p className="font-medium mb-10 leading-relaxed text-black/60">
                            Everything you need for serious production.
                        </p>
                        <div className="space-y-4 mb-12">
                            {[
                                "Unlimited script length",
                                "No recording time limits",
                                "DroidCam & Pro Cam support",
                                "4K High-bitrate Export",
                                "Custom script themes",
                                "Priority Support",
                            ].map((feature, fIndex) => (
                                <div key={fIndex} className="flex items-center gap-3">
                                    <svg className="w-5 h-5 shrink-0 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                        <path d="M20 6L9 17l-5-5" />
                                    </svg>
                                    <span className="text-sm font-bold text-black/80">{feature}</span>
                                </div>
                            ))}
                        </div>
                        <Link href="/prompter" className="w-full h-16 rounded-2xl flex items-center justify-center font-black text-lg transition-all active:scale-95 bg-black text-white hover:bg-zinc-800 shadow-xl">
                            Upgrade to Pro
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};
