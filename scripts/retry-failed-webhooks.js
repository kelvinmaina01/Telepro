#!/usr/bin/env node

/**
 * Script to automatically retry failed webhook events
 * Run this as a cron job or scheduled task
 */

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const axios = require('axios');

// Initialize Firebase Admin
const serviceAccount = require('../serviceAccountKey.json'); // You need to create this

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();
const ADMIN_TOKEN = process.env.ADMIN_API_TOKEN; // Set this in your environment

async function retryFailedWebhooks() {
  console.log('Checking for failed webhooks...');
  
  try {
    // Query failed webhook logs
    const webhookLogsRef = db.collection('webhook_logs');
    const snapshot = await webhookLogsRef
      .where('status', '==', 'failed')
      .where('attempts', '<', 5) // Don't retry more than 5 times
      .orderBy('lastAttempt', 'asc')
      .limit(10) // Process 10 at a time
      .get();

    if (snapshot.empty) {
      console.log('No failed webhooks found.');
      return;
    }

    console.log(`Found ${snapshot.size} failed webhooks to retry.`);

    const retryPromises = [];
    
    snapshot.forEach(doc => {
      const log = doc.data();
      console.log(`Retrying webhook ${log.eventId} (${log.eventType})...`);

      const retryPromise = axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/webhooks/retry`,
        {
          eventId: log.eventId,
          forceRetry: true
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ADMIN_TOKEN}`
          }
        }
      ).then(response => {
        console.log(`Successfully retried ${log.eventId}:`, response.data);
        return { success: true, eventId: log.eventId };
      }).catch(error => {
        console.error(`Failed to retry ${log.eventId}:`, error.message);
        return { success: false, eventId: log.eventId, error: error.message };
      });

      retryPromises.push(retryPromise);
    });

    const results = await Promise.all(retryPromises);
    
    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;
    
    console.log(`Retry summary: ${successful} successful, ${failed} failed.`);
    
  } catch (error) {
    console.error('Error retrying failed webhooks:', error);
    process.exit(1);
  }
}

// Run the function
retryFailedWebhooks().then(() => {
  console.log('Webhook retry script completed.');
  process.exit(0);
}).catch(error => {
  console.error('Script failed:', error);
  process.exit(1);
});