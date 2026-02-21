import { NextRequest, NextResponse } from "next/server";

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
