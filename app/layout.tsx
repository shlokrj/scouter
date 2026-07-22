import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");

  return {
    metadataBase: new URL(`${protocol}://${host}`),
    title: "Scouter — Internship Intelligence",
    description: "A company-first discovery engine for 2027 software, ML, and data internships.",
    openGraph: {
      title: "Scouter — Internship Intelligence",
      description: "See high-fit 2027 internships the moment they appear.",
      images: [{ url: "/og.png", width: 1733, height: 907, alt: "Scouter — See the signal before the crowd." }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Scouter — Internship Intelligence",
      description: "See high-fit 2027 internships the moment they appear.",
      images: ["/og.png"],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
