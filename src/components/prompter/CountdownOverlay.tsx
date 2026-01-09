"use client";

import React, { useEffect, useState } from "react";

interface CountdownOverlayProps {
    seconds: number;
    onComplete: () => void;
    isActive: boolean;
}

export const CountdownOverlay: React.FC<CountdownOverlayProps> = ({
    seconds,
    onComplete,
    isActive,
}) => {
    const [count, setCount] = useState(seconds);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!isActive) {
            setCount(seconds);
            setIsVisible(false);
            return;
        }

        setIsVisible(true);

        if (count <= 0) {
            // Complete immediately when reaching 0
            setIsVisible(false);
            onComplete();
            return;
        }

        const timer = setTimeout(() => {
            setCount(count - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [isActive, count, seconds, onComplete]);

    if (!isActive && !isVisible) return null;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'
                }`}
        >
            {/* Background */}
            <div className="absolute inset-0 bg-black/85" />

            {/* Content */}
            <div className="relative flex flex-col items-center gap-6">
                {/* Countdown Number */}
                <div className="relative">
                    {/* Outer glow ring */}
                    <div
                        className="absolute inset-0 rounded-full"
                        style={{
                            width: '240px',
                            height: '240px',
                            marginLeft: '-120px',
                            marginTop: '-120px',
                            left: '50%',
                            top: '50%',
                            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
                            animation: 'pulse 1s ease-out infinite',
                        }}
                    />

                    {/* Number container */}
                    <div
                        className="w-48 h-48 rounded-lg bg-[#1a1a1a] border border-zinc-800 flex items-center justify-center shadow-2xl"
                        key={count}
                        style={{
                            animation: 'countScale 1s ease-out',
                        }}
                    >
                        <span className="text-8xl font-bold text-white">
                            {count}
                        </span>
                    </div>
                </div>

                {/* Label */}
                <div className="px-6 py-2 rounded-md bg-[#1a1a1a] border border-zinc-800">
                    <span className="text-zinc-400 text-sm font-medium uppercase tracking-widest">
                        Get Ready
                    </span>
                </div>
            </div>

            {/* CSS Animations */}
            <style jsx>{`
                @keyframes countScale {
                    0% {
                        transform: scale(0.8);
                        opacity: 0;
                    }
                    50% {
                        transform: scale(1.05);
                    }
                    100% {
                        transform: scale(1);
                        opacity: 1;
                    }
                }
                @keyframes pulse {
                    0% {
                        transform: scale(1);
                        opacity: 0.5;
                    }
                    100% {
                        transform: scale(1.2);
                        opacity: 0;
                    }
                }
            `}</style>
        </div>
    );
};
