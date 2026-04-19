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
    icon: "/globe.svg",
    shortcut: "/globe.svg",
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
  },
  twitter: {
    card: "summary_large_image",
    title: "Ailes Global | Visa automation for global travelers",
    description:
      "Ailes Global helps travelers apply for Schengen visas with guided intake, secure document handling, and localized payments.",
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
      <body className="min-h-full flex flex-col bg-[#0B1324] text-white">
        {children}
      </body>
    </html>
  );
}
