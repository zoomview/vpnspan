import type { Metadata } from "next";
import localFont from "next/font/local";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "VPNSpan — Honest VPN Reviews & Comparisons",
    template: "%s | VPNSpan",
  },
  description:
    "Independent VPN reviews and comparisons. We test speed, streaming support, and security so you can find the VPN that actually works for you.",
  keywords: [
    "VPN",
    "VPN review",
    "VPN comparison",
    "best VPN",
    "Surfshark",
    "NordVPN",
    "ExpressVPN",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "VPNSpan",
    url: "https://vpnspan.com",
    title: "VPNSpan — Honest VPN Reviews & Comparisons",
    description:
      "Independent VPN reviews and comparisons. We test speed, streaming, and security so you can find the VPN that works for you.",
  },
  twitter: {
    card: "summary_large_image",
    title: "VPNSpan — Honest VPN Reviews & Comparisons",
    description:
      "Independent VPN reviews and comparisons. We test speed, streaming, and security so you can find the VPN that works for you.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
