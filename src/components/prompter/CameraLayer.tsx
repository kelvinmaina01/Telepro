"use client";

import React, { useEffect, useRef, useState } from "react";

interface CameraLayerProps {
  isRecording: boolean;
  onRecordingTimeUpdate: (seconds: number) => void;
  videoDeviceId?: string;
  audioDeviceId?: string;
  isCameraEnabled: boolean;
}

export const CameraLayer: React.FC<CameraLayerProps> = ({
  isRecording,
  onRecordingTimeUpdate,
  videoDeviceId,
  audioDeviceId,
  isCameraEnabled,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isStreamReady, setIsStreamReady] = useState(false);
  const streamRef = useRef<MediaStream | null>(null);
  const recordingStartTimeRef = useRef<number>(0);
  const recordingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isRecordingRef = useRef(false);
  const mimeTypeRef = useRef<string>("video/webm");

  // Initialize or stop camera based on isCameraEnabled
  useEffect(() => {
    // If camera is disabled, stop everything
    if (!isCameraEnabled) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setIsStreamReady(false);
      return;
    }

    const startCamera = async () => {
      try {
        const constraints: MediaStreamConstraints = {
          video: videoDeviceId
            ? { deviceId: { exact: videoDeviceId } }
            : { facingMode: "user" },
          audio: audioDeviceId
            ? {
              deviceId: { exact: audioDeviceId },
              echoCancellation: true,
              noiseSuppression: true,
              autoGainControl: true,
            }
            : {
              echoCancellation: true,
              noiseSuppression: true,
              autoGainControl: true,
            },
        };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        // Determine best mime type
        const types = [
          "video/mp4",
          "video/mp4;codecs=avc1,aac",
          "video/mp4;codecs=h264,aac",
          "video/webm;codecs=vp9,opus",
          "video/webm;codecs=vp8,opus",
          "video/webm",
        ];
        for (const type of types) {
          if (MediaRecorder.isTypeSupported(type)) {
            mimeTypeRef.current = type;
            break;
          }
        }
        console.log(`Camera ready. Will use MIME type: ${mimeTypeRef.current}`);

        setIsStreamReady(true);
        setError(null);
      } catch (err) {
        console.error("Error accessing camera:", err);
        setError("Camera access denied or unavailable.");
      }
    };

    startCamera();

    return () => {
      // Cleanup on unmount or dependency change is handled by the start of the effect for the *next* run
      // or here if we want to be safe. 
      // Actually, we should cleanup normally here too.
      if (streamRef.current) {
        // Don't stop tracks here if we are just re-rendering, but in this case simple cleanup is safer
        // However, React Strict Mode might double invoke.
        // Let's rely on the check at the start of the function and this cleanup.
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [videoDeviceId, audioDeviceId, isCameraEnabled]);

  // Handle recording state changes
  useEffect(() => {
    if (!isStreamReady || !streamRef.current) return;

    const startRecording = () => {
      if (isRecordingRef.current) return; // Already recording

      try {
        console.log("Starting recording...");

        const recorder = new MediaRecorder(streamRef.current!, {
          mimeType: mimeTypeRef.current,
          audioBitsPerSecond: 128000,
          videoBitsPerSecond: 2500000,
        });

        mediaRecorderRef.current = recorder;
        chunksRef.current = [];
        recordingStartTimeRef.current = Date.now();
        isRecordingRef.current = true;

        // Start recording time interval
        recordingIntervalRef.current = setInterval(() => {
          const elapsed = Math.floor(
            (Date.now() - recordingStartTimeRef.current) / 1000
          );
          onRecordingTimeUpdate(elapsed);
        }, 1000);

        recorder.ondataavailable = (e) => {
          if (e.data && e.data.size > 0) {
            console.log(`Chunk received: ${e.data.size} bytes`);
            chunksRef.current.push(e.data);
          }
        };

        recorder.onerror = (e) => {
          console.error("Recorder Error:", e);
        };

        recorder.onstop = () => {
          console.log(`Recorder stopped. Total chunks: ${chunksRef.current.length}`);

          if (chunksRef.current.length === 0) {
            console.error("No chunks recorded!");
            return;
          }

          const blob = new Blob(chunksRef.current, { type: mimeTypeRef.current });
          console.log(`Created blob: ${blob.size} bytes`);

          if (blob.size === 0) {
            console.error("Blob size is 0!");
            return;
          }

          const url = URL.createObjectURL(blob);
          const extension = mimeTypeRef.current.includes("mp4") ? "mp4" : "webm";
          const filename = `prompter-recording-${Date.now()}.${extension}`;

          console.log(`Downloading: ${filename}`);

          const a = document.createElement("a");
          a.style.display = "none";
          a.href = url;
          a.download = filename;
          document.body.appendChild(a);
          a.click();

          // Cleanup after a short delay
          setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          }, 100);

          chunksRef.current = [];
          onRecordingTimeUpdate(0);
          isRecordingRef.current = false;
        };

        // Start recording with timeslice for regular data chunks
        recorder.start(1000);
        console.log("Recording started successfully");

      } catch (e) {
        console.error("Failed to start recording:", e);
        setError("Recording failed to start.");
        isRecordingRef.current = false;
      }
    };

    const stopRecording = () => {
      if (!isRecordingRef.current) return; // Not recording

      console.log("Stopping recording...");

      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
        recordingIntervalRef.current = null;
      }

      if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
        mediaRecorderRef.current.stop();
      }
    };

    if (isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  }, [isRecording, isStreamReady, onRecordingTimeUpdate]);

  if (error && isCameraEnabled) {
    return (
      <div className="absolute inset-0 z-0 flex items-center justify-center bg-zinc-900 text-zinc-500">
        {error}
      </div>
    );
  }

  if (!isCameraEnabled) {
    return (
      <div className="absolute inset-0 z-0 overflow-hidden bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-black" />
    );
  }

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-black">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="h-full w-full object-cover opacity-80"
      />
      {/* Recording Indicator */}
      {isRecording && (
        <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-600/90 px-3 py-2 rounded-full z-20">
          <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
          <span className="text-white text-sm font-medium">REC</span>
        </div>
      )}
    </div>
  );
};
