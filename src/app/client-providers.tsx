"use client";

import { FreeAnnouncement } from "@/components/FreeAnnouncement";

// Simplified wrapper component - no authentication needed
export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FreeAnnouncement />
      {children}
    </>
  );
}