"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

export default function LegalPage() {
    return (
        <div className="bg-black min-h-screen text-white selection:bg-white selection:text-black scroll-smooth">
            <Navbar />

            <main className="pt-40 pb-32 px-6">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-normal tracking-tighter text-white mb-16 lowercase">legal</h1>

                    <div className="space-y-20">
                        {/* Privacy Policy */}
                        <section id="privacy">
                            <h2 className="text-2xl font-normal text-white mb-8 lowercase">privacy policy</h2>
                            <div className="space-y-6 text-zinc-500 font-normal leading-relaxed lowercase">
                                <p>
                                    your privacy is important to us. this privacy policy explains how telepro ("we", "us", or "our") collects, uses, and protects your information when you use our website and teleprompter application.
                                </p>
                                <p>
                                    <strong>data collection:</strong> telepro is designed to be a browser-first application. most of your data, including your scripts and recordings, stays local to your browser. we do not store your scripts on our servers.
                                </p>
                                <p>
                                    <strong>cookies:</strong> we may use essential cookies to maintain your session and preferences. these are necessary for the application to function correctly.
                                </p>
                                <p>
                                    <strong>contact:</strong> for any questions regarding your privacy or to report a problem, please contact us at <a href="mailto:reportaproblem.telepro@gmail.com" className="text-white hover:underline">reportaproblem.telepro@gmail.com</a>.
                                </p>
                            </div>
                        </section>

                        {/* Terms of Service */}
                        <section id="terms">
                            <h2 className="text-2xl font-normal text-white mb-8 lowercase">terms of service</h2>
                            <div className="space-y-6 text-zinc-500 font-normal leading-relaxed lowercase">
                                <p>
                                    by using telepro, you agree to these terms of service. please read them carefully.
                                </p>
                                <p>
                                    <strong>usage:</strong> you agree to use telepro only for lawful purposes. you are responsible for any content you input into the application.
                                </p>
                                <p>
                                    <strong>disclaimer:</strong> telepro is provided "as is" without any warranties. we are not responsible for any data loss or recording failures that may occur during use.
                                </p>
                                <p>
                                    <strong>modifications:</strong> we reserve the right to modify these terms at any time. continued use of the application constitutes acceptance of the updated terms.
                                </p>
                            </div>
                        </section>
                    </div>

                    <div className="mt-20 pt-12 border-t border-white/5">
                        <Link href="/" className="text-white hover:text-zinc-400 transition-colors lowercase">
                            &larr; back to home
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
