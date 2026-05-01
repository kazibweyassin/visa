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
  title: "Ailes Global | Visa facilitation for African travelers",
  description:
    "End-to-end visa support built for East African passport holders. Expert-reviewed documents, local payments, human guidance.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  metadataBase: new URL("https://ailesglobal.com"),
  alternates: { canonical: "/" },
  keywords: [
    "Schengen visa",
    "visa application Uganda",
    "visa facilitation East Africa",
    "travel visa Africa",
    "Europe visa Uganda",
    "Ailes Global",
  ],
  openGraph: {
    title: "Ailes Global | Visa facilitation for African travelers",
    description:
      "End-to-end visa support built for East African passport holders.",
    type: "website",
    url: "https://ailesglobal.com",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Ailes Global" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ailes Global | Visa facilitation for African travelers",
    description: "End-to-end visa support built for East African passport holders.",
    images: ["/og-image.svg"],
  },
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
      <head>
        <meta name="google-site-verification" content="B5F8J-8NQ3r0YF3x2dErJQgFx10EfTtdDgmXQ5yPhRI" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Ailes Global | Visa facilitation for African travelers" />
        <meta property="og:description" content="End-to-end visa support built for East African passport holders." />
        <meta property="og:image" content="/og-image.svg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ailesglobal.com" />
      </head>
      <body
        className="min-h-full flex flex-col"
        style={{ background: "var(--bg)", color: "var(--text-2)" }}
      >
        {children}
      </body>
    </html>
  );
}