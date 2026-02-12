"use client";

import React from "react";
import Link from "next/link";

const tiers = [
    {
        name: "Starter",
        price: "Free",
        description: "Perfect for casual creators and beginners.",
        features: [
            "Up to 2,000 words per script",
            "30 min max recording duration",
            "Default & OBS Camera access",
            "Standard Export",
            "No account required",
        ],
        cta: "Start for Free",
        highlight: false,
    },
    {
        name: "Professional",
        price: "$3.99",
        description: "Everything you need for serious production.",
        features: [
            "Unlimited script length",
            "No recording time limits",
            "DroidCam & Pro Cam support",
            "4K High-bitrate Export",
            "Custom script themes",
            "Priority Support",
        ],
        cta: "Upgrade to Pro",
        highlight: true,
    },
];

export const Pricing = () => {
    return (
        <section id="pricing" className="py-32 bg-black relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-6">SIMPLE PRICING</h2>
                    <p className="text-zinc-500 max-w-xl mx-auto font-medium">
                        Start for free, upgrade when you're ready for more. No hidden fees.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row justify-center gap-8 max-w-5xl mx-auto">
                    {tiers.map((tier, index) => (
                        <div
                            key={index}
                            className={`flex-1 p-10 rounded-[32px] border transition-all ${tier.highlight ? 'bg-white border-white' : 'bg-zinc-900/50 border-white/5'}`}
                        >
                            <h3 className={`text-sm font-black uppercase tracking-[0.2em] mb-4 ${tier.highlight ? 'text-black/60' : 'text-zinc-500'}`}>
                                {tier.name}
                            </h3>
                            <div className="flex items-baseline gap-1 mb-6">
                                <span className={`text-5xl font-black tracking-tight ${tier.highlight ? 'text-black' : 'text-white'}`}>{tier.price}</span>
                                {tier.price !== "Free" && <span className={`text-lg font-bold ${tier.highlight ? 'text-black/40' : 'text-zinc-500'}`}>/month</span>}
                            </div>
                            <p className={`font-medium mb-10 leading-relaxed ${tier.highlight ? 'text-black/60' : 'text-zinc-400'}`}>
                                {tier.description}
                            </p>

                            <div className="space-y-4 mb-12">
                                {tier.features.map((feature, fIndex) => (
                                    <div key={fIndex} className="flex items-center gap-3">
                                        <svg className={`w-5 h-5 shrink-0 ${tier.highlight ? 'text-black' : 'text-zinc-400'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                            <path d="M20 6L9 17l-5-5" />
                                        </svg>
                                        <span className={`text-sm font-bold ${tier.highlight ? 'text-black/80' : 'text-zinc-400'}`}>{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <Link
                                href="/prompter"
                                className={`w-full h-16 rounded-2xl flex items-center justify-center font-black text-lg transition-all active:scale-95 ${tier.highlight ? 'bg-black text-white hover:bg-zinc-800 shadow-xl' : 'bg-white text-black hover:bg-zinc-100'}`}
                            >
                                {tier.cta}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
