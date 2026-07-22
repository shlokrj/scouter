import type { Metadata } from "next";
import { Manrope, Space_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
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
    },
    twitter: {
      card: "summary",
      title: "Scouter — Internship Intelligence",
      description: "See high-fit 2027 internships the moment they appear.",
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${spaceMono.variable}`}>{children}</body>
    </html>
  );
}
