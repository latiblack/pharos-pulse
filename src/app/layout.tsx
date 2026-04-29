import type { Metadata } from "next";
import "./globals.css";

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
    <body className="min-h-screen text-white grid-pattern">
      {children}
    </body>
    </html>
  );
}