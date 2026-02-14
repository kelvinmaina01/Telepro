# Payment & Subscription Rules

## Free Tier Limits
- **Script Length**: Maximum 1,500 words per script for free accounts.
- **Recording Duration**: Downloads are free for videos **up to 30 minutes**. Videos longer than 30 minutes require a pro subscription.
- **Camera Devices**: Free access to **Default** and **OBS** cameras. **DroidCam** is a pro-only feature.

## Pricing
- **Monthly Subscription**: **$4.99 / month**
- **Yearly Subscription**: **$2.99 / month** (Billed annually at $35.88 - **Save 40%**)

## Word Count Calculation
Based on average speaking speed of 140 words per minute:
- 30 minutes = 4,200 words maximum
- Free tier: 1,500 words (allows ~10 minutes of content)
- Pro tier: Unlimited

## Implementation Status
- [x] Implement character/word count enforcement in the Editor.
- [x] Add "Upgrade to Pro" checkout flow.
- [x] User profile creation on signup
- [x] Subscription status tracking in Firestore
- [x] Recording duration limit enforcement
