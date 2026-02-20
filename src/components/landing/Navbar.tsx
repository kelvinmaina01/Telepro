"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-black font-black text-lg">T</span>
                    </div>
                    <span className="text-xl font-normal text-white tracking-tighter lowercase">telepro</span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    <a href="/#features" className="text-sm font-normal text-zinc-400 hover:text-white transition-colors lowercase">features</a>
                    <a href="/#pricing" className="text-sm font-normal text-zinc-400 hover:text-white transition-colors lowercase">pricing</a>
                    <a href="/#about" className="text-sm font-normal text-zinc-400 hover:text-white transition-colors lowercase">about</a>
                    <a href="/extension" className="text-sm font-normal text-zinc-400 hover:text-white transition-colors lowercase flex items-center gap-1">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                        </svg>
                        extension
                    </a>
                </div>

                <div className="flex items-center gap-4">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <Link href="/prompter" className="text-sm font-normal text-zinc-400 hover:text-white transition-colors lowercase">app</Link>
                            <button
                                onClick={logout}
                                className="px-6 h-11 bg-zinc-900 text-white text-sm font-normal rounded-xl hover:bg-zinc-800 transition-all active:scale-95 flex items-center justify-center lowercase border border-white/5"
                            >
                                sign out
                            </button>
                            <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-black font-black text-xs select-none">
                                {user.displayName ? user.displayName.substring(0, 2).toUpperCase() : user.email?.substring(0, 2).toUpperCase()}
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link href="/auth" className="text-sm font-normal text-zinc-400 hover:text-white transition-colors lowercase mr-2">sign in</Link>
                            <Link
                                href="/prompter"
                                className="px-6 h-11 bg-white text-black text-sm font-normal rounded-xl hover:bg-zinc-200 transition-all active:scale-95 flex items-center justify-center lowercase"
                            >
                                launch app
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};
