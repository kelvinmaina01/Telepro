import { NextRequest, NextResponse } from "next/server";
import { STRIPE_PRICES, stripe } from "@/lib/stripe";
import { getUserProfile, createUserProfile } from "@/lib/firestore";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Initialize rate limiter (using Upstash Redis)
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "60 s"), // 5 requests per 60 seconds
  analytics: true,
});

export async function POST(req: NextRequest) {
    try {
        // Check authentication
        const authHeader = req.headers.get("authorization");
        if (!authHeader?.startsWith("Bearer ")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Get the ID token from the authorization header
        const idToken = authHeader.split("Bearer ")[1];

        // For demo purposes, we'll use a simple user ID
        // In production, you should verify the Firebase ID token properly using Firebase Admin SDK
        const userId = "demo-user-id";
        const userEmail = "demo@example.com";

        // Rate limiting check
        const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "127.0.0.1";
        const { success, limit, reset, remaining } = await ratelimit.limit(`${ip}_${userId}`);
        
        if (!success) {
            return NextResponse.json(
                { 
                    error: "Too many requests. Please try again later.",
                    limit,
                    reset: new Date(reset).toISOString(),
                    remaining
                },
                { 
                    status: 429,
                    headers: {
                        "X-RateLimit-Limit": limit.toString(),
                        "X-RateLimit-Remaining": remaining.toString(),
                        "X-RateLimit-Reset": new Date(reset).toISOString(),
                    }
                }
            );
        }

        // Get request body
        const body = await req.json();
        const { plan, interval } = body;

        if (!plan || !interval) {
            return NextResponse.json(
                { error: "Missing plan or interval" },
                { status: 400 }
            );
        }

        // Since we're not monetizing, return a demo success URL
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        const successUrl = `${baseUrl}/checkout?success=true&demo=true`;
        
        console.log("Checkout API called but Stripe is disabled - not monetizing");
        
        return NextResponse.json({ 
            url: successUrl,
            message: "Stripe checkout is disabled - this is a demo version",
            demo: true
        });
    } catch (error) {
        console.error("Checkout error:", error);
        return NextResponse.json(
            { error: "Failed to create checkout session" },
            { status: 500 }
        );
    }
}
