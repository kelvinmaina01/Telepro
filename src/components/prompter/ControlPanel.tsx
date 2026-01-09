"use client";

import React, { useState } from "react";
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
    textColor: string;
    setTextColor: (val: string) => void;
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
}

const formatTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
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
    textColor,
    setTextColor,
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
}) => {
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [isDeviceSettingsOpen, setIsDeviceSettingsOpen] = useState(false);

    return (
        <>
            {/* Main Toolbar */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
                <div
                    className="flex items-center gap-4 px-6 py-4 rounded-2xl backdrop-blur-2xl border border-white/10 shadow-2xl"
                    style={{
                        background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(20,20,20,0.8) 100%)',
                        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
                    }}
                >

                    {/* Play/Pause */}
                    <button
                        onClick={onPlayPause}
                        className={`relative w-12 h-12 rounded-xl transition-all duration-300 overflow-hidden group backdrop-blur-md ${isPlaying
                            ? "bg-gradient-to-br from-amber-500/80 to-orange-600/80 hover:from-amber-400/90 hover:to-orange-500/90"
                            : "bg-gradient-to-br from-emerald-500/80 to-green-600/80 hover:from-emerald-400/90 hover:to-green-500/90"
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
                    <div className="flex flex-col gap-1.5">
                        {/* Speed */}
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                            <svg className="w-3.5 h-3.5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 6v6l4 2" />
                            </svg>
                            <input
                                type="number"
                                min="1"
                                max="100"
                                value={speed}
                                onChange={(e) => setSpeed(Math.max(1, Math.min(100, Number(e.target.value))))}
                                className="w-9 bg-transparent text-white text-center text-sm font-bold outline-none"
                            />
                        </div>

                        {/* Font Size */}
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                            <svg className="w-3.5 h-3.5 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M9 4v3h5v12h3V7h5V4H9zM3 12h3v7h3v-7h3V9H3v3z" />
                            </svg>
                            <input
                                type="number"
                                min="20"
                                max="150"
                                value={fontSize}
                                onChange={(e) => setFontSize(Math.max(20, Math.min(150, Number(e.target.value))))}
                                className="w-9 bg-transparent text-white text-center text-sm font-bold outline-none"
                            />
                        </div>
                    </div>

                    {/* Stop */}
                    <button
                        onClick={onStop}
                        className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/80 to-red-600/80 hover:from-red-400/90 hover:to-red-500/90 text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 flex items-center justify-center backdrop-blur-md border border-white/10"
                        title="Stop & Reset"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M6 6h12v12H6z" />
                        </svg>
                    </button>

                    <div className="w-px h-8 bg-white/10" />

                    {/* Record */}
                    <button
                        onClick={() => setIsRecordingEnabled(!isRecordingEnabled)}
                        className={`relative w-12 h-12 rounded-xl transition-all duration-300 overflow-hidden group backdrop-blur-md flex items-center justify-center ${isRecordingEnabled
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
                        className={`w-11 h-11 rounded-xl transition-all duration-300 flex items-center justify-center ${isMirrored
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
                        className={`w-11 h-11 rounded-xl transition-all duration-300 flex items-center justify-center ${isReversed
                            ? "bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/50"
                            : "bg-white/5 text-zinc-400 hover:text-white border border-white/10 hover:bg-white/10"
                            } hover:scale-110 active:scale-95`}
                        title="Reverse Scroll"
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M17 3l4 4-4 4M3 11V9a4 4 0 014-4h14M7 21l-4-4 4-4M21 13v2a4 4 0 01-4 4H3" />
                        </svg>
                    </button>

                    <div className="w-px h-8 bg-white/10" />

                    {/* Timer */}
                    <div className={`flex items-center px-4 py-2.5 rounded-xl font-mono text-sm tracking-wider ${isRecordingEnabled && isPlaying
                        ? "bg-red-500/20 text-red-400 border border-red-500/50"
                        : "bg-white/5 text-white border border-white/10"
                        }`}>
                        <span className={isRecordingEnabled && isPlaying ? "animate-pulse" : ""}>
                            {formatTime(recordingTime)}
                        </span>
                    </div>

                    <div className="w-px h-8 bg-white/10" />

                    {/* Edit */}
                    <button
                        onClick={() => setIsEditorOpen(true)}
                        className="w-11 h-11 rounded-xl bg-white/5 text-zinc-400 hover:text-white border border-white/10 hover:bg-white/10 transition-all duration-300 flex items-center justify-center hover:scale-110 active:scale-95"
                        title="Edit Script"
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                    </button>

                    {/* Countdown */}
                    <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                        <svg className="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <circle cx="12" cy="13" r="8" />
                            <path d="M12 9v4l2 2M5 3l2 2M19 3l-2 2M12 3v2" />
                        </svg>
                        <input
                            type="number"
                            min="0"
                            max="10"
                            value={countdownSeconds}
                            onChange={(e) => setCountdownSeconds(Math.max(0, Math.min(10, Number(e.target.value))))}
                            className="w-8 bg-transparent text-white text-center text-sm font-bold outline-none"
                        />
                        <span className="text-zinc-500 text-xs">s</span>
                    </div>

                    {/* Device Settings */}
                    <button
                        onClick={() => setIsDeviceSettingsOpen(true)}
                        className="w-11 h-11 rounded-xl bg-white/5 text-zinc-400 hover:text-white border border-white/10 hover:bg-white/10 transition-all duration-300 flex items-center justify-center hover:scale-110 active:scale-95"
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
                <div className="flex items-center justify-center gap-4 px-4 py-2 text-xs text-zinc-500">
                    <span>Created by <a href="https://harda.dev" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors">harda.dev</a></span>
                    <span className="text-zinc-700">•</span>
                    <a href="https://github.com/hardaistee" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        GitHub
                    </a>
                    <span className="text-zinc-700">•</span>
                    <a href="https://buymeacoffee.com/hardaistee" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-amber-400 transition-colors flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.216 6.415l-.132-.666c-.119-.598-.388-1.163-1.001-1.379-.197-.069-.42-.098-.57-.241-.152-.143-.196-.366-.231-.572-.065-.378-.125-.756-.192-1.133-.057-.325-.102-.69-.25-.987-.195-.4-.597-.634-.996-.788a5.723 5.723 0 00-.626-.194c-1-.263-2.05-.36-3.077-.416a25.834 25.834 0 00-3.7.062c-.915.083-1.88.184-2.75.5-.318.116-.646.256-.888.501-.297.302-.393.77-.177 1.146.154.267.415.456.692.58.36.162.737.284 1.123.366 1.075.238 2.189.331 3.287.37 1.218.05 2.437.01 3.65-.118.299-.033.598-.073.896-.119.352-.054.578-.513.474-.834-.124-.383-.457-.531-.834-.473-.466.074-.96.108-1.382.146-1.177.08-2.358.082-3.536.006a22.228 22.228 0 01-1.157-.107c-.086-.01-.18-.025-.258-.036-.243-.036-.484-.08-.724-.13-.111-.027-.111-.185 0-.212h.005c.277-.06.557-.108.838-.147h.002c.131-.009.263-.032.394-.048a25.076 25.076 0 013.426-.12c.674.019 1.347.067 2.017.144l.228.031c.267.04.533.088.798.145.392.085.895.113 1.07.542.055.137.08.288.111.431l.319 1.484a.237.237 0 01-.199.284h-.003c-.037.006-.075.01-.112.015a36.704 36.704 0 01-4.743.295 37.059 37.059 0 01-4.699-.304c-.14-.017-.293-.042-.417-.06-.326-.048-.649-.108-.973-.161-.393-.065-.768-.032-1.123.161-.29.16-.527.404-.675.701-.154.316-.199.66-.267 1-.069.34-.176.707-.135 1.056.087.753.613 1.365 1.37 1.502a39.69 39.69 0 0011.343.376.483.483 0 01.535.53l-.071.697-1.018 9.907c-.041.41-.047.832-.125 1.237-.122.637-.553 1.028-1.182 1.171-.577.131-1.165.2-1.756.205-.656.004-1.31-.025-1.966-.022-.699.004-1.556-.06-2.095-.58-.475-.458-.54-1.174-.605-1.793l-.731-7.013-.322-3.094c-.037-.351-.286-.695-.678-.678-.336.015-.718.3-.678.679l.228 2.185.949 9.112c.147 1.344 1.174 2.068 2.446 2.272.742.12 1.503.144 2.257.156.966.016 1.942.053 2.892-.122 1.408-.258 2.465-1.198 2.616-2.657.34-3.332.683-6.663 1.024-9.995l.215-2.087a.484.484 0 01.39-.426c.402-.078.787-.212 1.074-.518.455-.488.546-1.124.385-1.766zm-1.478.772c-.145.137-.363.201-.578.233-2.416.359-4.866.54-7.308.46-1.748-.06-3.477-.254-5.207-.498-.17-.024-.353-.055-.47-.18-.22-.236-.111-.71-.054-.995.052-.26.152-.609.463-.646.484-.057 1.046.148 1.526.22.577.088 1.156.159 1.737.212 2.48.226 5.002.19 7.472-.14.45-.06.899-.13 1.345-.21.399-.072.84-.206 1.08.206.166.281.188.657.162.974a.544.544 0 01-.169.364zm-6.159 3.9c-.862.37-1.84.788-3.109.788a5.884 5.884 0 01-1.569-.217l.877 9.004c.065.78.717 1.38 1.5 1.38 0 0 1.243.065 1.658.065.447 0 1.786-.065 1.786-.065.783 0 1.434-.6 1.499-1.38l.94-9.95a3.996 3.996 0 00-1.322-.238c-.826 0-1.491.284-2.26.613z" />
                        </svg>
                        Buy me a coffee
                    </a>
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
