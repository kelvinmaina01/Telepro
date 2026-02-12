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
                    {/* Socials */}
                    <div className="flex items-center gap-4 border-r border-white/10 pr-8 mr-8">
                        <Link href="#" className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                            </svg>
                        </Link>
                        <Link href="#" className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                        </Link>
                    </div>

                    <div className="flex items-center gap-8">
                        <Link href="/legal#privacy" className="text-sm font-normal text-zinc-500 hover:text-white transition-colors lowercase">privacy</Link>
                        <Link href="/legal#terms" className="text-sm font-normal text-zinc-500 hover:text-white transition-colors lowercase">terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
