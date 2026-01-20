"use server";

import React from "react";
import { Resend } from "resend";
import { validateString, getErrorMessage } from "@/lib/utils";
import ContactFormEmail from "@/email/contact-form-email";

const resend = new Resend(process.env.RESEND_API_KEY);

// Simple rate limiting (in-memory, resets on server restart)
const submissionTimestamps = new Map<string, number[]>();

export const sendEmail = async (formData: FormData) => {
  console.log("📧 Server action called - sendEmail");

  const senderName = formData.get("senderName");
  const senderEmail = formData.get("senderEmail");
  const message = formData.get("message");
  const honeypot = formData.get("honeypot"); // Bot trap field

  console.log("📝 Form data:", { senderName, senderEmail, messageLength: (message as string)?.length });

  // Bot detection - honeypot field should be empty
  if (honeypot) {
    console.log("🚫 Spam detected");
    return {
      error: "Spam detected",
    };
  }

  // Server-side validation
  if (!validateString(senderName, 100)) {
    return {
      error: "Invalid name",
    };
  }
  if (!validateString(senderEmail, 500)) {
    return {
      error: "Invalid email address",
    };
  }
  if (!validateString(message, 5000)) {
    return {
      error: "Invalid message",
    };
  }

  // Simple rate limiting: max 3 submissions per IP per hour
  const clientIp = senderEmail as string; // Use email as identifier
  const now = Date.now();
  const oneHour = 60 * 60 * 1000;

  if (!submissionTimestamps.has(clientIp)) {
    submissionTimestamps.set(clientIp, []);
  }

  const timestamps = submissionTimestamps.get(clientIp)!;
  const recentTimestamps = timestamps.filter((ts) => now - ts < oneHour);

  if (recentTimestamps.length >= 3) {
    return {
      error: "Too many submissions. Please try again later.",
    };
  }

  recentTimestamps.push(now);
  submissionTimestamps.set(clientIp, recentTimestamps);

  let data;
  try {
    console.log("📤 Attempting to send email via Resend API...");
    data = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: "ajjubhamre@icloud.com",
      subject: `Portfolio Contact: ${senderName}`,
      reply_to: senderEmail as string,
      react: ContactFormEmail({
        message: message as string,
        senderEmail: senderEmail as string,
        senderName: senderName as string,
      }) as React.ReactElement,
    });
    console.log("✅ Email sent successfully:", JSON.stringify(data, null, 2));

    // Check if there's an error in the response
    if (data.error) {
      console.error("❌ Resend API returned error:", data.error);
      return {
        error: data.error.message || "Failed to send email",
      };
    }
  } catch (error: unknown) {
    console.error("❌ Error sending email:", error);
    const errorMessage = getErrorMessage(error);
    console.error("❌ Error message:", errorMessage);
    return {
      error: errorMessage,
    };
  }

  return {
    data,
  };
};