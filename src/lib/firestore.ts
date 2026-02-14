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
  subscriptionStatus?: "active" | "canceled" | "past_due" | "trialing";
}

// Get user profile from Firestore
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      return userDoc.data() as UserProfile;
    }
    return null;
  } catch (error) {
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
    const userProfile: UserProfile = {
      uid,
      email,
      displayName,
      plan: "free",
      createdAt: new Date(),
    };
    await setDoc(doc(db, "users", uid), userProfile);
  } catch (error) {
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
  subscriptionStatus?: "active" | "canceled" | "past_due" | "trialing"
): Promise<void> {
  try {
    const updates: Partial<UserProfile> = {
      plan,
    };
    
    if (stripeCustomerId) updates.stripeCustomerId = stripeCustomerId;
    if (subscriptionId) updates.subscriptionId = subscriptionId;
    if (subscriptionStatus) updates.subscriptionStatus = subscriptionStatus;
    
    await updateDoc(doc(db, "users", uid), updates);
  } catch (error) {
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
