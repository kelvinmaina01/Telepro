"use client";

import React, { useEffect, useRef, useState } from "react";

interface CameraLayerProps {
  isRecording: boolean;
  shouldStopRecording: boolean;
  onRecordingStopped: () => void;
  onRecordingComplete?: (blob: Blob, url: string) => void;
  onRecordingTimeUpdate: (seconds: number) => void;
  onCameraError?: () => void;
  videoDeviceId?: string;
  audioDeviceId?: string;
  isCameraEnabled: boolean;
}

export const CameraLayer: React.FC<CameraLayerProps> = ({
  isRecording,
  shouldStopRecording,
  onRecordingStopped,
  onRecordingComplete,
  onRecordingTimeUpdate,
  onCameraError,
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
  const onRecordingStoppedRef = useRef(onRecordingStopped);
  const onCameraErrorRef = useRef(onCameraError);

  // Keep callback refs updated
  useEffect(() => {
    onRecordingStoppedRef.current = onRecordingStopped;
  }, [onRecordingStopped]);

  useEffect(() => {
    onCameraErrorRef.current = onCameraError;
  }, [onCameraError]);

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

        setIsStreamReady(true);
        setError(null);
      } catch (err) {
        console.error("Camera access error:", err);
        setError("Camera access denied or unavailable. Please click the 'Enable Camera' button and allow camera access when prompted.");
        // Notify parent to disable recording
        if (onCameraErrorRef.current) {
          onCameraErrorRef.current();
        }
      }
    };

    startCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [videoDeviceId, audioDeviceId, isCameraEnabled]);

  // Handle starting recording
  useEffect(() => {
    if (!isStreamReady || !streamRef.current || !isRecording) return;
    if (isRecordingRef.current) return; // Already recording

    const startRecording = () => {
      try {
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
            chunksRef.current.push(e.data);
          }
        };

        recorder.onerror = () => {
          // Silent error handling
        };

        recorder.onstop = () => {
          if (chunksRef.current.length === 0) {
            onRecordingStoppedRef.current();
            return;
          }

          const blob = new Blob(chunksRef.current, { type: mimeTypeRef.current });

          if (blob.size === 0) {
            onRecordingStoppedRef.current();
            return;
          }

          const url = URL.createObjectURL(blob);

          // If onRecordingComplete is provided, parent handles the video (e.g. for review)
          // Otherwise, we still call onRecordingStopped but don't download
          if (onRecordingComplete) {
            onRecordingComplete(blob, url);
          } else {
            // Fallback for default behavior if no complete handler
            onRecordingStoppedRef.current();
          }

          chunksRef.current = [];
          isRecordingRef.current = false;
        };

        // Start recording with timeslice for regular data chunks
        recorder.start(1000);

      } catch {
        setError("Recording failed to start.");
        isRecordingRef.current = false;
      }
    };

    startRecording();
  }, [isRecording, isStreamReady, onRecordingTimeUpdate]);

  // Handle stop recording signal
  useEffect(() => {
    if (!shouldStopRecording) return;
    if (!isRecordingRef.current) {
      // Not recording, just notify parent
      onRecordingStoppedRef.current();
      return;
    }

    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current);
      recordingIntervalRef.current = null;
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
    }
  }, [shouldStopRecording]);

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
