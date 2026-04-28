import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Pharos Pulse | Live Ecosystem Dashboard",
  description: "Track every major app, wallet trend, and ecosystem signal on Pharos mainnet in real time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-pharos-bg">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}