import Stripe from "stripe";

// Stripe pricing IDs from your payment.md
// Monthly: $4.99/mo, Yearly: $35.88/yr (billed annually - 40% discount)
export const STRIPE_PRICES = {
    monthly: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID || "price_monthly_placeholder",
    yearly: process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID || "price_yearly_placeholder",
};

export const STRIPE_PRICING = {
    monthly: {
        amount: 4.99,
        currency: "usd",
        interval: "month",
    },
    yearly: {
        amount: 35.88,
        currency: "usd",
        interval: "year",
        savings: "40%",
    },
};

// Server-side Stripe instance
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2024-11-20.acacia", // Stable API version
    maxNetworkRetries: 3,
    timeout: 15000,
});

// Create Stripe checkout session
export async function createCheckoutSession({
    priceId,
    customerId,
    userId,
    successUrl,
    cancelUrl,
}: {
    priceId: string;
    customerId?: string;
    userId: string;
    successUrl: string;
    cancelUrl: string;
}) {
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
    });

    return session;
}

// Create customer portal session
export async function createPortalSession({
    customerId,
    returnUrl,
}: {
    customerId: string;
    returnUrl: string;
}) {
    const session = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: returnUrl,
    });

    return session;
}

// Get subscription status
export async function getSubscriptionStatus(subscriptionId: string) {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    return {
        status: subscription.status,
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
    };
}
