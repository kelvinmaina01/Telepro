import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getWebhookLog, logWebhookEvent, WebhookLog } from "@/lib/firestore";
import Stripe from "stripe";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

// Retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;

// Exponential backoff retry function
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = MAX_RETRIES,
  delay: number = RETRY_DELAY_MS
): Promise<T> {
  let lastError: Error;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      console.warn(`Attempt ${attempt + 1} failed:`, error);
      
      if (attempt < maxRetries - 1) {
        const waitTime = delay * Math.pow(2, attempt);
        console.log(`Retrying in ${waitTime}ms...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
  }
  
  throw lastError!;
}

// Function to reprocess webhook event
async function reprocessWebhookEvent(eventId: string, eventType: string, metadata?: Record<string, any>) {
  // In a real implementation, you would:
  // 1. Fetch the original event from Stripe using eventId
  // 2. Re-process the event
  // 3. Update the webhook log
  
  console.log(`Reprocessing webhook event ${eventId} of type ${eventType}`);
  
  // For now, we'll simulate successful reprocessing
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return { success: true, eventId, eventType };
}

export async function POST(req: NextRequest) {
  try {
    // Check for admin authentication (in production, use proper auth)
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { eventId, forceRetry = false } = body;

    if (!eventId) {
      return NextResponse.json({ error: "Missing eventId" }, { status: 400 });
    }

    // Get the webhook log
    const log = await getWebhookLog(eventId);
    
    if (!log) {
      return NextResponse.json({ error: "Webhook log not found" }, { status: 404 });
    }

    // Check if we should retry
    if (log.status === "completed" && !forceRetry) {
      return NextResponse.json({ 
        message: "Event already completed", 
        eventId,
        status: log.status 
      });
    }

    // Update log to processing
    await logWebhookEvent(
      eventId,
      log.eventType,
      "processing",
      log.attempts + 1,
      undefined,
      { ...log.metadata, retryTimestamp: new Date().toISOString() }
    );

    try {
      // Retry processing the event
      await retryWithBackoff(async () => {
        return await reprocessWebhookEvent(eventId, log.eventType, log.metadata);
      });

      // Mark as completed
      await logWebhookEvent(
        eventId,
        log.eventType,
        "completed",
        log.attempts + 1
      );

      return NextResponse.json({
        success: true,
        message: "Event reprocessed successfully",
        eventId,
        attempts: log.attempts + 1,
        status: "completed"
      });
    } catch (error) {
      // Mark as failed
      await logWebhookEvent(
        eventId,
        log.eventType,
        "failed",
        log.attempts + 1,
        (error as Error).message,
        { ...log.metadata, lastRetry: new Date().toISOString() }
      );

      return NextResponse.json({
        success: false,
        message: "Failed to reprocess event after retries",
        eventId,
        attempts: log.attempts + 1,
        error: (error as Error).message,
        status: "failed"
      }, { status: 500 });
    }
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
    // Check for admin authentication (in production, use proper auth)
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get("eventId");
    const status = searchParams.get("status");
    const limit = parseInt(searchParams.get("limit") || "50");

    // In a real implementation, you would query Firestore for webhook logs
    // For now, return a mock response
    
    return NextResponse.json({
      message: "Webhook retry endpoint",
      endpoints: {
        POST: "Retry a failed webhook event",
        GET: "Get webhook logs"
      },
      parameters: {
        eventId: "Specific event ID to retry",
        status: "Filter by status (pending, processing, completed, failed)",
        limit: "Number of logs to return"
      }
    });
  } catch (error) {
    console.error("Retry endpoint error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}