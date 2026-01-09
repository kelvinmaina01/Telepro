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

    // Convert plain text to paragraphs
    const renderText = () => {
        const lines = text.split('\n');
        return lines.map((line, index) => (
            <p
                key={index}
                style={{
                    margin: 0,
                    padding: '0.25em 0',
                    minHeight: '1.2em',
                }}
            >
                {line || '\u00A0'}
            </p>
        ));
    };

    return (
        <div
            ref={containerRef}
            className={`absolute inset-0 z-10 overflow-y-auto overflow-x-hidden no-scrollbar ${isMirrored ? "scale-x-[-1]" : ""}`}
            style={{
                perspective: "1000px",
                scrollBehavior: "auto",
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minHeight: '100%',
                    width: '100%',
                }}
            >
                {/* Spacer to start text deeper in the page */}
                <div style={{ height: '40vh', width: '100%', flexShrink: 0 }} />

                <div
                    style={{
                        fontSize: `${fontSize}px`,
                        color: textColor,
                        textAlign: 'center',
                        fontWeight: 'bold',
                        lineHeight: 1.6,
                        width: '100%',
                        maxWidth: '1200px',
                        paddingLeft: '24px',
                        paddingRight: '24px',
                        boxSizing: 'border-box',
                        wordBreak: 'normal',
                        overflowWrap: 'normal',
                        whiteSpace: 'pre-wrap',
                    }}
                >
                    {renderText()}
                </div>

                <div style={{ height: '100vh', width: '100%', flexShrink: 0 }} />
            </div>
        </div>
    );
};
