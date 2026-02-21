"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

// Cartoon character SVG for announcement
const CartoonAnnouncer = () => (
  <svg className="w-16 h-16" viewBox="0 0 200 200" fill="none">
    {/* Character body */}
    <circle cx="100" cy="100" r="40" fill="#4F46E5" />
    
    {/* Happy face */}
    <circle cx="85" cy="90" r="8" fill="white" />
    <circle cx="115" cy="90" r="8" fill="white" />
    <circle cx="85" cy="90" r="4" fill="#1F2937" />
    <circle cx="115" cy="90" r="4" fill="#1F2937" />
    
    {/* Smiling mouth */}
    <path d="M85 120 Q100 135 115 120" stroke="white" strokeWidth="6" strokeLinecap="round" />
    
    {/* Speech bubble */}
    <path d="M150 60 Q180 50 170 30 Q160 10 140 20 Q130 30 150 40 Z" fill="white" />
    <path d="M150 60 Q180 50 170 30 Q160 10 140 20 Q130 30 150 40" stroke="#4F46E5" strokeWidth="2" />
    
    {/* Exclamation marks in speech bubble */}
    <circle cx="145" cy="35" r="3" fill="#10B981" />
    <circle cx="155" cy="35" r="3" fill="#10B981" />
    <circle cx="150" cy="45" r="3" fill="#10B981" />
    
    {/* Arms holding sign */}
    <path d="M60 100 L40 80 L30 100 L50 120 Z" fill="#8B5CF6" />
    <path d="M140 100 L160 80 L170 100 L150 120 Z" fill="#8B5CF6" />
    
    {/* Sign */}
    <rect x="50" y="70" width="100" height="40" rx="8" fill="#FBBF24" />
    <text x="100" y="95" textAnchor="middle" fill="#1F2937" fontSize="14" fontWeight="bold">
      FREE!
    </text>
    
    {/* Confetti */}
    <circle cx="30" cy="40" r="4" fill="#EF4444" />
    <circle cx="170" cy="30" r="3" fill="#3B82F6" />
    <circle cx="180" cy="70" r="3" fill="#10B981" />
    <circle cx="20" cy="80" r="3" fill="#8B5CF6" />
    <circle cx="40" cy="150" r="3" fill="#F59E0B" />
    <circle cx="160" cy="140" r="3" fill="#EC4899" />
  </svg>
);

export const FreeAnnouncement = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500 text-white p-4 shadow-lg animate-bounce">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="relative">
            <CartoonAnnouncer />
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-spin">
              <span className="text-black font-bold text-sm">🎉</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-xl mb-1 flex items-center gap-2">
              <span className="text-2xl">🎊</span> 
              HOORAY! Telepro is now 100% FREE!
              <span className="text-2xl">🎊</span>
            </h3>
            <p className="text-sm opacity-95 font-medium">
              <span className="bg-white/20 px-2 py-1 rounded mr-2">✨</span>
              All premium features unlocked! No subscriptions, no payments, no limits!
              <span className="bg-white/20 px-2 py-1 rounded ml-2">✨</span>
            </p>
            <div className="flex items-center gap-3 mt-2 text-xs">
              <span className="bg-white/20 px-2 py-1 rounded">🎯 Unlimited Use</span>
              <span className="bg-white/20 px-2 py-1 rounded">🚀 All Features</span>
              <span className="bg-white/20 px-2 py-1 rounded">💯 No Payments</span>
            </div>
          </div>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="p-2 hover:bg-white/30 rounded-full transition-all hover:scale-110"
          aria-label="Close announcement"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

// Inline version for pages that can't use fixed positioning
export const FreeAnnouncementInline = () => {
  return (
    <div className="relative bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500 text-white p-8 rounded-3xl mb-10 shadow-2xl animate-pulse border-4 border-yellow-400 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
      
      <div className="relative flex flex-col md:flex-row items-center gap-8">
        <div className="flex-shrink-0">
          <div className="relative">
            <CartoonAnnouncer />
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
              <span className="text-black font-bold text-xl">FREE</span>
            </div>
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className="font-bold text-3xl mb-4 flex items-center gap-3">
            <span className="text-4xl">🎉</span> 
            BIG ANNOUNCEMENT! Telepro is now COMPLETELY FREE!
            <span className="text-4xl">🎉</span>
          </h3>
          
          <p className="text-xl mb-6 font-medium bg-white/10 p-4 rounded-xl">
            <span className="text-2xl mr-2">✨</span>
            We're thrilled to announce that Telepro is now 100% free forever! 
            All premium features are unlocked for everyone!
            <span className="text-2xl ml-2">✨</span>
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm border border-white/30">
              <div className="font-bold text-lg mb-2 flex items-center gap-2">
                <span className="text-2xl">💸</span> No More Payments
              </div>
              <div className="text-sm opacity-95">Zero subscriptions, zero fees, zero hidden costs</div>
            </div>
            
            <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm border border-white/30">
              <div className="font-bold text-lg mb-2 flex items-center gap-2">
                <span className="text-2xl">🚀</span> All Features Unlocked
              </div>
              <div className="text-sm opacity-95">Everything that was premium is now available to everyone</div>
            </div>
            
            <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm border border-white/30">
              <div className="font-bold text-lg mb-2 flex items-center gap-2">
                <span className="text-2xl">∞</span> Unlimited Usage
              </div>
              <div className="text-sm opacity-95">Use Telepro as much as you want, no restrictions</div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-white/10 rounded-xl">
            <p className="text-sm italic flex items-center gap-2">
              <span className="text-xl">🎯</span>
              <strong>Note:</strong> All existing payment systems have been disabled. 
              The app is now freely accessible to everyone!
            </p>
          </div>
        </div>
      </div>
      
      {/* Floating emojis */}
      <div className="absolute -top-4 -left-4 text-3xl">🎊</div>
      <div className="absolute -top-4 -right-4 text-3xl">🎊</div>
      <div className="absolute -bottom-4 -left-4 text-3xl">🎈</div>
      <div className="absolute -bottom-4 -right-4 text-3xl">🎈</div>
    </div>
  );
};

// Add CSS animation for floating elements
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes float {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(10deg); }
    }
    .animate-float {
      animation: float 3s ease-in-out infinite;
    }
  `;
  document.head.appendChild(style);
}