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
