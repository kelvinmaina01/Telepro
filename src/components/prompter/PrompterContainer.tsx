"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { CameraLayer } from "./CameraLayer";
import { TextLayer } from "./TextLayer";
import { ControlPanel } from "./ControlPanel";
import { CountdownOverlay } from "./CountdownOverlay";
import { VideoReviewModal } from "./VideoReviewModal";
import { OnboardingModal } from "./OnboardingModal";

// Pricing limits from payment.md
const FREE_RECORDING_LIMIT_SECONDS = 30 * 60; // 30 minutes in seconds
const RECORDING_WARNING_THRESHOLD = 25 * 60; // 25 minutes

const DEFAULT_SCRIPT = `Welcome to TelePro!

Paste your script here and hit Start.

You can adjust speed, font size, and text color.

Good luck with your recording!`;

export const PrompterContainer = () => {
    const { user, loading, userProfile } = useAuth();
    const router = useRouter();

    // Check if user is Pro
    const isPro = userProfile?.plan === "pro";
    const recordingLimit = isPro ? Infinity : FREE_RECORDING_LIMIT_SECONDS;

    const [text, setText] = useState(DEFAULT_SCRIPT);
    const [showRecordingWarning, setShowRecordingWarning] = useState(false);

    const [speed, setSpeed] = useState(20);
    const [fontSize, setFontSize] = useState(60);
    const [isPlaying, setIsPlaying] = useState(false); // Controls text scrolling
    const [isMirrored, setIsMirrored] = useState(false);
    const [isReversed, setIsReversed] = useState(false);
    const [textColor, setTextColor] = useState("#ffffff");
    const [isRecordingEnabled, setIsRecordingEnabled] = useState(true);
    const [recordingTime, setRecordingTime] = useState(0);
    const [countdownSeconds, setCountdownSeconds] = useState(3);
    const [isCountingDown, setIsCountingDown] = useState(false);
    const [isControlsVisible, setIsControlsVisible] = useState(true);
    const [selectedVideoDevice, setSelectedVideoDevice] = useState("");
    const [selectedAudioDevice, setSelectedAudioDevice] = useState("");

    // New: Track if a session has started (recording is active)
    const [hasStarted, setHasStarted] = useState(false);
    // New: Signal to stop recording (triggers download)
    const [shouldStopRecording, setShouldStopRecording] = useState(false);

    // New: Video review state
    const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null);
    const [recordedVideoBlob, setRecordedVideoBlob] = useState<Blob | null>(null);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

    // Recording is active from first play until stop is pressed
    const isRecording = hasStarted && isRecordingEnabled && !shouldStopRecording;

    // Check recording time limits
    useEffect(() => {
        // Show warning when approaching limit
        if (!isPro && recordingTime >= RECORDING_WARNING_THRESHOLD && recordingTime < recordingLimit) {
            setShowRecordingWarning(true);
        }
        
        // Auto-stop when limit reached
        if (!isPro && recordingTime >= recordingLimit) {
            handleStop();
            setShowRecordingWarning(false);
            // Show alert that recording was auto-stopped
            alert("Recording limit reached! Upgrade to Pro for unlimited recording time.");
        }
    }, [recordingTime, isPro, recordingLimit]);

    const handlePlayPause = useCallback(() => {
        if (isPlaying) {
            // Pause: only stop scrolling, recording continues
            setIsPlaying(false);
        } else {
            // Play or Resume
            if (!hasStarted) {
                // First time starting - show countdown
                if (countdownSeconds > 0) {
                    setIsCountingDown(true);
                } else {
                    setHasStarted(true);
                    setIsPlaying(true);
                }
            } else {
                // Resume from pause - no countdown, just continue
                setIsPlaying(true);
            }
        }
    }, [isPlaying, hasStarted, countdownSeconds]);

    const handleCountdownComplete = useCallback(() => {
        setIsCountingDown(false);
        setHasStarted(true);
        setIsPlaying(true);
    }, []);

    const handleStop = useCallback(() => {
        // Stop everything and trigger download
        setIsPlaying(false);

        // Signal CameraLayer to stop recording (which triggers download)
        if (hasStarted && isRecordingEnabled) {
            setShouldStopRecording(true);
        }

        // Reset scroll position
        const container = document.querySelector(".no-scrollbar");
        if (container) {
            container.scrollTop = 0;
        }
    }, [hasStarted, isRecordingEnabled]);

    // Called by CameraLayer after recording is stopped
    const handleRecordingStopped = useCallback(() => {
        setShouldStopRecording(false);
        setHasStarted(false);
        setRecordingTime(0);
    }, []);

    const handleRecordingComplete = useCallback((blob: Blob, url: string) => {
        setRecordedVideoBlob(blob);
        setRecordedVideoUrl(url);
        setIsReviewModalOpen(true);
        handleRecordingStopped();
    }, [handleRecordingStopped]);

    const handleDownload = useCallback(() => {
        if (!recordedVideoUrl) return;

        // AUTH CHECK: User must be signed in to download
        if (!user) {
            router.push(`/auth?redirect=/prompter`);
            return;
        }

        const a = document.createElement("a");
        a.style.display = "none";
        a.href = recordedVideoUrl;
        a.download = `telepro-recording-${Date.now()}.mp4`;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
        }, 100);
        setIsReviewModalOpen(false);
    }, [recordedVideoUrl, user, router]);

    const handleReRecord = useCallback(() => {
        setIsReviewModalOpen(false);
        // Clean up current URL
        if (recordedVideoUrl) URL.revokeObjectURL(recordedVideoUrl);
        setRecordedVideoUrl(null);
        setRecordedVideoBlob(null);
        // Immediately trigger countdown for new take
        if (countdownSeconds > 0) {
            setIsCountingDown(true);
        } else {
            setHasStarted(true);
            setIsPlaying(true);
        }
    }, [recordedVideoUrl, countdownSeconds]);

    const handleDiscard = useCallback(() => {
        if (recordedVideoUrl) URL.revokeObjectURL(recordedVideoUrl);
        setRecordedVideoUrl(null);
        setRecordedVideoBlob(null);
        setIsReviewModalOpen(false);
    }, [recordedVideoUrl]);

    const handleRecordingTimeUpdate = useCallback((seconds: number) => {
        setRecordingTime(seconds);
    }, []);

    const handleDeviceChange = useCallback((videoDeviceId: string, audioDeviceId: string) => {
        setSelectedVideoDevice(videoDeviceId);
        setSelectedAudioDevice(audioDeviceId);
    }, []);

    // Called when camera access fails - disable recording mode
    const handleCameraError = useCallback(() => {
        setIsRecordingEnabled(false);
    }, []);

    return (
        <div className="relative h-screen w-screen bg-black text-white overflow-hidden">
            <CameraLayer
                isRecording={isRecording}
                shouldStopRecording={shouldStopRecording}
                onRecordingStopped={handleRecordingStopped}
                onRecordingComplete={handleRecordingComplete}
                onRecordingTimeUpdate={handleRecordingTimeUpdate}
                onCameraError={handleCameraError}
                videoDeviceId={selectedVideoDevice}
                audioDeviceId={selectedAudioDevice}
                isCameraEnabled={isRecordingEnabled}
            />

            <TextLayer
                text={text}
                speed={speed}
                fontSize={fontSize}
                isPlaying={isPlaying}
                isMirrored={isMirrored}
                isReversed={isReversed}
                textColor={textColor}
            />

            <ControlPanel
                speed={speed}
                setSpeed={setSpeed}
                fontSize={fontSize}
                setFontSize={setFontSize}
                text={text}
                setText={setText}
                isPlaying={isPlaying}
                onPlayPause={handlePlayPause}
                onStop={handleStop}
                isMirrored={isMirrored}
                setIsMirrored={setIsMirrored}
                isReversed={isReversed}
                setIsReversed={setIsReversed}
                isRecordingEnabled={isRecordingEnabled}
                setIsRecordingEnabled={setIsRecordingEnabled}
                recordingTime={recordingTime}
                countdownSeconds={countdownSeconds}
                setCountdownSeconds={setCountdownSeconds}
                isVisible={isControlsVisible}
                setIsVisible={setIsControlsVisible}
                selectedVideoDevice={selectedVideoDevice}
                selectedAudioDevice={selectedAudioDevice}
                onDeviceChange={handleDeviceChange}
                textColor={textColor}
                setTextColor={setTextColor}
                hasStarted={hasStarted}
            />

            <CountdownOverlay
                seconds={countdownSeconds}
                onComplete={handleCountdownComplete}
                isActive={isCountingDown}
            />

            <VideoReviewModal
                isOpen={isReviewModalOpen}
                videoUrl={recordedVideoUrl}
                onDownload={handleDownload}
                onReRecord={handleReRecord}
                onDiscard={handleDiscard}
            />

            {/* Floating Plan Profile */}
            {user && (
                <div className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 p-2 pr-5 rounded-full hover:bg-white/10 transition-all group select-none">
                    <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-black font-black text-xs">
                        {user.displayName ? user.displayName.substring(0, 2).toUpperCase() : user.email?.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-normal tracking-[0.2em] text-zinc-500 lowercase leading-none mb-1">current plan</span>
                        <span className="text-xs font-normal text-white lowercase leading-none">{isPro ? "pro" : "starter"}</span>
                    </div>

                    {/* Subtle indicator */}
                    <div className={`ml-2 w-1.5 h-1.5 rounded-full animate-pulse ${isPro ? 'bg-emerald-500' : 'bg-cyan-500'}`} />
                </div>
            )}

            {/* Recording Warning */}
            {showRecordingWarning && !isPro && (
                <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-amber-500/90 backdrop-blur-xl rounded-full flex items-center gap-3 animate-pulse">
                    <span className="text-white text-sm font-bold">
                        ⚠️ Recording limit: {Math.floor((FREE_RECORDING_LIMIT_SECONDS - recordingTime) / 60)} min remaining
                    </span>
                    <a 
                        href="/checkout?plan=professional&interval=monthly" 
                        className="px-4 py-1.5 bg-black/20 text-white text-xs font-bold rounded-full hover:bg-black/30 transition-colors"
                    >
                        UPGRADE
                    </a>
                </div>
            )}

            <OnboardingModal />
        </div>
    );
};
