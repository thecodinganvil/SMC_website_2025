import type { Metadata } from "next";
import "./globals.css";
import { Exo_2, Orbitron } from "next/font/google";

export const metadata: Metadata = {
  title: "IEEE SMC MJCET",
  description: "Made with love by Web Dev team : IEEE SMC MJCET",
};

const exo2 = Exo_2({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-exo2",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-orbitron", 
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${exo2.variable} ${orbitron.variable}`} >{children}</body>
    </html>
  );
}
