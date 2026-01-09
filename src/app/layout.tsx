import type { Metadata, Viewport } from "next";
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
  title: "CueFlow",
  description: "Free online teleprompter with camera recording, adjustable speed, customizable text, and mirror mode. Perfect for video creators, presenters, and content creators.",
  keywords: ["teleprompter", "online teleprompter", "camera recording", "video recording", "cueflow", "prompter", "script reader", "video production", "content creation"],
  authors: [{ name: "harda.dev", url: "https://harda.dev" }],
  creator: "harda.dev",
  openGraph: {
    title: "CueFlow",
    description: "Free online teleprompter with camera recording, adjustable speed, and customizable text. Perfect for video creators and presenters.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "CueFlow",
    description: "Free online teleprompter with camera recording and customizable features",
    creator: "@hardaistee",
  },
  robots: "index, follow",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
