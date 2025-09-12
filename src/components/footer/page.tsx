"use client";

import Link from "next/link";
import Image from "next/image";
import { Orbitron } from "next/font/google";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

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
      className={`${orbitron.className} relative z-40 mt-16 border-t border-white/10 
                  bg-black/70 backdrop-blur-lg`}
    >
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-start md:justify-between">
        {/* Left: Logo + tagline */}
        <div className="flex flex-col items-start md:items-start">
          <Image
            src="/SMCLogo.png"
            alt="SMC Logo"
            width={200}
            height={125}
          />
          <p className="mt-3 max-w-xs text-sm text-white/70">
            Dream. Dedicate. Develop. — Building ideas into reality with passion and precision.
          </p>
        </div>

        {/* Middle: Quick Links */}
        <div className="mt-10 grid grid-cols-2 gap-6 text-sm md:mt-0 md:grid-cols-3">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white/80 hover:text-blue-400 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right: Socials */}
        <div className="mt-10 flex space-x-6 md:mt-0">
          <Link
            href="#"
            className="text-white/70 hover:text-blue-400 transition-colors"
            aria-label="Instagram"
          >
            <Instagram size={20} />
          </Link>
          <Link
            href="#"
            className="text-white/70 hover:text-blue-400 transition-colors"
            aria-label="Twitter"
          >
            <Twitter size={20} />
          </Link>
          <Link
            href="#"
            className="text-white/70 hover:text-blue-400 transition-colors"
            aria-label="Facebook"
          >
            <Facebook size={20} />
          </Link>
          <Link
            href="#"
            className="text-white/70 hover:text-blue-400 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </Link>
        </div>
      </div>

      {/* Bottom line */}
      <div className="mt-8 border-t border-white/10 py-6 text-center text-xs text-white/50">
        © {new Date().getFullYear()} SMC MJ. All rights reserved.
      </div>
    </footer>
  );
}
