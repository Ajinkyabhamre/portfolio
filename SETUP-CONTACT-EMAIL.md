# Contact Form Email Setup Guide

## Overview
This portfolio uses [Resend](https://resend.com) to handle contact form submissions securely.

## Prerequisites
- A Resend account (free tier available)
- Node.js environment for local development

## Setup Steps

### 1. Create a Resend Account
1. Go to [resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email address

### 2. Get Your API Key
1. Log into your Resend dashboard
2. Navigate to **API Keys** section
3. Click **Create API Key**
4. Give it a name (e.g., "Portfolio Contact Form")
5. Copy the generated API key (starts with `re_`)

### 3. Configure Local Environment
1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` and add your Resend API key:
   ```env
   RESEND_API_KEY=re_your_actual_api_key_here
   ```

3. The `.env.local` file is already in `.gitignore` and will **not** be committed to Git

### 4. Configure Email Recipient
The contact form currently sends emails to: **ajjubhamre@icloud.com**

To change this, edit `actions/sendEmail.ts` line 68:
```typescript
to: "your-email@example.com",
```

### 5. (Optional) Verify Your Domain
For production use with a custom "from" address:

1. Go to Resend Dashboard → **Domains**
2. Click **Add Domain**
3. Add your domain (e.g., `ajinkyabhamre.me`)
4. Add the provided DNS records to your domain registrar
5. Wait for verification (usually 1-24 hours)
6. Update `actions/sendEmail.ts` line 67:
   ```typescript
   from: "Contact Form <noreply@yourdomain.com>",
   ```

**Note:** The default `onboarding@resend.dev` address works for testing but has rate limits. Verifying your domain removes these restrictions.

## Features Implemented

### Spam Protection
- **Honeypot field**: Hidden field that bots typically fill out
- **Rate limiting**: Max 3 submissions per email address per hour (in-memory)
- **Server-side validation**: All inputs validated before sending

### Email Template
The contact form includes:
- Sender's name
- Sender's email (set as reply-to address)
- Message content
- Professional HTML email template using React Email

### Form Fields
- **Name** (required, max 100 characters)
- **Email** (required, max 500 characters)
- **Message** (required, max 5000 characters)

## Testing

### Local Testing
1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to the Contact section
3. Fill out and submit the form
4. Check your email inbox (ajjubhamre@icloud.com)

### Production Testing
1. Deploy to your hosting platform (Vercel, Netlify, etc.)
2. Add `RESEND_API_KEY` to your environment variables in the deployment settings
3. Test the live contact form

## Troubleshooting

### "Invalid API key" error
- Ensure your API key is correctly copied to `.env.local`
- Restart your development server after adding the environment variable

### "Too many submissions" error
- This is the rate limiter in action
- Wait 1 hour or restart your development server to reset the counter

### Emails not arriving
- Check your spam folder
- Verify the API key is valid
- Check Resend dashboard logs for delivery status
- Ensure the recipient email (ajjubhamre@icloud.com) is correct

### Rate limiting limitations
The current implementation uses in-memory rate limiting, which:
- ✅ Works well for small-to-medium traffic
- ✅ No database required
- ⚠️ Resets on server restart
- ⚠️ Doesn't work across multiple server instances

For production with high traffic, consider:
- Redis-based rate limiting
- Vercel KV or Upstash
- Database-backed tracking

## Security Best Practices

✅ **Implemented:**
- API key stored in environment variables (not committed to Git)
- Server-side validation
- Honeypot spam detection
- Rate limiting
- Reply-to field for secure sender identification

⚠️ **Consider adding (if needed):**
- CAPTCHA (reCAPTCHA, hCaptcha) for additional bot protection
- Email verification for senders
- IP-based rate limiting (requires hosting platform support)

## Cost
- **Resend Free Tier**: 3,000 emails/month
- **Pricing**: $20/month for 50,000 emails (if you exceed free tier)
- **Current usage**: Contact form submissions only (low volume)

## Support
- Resend Documentation: [resend.com/docs](https://resend.com/docs)
- Resend Support: support@resend.com
- Portfolio Issues: [Your GitHub repo issues]

## Summary
Your contact form is now configured to:
1. Accept submissions with name, email, and message
2. Validate inputs server-side
3. Protect against spam with honeypot and rate limiting
4. Send professional HTML emails via Resend
5. Set reply-to for easy responses

**Next steps:**
1. Add your Resend API key to `.env.local`
2. Test the form locally
3. Deploy with environment variable configured
4. (Optional) Verify your domain for custom from address
