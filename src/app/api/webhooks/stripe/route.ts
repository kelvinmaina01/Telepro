import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { updateUserSubscription, getUserProfile } from "@/lib/firestore";
import Stripe from "stripe";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

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

        // Handle the event
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
                // You might need to query Firestore to find the user
                const status = subscription.status;
                const subscriptionId = subscription.id;

                console.log(`Subscription ${subscriptionId} status: ${status}`);
                break;
            }

            case "customer.subscription.deleted": {
                const subscription = event.data.object as Stripe.Subscription;

                // Downgrade user to free when subscription is canceled
                // Find user by customer ID and update
                const customerId = subscription.customer as string;

                console.log(`Subscription ${subscription.id} canceled, downgrading user`);
                break;
            }

            case "invoice.payment_failed": {
                const invoice = event.data.object as Stripe.Invoice;

                // Handle failed payment
                console.log(`Payment failed for invoice ${invoice.id}`);
                break;
            }

            default:
                console.log(`Unhandled event type: ${event.type}`);
        }

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error("Webhook error:", error);
        return NextResponse.json(
            { error: "Webhook handler failed" },
            { status: 500 }
        );
    }
}
