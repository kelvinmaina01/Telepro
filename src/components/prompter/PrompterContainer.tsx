"use client";

import React, { useState, useCallback } from "react";
import { CameraLayer } from "./CameraLayer";
import { TextLayer } from "./TextLayer";
import { ControlPanel } from "./ControlPanel";
import { CountdownOverlay } from "./CountdownOverlay";

export const PrompterContainer = () => {
    const [text, setText] = useState(
        "Welcome to your new Prompter!\n\nPaste your script here and hit Start.\n\nYou can adjust speed, font size, and text color.\n\nGood luck with your recording!"
    );
    const [speed, setSpeed] = useState(20);
    const [fontSize, setFontSize] = useState(60);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMirrored, setIsMirrored] = useState(false);
    const [isReversed, setIsReversed] = useState(false);
    const [textColor, setTextColor] = useState("#ffffff");
    const [isRecordingEnabled, setIsRecordingEnabled] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [countdownSeconds, setCountdownSeconds] = useState(3);
    const [isCountingDown, setIsCountingDown] = useState(false);
    const [isControlsVisible, setIsControlsVisible] = useState(true);
    const [selectedVideoDevice, setSelectedVideoDevice] = useState("");
    const [selectedAudioDevice, setSelectedAudioDevice] = useState("");

    // Determine if we should be recording: only if playing AND recording is enabled
    const isRecording = isPlaying && isRecordingEnabled;

    const handlePlayPause = useCallback(() => {
        if (isPlaying) {
            // Pause
            setIsPlaying(false);
        } else {
            // Start with countdown if countdown > 0
            if (countdownSeconds > 0) {
                setIsCountingDown(true);
            } else {
                setIsPlaying(true);
            }
        }
    }, [isPlaying, countdownSeconds]);

    const handleCountdownComplete = useCallback(() => {
        setIsCountingDown(false);
        setIsPlaying(true);
    }, []);

    const handleStop = useCallback(() => {
        setIsPlaying(false);
        setRecordingTime(0);
        // Reset scroll position
        const container = document.querySelector(".no-scrollbar");
        if (container) {
            container.scrollTop = 0;
        }
    }, []);

    const handleRecordingTimeUpdate = useCallback((seconds: number) => {
        setRecordingTime(seconds);
    }, []);

    const handleDeviceChange = useCallback((videoDeviceId: string, audioDeviceId: string) => {
        setSelectedVideoDevice(videoDeviceId);
        setSelectedAudioDevice(audioDeviceId);
    }, []);

    return (
        <div className="relative h-screen w-screen bg-black text-white overflow-hidden">
            <CameraLayer
                isRecording={isRecording}
                onRecordingTimeUpdate={handleRecordingTimeUpdate}
                videoDeviceId={selectedVideoDevice}
                audioDeviceId={selectedAudioDevice}
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
                textColor={textColor}
                setTextColor={setTextColor}
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
            />

            <CountdownOverlay
                seconds={countdownSeconds}
                onComplete={handleCountdownComplete}
                isActive={isCountingDown}
            />
        </div>
    );
};
