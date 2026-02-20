# Webhook Retry Scripts

This directory contains scripts for managing failed webhook events.

## `retry-failed-webhooks.js`

Automatically retries failed webhook events. Designed to be run as a cron job or scheduled task.

### Setup

1. Install dependencies:
   ```bash
   npm install firebase-admin axios
   ```

2. Create a Firebase service account key:
   - Go to Firebase Console > Project Settings > Service Accounts
   - Click "Generate New Private Key"
   - Save as `serviceAccountKey.json` in the project root (add to `.gitignore`!)

3. Set environment variables:
   ```bash
   export ADMIN_API_TOKEN=your_admin_token_here
   export NEXT_PUBLIC_BASE_URL=https://your-app.com
   ```

### Usage

Run manually:
```bash
node scripts/retry-failed-webhooks.js
```

Set up as a cron job (runs every hour):
```bash
0 * * * * cd /path/to/your/app && node scripts/retry-failed-webhooks.js
```

### Features

- Automatically retries failed webhook events
- Limits to 5 retry attempts per event
- Processes 10 events at a time
- Logs success/failure results

## API Endpoints

### `POST /api/webhooks/retry`
Manually retry a specific webhook event.

**Request:**
```json
{
  "eventId": "evt_123456789",
  "forceRetry": false
}
```

**Response:**
```json
{
  "success": true,
  "message": "Event reprocessed successfully",
  "eventId": "evt_123456789",
  "attempts": 2,
  "status": "completed"
}
```

### `GET /api/webhooks/retry`
Get information about the retry endpoint.

## Webhook Log Structure

Webhook logs are stored in Firestore under the `webhook_logs` collection:

```typescript
interface WebhookLog {
  eventId: string;           // Stripe event ID
  eventType: string;         // Event type (e.g., "checkout.session.completed")
  status: "pending" | "processing" | "completed" | "failed";
  attempts: number;          // Number of processing attempts
  lastAttempt: Date;         // Last attempt timestamp
  error?: string;            // Error message (if failed)
  metadata?: Record<string, any>; // Additional metadata
}
```