"use client";

import Link from "next/link";
import Image from "next/image";
import { Orbitron } from "next/font/google";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";

const people = [
  { id: 1, name: "Mohammed Osman", designation: "Developer", image: "team/osman.JPG" },
  { id: 2, name: "Abdul Moid", designation: "Developer", image: "/SMCLogo.png" },
];

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/blogs", label: "Blogs" },
  { href: "/team", label: "Team" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
  { href: "/join", label: "Become a Member" },
];

export default function Footer() {
  return (
    <footer
      className={`${orbitron.className} relative z-40 mt-8 border-t border-white/10 bg-black/70 backdrop-blur-lg`}
    >
      {/* Tightened padding and grid gap */}
      <div className="mx-auto max-w-7xl px-6 py-8 grid gap-6 md:grid-cols-3">
        {/* Left: Logo + tagline + socials */}
        <div>
          <Link href="/" className="inline-flex items-center">
            <Image
              src="/SMCLogo.png"
              alt="SMC Logo"
              width={140}
              height={140}
              className="h-10 w-auto md:h-12"
              priority
            />
          </Link>

          <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/70">
            Dream. Dedicate. Develop. — Building ideas into reality with passion and precision.
          </p>

          {/* Socials under description, smaller + tighter */}
          <div className="mt-3 flex items-center gap-3 text-white/70">
            <Link href="#" aria-label="Instagram" className="hover:text-blue-400 transition-colors">
              <Instagram size={18} />
            </Link>
            <Link href="#" aria-label="Twitter/X" className="hover:text-blue-400 transition-colors">
              <Twitter size={18} />
            </Link>
            <Link href="#" aria-label="Facebook" className="hover:text-blue-400 transition-colors">
              <Facebook size={18} />
            </Link>
            <Link href="#" aria-label="LinkedIn" className="hover:text-blue-400 transition-colors">
              <Linkedin size={18} />
            </Link>
          </div>
        </div>

        {/* Middle: Quick Links (2 columns, compact) */}
        <div>
          <h4
            className="relative w-fit mb-2 text-sm font-semibold text-white/90
                       after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-full after:bg-blue-500"
          >
            Quick Links
          </h4>
          <div className="grid grid-cols-2 gap-x-6 gap-y-1 max-w-sm">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/80 hover:text-blue-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right: Location (blue underline) */}
        <div>
          <h4
            className="relative w-fit mb-2 text-sm font-semibold text-white/90
                       after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-full after:bg-blue-500"
          >
            Location
          </h4>
          <address className="not-italic text-sm leading-relaxed text-white/75">
            MJCET<br />
            Mount Pleasant, 8-2-249,<br />
            Road No. 3, Banjara Hills,<br />
            Hyderabad, Telangana 500034
          </address>

          <div className="mt-2">
            <Link
              href="https://www.google.com/maps/search/?api=1&query=MJCET+Banjara+Hills+Hyderabad+Telangana+500034"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
            >
              View on Google Maps →
            </Link>
          </div>
        </div>
      </div>

      {/* Developers row inline with tooltips, smaller + tighter */}
      <div className="mt-4 flex items-center justify-center gap-3">
        <span
          className="relative text-sm font-semibold text-white/90
                     after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-full after:bg-blue-500"
        >
          Developers :
        </span>
        <div className="flex flex-row gap-2 scale-90">
          <AnimatedTooltip items={people} />
        </div>
      </div>

      {/* Bottom line, less padding */}
      <div className="mt-3 border-t border-white/10 py-3 text-center text-xs text-white/50">
        © {new Date().getFullYear()} IEEE SMC MJCET. All rights reserved.
      </div>
    </footer>
  );
}
