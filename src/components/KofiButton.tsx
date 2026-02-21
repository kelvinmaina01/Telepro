"use client";

import React from "react";

interface KofiButtonProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const KofiButton = ({ className = "", size = "md" }: KofiButtonProps) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12"
  };

  const animationClasses = "hover:scale-110 hover:rotate-12 hover:shadow-lg transition-all duration-300 hover:animate-pulse";

  return (
    <a
      href="https://ko-fi.com/kelvinmaina01"
      target="_blank"
      rel="noopener noreferrer"
      className={`${sizeClasses[size]} ${animationClasses} ${className} inline-flex items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md hover:shadow-xl`}
      title="Support me on Ko-fi"
      aria-label="Support me on Ko-fi"
    >
      <svg
        className="w-2/3 h-2/3"
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.5"
      >
        <path d="M18.8 8.22H8.77v4.41h5.72c-.77 2.33-2.88 3.98-5.72 3.98-3.48 0-6.31-2.82-6.31-6.31s2.82-6.31 6.31-6.31c1.88 0 3.55.83 4.67 2.14l3.15-3.15C16.24.93 13.59 0 10.77 0 4.82 0 0 4.82 0 10.77s4.82 10.77 10.77 10.77c6.21 0 10.77-4.56 10.77-10.77 0-.65-.07-1.28-.2-1.88l-2.54 2.54z" />
        <path d="M1 10.77c0 5.95 4.82 10.77 10.77 10.77 6.21 0 10.77-4.56 10.77-10.77 0-.65-.07-1.28-.2-1.88l-2.54 2.54H8.77v4.41h5.72c-.77 2.33-2.88 3.98-5.72 3.98-3.48 0-6.31-2.82-6.31-6.31s2.82-6.31 6.31-6.31c1.88 0 3.55.83 4.67 2.14l3.15-3.15C16.24.93 13.59 0 10.77 0 4.82 0 0 4.82 0 10.77z" fill="white" />
        <path d="M11.5 7.5h-1v3h-3v1h3v3h1v-3h3v-1h-3z" />
      </svg>
    </a>
  );
};