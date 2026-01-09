"use client";
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

import React, { useState, useEffect } from "react";

interface TextEditorModalProps {
    isOpen: boolean;
    onClose: () => void;
    text: string;
    onSave: (text: string) => void;
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

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'color': [] }, { 'background': [] }],
            ['clean']
        ],
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

                {/* Editor */}
                <div className="flex-1 p-4 md:p-6 overflow-hidden flex flex-col">
                    <div className="flex-1 bg-white/90 rounded-xl overflow-hidden text-black">
                        <ReactQuill
                            theme="snow"
                            value={editText}
                            onChange={setEditText}
                            modules={modules}
                            className="h-full flex flex-col"
                        />
                    </div>

                    {/* Info bar */}
                    <div className="mt-4 flex items-center justify-between text-sm shrink-0">
                        <div className="flex items-center gap-4">
                            <span className="text-zinc-500 hidden md:inline">
                                💡 Use the toolbar to format your text
                            </span>
                        </div>
                        <span className="text-zinc-600 font-mono text-xs">
                            {editText.length} chars
                        </span>
                    </div>
                </div>

                {/* Footer */}
                <div
                    className="flex items-center justify-end gap-3 px-4 md:px-6 py-3 md:py-4 border-t border-white/10 shrink-0"
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
