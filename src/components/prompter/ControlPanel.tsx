"use client";

import React, { useState, useMemo } from "react";
import { TextEditorModal } from "./TextEditorModal";
import { DeviceSettingsModal } from "./DeviceSettingsModal";

interface ControlPanelProps {
    speed: number;
    setSpeed: (val: number) => void;
    fontSize: number;
    setFontSize: (val: number) => void;
    text: string;
    setText: (val: string) => void;
    isPlaying: boolean;
    onPlayPause: () => void;
    onStop: () => void;
    isMirrored: boolean;
    setIsMirrored: (val: boolean) => void;
    isReversed: boolean;
    setIsReversed: (val: boolean) => void;
    isRecordingEnabled: boolean;
    setIsRecordingEnabled: (val: boolean) => void;
    recordingTime: number;
    countdownSeconds: number;
    setCountdownSeconds: (val: number) => void;
    isVisible: boolean;
    setIsVisible: (val: boolean) => void;
    selectedVideoDevice: string;
    selectedAudioDevice: string;
    onDeviceChange: (videoDeviceId: string, audioDeviceId: string) => void;
    textColor: string;
    setTextColor: (val: string) => void;
    hasStarted: boolean;
}

const formatTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

const formatReadingTime = (minutes: number): string => {
    if (minutes < 1) {
        return "<1 dk";
    } else if (minutes < 60) {
        return `~${Math.round(minutes)} dk`;
    } else {
        const hrs = Math.floor(minutes / 60);
        const mins = Math.round(minutes % 60);
        return `~${hrs}s ${mins}dk`;
    }
};

export const ControlPanel: React.FC<ControlPanelProps> = ({
    speed,
    setSpeed,
    fontSize,
    setFontSize,
    text,
    setText,
    isPlaying,
    onPlayPause,
    onStop,
    isMirrored,
    setIsMirrored,
    isReversed,
    setIsReversed,
    isRecordingEnabled,
    setIsRecordingEnabled,
    recordingTime,
    countdownSeconds,
    setCountdownSeconds,
    isVisible,
    setIsVisible,
    selectedVideoDevice,
    selectedAudioDevice,
    onDeviceChange,
    textColor,
    setTextColor,
    hasStarted,
}) => {
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [isDeviceSettingsOpen, setIsDeviceSettingsOpen] = useState(false);

    // Local state for inputs - allows free typing
    const [speedInput, setSpeedInput] = useState(speed.toString());
    const [fontSizeInput, setFontSizeInput] = useState(fontSize.toString());
    const [countdownInput, setCountdownInput] = useState(countdownSeconds.toString());

    // Sync local inputs with props when they change externally
    React.useEffect(() => {
        setSpeedInput(speed.toString());
    }, [speed]);

    React.useEffect(() => {
        setFontSizeInput(fontSize.toString());
    }, [fontSize]);

    React.useEffect(() => {
        setCountdownInput(countdownSeconds.toString());
    }, [countdownSeconds]);

    // Calculate estimated reading time (average 150 words per minute for teleprompter)
    const estimatedReadingTime = useMemo(() => {
        const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
        // Adjust based on speed - base speed of 20 = 150 wpm
        const adjustedWpm = (speed / 20) * 150;
        const minutes = wordCount / adjustedWpm;
        return formatReadingTime(minutes);
    }, [text, speed]);

    // Handle blur - validate and apply
    const handleSpeedBlur = () => {
        const val = parseInt(speedInput) || 1;
        const clamped = Math.max(1, Math.min(100, val));
        setSpeed(clamped);
        setSpeedInput(clamped.toString());
    };

    const handleFontSizeBlur = () => {
        const val = parseInt(fontSizeInput) || 20;
        const clamped = Math.max(20, Math.min(200, val));
        setFontSize(clamped);
        setFontSizeInput(clamped.toString());
    };

    const handleCountdownBlur = () => {
        const val = parseInt(countdownInput) || 0;
        const clamped = Math.max(0, Math.min(30, val));
        setCountdownSeconds(clamped);
        setCountdownInput(clamped.toString());
    };

    return (
        <>
            {/* Main Toolbar */}
            <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-40 w-[95%] md:w-auto max-w-full">
                <div
                    className="flex items-center gap-2 md:gap-4 px-3 md:px-6 py-2 md:py-4 rounded-2xl backdrop-blur-2xl border border-white/10 shadow-2xl overflow-x-auto"
                    style={{
                        background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(20,20,20,0.8) 100%)',
                        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
                    }}
                >

                    {/* Play/Pause */}
                    <button
                        onClick={onPlayPause}
                        className={`shrink-0 relative w-12 h-12 rounded-xl transition-all duration-300 overflow-hidden group backdrop-blur-md ${isPlaying
                            ? "bg-amber-500/80 hover:bg-amber-400/90"
                            : "bg-emerald-500/80 hover:bg-emerald-400/90"
                            } shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 border border-white/10`}
                        title={isPlaying ? "Pause" : "Play"}
                    >
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative flex items-center justify-center text-white">
                            {isPlaying ? (
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            )}
                        </div>
                    </button>

                    {/* Speed & Font Size - Stacked */}
                    <div className="shrink-0 flex flex-col gap-1.5">
                        {/* Speed */}
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                            <svg className="w-3.5 h-3.5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 6v6l4 2" />
                            </svg>
                            <input
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                value={speedInput}
                                onChange={(e) => setSpeedInput(e.target.value.replace(/[^0-9]/g, ''))}
                                onBlur={handleSpeedBlur}
                                className="w-9 bg-transparent text-white text-center text-base font-bold outline-none"
                                aria-label="Kaydırma Hızı"
                            />
                        </div>

                        {/* Font Size */}
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                            <svg className="w-3.5 h-3.5 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M9 4v3h5v12h3V7h5V4H9zM3 12h3v7h3v-7h3V9H3v3z" />
                            </svg>
                            <input
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                value={fontSizeInput}
                                onChange={(e) => setFontSizeInput(e.target.value.replace(/[^0-9]/g, ''))}
                                onBlur={handleFontSizeBlur}
                                className="w-9 bg-transparent text-white text-center text-base font-bold outline-none"
                                aria-label="Yazı Boyutu"
                            />
                        </div>
                    </div>

                    {/* Stop */}
                    <button
                        onClick={onStop}
                        className="shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/80 to-red-600/80 hover:from-red-400/90 hover:to-red-500/90 text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 flex items-center justify-center backdrop-blur-md border border-white/10"
                        title="Stop & Reset"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M6 6h12v12H6z" />
                        </svg>
                    </button>

                    <div className="shrink-0 w-px h-8 bg-white/10" />

                    {/* Record */}
                    <button
                        onClick={() => setIsRecordingEnabled(!isRecordingEnabled)}
                        className={`shrink-0 relative w-12 h-12 rounded-xl transition-all duration-300 overflow-hidden group backdrop-blur-md flex items-center justify-center ${isRecordingEnabled
                            ? "bg-gradient-to-br from-red-500/80 to-red-600/80 hover:from-red-400/90 hover:to-red-500/90 text-white shadow-lg shadow-red-500/50"
                            : "bg-white/5 text-zinc-400 hover:text-white border border-white/10 hover:bg-white/10"
                            } hover:scale-110 active:scale-95 border border-white/10`}
                        title="Toggle Recording"
                    >
                        <div className="relative flex items-center justify-center">
                            <div className={`w-3 h-3 rounded-full ${isRecordingEnabled ? 'bg-white animate-pulse' : 'border-2 border-current'}`} />
                        </div>
                    </button>

                    {/* Mirror */}
                    <button
                        onClick={() => setIsMirrored(!isMirrored)}
                        className={`shrink-0 w-11 h-11 rounded-xl transition-all duration-300 flex items-center justify-center ${isMirrored
                            ? "bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50"
                            : "bg-white/5 text-zinc-400 hover:text-white border border-white/10 hover:bg-white/10"
                            } hover:scale-110 active:scale-95`}
                        title="Mirror Text"
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M12 3v18M8 7H5l3 5-3 5h3M16 7h3l-3 5 3 5h-3" />
                        </svg>
                    </button>

                    {/* Reverse */}
                    <button
                        onClick={() => setIsReversed(!isReversed)}
                        className={`shrink-0 w-11 h-11 rounded-xl transition-all duration-300 flex items-center justify-center ${isReversed
                            ? "bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/50"
                            : "bg-white/5 text-zinc-400 hover:text-white border border-white/10 hover:bg-white/10"
                            } hover:scale-110 active:scale-95`}
                        title="Reverse Scroll"
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M17 3l4 4-4 4M3 11V9a4 4 0 014-4h14M7 21l-4-4 4-4M21 13v2a4 4 0 01-4 4H3" />
                        </svg>
                    </button>

                    <div className="shrink-0 w-px h-8 bg-white/10" />

                    {/* Timer & Reading Time - Stacked */}
                    <div className="shrink-0 flex flex-col gap-1">
                        {/* Recording Timer */}
                        <div className={`flex items-center justify-center px-3 py-1 rounded-lg font-mono text-xs tracking-wider ${isRecordingEnabled && hasStarted
                            ? "bg-red-500/20 text-red-400 border border-red-500/50"
                            : "bg-white/5 text-white border border-white/10"
                            }`}>
                            <span className={isRecordingEnabled && hasStarted && isPlaying ? "animate-pulse" : ""}>
                                {formatTime(recordingTime)}
                            </span>
                        </div>
                        {/* Estimated Reading Time */}
                        <div className="flex items-center justify-center gap-1 px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs">
                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{estimatedReadingTime}</span>
                        </div>
                    </div>

                    <div className="shrink-0 w-px h-8 bg-white/10" />

                    {/* Edit */}
                    <button
                        onClick={() => setIsEditorOpen(true)}
                        className="shrink-0 w-11 h-11 rounded-xl bg-white/5 text-zinc-400 hover:text-white border border-white/10 hover:bg-white/10 transition-all duration-300 flex items-center justify-center hover:scale-110 active:scale-95"
                        title="Edit Script"
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                    </button>

                    {/* Countdown */}
                    <div className="shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                        <svg className="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <circle cx="12" cy="13" r="8" />
                            <path d="M12 9v4l2 2M5 3l2 2M19 3l-2 2M12 3v2" />
                        </svg>
                        <input
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            value={countdownInput}
                            onChange={(e) => setCountdownInput(e.target.value.replace(/[^0-9]/g, ''))}
                            onBlur={handleCountdownBlur}
                            className="w-6 bg-transparent text-white text-center text-base font-bold outline-none"
                            aria-label="Geri Sayım Süresi"
                        />
                        <span className="text-zinc-500 text-xs">s</span>
                    </div>

                    {/* Device Settings */}
                    <button
                        onClick={() => setIsDeviceSettingsOpen(true)}
                        className="shrink-0 w-11 h-11 rounded-xl bg-white/5 text-zinc-400 hover:text-white border border-white/10 hover:bg-white/10 transition-all duration-300 flex items-center justify-center hover:scale-110 active:scale-95"
                        title="Device Settings"
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="4" y1="21" x2="4" y2="14" />
                            <line x1="4" y1="10" x2="4" y2="3" />
                            <line x1="12" y1="21" x2="12" y2="12" />
                            <line x1="12" y1="8" x2="12" y2="3" />
                            <line x1="20" y1="21" x2="20" y2="16" />
                            <line x1="20" y1="12" x2="20" y2="3" />
                            <line x1="1" y1="14" x2="7" y2="14" />
                            <line x1="9" y1="8" x2="15" y2="8" />
                            <line x1="17" y1="16" x2="23" y2="16" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Footer */}
            <div className="fixed bottom-0 left-0 right-0 z-30 bg-[#0f0f0f] border-t border-zinc-800">
                <div className="flex items-center justify-center gap-4 px-4 py-3 md:py-2 text-xs text-zinc-500">
                    <span>TelePro - Professional Teleprompter</span>
                </div>
            </div>

            <TextEditorModal
                isOpen={isEditorOpen}
                onClose={() => setIsEditorOpen(false)}
                text={text}
                onSave={setText}
                textColor={textColor}
                setTextColor={setTextColor}
            />

            <DeviceSettingsModal
                isOpen={isDeviceSettingsOpen}
                onClose={() => setIsDeviceSettingsOpen(false)}
                selectedVideoDevice={selectedVideoDevice}
                selectedAudioDevice={selectedAudioDevice}
                onDeviceChange={onDeviceChange}
            />
        </>
    );
};
