"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useSearchParams, useRouter } from "next/navigation";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { KofiButton } from "@/components/KofiButton";

const AuthContent = () => {
    const { loginWithGoogle, user } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectUrl = searchParams.get("redirect") || "/prompter";

    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    // Redirect if already logged in
    useEffect(() => {
        if (user) {
            router.push(redirectUrl);
        }
    }, [user, router, redirectUrl]);

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                if (name) {
                    await updateProfile(userCredential.user, { displayName: name });
                }
            }
            router.push(redirectUrl);
        } catch (err: any) {
            setError(err.message || "an error occurred during authentication");
        }
    };

    return (
        <div className="bg-black min-h-screen text-white flex items-center justify-center px-6 selection:bg-white selection:text-black">
            <div className="max-w-md w-full">
                <div className="text-center mb-12">
                    <Link href="/" className="inline-flex items-center gap-2 mb-8 group">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                            <span className="text-black font-black text-lg">T</span>
                        </div>
                        <span className="text-xl font-normal text-white tracking-tighter lowercase">telepro</span>
                    </Link>
                    <h1 className="text-4xl font-normal tracking-tighter lowercase mb-4">
                        {isLogin ? "welcome back" : "create account"}
                    </h1>
                    <p className="text-zinc-500 lowercase">
                        {isLogin ? "sign in to your professional prompter" : "join telepro to unlock advanced features"}
                    </p>
                </div>

                <div className="space-y-6">
                    {/* Google Auth */}
                    <button
                        onClick={loginWithGoogle}
                        className="w-full h-14 bg-white text-black rounded-2xl font-normal flex items-center justify-center gap-3 hover:bg-zinc-200 transition-all active:scale-[0.98] lowercase cursor-pointer"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        continue with google
                    </button>

                    <div className="relative flex items-center gap-4 py-2">
                        <div className="flex-1 h-px bg-white/10" />
                        <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold">or email</span>
                        <div className="flex-1 h-px bg-white/10" />
                    </div>

                    {/* Email Form */}
                    <form onSubmit={handleEmailAuth} className="space-y-4">
                        {!isLogin && (
                            <input
                                type="text"
                                placeholder="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full h-14 bg-zinc-900 border border-white/5 rounded-2xl px-6 text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/20 focus:bg-zinc-800/50 transition-all lowercase"
                            />
                        )}
                        <input
                            type="email"
                            placeholder="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full h-14 bg-zinc-900 border border-white/5 rounded-2xl px-6 text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/20 focus:bg-zinc-800/50 transition-all lowercase"
                            required
                        />
                        <input
                            type="password"
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full h-14 bg-zinc-900 border border-white/5 rounded-2xl px-6 text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/20 focus:bg-zinc-800/50 transition-all lowercase"
                            required
                        />

                        {error && <p className="text-rose-500 text-xs text-center lowercase">{error}</p>}

                        <button
                            type="submit"
                            className="w-full h-14 bg-zinc-800 text-white rounded-2xl font-normal hover:bg-zinc-700 transition-all active:scale-[0.98] lowercase border border-white/5 cursor-pointer"
                        >
                            {isLogin ? "sign in" : "create account"}
                        </button>
                    </form>

                    <div className="text-center pt-4">
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-zinc-500 text-sm hover:text-white transition-colors lowercase cursor-pointer"
                        >
                            {isLogin ? "don't have an account? create one" : "already have an account? sign in"}
                        </button>
                    </div>

                    {/* Buy Me a Coffee Button */}
                    <div className="pt-8 border-t border-white/10 mt-8">
                        <div className="text-center mb-4">
                            <p className="text-zinc-500 text-sm mb-4">Enjoying Telepro? Support the developer!</p>
                            <div className="flex items-center justify-center gap-4">
                                <KofiButton size="md" />
                                <span className="text-sm text-zinc-400">Support the developer</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function AuthPage() {
    return (
        <Suspense fallback={
            <div className="bg-black min-h-screen text-white flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin" />
            </div>
        }>
            <AuthContent />
        </Suspense>
    );
}
