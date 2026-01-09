"use client";

import React, { useState, useEffect } from "react";

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

export const TextEditorModal: React.FC<TextEditorModalProps> = ({
    isOpen,
    onClose,
    text,
    onSave,
    textColor,
    setTextColor,
}) => {
    const [editText, setEditText] = useState(text);

    useEffect(() => {
        setEditText(text);
    }, [text, isOpen]);

    if (!isOpen) return null;

    const handleSave = () => {
        onSave(editText);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div
                className="relative w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl border border-white/10"
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

                {/* Editor */}
                <div className="p-6">
                    <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="w-full h-[55vh] p-4 bg-black/40 text-white text-base leading-relaxed rounded-xl border border-white/10 focus:border-white/20 focus:outline-none resize-none font-sans placeholder-zinc-500 backdrop-blur-sm"
                        placeholder="Paste or type your script here..."
                        autoFocus
                    />

                    {/* Info bar */}
                    <div className="mt-4 flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4">
                            <span className="text-zinc-500">
                                💡 Add line breaks for easier reading
                            </span>
                            <div className="flex items-center gap-2">
                                <span className="text-zinc-400 text-xs">Text Color:</span>
                                <input
                                    type="color"
                                    value={textColor}
                                    onChange={(e) => setTextColor(e.target.value)}
                                    className="w-10 h-8 rounded-lg cursor-pointer bg-white/5 border border-white/10 p-1 transition-all duration-200 hover:scale-105"
                                    title="Text Color"
                                />
                            </div>
                        </div>
                        <span className="text-zinc-600 font-mono text-xs">
                            {editText.length} characters
                        </span>
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
                        className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-br from-emerald-500/80 to-green-600/80 hover:from-emerald-400/90 hover:to-green-500/90 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg backdrop-blur-md border border-white/10"
                    >
                        <SaveIcon />
                        <span>Save</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
