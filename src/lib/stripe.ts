// Stripe is disabled since we're not monetizing
// These are dummy implementations to prevent build errors

export const STRIPE_PRICES = {
    monthly: "disabled",
    yearly: "disabled",
};

export const STRIPE_PRICING = {
    monthly: {
        amount: 0,
        currency: "usd",
        interval: "month",
    },
    yearly: {
        amount: 0,
        currency: "usd",
        interval: "year",
        savings: "0%",
    },
};

// Dummy stripe instance
export const stripe = {
    checkout: {
        sessions: {
            create: async () => {
                console.log("Stripe checkout is disabled - not monetizing");
                return { url: "/" };
            }
        }
    },
    billingPortal: {
        sessions: {
            create: async () => {
                console.log("Stripe billing portal is disabled - not monetizing");
                return { url: "/" };
            }
        }
    },
    subscriptions: {
        retrieve: async () => {
            console.log("Stripe subscription retrieval is disabled - not monetizing");
            return {
                status: "active",
                current_period_end: Date.now() / 1000 + 30 * 24 * 60 * 60, // 30 days from now
                cancel_at_period_end: false
            };
        }
    },
    customers: {
        create: async () => {
            console.log("Stripe customer creation is disabled - not monetizing");
            return { id: "demo-customer-id" };
        }
    },
    webhooks: {
        constructEvent: () => {
            console.log("Stripe webhook is disabled - not monetizing");
            return { type: "checkout.session.completed", data: { object: {} } };
        }
    }
};

// Create Stripe checkout session (dummy)
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
    console.log("Stripe checkout is disabled - not monetizing");
    return { url: successUrl };
}

// Create customer portal session (dummy)
export async function createPortalSession({
    customerId,
    returnUrl,
}: {
    customerId: string;
    returnUrl: string;
}) {
    console.log("Stripe portal is disabled - not monetizing");
    return { url: returnUrl };
}

// Get subscription status (dummy)
export async function getSubscriptionStatus(subscriptionId: string) {
    console.log("Stripe subscription status is disabled - not monetizing");
    return {
        status: "active",
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        cancelAtPeriodEnd: false,
    };
}
