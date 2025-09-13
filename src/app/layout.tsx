import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header/page";
import Footer from "@/components/footer/page";
import { Exo_2, Orbitron } from "next/font/google";

export const metadata: Metadata = {
  title: "IEEE SMC MJCET",
  description: "Made with love by Osman : IEEE SMC MJCET",
};

const exo2 = Exo_2({ subsets: ["latin"], display: "swap", variable: "--font-exo2" });
const orbitron = Orbitron({ subsets: ["latin"], display: "swap", variable: "--font-orbitron" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`min-h-screen flex flex-col bg-black text-white ${exo2.variable} ${orbitron.variable}`}>

        {/* Header */}
        <Header />

        
        <main className="flex-1 pt-20">{children}</main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
