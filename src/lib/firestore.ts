import { doc, getDoc, setDoc, updateDoc, collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "./firebase";

// User subscription types
export type SubscriptionPlan = "free" | "pro";

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  plan: SubscriptionPlan;
  createdAt: Date;
  stripeCustomerId?: string;
  subscriptionId?: string;
  subscriptionStatus?: string; // Accept any string for Stripe statuses
}

// Get user profile from Firestore
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  try {
    // Check if db is a dummy object (demo mode)
    if (!db || Object.keys(db).length === 0) {
      console.log("Firestore is in demo mode - returning demo profile");
      return {
        uid,
        email: "demo@example.com",
        displayName: "Demo User",
        plan: "free" as SubscriptionPlan,
        createdAt: new Date(),
      };
    }
    
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      return userDoc.data() as UserProfile;
    }
    return null;
  } catch (error: any) {
    // If permission denied, return demo profile for testing
    if (error?.code === 'permission-denied' || error?.message?.includes('permission')) {
      console.log("Firestore permission denied - using demo profile for testing");
      return {
        uid,
        email: "demo@example.com",
        displayName: "Demo User",
        plan: "free" as SubscriptionPlan,
        createdAt: new Date(),
      };
    }
    console.error("Error fetching user profile:", error);
    return null;
  }
}

// Create user profile on signup
export async function createUserProfile(
  uid: string,
  email: string | null,
  displayName: string | null
): Promise<void> {
  try {
    // Check if db is a dummy object (demo mode)
    if (!db || Object.keys(db).length === 0) {
      console.log("Firestore is in demo mode - skipping profile creation");
      return;
    }
    
    const userProfile: UserProfile = {
      uid,
      email,
      displayName,
      plan: "free",
      createdAt: new Date(),
    };
    await setDoc(doc(db, "users", uid), userProfile);
  } catch (error: any) {
    // If permission denied, just log it and continue (demo mode)
    if (error?.code === 'permission-denied' || error?.message?.includes('permission')) {
      console.log("Firestore permission denied - skipping profile creation for demo");
      return;
    }
    console.error("Error creating user profile:", error);
    throw error;
  }
}

// Update user subscription
export async function updateUserSubscription(
  uid: string,
  plan: SubscriptionPlan,
  stripeCustomerId?: string,
  subscriptionId?: string,
  subscriptionStatus?: string
): Promise<void> {
  try {
    // Check if db is a dummy object (demo mode)
    if (!db || Object.keys(db).length === 0) {
      console.log("Firestore is in demo mode - skipping subscription update");
      return;
    }
    
    const updates: Partial<UserProfile> = {
      plan,
    };
    
    if (stripeCustomerId) updates.stripeCustomerId = stripeCustomerId;
    if (subscriptionId) updates.subscriptionId = subscriptionId;
    if (subscriptionStatus) updates.subscriptionStatus = subscriptionStatus;
    
    await updateDoc(doc(db, "users", uid), updates);
  } catch (error: any) {
    // If permission denied, just log it and continue (demo mode)
    if (error?.code === 'permission-denied' || error?.message?.includes('permission')) {
      console.log("Firestore permission denied - skipping subscription update for demo");
      return;
    }
    console.error("Error updating subscription:", error);
    throw error;
  }
}

// Check if user is Pro
export async function isUserPro(uid: string): Promise<boolean> {
  const profile = await getUserProfile(uid);
  return profile?.plan === "pro";
}

// Get current user ID
export function getCurrentUserId(): string | null {
  return auth.currentUser?.uid ?? null;
}

// Find user by Stripe customer ID
export async function findUserByStripeCustomerId(customerId: string): Promise<UserProfile | null> {
  try {
    // Check if db is a dummy object (demo mode)
    if (!db || Object.keys(db).length === 0) {
      console.log("Firestore is in demo mode - skipping user search");
      return null;
    }
    
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("stripeCustomerId", "==", customerId));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      return userDoc.data() as UserProfile;
    }
    return null;
  } catch (error: any) {
    // If permission denied, just return null (demo mode)
    if (error?.code === 'permission-denied' || error?.message?.includes('permission')) {
      console.log("Firestore permission denied - skipping user search for demo");
      return null;
    }
    console.error("Error finding user by Stripe customer ID:", error);
    return null;
  }
}

// Log webhook events for debugging and retry purposes
export interface WebhookLog {
  eventId: string;
  eventType: string;
  status: "pending" | "processing" | "completed" | "failed";
  attempts: number;
  lastAttempt: Date;
  error?: string;
  metadata?: Record<string, any>;
}

export async function logWebhookEvent(
  eventId: string,
  eventType: string,
  status: WebhookLog["status"],
  attempts: number = 1,
  error?: string,
  metadata?: Record<string, any>
): Promise<void> {
  try {
    // Check if db is a dummy object (demo mode)
    if (!db || Object.keys(db).length === 0) {
      console.log("Firestore is in demo mode - skipping webhook logging");
      return;
    }
    
    const log: WebhookLog = {
      eventId,
      eventType,
      status,
      attempts,
      lastAttempt: new Date(),
      error,
      metadata,
    };
    
    await setDoc(doc(db, "webhook_logs", eventId), log);
  } catch (error: any) {
    // If permission denied, just log it and continue (demo mode)
    if (error?.code === 'permission-denied' || error?.message?.includes('permission')) {
      console.log("Firestore permission denied - skipping webhook logging for demo");
      return;
    }
    console.error("Error logging webhook event:", error);
  }
}

// Get webhook log for retry
export async function getWebhookLog(eventId: string): Promise<WebhookLog | null> {
  try {
    // Check if db is a dummy object (demo mode)
    if (!db || Object.keys(db).length === 0) {
      console.log("Firestore is in demo mode - skipping webhook log fetch");
      return null;
    }
    
    const logDoc = await getDoc(doc(db, "webhook_logs", eventId));
    if (logDoc.exists()) {
      return logDoc.data() as WebhookLog;
    }
    return null;
  } catch (error: any) {
    // If permission denied, just return null (demo mode)
    if (error?.code === 'permission-denied' || error?.message?.includes('permission')) {
      console.log("Firestore permission denied - skipping webhook log fetch for demo");
      return null;
    }
    console.error("Error fetching webhook log:", error);
    return null;
  }
}
