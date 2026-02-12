"use client";

import React, { useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const stripePromise = loadStripe("pk_test_YOUR_STRIPE_PUBLISHABLE_KEY");

const CheckoutContent = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { user, loading } = useAuth();
    const plan = searchParams.get("plan");
    const interval = searchParams.get("interval");

    useEffect(() => {
        if (!loading && !user) {
            const currentUrl = encodeURIComponent(`/checkout?plan=${plan}&interval=${interval}`);
            router.push(`/auth?redirect=${currentUrl}`);
            return;
        }

        if (user) {
            console.log(`initiating checkout for ${plan} plan on ${interval} billing`);
        }
    }, [plan, interval, user, loading, router]);

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
                            {plan === "professional" ? (interval === "yearly" ? "$38.28/yr" : "$3.99/mo") : "$0.00"}
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
