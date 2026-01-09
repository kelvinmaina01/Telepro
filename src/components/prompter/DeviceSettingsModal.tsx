"use client";

import React, { useState, useEffect } from "react";

interface DeviceSettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedVideoDevice: string;
    selectedAudioDevice: string;
    onDeviceChange: (videoDeviceId: string, audioDeviceId: string) => void;
}

const CameraIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
        <circle cx="12" cy="13" r="4" />
    </svg>
);

const MicIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
        <path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8" />
    </svg>
);

export const DeviceSettingsModal: React.FC<DeviceSettingsModalProps> = ({
    isOpen,
    onClose,
    selectedVideoDevice,
    selectedAudioDevice,
    onDeviceChange,
}) => {
    const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
    const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);
    const [tempVideoDevice, setTempVideoDevice] = useState(selectedVideoDevice);
    const [tempAudioDevice, setTempAudioDevice] = useState(selectedAudioDevice);

    useEffect(() => {
        if (isOpen) {
            loadDevices();
        }
    }, [isOpen]);

    const loadDevices = async () => {
        try {
            const devices = await navigator.mediaDevices.enumerateDevices();
            setVideoDevices(devices.filter(d => d.kind === 'videoinput'));
            setAudioDevices(devices.filter(d => d.kind === 'audioinput'));
        } catch (err) {
            console.error('Error loading devices:', err);
        }
    };

    const handleSave = () => {
        onDeviceChange(tempVideoDevice, tempAudioDevice);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div
                className="relative w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                style={{
                    background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(20,20,20,0.9) 100%)',
                    backdropFilter: 'blur(20px)',
                }}
            >

                {/* Header */}
                <div
                    className="flex items-center justify-between px-6 py-4 border-b border-white/10"
                    style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                    }}
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center text-blue-400 border border-blue-500/30 backdrop-blur-md">
                            <CameraIcon />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">Device Settings</h2>
                            <p className="text-sm text-zinc-400 mt-0.5">Select camera and microphone</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-xl bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-all duration-200 flex items-center justify-center border border-white/10"
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Camera Selection */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-white mb-3">
                            <CameraIcon />
                            Camera
                        </label>
                        <select
                            value={tempVideoDevice}
                            onChange={(e) => setTempVideoDevice(e.target.value)}
                            className="w-full px-4 py-3 bg-black/40 text-white rounded-xl border border-white/10 focus:border-white/20 focus:outline-none backdrop-blur-sm"
                        >
                            {videoDevices.map(device => (
                                <option key={device.deviceId} value={device.deviceId}>
                                    {device.label || `Camera ${device.deviceId.slice(0, 8)}`}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Microphone Selection */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-white mb-3">
                            <MicIcon />
                            Microphone
                        </label>
                        <select
                            value={tempAudioDevice}
                            onChange={(e) => setTempAudioDevice(e.target.value)}
                            className="w-full px-4 py-3 bg-black/40 text-white rounded-xl border border-white/10 focus:border-white/20 focus:outline-none backdrop-blur-sm"
                        >
                            {audioDevices.map(device => (
                                <option key={device.deviceId} value={device.deviceId}>
                                    {device.label || `Microphone ${device.deviceId.slice(0, 8)}`}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Footer */}
                <div
                    className="flex items-center justify-end gap-3 px-6 py-4 border-t border-white/10"
                    style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                    }}
                >
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-all duration-200 font-medium border border-white/10"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-6 py-2.5 bg-gradient-to-br from-emerald-500/80 to-green-600/80 hover:from-emerald-400/90 hover:to-green-500/90 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg backdrop-blur-md border border-white/10"
                    >
                        Apply
                    </button>
                </div>
            </div>
        </div>
    );
};
