"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Orbitron } from "next/font/google";

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
];

// Normal link component with center-out underline
function NavLink({
  href,
  label,
  active,
  className = "",
}: {
  href: string;
  label: string;
  active: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`
        group relative inline-block select-none whitespace-nowrap px-2 py-1
        text-[0.95rem] tracking-wide transition-colors duration-200
        ${active ? "text-white hover:text-blue-300" : "text-white/90 hover:text-blue-300"} 
        ${className}
      `}
    >
      <span className="relative">
        {label}

        {/* underline grows from center */}
        <span
          className="pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-1
                     h-0.5 w-full max-w-full origin-center scale-x-0 rounded
                     bg-blue-400/80 transition-transform duration-300 group-hover:scale-x-100"
        />

        {/* small bulb glow under the middle */}
        <span
          className="pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-2
                     h-2 w-6 rounded-full bg-blue-500/55 blur-md opacity-0
                     transition duration-300 group-hover:opacity-100"
        />
      </span>
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [atTop, setAtTop] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const shell = atTop
    ? "bg-black/40 supports-[backdrop-filter]:bg-black/30 backdrop-blur-md"
    : "bg-black/60 supports-[backdrop-filter]:bg-black/50 backdrop-blur-lg";

  return (
    <header
      className={`${orbitron.className} fixed inset-x-0 top-0 z-50 ${shell}
                  border-b border-white/10 rounded-b-3xl shadow-[0_8px_24px_rgba(0,0,0,0.35)]`}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        {/* Left: Logo */}
        <Link href="/" aria-label="Home" className="flex items-center gap-2">
          <Image
            src="/SMCLogo.png"
            alt="SMC Logo"
            width={200}
            height={125}
            priority
          />
        </Link>

        {/* Right: links (CTA kept far right as a normal link) */}
        <div className="hidden md:flex flex-1 items-center justify-end">
          <div className="flex items-center gap-10">
            {LINKS.map((l) => (
              <NavLink key={l.href} {...l} active={pathname === l.href} />
            ))}

            {/* Become a Member: */}
            <NavLink
              href="/join"
              label="Become a Member"
              active={pathname === "/join"}
              className="ml-12"
            />
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-white/90 hover:text-white hover:bg-white/10 transition"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
      </nav>

      {/* Mobile Drawer */}
      {open && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div onClick={() => setOpen(false)} className="absolute inset-0 bg-black/70" />
          <div className="absolute right-0 top-0 h-full w-72 bg-black/90 backdrop-blur-md border-l border-white/10 rounded-l-2xl">
            <div className="flex items-center justify-between px-4 h-16 border-b border-white/10">
              <Image
                src="/SMCLogo.png"
                alt="SMC Logo"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="p-2 text-white/90 hover:text-white"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" strokeWidth="2" />
                </svg>
              </button>
            </div>

            <div className="px-4 py-4 flex flex-col space-y-1.5">
              {[...LINKS, { href: "/join", label: "Become a Member" }].map((l) => {
                const active = pathname === l.href;
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`rounded-lg px-3 py-2 text-base transition
                      ${active ? "text-white bg-white/5" : "text-white/90 hover:text-white hover:bg-white/5"}`}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}