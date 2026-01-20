"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { useSectionInView } from "@/lib/hooks";
import { sendEmail } from "@/actions/sendEmail";
import SubmitBtn from "./submit-btn";
import toast from "react-hot-toast";

export default function Contact() {
  const { ref } = useSectionInView("Contact");

  return (
    <section
      id="contact"
      ref={ref}
      className="mb-20 sm:mb-28 w-[min(100%,42rem)] mx-auto px-4"
      style={{ animation: 'fadeSlideUp 0.5s ease-out both' }}
    >
      <SectionHeading>Contact me</SectionHeading>

      {/* Gradient border wrapper */}
      <div className="p-[1px] rounded-2xl bg-gradient-to-br from-purple-200/50 via-transparent to-pink-200/50 dark:from-purple-500/20 dark:via-transparent dark:to-pink-500/20">
        <div className="bg-white/70 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-black/[0.03] dark:border-white/[0.05] p-6 sm:p-8 shadow-sm">
          {/* Subtitle */}
          <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
            Reach out directly at{" "}
            <a
              className="text-purple-600 dark:text-purple-400 hover:underline font-medium"
              href="mailto:ajjubhamre@icloud.com"
            >
              ajjubhamre@icloud.com
            </a>{" "}
            or use the form below.
          </p>

          <form
            className="flex flex-col gap-4"
            action={async (formData) => {
              const { error } = await sendEmail(formData);

              if (error) {
                toast.error(error);
                return;
              }

              toast.success("Email sent successfully!");
            }}
          >
            {/* Name input */}
            <div className="relative">
              <input
                className="w-full h-12 px-4 rounded-xl bg-white/60 dark:bg-white/5 border border-black/5 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-500/50 focus:border-transparent transition-all"
                name="senderName"
                type="text"
                required
                maxLength={100}
                placeholder="Your name"
              />
            </div>

            {/* Email input */}
            <div className="relative">
              <input
                className="w-full h-12 px-4 rounded-xl bg-white/60 dark:bg-white/5 border border-black/5 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-500/50 focus:border-transparent transition-all"
                name="senderEmail"
                type="email"
                required
                maxLength={500}
                placeholder="Your email"
              />
            </div>

            {/* Honeypot field - hidden from users, bots will fill it */}
            <input
              type="text"
              name="honeypot"
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            {/* Message textarea */}
            <div className="relative">
              <textarea
                className="w-full h-40 p-4 rounded-xl bg-white/60 dark:bg-white/5 border border-black/5 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-500/50 focus:border-transparent transition-all resize-none"
                name="message"
                placeholder="Your message"
                required
                maxLength={5000}
              />
            </div>

            {/* Submit button */}
            <div className="flex justify-center mt-2">
              <SubmitBtn />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
