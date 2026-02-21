"use client";

import React from "react";
import Image from "next/image";

interface FloatingKofiIconProps {
  className?: string;
  position?: "footer" | "prompter";
}

export const FloatingKofiIcon = ({ className = "", position = "footer" }: FloatingKofiIconProps) => {
  const positionClasses = {
    footer: "fixed bottom-8 left-8 z-50",
    prompter: "fixed top-6 left-6 z-50"
  };

  const sizeClasses = {
    footer: "w-16 h-16",
    prompter: "w-12 h-12"
  };

  const animationClasses = `
    animate-float 
    hover:scale-110 
    hover:rotate-12 
    hover:shadow-2xl 
    transition-all 
    duration-300 
    hover:animate-pulse
    shadow-lg
    hover:shadow-orange-500/30
  `;

  return (
    <div className={`${positionClasses[position]} group`}>
      <a
        href="https://ko-fi.com/kelvinmaina01"
        target="_blank"
        rel="noopener noreferrer"
        className={`
          ${sizeClasses[position]} 
          ${animationClasses} 
          ${className}
          inline-flex 
          items-center 
          justify-center 
          rounded-full 
          bg-gradient-to-br 
          from-orange-500 
          to-pink-600 
          text-white 
          cursor-pointer
          ring-2
          ring-orange-400/30
          ring-offset-2
          ring-offset-black
          relative
        `}
        title="Support me on Ko-fi"
        aria-label="Support me on Ko-fi"
      >
        <div className="relative w-2/3 h-2/3 flex items-center justify-center">
          {/* Ko-fi icon - using a simple coffee cup icon */}
          <svg
            className="w-full h-full"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0.5"
          >
            <path d="M18.8 8.22H8.77v4.41h5.72c-.77 2.33-2.88 3.98-5.72 3.98-3.48 0-6.31-2.82-6.31-6.31s2.82-6.31 6.31-6.31c1.88 0 3.55.83 4.67 2.14l3.15-3.15C16.24.93 13.59 0 10.77 0 4.82 0 0 4.82 0 10.77s4.82 10.77 10.77 10.77c6.21 0 10.77-4.56 10.77-10.77 0-.65-.07-1.28-.2-1.88l-2.54 2.54z" />
            <path d="M1 10.77c0 5.95 4.82 10.77 10.77 10.77 6.21 0 10.77-4.56 10.77-10.77 0-.65-.07-1.28-.2-1.88l-2.54 2.54H8.77v4.41h5.72c-.77 2.33-2.88 3.98-5.72 3.98-3.48 0-6.31-2.82-6.31-6.31s2.82-6.31 6.31-6.31c1.88 0 3.55.83 4.67 2.14l3.15-3.15C16.24.93 13.59 0 10.77 0 4.82 0 0 4.82 0 10.77z" fill="white" />
            <path d="M11.5 7.5h-1v3h-3v1h3v3h1v-3h3v-1h-3z" />
          </svg>
          
          {/* Animated ring effect */}
          <div className="absolute inset-0 rounded-full border-2 border-orange-300/50 animate-ping opacity-75" />
        </div>
      </a>
      
      {/* Tooltip/Label that's always visible with subtle animation */}
      <div className="
        absolute 
        left-full 
        ml-3 
        top-1/2 
        -translate-y-1/2 
        opacity-100
        transition-all
        duration-300
        pointer-events-none
        whitespace-nowrap
        bg-black/90
        backdrop-blur-sm
        text-white
        text-sm
        font-medium
        px-3
        py-2
        rounded-lg
        border
        border-white/10
        shadow-xl
        z-50
        animate-pulse-slow
      ">
        <div className="flex items-center gap-2">
          <span className="text-orange-300 font-bold">Support Me</span>
          <span className="text-zinc-400">on Ko-fi</span>
        </div>
        <div className="text-xs text-zinc-400 mt-1">Help keep TelePro free!</div>
        
        {/* Tooltip arrow */}
        <div className="
          absolute 
          right-full 
          top-1/2 
          -translate-y-1/2 
          border-8 
          border-transparent 
          border-r-black/90
        " />
      </div>
    </div>
  );
};