import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const viewport: Viewport = {
  themeColor: "#0a0e14",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "GitHub Trend Pulse | Real-Time Repository Analytics",
  description:
    "Discover top trending GitHub repositories with true follower counts. Deep fetch analytics bypassing API limitations for accurate engagement metrics.",
  keywords: [
    "GitHub",
    "trending repositories",
    "developer tools",
    "open source",
    "analytics",
  ],
  authors: [{ name: "Trend Pulse" }],
  openGraph: {
    title: "GitHub Trend Pulse",
    description: "Real-time trending repository analytics with true follower counts",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
