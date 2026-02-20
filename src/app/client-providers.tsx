"use client";

import { AuthProvider } from "@/context/AuthContext";
import { SubscriptionProvider } from "@/context/SubscriptionContext";
import { useAuth } from "@/context/AuthContext";
import { FreeAnnouncement } from "@/components/FreeAnnouncement";

// Wrapper component that provides both auth and subscription contexts
export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <SubscriptionProviderWrapper>
        <FreeAnnouncement />
        {children}
      </SubscriptionProviderWrapper>
    </AuthProvider>
  );
}

// Separate component to use the useAuth hook
function SubscriptionProviderWrapper({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  
  return (
    <SubscriptionProvider user={user}>
      {children}
    </SubscriptionProvider>
  );
}