"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { User } from "firebase/auth";
import { getUserProfile, UserProfile, SubscriptionPlan } from "@/lib/firestore";

interface SubscriptionContextType {
  profile: UserProfile | null;
  loading: boolean;
  isPro: boolean;
  plan: SubscriptionPlan;
  refreshProfile: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider = ({ 
  children, 
  user 
}: { 
  children: React.ReactNode; 
  user: User | null;
}) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    try {
      const userProfile = await getUserProfile(user.uid);
      setProfile(userProfile);
    } catch (error) {
      console.error("Error fetching subscription profile:", error);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const isPro = profile?.plan === "pro";
  const plan = profile?.plan ?? "free";

  return (
    <SubscriptionContext.Provider 
      value={{ 
        profile, 
        loading, 
        isPro, 
        plan,
        refreshProfile: fetchProfile 
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error("useSubscription must be used within a SubscriptionProvider");
  }
  return context;
};
