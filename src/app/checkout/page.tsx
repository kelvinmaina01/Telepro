"use client";

import React from "react";
import Link from "next/link";

export default function CheckoutPage() {
  return (
    <div className="bg-black min-h-screen text-white flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500/20 rounded-full mb-8 border border-emerald-500/30">
          <span className="text-3xl">🎉</span>
        </div>
        
        <h1 className="text-4xl font-normal tracking-tighter lowercase mb-4">
          TelePro is Completely Free!
        </h1>
        
        <p className="text-zinc-400 lowercase mb-8">
          Good news! TelePro is now completely free with no payments required.
        </p>
        
        <div className="bg-white/5 rounded-2xl p-6 mb-8 border border-white/10">
          <div className="text-center mb-6">
            <div className="text-5xl mb-2">🎁</div>
            <h2 className="text-2xl font-bold mb-2">No Payment Required</h2>
            <p className="text-zinc-400 mb-4">
              TelePro is now completely free to use with all features unlocked!
            </p>
          </div>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <span className="text-emerald-400">✓</span>
              </div>
              <span>Unlimited recordings</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <span className="text-emerald-400">✓</span>
              </div>
              <span>All features unlocked</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <span className="text-emerald-400">✓</span>
              </div>
              <span>No watermarks or limits</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <Link 
            href="/prompter"
            className="block w-full py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-medium rounded-2xl hover:opacity-90 transition-all duration-300 text-center"
          >
            Start Using TelePro Free
          </Link>
          
          <p className="text-sm text-zinc-500 mt-4">
            TelePro is now completely free with all features included. No payments, no subscriptions.
          </p>
        </div>
        
        <div className="mt-8 pt-6 border-t border-white/10">
          <p className="text-sm text-zinc-500 mb-4">
            Want to support TelePro development?
          </p>
          <a 
            href="https://ko-fi.com/kelvinmaina01" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-600 text-white rounded-2xl font-medium hover:opacity-90 transition-all duration-300"
          >
            <span>☕ Support on Ko-fi</span>
          </a>
        </div>
      </div>
    </div>
  );
}