import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
<link
  href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300&display=swap"
  rel="stylesheet"
/>

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ailes Global | Visa automation for global travelers",
  description:
    "Ailes Global helps travelers apply for Schengen visas with guided intake, secure document handling, and localized payments.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  metadataBase: new URL("https://ailesglobal.com"),
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Schengen visa",
    "visa application",
    "travel requirements",
    "visa assistance",
    "Europe visa",
    "Ailes Global",
  ],
  openGraph: {
    title: "Ailes Global | Visa automation for global travelers",
    description:
      "Ailes Global helps travelers apply for Schengen visas with guided intake, secure document handling, and localized payments.",
    type: "website",
    url: "https://ailesglobal.com",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Ailes Global | Visa automation for global travelers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ailes Global | Visa automation for global travelers",
    description:
      "Ailes Global helps travelers apply for Schengen visas with guided intake, secure document handling, and localized payments.",
    images: [
      "/og-image.svg"
    ]
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
        <meta property="og:title" content="Ailes Global | Visa automation for global travelers" />
        <meta property="og:description" content="Ailes Global helps travelers apply for Schengen visas with guided intake, secure document handling, and localized payments." />
        <meta property="og:image" content="/og-image.svg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ailesglobal.com" />
      </head>
      <body className="min-h-full flex flex-col bg-[#0B1324] text-white">
        {children}
      </body>
    </html>
  );
}
