import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        console.log("Stripe webhook called but Stripe is disabled - not monetizing");
        
        // Return success since we're not monetizing
        return NextResponse.json({ 
            received: true, 
            status: "ignored",
            message: "Stripe webhooks are disabled - this is a demo version"
        });
    } catch (error) {
        console.error("Webhook error:", error);
        return NextResponse.json(
            { error: "Webhook handler failed" },
            { status: 500 }
        );
    }
}