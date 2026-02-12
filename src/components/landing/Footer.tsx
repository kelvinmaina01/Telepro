"use client";

import React from "react";
import Link from "next/link";

export const Footer = () => {
    return (
        <footer className="py-12 bg-black border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-white/10 rounded flex items-center justify-center">
                        <span className="text-white font-black text-xs">T</span>
                    </div>
                    <span className="text-lg font-black text-white tracking-tighter">TelePro</span>
                </div>

                <p className="text-zinc-500 text-sm font-medium">
                    &copy; {new Date().getFullYear()} TelePro. All rights reserved.
                </p>

                <div className="flex items-center gap-8">
                    <Link href="#" className="text-sm font-bold text-zinc-500 hover:text-white transition-colors">Twitter</Link>
                    <Link href="#" className="text-sm font-bold text-zinc-500 hover:text-white transition-colors">Privacy</Link>
                    <Link href="#" className="text-sm font-bold text-zinc-500 hover:text-white transition-colors">Terms</Link>
                </div>
            </div>
        </footer>
    );
};
