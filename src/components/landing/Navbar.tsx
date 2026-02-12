"use client";

import React from "react";
import Link from "next/link";

export const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-black font-black text-lg">T</span>
                    </div>
                    <span className="text-xl font-black text-white tracking-tighter">TelePro</span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    <a href="#features" className="text-sm font-normal text-zinc-400 hover:text-white transition-colors">features</a>
                    <a href="#pricing" className="text-sm font-normal text-zinc-400 hover:text-white transition-colors">pricing</a>
                    <a href="#about" className="text-sm font-normal text-zinc-400 hover:text-white transition-colors">about</a>
                </div>

                <Link
                    href="/prompter"
                    className="px-6 h-11 bg-white text-black text-sm font-normal rounded-xl hover:bg-zinc-200 transition-all active:scale-95 flex items-center justify-center tracking-widest lowercase"
                >
                    launch app
                </Link>
            </div>
        </nav>
    );
};
