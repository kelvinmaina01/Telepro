"use client";

import React from "react";
import Link from "next/link";

export const Footer = () => {
    return (
        <footer className="py-12 bg-black border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-white/10 rounded flex items-center justify-center">
                        <span className="text-white font-normal text-xs lowercase">t</span>
                    </div>
                    <span className="text-lg font-normal text-white tracking-tighter lowercase">telepro</span>
                </div>

                <p className="text-zinc-500 text-sm font-normal lowercase">
                    &copy; {new Date().getFullYear()} telepro. all rights reserved.
                </p>

                <div className="flex items-center gap-8">
                    <Link href="#" className="text-sm font-normal text-zinc-500 hover:text-white transition-colors lowercase">twitter</Link>
                    <Link href="#" className="text-sm font-normal text-zinc-500 hover:text-white transition-colors lowercase">privacy</Link>
                    <Link href="#" className="text-sm font-normal text-zinc-500 hover:text-white transition-colors lowercase">terms</Link>
                </div>
            </div>
        </footer>
    );
};
