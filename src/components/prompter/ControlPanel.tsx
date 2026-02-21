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
        return "<1 min";
    } else if (minutes < 60) {
        return `~${Math.round(minutes)} min`;
    } else {
        const hrs = Math.floor(minutes / 60);
        const mins = Math.round(minutes % 60);
        return `~${hrs}h ${mins}m`;
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
            {/* Main Bottom Controls */}
            <div
                className={`fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-700 w-full max-w-[95vw] sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-[80vw] xl:max-w-[75vw] ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0 pointer-events-none"}`}
            >
                <div
                    className="flex items-center gap-2 sm:gap-3 md:gap-4 px-3 sm:px-4 pb-6 sm:pb-8 md:pb-10 overflow-x-auto no-scrollbar scroll-smooth"
                >
                    {/* Play/Pause - Main Control */}
                    <div className="flex-shrink-0 group relative p-1 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl shadow-xl">
                        <button
                            onClick={onPlayPause}
                            className={`flex items-center gap-2 sm:gap-3 px-4 sm:px-6 md:px-8 h-12 sm:h-14 md:h-16 rounded-xl sm:rounded-2xl transition-all duration-500 hover:scale-[1.05] active:scale-95 shadow-lg ${isPlaying ? "bg-red-600 shadow-red-900/40" : "bg-emerald-600 shadow-emerald-900/40"}`}
                        >
                            <div className="text-white">
                                {isPlaying ? (
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                )}
                            </div>
                            <span className="text-white font-bold text-xs sm:text-sm tracking-wide">{isPlaying ? "PAUSE" : "PLAY"}</span>
                        </button>
                    </div>

                    {/* Speed Control */}
                    <div className="flex items-center gap-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-1 shadow-xl">
                        <div className="relative group/tooltip flex flex-col gap-1 items-start px-2 sm:px-3 py-2">
                            <span className="text-[8px] sm:text-[9px] font-black text-white ml-1 tracking-widest uppercase">Speed</span>
                            <div className="flex items-center gap-1 px-1 sm:px-2 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                <button
                                    onClick={() => setSpeed(Math.max(1, speed - 1))}
                                    className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-lg hover:bg-white/10 text-white transition-colors"
                                >
                                    <svg className="w-3 h-3 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                        <path d="M5 12h14" />
                                    </svg>
                                </button>
                                <div className="flex items-center gap-1 min-w-[30px] sm:min-w-[40px] justify-center">
                                    <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                                    </svg>
                                    <span className="text-xs sm:text-sm font-black text-white tabular-nums">{speed}</span>
                                </div>
                                <button
                                    onClick={() => setSpeed(speed + 1)}
                                    className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-lg hover:bg-white/10 text-white transition-colors"
                                >
                                    <svg className="w-3 h-3 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                        <path d="M12 5v14M5 12h14" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="w-px h-8 sm:h-10 bg-white/10" />

                        {/* Font Size */}
                        <div className="relative group/tooltip flex flex-col gap-1 items-start px-2 sm:px-3 py-2">
                            <span className="text-[8px] sm:text-[9px] font-black text-white ml-1 tracking-widest uppercase">Size</span>
                            <div className="flex items-center gap-1 px-1 sm:px-2 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                <button
                                    onClick={() => setFontSize(Math.max(10, fontSize - 5))}
                                    className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-lg hover:bg-white/10 text-white transition-colors"
                                >
                                    <svg className="w-3 h-3 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                        <path d="M5 12h14" />
                                    </svg>
                                </button>
                                <div className="flex items-center gap-1 min-w-[30px] sm:min-w-[40px] justify-center">
                                    <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <path d="M4 7V4h16v3M9 20h6M12 4v16" />
                                    </svg>
                                    <span className="text-xs sm:text-sm font-black text-white tabular-nums">{fontSize}</span>
                                </div>
                                <button
                                    onClick={() => setFontSize(fontSize + 5)}
                                    className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-lg hover:bg-white/10 text-white transition-colors"
                                >
                                    <svg className="w-3 h-3 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                        <path d="M12 5v14M5 12h14" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Reset & Camera */}
                    <div className="flex items-center gap-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-1 shadow-xl">
                        <div className="group/tooltip relative">
                            <button
                                onClick={onStop}
                                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 h-10 sm:h-12 rounded-xl sm:rounded-2xl bg-zinc-800/50 hover:bg-zinc-800 transition-all duration-300 border border-white/5 active:scale-95 text-zinc-400 hover:text-white"
                            >
                                <svg className="w-3 h-3 sm:w-4 sm:h-4 fill-current text-red-500" viewBox="0 0 24 24">
                                    <rect x="6" y="6" width="12" height="12" rx="1" />
                                </svg>
                                <span className="font-black text-xs tracking-widest">RESET</span>
                            </button>
                        </div>

                        <div className="group/tooltip relative">
                            <button
                                onClick={() => setIsRecordingEnabled(!isRecordingEnabled)}
                                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 h-10 sm:h-12 rounded-xl sm:rounded-2xl transition-all duration-300 border active:scale-95 ${isRecordingEnabled ? 'bg-emerald-600/10 border-emerald-500/30 text-emerald-500' : 'bg-zinc-800/50 border-white/5 text-zinc-500'}`}
                            >
                                <div className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${isRecordingEnabled ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-current'}`} />
                                <span className="font-black text-xs tracking-widest">{isRecordingEnabled ? "CAM ON" : "CAM OFF"}</span>
                            </button>
                        </div>
                    </div>

                    {/* Stop Recording (Only visible if started) */}
                    {hasStarted && (
                        <div className="flex-shrink-0 group/tooltip relative p-1 bg-red-600/10 backdrop-blur-xl border border-red-500/20 rounded-2xl sm:rounded-3xl shadow-[0_0_30px_rgba(220,38,38,0.2)]">
                            <button
                                onClick={onStop}
                                className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 md:px-6 h-10 sm:h-12 rounded-xl sm:rounded-2xl bg-red-600 hover:bg-red-500 text-white transition-all duration-300 shadow-lg shadow-red-900/40 hover:scale-[1.05] active:scale-95"
                            >
                                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-sm" />
                                <span className="font-black text-xs sm:text-sm tracking-widest">STOP</span>
                            </button>
                        </div>
                    )}

                    {/* Recording Stats */}
                    <div className="flex items-center gap-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-1 shadow-xl">
                        <div className="group/tooltip relative">
                            <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 h-10 sm:h-12 bg-white/5 rounded-xl sm:rounded-2xl border border-white/5">
                                <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${hasStarted ? 'bg-red-500 animate-pulse' : 'bg-zinc-600'}`} />
                                <span className="text-xs sm:text-sm font-black text-white tabular-nums tracking-tight">
                                    {formatTime(recordingTime)}
                                </span>
                            </div>
                        </div>

                        <div className="group/tooltip relative">
                            <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 h-10 sm:h-12 bg-white/10 rounded-xl sm:rounded-2xl border border-emerald-500/20">
                                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M12 6v6l4 2" />
                                </svg>
                                <span className="text-[10px] sm:text-xs font-black text-emerald-500 uppercase tracking-tighter">{estimatedReadingTime}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side Controls - Settings */}
            <div className={`fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 transition-all duration-700 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0 pointer-events-none"}`}>
                <div className="flex flex-col items-center gap-2 sm:gap-3 p-1 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl shadow-xl">
                    {/* Mirror */}
                    <div className="group/tooltip relative">
                        <button
                            onClick={() => setIsMirrored(!isMirrored)}
                            className={`flex flex-col items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl transition-all duration-300 border ${isMirrored ? 'bg-blue-600/20 border-blue-500/40 text-blue-400' : 'bg-white/5 border-white/5 text-white hover:text-white'}`}
                        >
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 mb-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M12 21V3M3 9l3-3 3 3M3 6h6M21 9l-3-3-3 3M21 6h-6" />
                            </svg>
                            <span className="text-[6px] sm:text-[7px] font-black uppercase tracking-tighter">Mirror</span>
                        </button>
                        <div className="absolute right-full top-1/2 -translate-y-1/2 mr-2 px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm text-white rounded-lg sm:rounded-xl whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-all duration-300 pointer-events-none border border-blue-400/30 shadow-[0_0_15px_rgba(34,34,247,0.5)] z-50 font-bold uppercase tracking-wider translate-x-2 group-hover/tooltip:translate-x-0"
                            style={{ backgroundColor: '#2222F7' }}
                        >
                            Flip text horizontally
                        </div>
                    </div>

                    {/* Reverse */}
                    <div className="group/tooltip relative">
                        <button
                            onClick={() => setIsReversed(!isReversed)}
                            className={`flex flex-col items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl transition-all duration-300 border ${isReversed ? 'bg-purple-600/20 border-purple-500/40 text-purple-400' : 'bg-white/5 border-white/5 text-white hover:text-white'}`}
                        >
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 mb-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M7 13l5-5 5 5M7 17l5-5 5 5" />
                            </svg>
                            <span className="text-[6px] sm:text-[7px] font-black uppercase tracking-tighter">Reverse</span>
                        </button>
                        <div className="absolute right-full top-1/2 -translate-y-1/2 mr-2 px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm text-white rounded-lg sm:rounded-xl whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-all duration-300 pointer-events-none border border-blue-400/30 shadow-[0_0_15px_rgba(34,34,247,0.5)] z-50 font-bold uppercase tracking-wider translate-x-2 group-hover/tooltip:translate-x-0"
                            style={{ backgroundColor: '#2222F7' }}
                        >
                            Change scroll direction
                        </div>
                    </div>

                    {/* Edit */}
                    <div className="group/tooltip relative">
                        <button
                            onClick={() => setIsEditorOpen(true)}
                            className="flex flex-col items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/5 border border-white/5 text-white hover:text-white transition-all duration-300 hover:bg-white/10 active:scale-95"
                        >
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 mb-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                            <span className="text-[6px] sm:text-[7px] font-black uppercase">Edit</span>
                        </button>
                        <div className="absolute right-full top-1/2 -translate-y-1/2 mr-2 px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm text-white rounded-lg sm:rounded-xl whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-all duration-300 pointer-events-none border border-blue-400/30 shadow-[0_0_15px_rgba(34,34,247,0.5)] z-50 font-bold uppercase tracking-wider translate-x-2 group-hover/tooltip:translate-x-0"
                            style={{ backgroundColor: '#2222F7' }}
                        >
                            Edit script text
                        </div>
                    </div>

                    {/* Countdown */}
                    <div className="relative group/tooltip">
                        <button
                            onClick={() => setCountdownSeconds(countdownSeconds === 3 ? 5 : countdownSeconds === 5 ? 10 : countdownSeconds === 10 ? 0 : 3)}
                            className="flex flex-col items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/5 border border-white/5 text-white hover:text-white transition-all duration-300 active:scale-95"
                        >
                            <span className="text-xs sm:text-sm font-black text-amber-500">{countdownSeconds}</span>
                            <span className="text-[6px] sm:text-[7px] font-black uppercase">Secs</span>
                        </button>
                        <div className="absolute right-full top-1/2 -translate-y-1/2 mr-2 px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm text-white rounded-lg sm:rounded-xl whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-all duration-300 pointer-events-none border border-blue-400/30 shadow-[0_0_15px_rgba(34,34,247,0.5)] z-50 font-bold uppercase tracking-wider -translate-x-2 group-hover/tooltip:translate-x-0"
                            style={{ backgroundColor: '#2222F7' }}
                        >
                            Countdown delay
                        </div>
                    </div>

                    {/* Device Settings */}
                    <div className="group/tooltip relative">
                        <button
                            onClick={() => setIsDeviceSettingsOpen(true)}
                            className="flex flex-col items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/5 border border-white/5 text-white hover:text-white transition-all duration-300 hover:bg-white/10 active:scale-95"
                        >
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 mb-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <circle cx="12" cy="12" r="3" />
                                <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
                            </svg>
                            <span className="text-[6px] sm:text-[7px] font-black uppercase">Devices</span>
                        </button>
                        <div className="absolute right-full top-1/2 -translate-y-1/2 mr-2 px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm text-white rounded-lg sm:rounded-xl whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-all duration-300 pointer-events-none border border-blue-400/30 shadow-[0_0_15px_rgba(34,34,247,0.5)] z-50 font-bold uppercase tracking-wider -translate-x-2 group-hover/tooltip:translate-x-0"
                            style={{ backgroundColor: '#2222F7' }}
                        >
                            Camera & audio settings
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <TextEditorModal
                isOpen={isEditorOpen}
                onClose={() => setIsEditorOpen(false)}
                text={text}
                setText={setText}
            />

            <DeviceSettingsModal
                isOpen={isDeviceSettingsOpen}
                onClose={() => setIsDeviceSettingsOpen(false)}
                selectedVideoDevice={selectedVideoDevice}
                selectedAudioDevice={selectedAudioDevice}
                onDeviceChange={onDeviceChange}
                textColor={textColor}
                setTextColor={setTextColor}
            />
        </>
    );
};