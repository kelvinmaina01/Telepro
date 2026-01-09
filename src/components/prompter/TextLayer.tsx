"use client";

import React, { useEffect, useRef } from "react";

interface TextLayerProps {
    text: string;
    speed: number;
    fontSize: number;
    isPlaying: boolean;
    isMirrored: boolean;
    isReversed: boolean;
    textColor: string;
}

export const TextLayer: React.FC<TextLayerProps> = ({
    text,
    speed,
    fontSize,
    isPlaying,
    isMirrored,
    isReversed,
    textColor,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<number>(0);
    const lastTimeRef = useRef<number>(0);
    const scrollAccumulator = useRef<number>(0);

    useEffect(() => {
        if (!isPlaying) {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            lastTimeRef.current = 0;
            return;
        }

        // Sync accumulator on start to avoid jumping
        if (containerRef.current) {
            scrollAccumulator.current = containerRef.current.scrollTop;
        }

        const animate = (time: number) => {
            if (!lastTimeRef.current) lastTimeRef.current = time;
            const deltaTime = time - lastTimeRef.current;
            lastTimeRef.current = time;

            // Speed factor: pixels per second
            const pixelsPerSecond = speed * 3;
            const moveAmount = (pixelsPerSecond * deltaTime) / 1000;

            if (containerRef.current) {
                // Handle manual scroll intervention
                if (
                    Math.abs(containerRef.current.scrollTop - scrollAccumulator.current) >
                    10
                ) {
                    scrollAccumulator.current = containerRef.current.scrollTop;
                }

                // Apply direction based on isReversed
                if (isReversed) {
                    scrollAccumulator.current -= moveAmount;
                    if (scrollAccumulator.current < 0) {
                        scrollAccumulator.current = 0;
                    }
                } else {
                    scrollAccumulator.current += moveAmount;
                }

                containerRef.current.scrollTop = scrollAccumulator.current;
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            lastTimeRef.current = 0;
        };
    }, [isPlaying, speed, isReversed]);

    return (
        <div
            ref={containerRef}
            className={`absolute inset-0 z-10 overflow-y-auto no-scrollbar p-8 flex flex-col items-center ${isMirrored ? "scale-x-[-1]" : ""
                }`}
            style={{
                perspective: "1000px",
                scrollBehavior: "auto",
            }}
        >
            {/* Spacer to start text deeper in the page */}
            <div className="h-[40vh] w-full shrink-0" />

            <div
                ref={contentRef}
                className="max-w-4xl text-center font-bold leading-relaxed transition-colors duration-300 whitespace-pre-wrap"
                style={{ fontSize: `${fontSize}px`, color: textColor }}
            >
                {text}
            </div>

            <div className="h-[100vh] w-full shrink-0" />
        </div>
    );
};
