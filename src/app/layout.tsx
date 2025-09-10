import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IEEE SMC MJCET",
  description: "Made with love by Web Dev team : IEEE SMC MJCET",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        
        {children}
      </body>
    </html>
  );
}
