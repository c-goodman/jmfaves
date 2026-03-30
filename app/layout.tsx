import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "NHL Favorites Today (Odds & Win %) | Jersey Mike's Points Game Helper",
  description:
    "See today's NHL favorites ranked by odds and win probability. Built for the Jersey Mike's Shore Points hockey promotion to quickly find the best picks updated daily.",
  keywords: [
    "NHL favorites today",
    "NHL odds today",
    "NHL win probability",
    "NHL moneyline odds",
    "NHL money line odds",
    "Jersey Mike's hockey promotion",
    "Jersey Mike's points game NHL",
    "NHL picks today",
    "NHL betting odds ESPN",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
