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

const baseUrl = "https://cueflow.harda.dev";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "CueFlow - Free Online Teleprompter",
    template: "%s | CueFlow",
  },
  description: "Free online teleprompter with camera recording, adjustable scrolling speed, customizable text, and mirror mode. Perfect for video creators, YouTubers, presenters, and content creators. No signup required.",
  keywords: [
    "teleprompter",
    "online teleprompter",
    "free teleprompter",
    "web teleprompter",
    "browser teleprompter",
    "camera recording",
    "video recording",
    "cueflow",
    "prompter",
    "script reader",
    "video production",
    "content creation",
    "youtube teleprompter",
    "presentation tool",
    "speech prompter",
  ],
  authors: [{ name: "harda.dev", url: "https://harda.dev" }],
  creator: "harda.dev",
  publisher: "harda.dev",
  applicationName: "CueFlow",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "CueFlow - Free Online Teleprompter",
    description: "Free online teleprompter with camera recording, adjustable speed, and customizable text. Perfect for video creators and presenters.",
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "CueFlow",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "CueFlow Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CueFlow - Free Online Teleprompter",
    description: "Free online teleprompter with camera recording and customizable features. No signup required.",
    creator: "@hardaistee",
    images: ["/icon.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
    shortcut: "/icon.png",
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: baseUrl,
  },
  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#000000" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "CueFlow",
  description: "Free online teleprompter with camera recording, adjustable scrolling speed, customizable text, and mirror mode.",
  url: baseUrl,
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript. Requires HTML5.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  author: {
    "@type": "Person",
    name: "harda.dev",
    url: "https://harda.dev",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    ratingCount: "1",
  },
  featureList: [
    "Online teleprompter",
    "Camera recording",
    "Adjustable scrolling speed",
    "Customizable font size",
    "Text color customization",
    "Mirror mode",
    "Countdown timer",
    "No signup required",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
