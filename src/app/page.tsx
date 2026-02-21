import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { Pricing } from "@/components/landing/Pricing";
import { About } from "@/components/landing/About";
import { Footer } from "@/components/landing/Footer";
import { FreeAnnouncementInline } from "@/components/FreeAnnouncement";
import { VideoDemo } from "@/components/landing/VideoDemo";

export default function LandingPage() {
  return (
    <div className="bg-black min-h-screen text-white selection:bg-white selection:text-black scroll-smooth">
      <Navbar />
      <main>
        <Hero />
        <div className="max-w-7xl mx-auto px-6">
          <FreeAnnouncementInline />
        </div>
        <VideoDemo />
        <Features />
        <Pricing />
        <About />
      </main>
      <Footer />
    </div>
  );
}
