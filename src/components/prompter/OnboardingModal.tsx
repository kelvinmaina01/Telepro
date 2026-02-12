"use client";

import React, { useState, useEffect } from "react";

const steps = [
    {
        title: "Welcome to TelePro",
        description: "Your professional teleprompter is ready. Paste your script into the editor to get started.",
        icon: "🎬",
    },
    {
        title: "Fine-tune your feed",
        description: "Adjust scroll speed, font size, and text color using the floating controls at the bottom.",
        icon: "⚙️",
    },
    {
        title: "Perfect your setup",
        description: "Enable your camera, select your preferred lens, and hit the Play button when you're ready to speak.",
        icon: "📸",
    },
    {
        title: "Record & Review",
        description: "Once finished, review your recording instantly and download the perfect take.",
        icon: "✨",
    },
];

export const OnboardingModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const hasSeenOnboarding = localStorage.getItem("telepro_onboarding_seen");
        if (!hasSeenOnboarding) {
            setIsOpen(true);
        }
    }, []);

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            handleClose();
        }
    };

    const handleClose = () => {
        localStorage.setItem("telepro_onboarding_seen", "true");
        setIsOpen(false);
    };

    if (!isOpen) return null;

    const step = steps[currentStep];

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" />

            <div className="relative w-full max-w-lg bg-zinc-900 border border-white/10 rounded-[40px] p-10 shadow-2xl overflow-hidden">
                {/* Progress bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 flex gap-1 px-4 pt-4">
                    {steps.map((_, idx) => (
                        <div
                            key={idx}
                            className={`h-full flex-1 rounded-full transition-all duration-500 ${idx <= currentStep ? 'bg-white' : 'bg-white/10'}`}
                        />
                    ))}
                </div>

                <div className="text-center mt-6">
                    <div className="w-24 h-24 bg-white/5 rounded-[32px] flex items-center justify-center text-5xl mb-8 mx-auto border border-white/10">
                        {step.icon}
                    </div>

                    <h2 className="text-3xl font-black text-white tracking-tighter mb-4">
                        {step.title}
                    </h2>

                    <p className="text-zinc-400 font-medium leading-relaxed mb-10 text-lg">
                        {step.description}
                    </p>

                    <div className="flex flex-col gap-3">
                        <button
                            onClick={handleNext}
                            className="w-full h-16 bg-white text-black font-black text-lg rounded-2xl hover:bg-zinc-200 transition-all active:scale-95 shadow-xl"
                        >
                            {currentStep === steps.length - 1 ? "LET'S GO" : "NEXT STEP"}
                        </button>

                        {currentStep < steps.length - 1 && (
                            <button
                                onClick={handleClose}
                                className="text-zinc-500 font-bold hover:text-white transition-colors py-2"
                            >
                                Skip Introduction
                            </button>
                        )}
                    </div>
                </div>

                {/* Background glow */}
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/5 blur-3xl rounded-full" />
            </div>
        </div>
    );
};
