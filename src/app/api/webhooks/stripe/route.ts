import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { updateUserSubscription, getUserProfile, findUserByStripeCustomerId, logWebhookEvent } from "@/lib/firestore";
import Stripe from "stripe";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

// Retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000; // 1 second initial delay

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
        const waitTime = delay * Math.pow(2, attempt); // Exponential backoff
        console.log(`Retrying in ${waitTime}ms...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
  }
  
  throw lastError!;
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.text();
        const signature = req.headers.get("stripe-signature") || "";

        let event: Stripe.Event;

        // Verify webhook signature
        try {
            event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
        } catch (err) {
            console.error("Webhook signature verification failed:", err);
            return NextResponse.json(
                { error: "Webhook signature verification failed" },
                { status: 400 }
            );
        }

        // Log webhook event
        await logWebhookEvent(event.id, event.type, "processing", 1, undefined, {
            timestamp: new Date().toISOString(),
        });

        // Handle the event with retry logic
        try {
            await retryWithBackoff(async () => {
                await handleStripeEvent(event);
            });
            
            // Mark as completed
            await logWebhookEvent(event.id, event.type, "completed", 1);
        } catch (error) {
            // Mark as failed
            await logWebhookEvent(event.id, event.type, "failed", MAX_RETRIES, (error as Error).message);
            console.error("Webhook processing failed after retries:", error);
            
            // Return 200 to Stripe to prevent retries (we'll handle retries ourselves)
            return NextResponse.json({ received: true, status: "failed_after_retries" });
        }

        return NextResponse.json({ received: true, status: "processed" });
    } catch (error) {
        console.error("Webhook error:", error);
        return NextResponse.json(
            { error: "Webhook handler failed" },
            { status: 500 }
        );
    }
}

async function handleStripeEvent(event: Stripe.Event) {
    switch (event.type) {
        case "checkout.session.completed": {
            const session = event.data.object as Stripe.Checkout.Session;

            // Get user ID from metadata
            const userId = session.metadata?.userId;

            if (!userId) {
                console.error("No userId in session metadata");
                break;
            }

            // Get subscription details
            const subscriptionId = session.subscription as string;
            const subscription = await stripe.subscriptions.retrieve(subscriptionId);

            // Update user profile with subscription info
            await updateUserSubscription(
                userId,
                "pro",
                session.customer as string,
                subscriptionId,
                subscription.status
            );

            console.log(`User ${userId} upgraded to pro`);
            break;
        }

        case "customer.subscription.updated": {
            const subscription = event.data.object as Stripe.Subscription;

            // Find user by stripe customer ID
            const customerId = subscription.customer as string;
            const user = await findUserByStripeCustomerId(customerId);
            
            if (user) {
                // Update user subscription status
                await updateUserSubscription(
                    user.uid,
                    subscription.status === "active" || subscription.status === "trialing" ? "pro" : "free",
                    customerId,
                    subscription.id,
                    subscription.status
                );
                console.log(`Updated subscription ${subscription.id} for user ${user.uid}: ${subscription.status}`);
            } else {
                console.warn(`No user found for customer ID: ${customerId}`);
            }
            break;
        }

        case "customer.subscription.deleted": {
            const subscription = event.data.object as Stripe.Subscription;

            // Downgrade user to free when subscription is canceled
            const customerId = subscription.customer as string;
            const user = await findUserByStripeCustomerId(customerId);
            
            if (user) {
                await updateUserSubscription(
                    user.uid,
                    "free",
                    customerId,
                    subscription.id,
                    "canceled"
                );
                console.log(`Downgraded user ${user.uid} to free after subscription cancellation`);
            } else {
                console.warn(`No user found for customer ID: ${customerId}`);
            }
            break;
        }

        case "invoice.payment_failed": {
            const invoice = event.data.object as Stripe.Invoice;

            // Handle failed payment - downgrade user after 3 failed attempts
            const customerId = invoice.customer as string;
            const user = await findUserByStripeCustomerId(customerId);
            
            if (user) {
                // Get subscription to check payment history
                const subscriptionId = invoice.subscription as string;
                if (subscriptionId) {
                    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
                    
                    // Check if this is the final failed payment (Stripe usually tries 3 times)
                    if (subscription.status === "past_due") {
                        // Downgrade user to free
                        await updateUserSubscription(
                            user.uid,
                            "free",
                            customerId,
                            subscriptionId,
                            "past_due"
                        );
                        console.log(`Downgraded user ${user.uid} to free after payment failure for subscription ${subscriptionId}`);
                    } else {
                        console.log(`Payment failed for invoice ${invoice.id}, subscription status: ${subscription.status}`);
                    }
                }
            } else {
                console.warn(`No user found for customer ID: ${customerId} for failed payment`);
            }
            break;
        }

        default:
            console.log(`Unhandled event type: ${event.type}`);
    }
}
