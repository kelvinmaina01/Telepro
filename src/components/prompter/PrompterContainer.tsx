"use client";

import React, { useState, useCallback } from "react";
import { CameraLayer } from "./CameraLayer";
import { TextLayer } from "./TextLayer";
import { ControlPanel } from "./ControlPanel";
import { CountdownOverlay } from "./CountdownOverlay";
import { VideoReviewModal } from "./VideoReviewModal";

export const PrompterContainer = () => {
    const [text, setText] = useState(
        `Welcome to TelePro!

Paste your script here and hit Start.

You can adjust speed, font size, and text color.

Good luck with your recording!`
    );
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
    }, [recordedVideoUrl]);

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
        </div>
    );
};
