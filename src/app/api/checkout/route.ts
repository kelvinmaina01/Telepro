import { NextRequest, NextResponse } from "next/server";
import { STRIPE_PRICES, stripe } from "@/lib/stripe";
import { getUserProfile, createUserProfile } from "@/lib/firestore";
import { auth } from "@/lib/firebase";
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

        // Verify the token and get user
        const decodedToken = await auth.verifyIdToken(idToken);
        const userId = decodedToken.uid;
        const userEmail = decodedToken.email;

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

        // Get price ID based on plan and interval
        const priceId = interval === "yearly" ? STRIPE_PRICES.yearly : STRIPE_PRICES.monthly;

        // Get or create user profile
        let profile = await getUserProfile(userId);

        if (!profile) {
            // Create new user profile
            await createUserProfile(userId, userEmail, decodedToken.name || null);
            profile = await getUserProfile(userId);
        }

        // Check if user already has an active pro subscription
        if (profile?.plan === "pro" && profile?.subscriptionStatus === "active") {
            return NextResponse.json(
                { error: "You already have an active pro subscription" },
                { status: 400 }
            );
        }

        // Build URLs
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://telepro.harda.dev";
        const successUrl = `${baseUrl}/checkout?success=true&session_id={CHECKOUT_SESSION_ID}`;
        const cancelUrl = `${baseUrl}/checkout?canceled=true`;

        // Create or get Stripe customer
        let customerId = profile?.stripeCustomerId;

        if (!customerId) {
            // Create Stripe customer
            const customer = await stripe.customers.create({
                email: userEmail || undefined,
                metadata: {
                    userId,
                },
            });
            customerId = customer.id;
        }

        // Generate idempotency key from user ID and timestamp
        const idempotencyKey = `checkout_${userId}_${Date.now()}`;

        // Create checkout session with idempotency key
        const session = await stripe.checkout.sessions.create({
            mode: "subscription",
            payment_method_types: ["card"],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            success_url: successUrl,
            cancel_url: cancelUrl,
            customer: customerId,
            metadata: {
                userId,
            },
            allow_promotion_codes: true,
        }, {
            idempotencyKey,
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error("Checkout error:", error);
        return NextResponse.json(
            { error: "Failed to create checkout session" },
            { status: 500 }
        );
    }
}
