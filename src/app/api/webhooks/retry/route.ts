import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    console.log("Webhook retry endpoint called - Stripe is disabled (not monetizing)");
    
    return NextResponse.json({
      success: true,
      message: "Webhook retry is disabled - this is a demo version",
      demo: true,
      note: "Stripe and payment features are disabled since we're not monetizing"
    });
  } catch (error) {
    console.error("Retry endpoint error:", error);
    return NextResponse.json(
      { error: "Failed to process retry request" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    console.log("Webhook retry GET endpoint called - Stripe is disabled (not monetizing)");
    
    return NextResponse.json({
      message: "Webhook retry endpoint (Demo Mode)",
      note: "Stripe and payment features are disabled since we're not monetizing",
      endpoints: {
        POST: "Retry a failed webhook event (disabled in demo)",
        GET: "Get webhook logs (disabled in demo)"
      },
      demo: true
    });
  } catch (error) {
    console.error("Retry endpoint error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}