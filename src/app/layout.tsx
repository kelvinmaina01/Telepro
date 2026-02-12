import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

const baseUrl = "https://telepro.harda.dev";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "TelePro - Free Online Teleprompter",
    template: "%s | TelePro",
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
    "telepro",
    "prompter",
    "script reader",
    "video production",
    "content creation",
    "youtube teleprompter",
    "presentation tool",
    "speech prompter",
  ],
  applicationName: "TelePro",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "TelePro - Free Online Teleprompter",
    description: "Free online teleprompter with camera recording, adjustable speed, and customizable text. Perfect for video creators and presenters.",
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "TelePro",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "TelePro Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TelePro - Free Online Teleprompter",
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
  name: "TelePro",
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
        className={`${poppins.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
