"use client";

import React, { useState, useEffect } from "react";

interface WebhookLog {
  eventId: string;
  eventType: string;
  status: "pending" | "processing" | "completed" | "failed";
  attempts: number;
  lastAttempt: string;
  error?: string;
  metadata?: Record<string, any>;
}

export default function WebhookRetryPanel() {
  const [logs, setLogs] = useState<WebhookLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [retrying, setRetrying] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      // In a real implementation, you would fetch from your API
      // For now, we'll use mock data
      const mockLogs: WebhookLog[] = [
        {
          eventId: "evt_123",
          eventType: "checkout.session.completed",
          status: "completed",
          attempts: 1,
          lastAttempt: new Date().toISOString(),
        },
        {
          eventId: "evt_456",
          eventType: "invoice.payment_failed",
          status: "failed",
          attempts: 3,
          lastAttempt: new Date(Date.now() - 3600000).toISOString(),
          error: "Database connection timeout",
        },
      ];
      setLogs(mockLogs);
    } catch (err) {
      setError("Failed to fetch webhook logs");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const retryEvent = async (eventId: string) => {
    try {
      setRetrying(eventId);
      setError(null);

      // In a real implementation, you would call your retry API
      const response = await fetch("/api/webhooks/retry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("admin_token")}`,
        },
        body: JSON.stringify({ eventId }),
      });

      if (!response.ok) {
        throw new Error("Failed to retry event");
      }

      // Refresh logs
      await fetchLogs();
    } catch (err) {
      setError(`Failed to retry event: ${(err as Error).message}`);
    } finally {
      setRetrying(null);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const getStatusColor = (status: WebhookLog["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "pending":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Webhook Retry Panel</h2>
        <button
          onClick={fetchLogs}
          className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Refresh
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Event ID
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Attempts
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Attempt
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {logs.map((log) => (
              <tr key={log.eventId}>
                <td className="px-4 py-2 text-sm font-mono">
                  {log.eventId.substring(0, 8)}...
                </td>
                <td className="px-4 py-2 text-sm">{log.eventType}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(log.status)}`}
                  >
                    {log.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-sm">{log.attempts}</td>
                <td className="px-4 py-2 text-sm">
                  {new Date(log.lastAttempt).toLocaleString()}
                </td>
                <td className="px-4 py-2">
                  {log.status === "failed" && (
                    <button
                      onClick={() => retryEvent(log.eventId)}
                      disabled={retrying === log.eventId}
                      className={`px-3 py-1 text-sm rounded ${
                        retrying === log.eventId
                          ? "bg-gray-300 text-gray-500"
                          : "bg-orange-500 text-white hover:bg-orange-600"
                      }`}
                    >
                      {retrying === log.eventId ? "Retrying..." : "Retry"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {logs.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No webhook logs found
        </div>
      )}

      <div className="mt-4 text-sm text-gray-600">
        <p className="font-medium">Status Legend:</p>
        <div className="flex flex-wrap gap-2 mt-1">
          <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
            Completed
          </span>
          <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
            Failed
          </span>
          <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
            Processing
          </span>
          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
            Pending
          </span>
        </div>
      </div>
    </div>
  );
}