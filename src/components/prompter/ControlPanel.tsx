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
            <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-40 w-[98%] md:w-auto max-w-[1200px]">
                <div
                    className="flex items-center gap-2 md:gap-5 px-4 md:px-8 pt-10 pb-3 md:pt-12 md:pb-5 rounded-3xl backdrop-blur-3xl border border-white/10 shadow-2xl overflow-x-auto md:overflow-visible no-scrollbar scroll-smooth"
                    style={{
                        background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(20,20,20,0.9) 100%)',
                        boxShadow: '0 20px 50px -12px rgba(0, 0, 0, 0.7), inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)',
                    }}
                >

                    {/* Play/Pause */}
                    <div className="relative group/tooltip shrink-0">
                        <button
                            onClick={onPlayPause}
                            className={`flex items-center gap-2.5 px-4 h-12 rounded-2xl transition-all duration-300 group ${isPlaying
                                ? "bg-amber-500/90 hover:bg-amber-400"
                                : "bg-emerald-500/90 hover:bg-emerald-400"
                                } shadow-lg hover:shadow-xl hover:scale-[1.05] active:scale-95 border border-white/10`}
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
                            <span className="text-white font-bold text-sm tracking-wide">{isPlaying ? "PAUSE" : "PLAY"}</span>
                        </button>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-2 py-1 bg-black/95 text-[10px] text-white rounded-lg whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none border border-white/10 shadow-xl z-50 font-bold uppercase tracking-widest">
                            {isPlaying ? "Pause scrolling" : "Start scrolling"}
                        </div>
                    </div>

                    {/* Speed & Font Size Group */}
                    <div className="shrink-0 flex items-center gap-3">
                        {/* Speed */}
                        <div className="relative group/tooltip flex flex-col gap-1 items-start">
                            <span className="text-[10px] font-bold text-zinc-500 ml-1 tracking-widest uppercase">Speed</span>
                            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
                                <svg className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                                    <path d="M12 12l4-4" />
                                </svg>
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    value={speedInput}
                                    onChange={(e) => setSpeedInput(e.target.value.replace(/[^0-9]/g, ''))}
                                    onBlur={handleSpeedBlur}
                                    className="w-8 bg-transparent text-white text-center text-base font-black outline-none"
                                />
                            </div>
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-2 py-1 bg-black/95 text-[10px] text-white rounded-lg whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none border border-white/10 shadow-xl z-50 font-bold uppercase tracking-widest">
                                Adjust scroll speed
                            </div>
                        </div>

                        {/* Font Size */}
                        <div className="relative group/tooltip flex flex-col gap-1 items-start">
                            <span className="text-[10px] font-bold text-zinc-500 ml-1 tracking-widest uppercase">Size</span>
                            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
                                <svg className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M4 7V4h16v3M9 20h6M12 4v16" />
                                </svg>
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    value={fontSizeInput}
                                    onChange={(e) => setFontSizeInput(e.target.value.replace(/[^0-9]/g, ''))}
                                    onBlur={handleFontSizeBlur}
                                    className="w-8 bg-transparent text-white text-center text-base font-black outline-none"
                                />
                            </div>
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-2 py-1 bg-black/95 text-[10px] text-white rounded-lg whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none border border-white/10 shadow-xl z-50 font-bold uppercase tracking-widest">
                                Adjust text size
                            </div>
                        </div>
                    </div>

                    {/* Stop */}
                    <div className="relative group/tooltip shrink-0">
                        <button
                            onClick={onStop}
                            className="flex items-center gap-2 px-4 h-12 rounded-2xl bg-white/5 hover:bg-red-500/20 text-red-500 transition-all duration-300 border border-white/5 hover:border-red-500/50 hover:scale-105 active:scale-95"
                        >
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                <path d="M6 6h12v12H6z" />
                            </svg>
                            <span className="font-bold text-sm tracking-wide">RESET</span>
                        </button>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-2 py-1 bg-black/95 text-[10px] text-white rounded-lg whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none border border-white/10 shadow-xl z-50 font-bold uppercase tracking-widest">
                            Reset to beginning
                        </div>
                    </div>

                    <div className="shrink-0 w-px h-10 bg-white/10" />

                    {/* Record */}
                    <div className="relative group/tooltip shrink-0">
                        <button
                            onClick={() => setIsRecordingEnabled(!isRecordingEnabled)}
                            className={`flex items-center gap-2.5 px-4 h-12 rounded-2xl transition-all duration-300 group ${isRecordingEnabled
                                ? "bg-red-500/90 text-white shadow-lg shadow-red-500/30"
                                : "bg-white/5 text-zinc-400 border border-white/10 hover:bg-white/10"
                                } hover:scale-105 active:scale-95`}
                        >
                            <div className={`w-3 h-3 rounded-full ${isRecordingEnabled ? 'bg-white animate-pulse' : 'bg-current'}`} />
                            <span className="font-bold text-sm tracking-wide">{isRecordingEnabled ? "VIDEO ON" : "VIDEO OFF"}</span>
                        </button>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-2 py-1 bg-black/95 text-[10px] text-white rounded-lg whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none border border-white/10 shadow-xl z-50 font-bold uppercase tracking-widest">
                            {isRecordingEnabled ? "Disable camera" : "Enable camera"}
                        </div>
                    </div>

                    {/* Layout Controls Group */}
                    <div className="shrink-0 flex items-center gap-2">
                        {/* Mirror */}
                        <div className="relative group/tooltip">
                            <button
                                onClick={() => setIsMirrored(!isMirrored)}
                                className={`flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all duration-300 ${isMirrored
                                    ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/50"
                                    : "bg-white/5 text-zinc-500 border border-white/10 hover:text-white"
                                    } hover:scale-110`}
                            >
                                <svg className="w-4 h-4 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M12 3v18M8 7H5l3 5-3 5h3M16 7h3l-3 5 3 5h-3" />
                                </svg>
                                <span className="text-[9px] font-black uppercase tracking-tighter">Mirror</span>
                            </button>
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-2 py-1 bg-black/95 text-[10px] text-white rounded-lg whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none border border-white/10 shadow-xl z-50 font-bold uppercase tracking-widest">
                                Flip text horizontally
                            </div>
                        </div>

                        {/* Reverse */}
                        <div className="relative group/tooltip">
                            <button
                                onClick={() => setIsReversed(!isReversed)}
                                className={`flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all duration-300 ${isReversed
                                    ? "bg-violet-500/20 text-violet-400 border border-violet-500/50"
                                    : "bg-white/5 text-zinc-500 border border-white/10 hover:text-white"
                                    } hover:scale-110`}
                            >
                                <svg className="w-4 h-4 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M7 21l-4-4 4-4M21 13v2a4 4 0 01-4 4H3M17 3l4 4-4 4M3 11V9a4 4 0 014-4h14" />
                                </svg>
                                <span className="text-[9px] font-black uppercase tracking-tighter">Reverse</span>
                            </button>
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-2 py-1 bg-black/95 text-[10px] text-white rounded-lg whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none border border-white/10 shadow-xl z-50 font-bold uppercase tracking-widest">
                                Change scroll direction
                            </div>
                        </div>
                    </div>

                    <div className="shrink-0 w-px h-10 bg-white/10" />

                    {/* Stats Group */}
                    <div className="shrink-0 flex items-center gap-3">
                        <div className="relative group/tooltip flex flex-col gap-1">
                            <span className="text-[10px] font-bold text-zinc-500 tracking-widest uppercase">Recording</span>
                            <div className={`flex items-center gap-2 px-3 py-2 rounded-xl font-mono text-sm font-black border transition-colors ${isRecordingEnabled && hasStarted
                                ? "bg-red-500/10 text-red-500 border-red-500/30"
                                : "bg-white/5 text-white border-white/10"
                                }`}>
                                <span className={isRecordingEnabled && hasStarted && isPlaying ? "animate-pulse" : ""}>
                                    {formatTime(recordingTime)}
                                </span>
                            </div>
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-2 py-1 bg-black/95 text-[10px] text-white rounded-lg whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none border border-white/10 shadow-xl z-50 font-bold uppercase tracking-widest">
                                Video duration
                            </div>
                        </div>

                        <div className="relative group/tooltip flex flex-col gap-1">
                            <span className="text-[10px] font-bold text-zinc-500 tracking-widest uppercase">Est. Read</span>
                            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-sm font-black">
                                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M12 6v6l4 2" />
                                </svg>
                                <span>{estimatedReadingTime}</span>
                            </div>
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-2 py-1 bg-black/95 text-[10px] text-white rounded-lg whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none border border-white/10 shadow-xl z-50 font-bold uppercase tracking-widest">
                                Estimated time to read
                            </div>
                        </div>
                    </div>

                    <div className="shrink-0 w-px h-10 bg-white/10" />

                    {/* Tools Group */}
                    <div className="shrink-0 flex items-center gap-2">
                        {/* Edit */}
                        <div className="relative group/tooltip">
                            <button
                                onClick={() => setIsEditorOpen(true)}
                                className="flex flex-col items-center justify-center w-14 h-14 rounded-2xl bg-white/5 text-zinc-500 border border-white/10 hover:text-white hover:bg-white/10 transition-all duration-300 hover:scale-110"
                            >
                                <svg className="w-4 h-4 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                                </svg>
                                <span className="text-[9px] font-black uppercase">Edit</span>
                            </button>
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-2 py-1 bg-black/95 text-[10px] text-white rounded-lg whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none border border-white/10 shadow-xl z-50 font-bold uppercase tracking-widest">
                                Edit script text
                            </div>
                        </div>

                        {/* Countdown */}
                        <div className="relative group/tooltip flex flex-col items-center justify-center w-14 h-14 rounded-2xl bg-white/5 text-zinc-500 border border-white/10 hover:bg-white/10 transition-colors group">
                            <input
                                type="text"
                                inputMode="numeric"
                                value={countdownInput}
                                onChange={(e) => setCountdownInput(e.target.value.replace(/[^0-9]/g, ''))}
                                onBlur={handleCountdownBlur}
                                className="w-6 bg-transparent text-white text-center text-sm font-black outline-none z-10"
                            />
                            <span className="text-[9px] font-black uppercase tracking-tighter">Secs</span>
                            <div className="absolute top-1 right-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-amber-500/50" />
                            </div>
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-2 py-1 bg-black/95 text-[10px] text-white rounded-lg whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none border border-white/10 shadow-xl z-50 font-bold uppercase tracking-widest">
                                Countdown delay
                            </div>
                        </div>

                        {/* Settings */}
                        <div className="relative group/tooltip">
                            <button
                                onClick={() => setIsDeviceSettingsOpen(true)}
                                className="flex flex-col items-center justify-center w-14 h-14 rounded-2xl bg-white/5 text-zinc-500 border border-white/10 hover:text-white hover:bg-white/10 transition-all duration-300 hover:scale-110"
                            >
                                <svg className="w-4 h-4 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                                    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
                                </svg>
                                <span className="text-[9px] font-black uppercase">Setup</span>
                            </button>
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-2 py-1 bg-black/95 text-[10px] text-white rounded-lg whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none border border-white/10 shadow-xl z-50 font-bold uppercase tracking-widest">
                                Camera & Mic settings
                            </div>
                        </div>
                    </div>

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
