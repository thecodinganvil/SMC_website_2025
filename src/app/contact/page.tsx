"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/libs/utils";
import { IconBrandGithub, IconBrandGoogle, IconMapPin } from "@tabler/icons-react";

export default function ContactUs() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: send to your API / form service
    console.log("Contact form submitted");
  };

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
            {/* Real-time location (embed) */}
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

        {/* Right: Contact Form (keeps your card styling vibe) */}
        <div className="shadow-input rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
          <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
            Send a message
          </h3>
          <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
            Fill out the form and we’ll get back to you shortly.
          </p>

          <form className="my-8" onSubmit={handleSubmit} noValidate>
            <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
              <LabelInputContainer>
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="Your full name" type="text" required />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" placeholder="you@example.com" type="email" required />
              </LabelInputContainer>
            </div>

            <LabelInputContainer className="mb-4">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" name="subject" placeholder="How can we help?" type="text" required />
            </LabelInputContainer>

            <LabelInputContainer className="mb-6">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" name="message" placeholder="Write your message here..." rows={6} required />
            </LabelInputContainer>

            <button
              className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
              type="submit"
              aria-label="Send message"
            >
              Send message →
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
