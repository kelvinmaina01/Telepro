"use client";

import React, { useEffect, Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { getIdToken } from "firebase/auth";
import { auth } from "@/lib/firebase";

// Load Stripe with the public key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_placeholder");

const CheckoutContent = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { user, loading } = useAuth();
    const [isRedirecting, setIsRedirecting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const plan = searchParams.get("plan");
    const interval = searchParams.get("interval");
    const success = searchParams.get("success");
    const canceled = searchParams.get("canceled");

    // Handle successful payment
    useEffect(() => {
        if (success) {
            // Payment was successful, show success message
            return;
        }
        
        if (canceled) {
            // Payment was canceled, show message
            return;
        }
    }, [success, canceled]);

    // Redirect to auth if not logged in
    useEffect(() => {
        if (!loading && !user) {
            const currentUrl = encodeURIComponent(`/checkout?plan=${plan}&interval=${interval}`);
            router.push(`/auth?redirect=${currentUrl}`);
        }
    }, [user, loading, plan, interval, router]);

    // Create Stripe checkout session when user is logged in
    useEffect(() => {
        const createCheckoutSession = async () => {
            if (!user || !plan || !interval || isRedirecting || success || canceled) {
                return;
            }

            setIsRedirecting(true);
            setError(null);

            try {
                // Get ID token for authentication
                const idToken = await getIdToken(user);

                // Call our API to create checkout session
                const response = await fetch("/api/checkout", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${idToken}`,
                    },
                    body: JSON.stringify({
                        plan,
                        interval,
                    }),
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || "Failed to create checkout session");
                }

                if (data.url) {
                    // Redirect to Stripe checkout
                    window.location.href = data.url;
                } else {
                    throw new Error("No checkout URL returned");
                }
            } catch (err: any) {
                console.error("Checkout error:", err);
                setError(err.message || "An error occurred");
                setIsRedirecting(false);
            }
        };

        if (user && plan && interval && !success && !canceled) {
            createCheckoutSession();
        }
    }, [user, plan, interval, isRedirecting, success, canceled]);

    // Show success message
    if (success) {
        return (
            <div className="bg-black min-h-screen text-white flex items-center justify-center p-6 text-center">
                <div className="max-w-md w-full">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500/20 rounded-full mb-8 border border-emerald-500/30">
                        <span className="text-3xl">✅</span>
                    </div>
                    <h1 className="text-4xl font-normal tracking-tighter lowercase mb-4">payment successful!</h1>
                    <p className="text-zinc-500 lowercase mb-12">
                        thank you for upgrading to pro. your subscription is now active.
                    </p>
                    <Link 
                        href="/prompter" 
                        className="inline-block px-8 py-4 bg-white text-black font-bold rounded-2xl hover:bg-zinc-200 transition-colors"
                    >
                        go to telepro
                    </Link>
                </div>
            </div>
        );
    }

    // Show canceled message
    if (canceled) {
        return (
            <div className="bg-black min-h-screen text-white flex items-center justify-center p-6 text-center">
                <div className="max-w-md w-full">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500/20 rounded-full mb-8 border border-amber-500/30">
                        <span className="text-3xl">😕</span>
                    </div>
                    <h1 className="text-4xl font-normal tracking-tighter lowercase mb-4">payment canceled</h1>
                    <p className="text-zinc-500 lowercase mb-12">
                        no worries, you can try again whenever you're ready.
                    </p>
                    <Link 
                        href="/#pricing" 
                        className="inline-block px-8 py-4 bg-white text-black font-bold rounded-2xl hover:bg-zinc-200 transition-colors"
                    >
                        try again
                    </Link>
                </div>
            </div>
        );
    }

    // Show error
    if (error) {
        return (
            <div className="bg-black min-h-screen text-white flex items-center justify-center p-6 text-center">
                <div className="max-w-md w-full">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mb-8 border border-red-500/30">
                        <span className="text-3xl">❌</span>
                    </div>
                    <h1 className="text-4xl font-normal tracking-tighter lowercase mb-4">something went wrong</h1>
                    <p className="text-zinc-500 lowercase mb-6">
                        {error}
                    </p>
                    <Link 
                        href="/#pricing" 
                        className="inline-block px-8 py-4 bg-white text-black font-bold rounded-2xl hover:bg-zinc-200 transition-colors"
                    >
                        go back
                    </Link>
                </div>
            </div>
        );
    }

    // Loading/redirecting state
    return (
        <div className="bg-black min-h-screen text-white flex items-center justify-center p-6 text-center">
            <div className="max-w-md w-full">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/5 rounded-full mb-8 border border-white/10">
                    <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                </div>
                <h1 className="text-4xl font-normal tracking-tighter lowercase mb-4">secure checkout</h1>
                <p className="text-zinc-500 lowercase mb-12">
                    redirecting you to stripe to complete your {plan} {interval} subscription safely...
                </p>

                <div className="p-8 rounded-3xl bg-zinc-900/50 border border-white/5 mb-12 text-left">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-zinc-500 lowercase">plan</span>
                        <span className="text-white lowercase">{plan}</span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-zinc-500 lowercase">billing</span>
                        <span className="text-white lowercase">{interval}</span>
                    </div>
                    <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                        <span className="text-white font-normal lowercase">total</span>
                        <span className="text-white font-normal text-xl lowercase">
                            {plan === "professional" ? (interval === "yearly" ? "$35.88/yr" : "$4.99/mo") : "$0.00"}
                        </span>
                    </div>
                </div>

                <Link href="/" className="text-zinc-500 hover:text-white transition-colors lowercase text-sm">
                    &larr; cancel and return
                </Link>
            </div>
        </div>
    );
};

export default function CheckoutPage() {
    return (
        <Suspense fallback={
            <div className="bg-black min-h-screen text-white flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin" />
            </div>
        }>
            <CheckoutContent />
        </Suspense>
    );
}
