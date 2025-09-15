"use client";

import React from "react";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/libs/utils";
import { IconMapPin } from "@tabler/icons-react";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { PostgrestError } from "@supabase/supabase-js";

/* ── Supabase (safe create + env guard) ─────────────────────────────────── */
const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

function safeCreateSupabase(): SupabaseClient | null {
  try {
    if (!rawUrl || !anonKey) return null;
    const url = new URL(rawUrl).toString(); // avoids "Invalid URL" during prerender
    return createClient(url, anonKey);
  } catch {
    return null;
  }
}
const supabase = safeCreateSupabase();
const envOk = Boolean(supabase);
/* ───────────────────────────────────────────────────────────────────────── */

/* ── Types & helpers (top-level, no `any`) ──────────────────────────────── */
type FormData = {
  name: string;
  mail: string;
  subject: string;
  message: string; // if your table uses `location`, rename here + payload
};

type ErrorLike = { message?: string; error_description?: string; hint?: string };

function isErrorLike(x: unknown): x is ErrorLike {
  return typeof x === "object" && x !== null &&
    ("message" in x || "error_description" in x || "hint" in x);
}

function getErrorMessage(err: unknown): string {
  return isErrorLike(err)
    ? (err.message ?? err.error_description ?? err.hint ?? "Submission failed.")
    : "Submission failed.";
}

function formatPostgrestError(e: PostgrestError): string {
  return [e.message, e.details, e.hint, e.code].filter(Boolean).join(" — ") || "Submission failed.";
}
/* ───────────────────────────────────────────────────────────────────────── */

export default function ContactUs() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    mail: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);
    setSubmitted(false);

    if (!formData.name.trim() || !formData.mail.trim()) {
      setErrorMsg("Please fill in name and email.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.mail.trim())) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    if (!supabase) {
      setErrorMsg(
        "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your hosting environment."
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        name: formData.name.trim(),
        mail: formData.mail.trim(),
        subject: formData.subject.trim() || null,
        message: formData.message.trim() || null, // change to `location` if that's your column
      };

      // No `.select()` to avoid unused `data` warning; add it if you need the new id
      const { error } = await supabase.from("ieeesmc2025").insert([payload]);

      if (error) {
        setErrorMsg(formatPostgrestError(error));
        return;
      }

      setSubmitted(true);
      setFormData({ name: "", mail: "", subject: "", message: "" });
    } catch (err: unknown) {
      setErrorMsg(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  /* Env guard — black/blue */
  if (!envOk) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <div className="max-w-lg w-full rounded-xl border border-blue-400/30 bg-blue-50 p-6 text-blue-900">
          <h2 className="text-xl font-semibold mb-2">Configuration required</h2>
          <p className="mb-2">
            Supabase isn’t configured. Set{" "}
            <code className="mx-1 px-1 bg-blue-100 rounded">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
            <code className="mx-1 px-1 bg-blue-100 rounded">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>{" "}
            in your environment, then redeploy.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 md:py-16">
      <div className="mb-8 text-center md:mb-12">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 md:text-4xl">
          Contact Us
        </h2>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          We usually reply within 24 hours. You can also reach us via the address below.
        </p>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Left: Address + Live Map */}
        <div className="rounded-2xl border border-white/10 bg-white p-5 shadow-sm dark:bg-black">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 rounded-full bg-neutral-100 p-2 dark:bg-neutral-900">
              <IconMapPin className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                MJCET
              </h3>
              <address className="not-italic text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                Mount Pleasant, 8-2-249,
                <br />
                Road No. 3, Banjara Hills,
                <br />
                Hyderabad, Telangana 500034
              </address>
            </div>
          </div>

          <div className="mt-5 overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
            <iframe
              title="MJCET Location Map"
              src="https://www.google.com/maps?q=Muffakham+Jah+College+of+Engineering+and+Technology,+Mount+Pleasant,+8-2-249,+Road+No.+3,+Banjara+Hills,+Hyderabad,+Telangana+500034&output=embed"
              className="h-72 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              aria-label="Live map showing the location of MJCET"
            />
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="shadow-input rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
          <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
            Send a message
          </h3>
          <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
            Fill out the form and we’ll get back to you shortly.
          </p>

          {/* Alerts */}
          {errorMsg && (
            <div className="mt-4 rounded-md border border-red-300/40 bg-red-50 p-3 text-sm text-red-800">
              {errorMsg}
            </div>
          )}
          {submitted && !errorMsg && (
            <div className="mt-4 rounded-md border border-emerald-300/40 bg-emerald-50 p-3 text-sm text-emerald-800">
              Thank you! Your message has been sent.
            </div>
          )}

          <form className="my-8" onSubmit={handleSubmit} noValidate>
            <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
              <LabelInputContainer>
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="mail">Email</Label>
                <Input
                  type="email"
                  id="mail"
                  name="mail"
                  value={formData.mail}
                  onChange={handleChange}
                  placeholder="yourmail@gmail.com"
                  required
                />
              </LabelInputContainer>
            </div>

            <LabelInputContainer className="mb-4">
              <Label htmlFor="subject">Subject</Label>
              <Input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="How can we help?"
              />
            </LabelInputContainer>

            <LabelInputContainer className="mb-6">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                rows={4}
              />
            </LabelInputContainer>

            <button
              className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
              type="submit"
              aria-label="Send message"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send message →"}
              <BottomGradient />
            </button>

            <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
          </form>
        </div>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn("flex w-full flex-col space-y-2", className)}>{children}</div>;
};

function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none ring-0 transition",
        "focus:border-neutral-300 dark:text-neutral-50 dark:placeholder:text-neutral-500",
        "dark:border-neutral-800 dark:bg-neutral-950",
        className
      )}
      {...props}
    />
  );
}
