import { NextRequest, NextResponse } from "next/server";
import { createCheckoutSession, STRIPE_PRICES } from "@/lib/stripe";
import { getUserProfile, createUserProfile } from "@/lib/firestore";
import { auth } from "@/lib/firebase";
import { stripe } from "@/lib/stripe";

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

        // Create checkout session
        const session = await createCheckoutSession({
            priceId,
            customerId,
            userId,
            successUrl,
            cancelUrl,
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
