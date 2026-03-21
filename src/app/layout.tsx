import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tokenomics Calculator | @samdevrel",
  description: "Analyze token distribution, supply models, and economic incentives with interactive calculator.",
  keywords: ["tokenomics", "crypto economics", "distribution", "inflation", "staking", "apy"],
  authors: [{ name: "Sam", url: "https://x.com/samdevrel" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
