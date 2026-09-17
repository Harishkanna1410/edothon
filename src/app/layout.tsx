import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#08090d",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://edothon.dev"),
  title: "Edothon 2026 | 24-Hour Online Hackathon • Powered by Edobase",
  description:
    "Join Edothon — a 24-hour continuous online hackathon from October 17, 9:00 AM IST to October 18, 9:00 AM IST. Build high-concurrency realtime apps with Edobase, compete for ₹1,00,000+ in prizes and credits.",
  keywords: [
    "Edothon",
    "Edobase",
    "Hackathon",
    "Realtime Database",
    "Firebase Alternative",
    "24 Hour Hackathon",
    "Developer Event",
    "Online Hackathon India",
  ],
  authors: [{ name: "Edobase Core Team" }],
  creator: "Edobase",
  publisher: "Edobase Inc.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://edothon.dev",
    title: "Edothon 2026 | 24-Hour Continuous Realtime Hackathon",
    description:
      "Build the future with realtime power. ₹1,00,000+ prize pool. ₹200/team. October 17–18, 2026 IST.",
    siteName: "Edothon",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Edothon 2026 - 24-Hour Realtime Hackathon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Edothon 2026 | 24-Hour Online Hackathon",
    description:
      "Build with Edobase realtime platform. Compete for ₹1,00,000+ prizes. Oct 17-18, 2026 IST.",
    creator: "@edobase_io",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Syne:wght@700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#0c0e14] text-gray-100 antialiased selection:bg-[#9ae885] selection:text-black">
        {children}
      </body>
    </html>
  );
}
