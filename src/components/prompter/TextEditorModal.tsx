"use client";

import React, { useState, useEffect } from "react";

// No limits - everything is free!
const WORD_LIMIT = Infinity;

interface TextEditorModalProps {
    isOpen: boolean;
    onClose: () => void;
    text: string;
    onSave: (text: string) => void;
    textColor: string;
    setTextColor: (color: string) => void;
}

const CloseIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 6L6 18M6 6l12 12" />
    </svg>
);

const SaveIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 13l4 4L19 7" />
    </svg>
);

const colorPresets = [
    { name: "White", value: "#ffffff" },
    { name: "Yellow", value: "#fbbf24" },
    { name: "Amber", value: "#f59e0b" },
    { name: "Orange", value: "#fb923c" },
    { name: "Red", value: "#f87171" },
    { name: "Rose", value: "#f43f5e" },
    { name: "Pink", value: "#f472b6" },
    { name: "Fuchsia", value: "#d946ef" },
    { name: "Purple", value: "#a855f7" },
    { name: "Violet", value: "#8b5cf6" },
    { name: "Indigo", value: "#6366f1" },
    { name: "Blue", value: "#60a5fa" },
    { name: "Cyan", value: "#22d3ee" },
    { name: "Teal", value: "#14b8a6" },
    { name: "Emerald", value: "#10b981" },
    { name: "Green", value: "#34d399" },
    { name: "Lime", value: "#84cc16" },
    { name: "Slate", value: "#64748b" },
];

export const TextEditorModal: React.FC<TextEditorModalProps> = ({
    isOpen,
    onClose,
    text,
    onSave,
    textColor,
    setTextColor,
}) => {
    const [editText, setEditText] = useState(text);
    const [showLimitWarning, setShowLimitWarning] = useState(false);

    const wordLimit = WORD_LIMIT; // Infinity - no limits

    useEffect(() => {
        setEditText(text);
    }, [text, isOpen]);

    // Calculate word count
    const wordCount = editText.trim() ? editText.trim().split(/\s+/).length : 0;

    // Check if over limit (always false since limit is Infinity)
    const isOverLimit = false; // wordCount > wordLimit is always false when wordLimit is Infinity
    const isNearLimit = false; // No warnings needed - everything is unlimited

    // Handle text change with limit enforcement
    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = e.target.value;
        setEditText(newText);
        setShowLimitWarning(false);
    };

    if (!isOpen) return null;

    const handleSave = () => {
        onSave(editText);
        onClose();
    };

    // Calculate line count
    const lineCount = editText.split('\n').length;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div
                className="relative w-[95%] md:w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex flex-col max-h-[90vh]"
                style={{
                    background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(20,20,20,0.9) 100%)',
                    backdropFilter: 'blur(20px)',
                }}
            >

                {/* Header */}
                <div
                    className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 border-b border-white/10 shrink-0"
                    style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                    }}
                >
                    <div>
                        <h2 className="text-xl font-bold text-white">Script Editor</h2>
                        <p className="text-sm text-zinc-400 mt-0.5">Edit your teleprompter script</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-xl bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-all duration-200 flex items-center justify-center border border-white/10"
                    >
                        <CloseIcon />
                    </button>
                </div>

                {/* Color Picker */}
                <div className="px-4 md:px-6 py-3 border-b border-white/10 shrink-0">
                    <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-sm text-zinc-400">Text Color:</span>
                        <div className="flex items-center gap-2 flex-wrap">
                            {colorPresets.map((color) => (
                                <button
                                    key={color.value}
                                    onClick={() => setTextColor(color.value)}
                                    className={`w-7 h-7 rounded-full border-2 transition-all duration-200 ${textColor === color.value
                                        ? 'border-white scale-110'
                                        : 'border-white/20 hover:border-white/50'
                                        }`}
                                    style={{ backgroundColor: color.value }}
                                    title={color.name}
                                />
                            ))}
                            <input
                                type="color"
                                value={textColor}
                                onChange={(e) => setTextColor(e.target.value)}
                                className="w-7 h-7 rounded-full cursor-pointer border-2 border-white/20 hover:border-white/50"
                                title="Custom color"
                            />
                        </div>
                    </div>
                </div>

                {/* Editor */}
                <div className="flex-1 p-4 md:p-6 overflow-hidden flex flex-col">
                    <textarea
                        value={editText}
                        onChange={handleTextChange}
                        placeholder="Paste or type your script here..."
                        className="flex-1 w-full bg-zinc-900/80 text-white rounded-xl p-4 resize-none focus:outline-none focus:ring-2 border border-white/10 focus:ring-emerald-500/50 text-lg leading-relaxed"
                        style={{
                            minHeight: '300px',
                        }}
                    />

                    {/* Info bar */}
                    <div className="mt-4 flex items-center justify-between text-sm shrink-0">
                        <div className="flex items-center gap-4">
                            <span className="text-zinc-500 hidden md:inline">
                                Tip: Each line appears as a separate paragraph on screen
                            </span>
                            {/* No upgrade prompts - everything is free! */}
                            {showLimitWarning && (
                                <span className="text-red-500 text-xs">
                                    ⚠️ Word limit reached
                                </span>
                            )}
                        </div>
                        <div className="flex items-center gap-4 text-zinc-600 font-mono text-xs">
                            <span className="text-zinc-400">
                                {wordCount} words
                            </span>
                            <span>{lineCount} lines</span>
                            <span>{editText.length} characters</span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div
                    className="flex items-center justify-between gap-3 px-4 md:px-6 py-3 md:py-4 border-t border-white/10 shrink-0"
                    style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                    }}
                >
                    <div>
                        {/* No limit warnings - everything is free! */}
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onClose}
                            className="px-5 py-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-all duration-200 font-medium border border-white/10"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="flex items-center gap-2 px-6 py-2.5 font-semibold rounded-xl transition-all duration-200 shadow-lg backdrop-blur-md border border-white/10 bg-gradient-to-br from-emerald-500/80 to-green-600/80 hover:from-emerald-400/90 hover:to-green-500/90 text-white"
                        >
                            <SaveIcon />
                            <span>Save</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
