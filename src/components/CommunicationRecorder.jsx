import React, { useState, useRef, useEffect, useCallback } from "react";
import RecordRTC from "recordrtc";
import "../styles/CommunicationRecorder.css";

/* ── Inline SVG icons ───────────────────────────────────── */
const IconStop = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
    <rect x="2" y="2" width="8" height="8" rx="2" />
  </svg>
);

const CommunicationRecorder = ({
  onRecordingComplete,
  autoStartDelay = 5000,
  silenceTimeout = 10000,
}) => {
  const [recordPhase, setRecordPhase] = useState("idle");
  const [recordingTime, setRecordingTime] = useState(0);
  const [countdown, setCountdown] = useState(0);

  const recorderRef = useRef(null);
  const streamRef = useRef(null);
  const timerRef = useRef(null);
  const silenceTimerRef = useRef(null);
  const recognitionRef = useRef(null);
  const videoRef = useRef(null);
  const lastSpeechTimeRef = useRef(Date.now());
  const finalTranscriptRef = useRef("");
  const recordPhaseRef = useRef("idle");

  useEffect(() => {
    return () => stopAllMedia();
  }, []);

  const stopAllMedia = useCallback(() => {
    if (streamRef.current)
      streamRef.current.getTracks().forEach((t) => t.stop());
    if (timerRef.current) clearInterval(timerRef.current);
    if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
    try {
      recognitionRef.current?.stop();
    } catch (_) {}
  }, []);

  // Speech Recognition
  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      console.warn("Speech recognition not supported");

      return;
    }
    const recognition = new SR();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      lastSpeechTimeRef.current = Date.now();
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
      let finalText = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal)
          finalText += event.results[i][0].transcript + " ";
      }
      if (finalText) finalTranscriptRef.current += finalText;
      startSilenceDetection();
    };

    recognition.onerror = (e) => console.error("Speech Recognition Error:", e);
    recognitionRef.current = recognition;
  }, []);

  const startCamera = async () => {
    if (streamRef.current) return streamRef.current;
    try {
      // CHECK CAMERA SUPPORT
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert("Camera is not supported in this browser.");

        return null;
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        // video: true,
        // audio: true,
        video: {
          width: 1280,
          height: 720,
          facingMode: "user",
        },

        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.muted = true;
        // await videoRef.current.play();
        try {
          await videoRef.current.play();
        } catch (err) {
          console.error("Video autoplay failed:", err);
        }
      }
      return stream;
    } catch (err) {
      console.error("Camera access error:", err);

      alert("Camera and microphone permissions are required.");
      return null;
    }
  };

  useEffect(() => {
    if (autoStartDelay > 0) {
      const timer = setTimeout(() => startWithCountdown(), autoStartDelay);
      return () => clearTimeout(timer);
    }
  }, [autoStartDelay]);

  const startWithCountdown = async () => {
    await startCamera();
    let count = 7;
    setCountdown(count);
    const interval = setInterval(() => {
      count--;
      setCountdown(count);
      if (count <= 0) {
        clearInterval(interval);
        setCountdown(0);
        startRecording();
      }
    }, 1000);
  };

  const startRecording = async () => {
    const stream = await startCamera();
    if (!stream) return;

    setRecordPhase("recording");
    setRecordingTime(0);
    finalTranscriptRef.current = "";
    lastSpeechTimeRef.current = Date.now();

    recorderRef.current = new RecordRTC(stream, {
      type: "video",
      mimeType: "video/webm",
    });
    recorderRef.current.startRecording();

    try {
      recognitionRef.current?.start();
    } catch (_) {}

    timerRef.current = setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);

    startSilenceDetection();
  };

  useEffect(() => {
    recordPhaseRef.current = recordPhase;
  }, [recordPhase]);

  const startSilenceDetection = () => {
    if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);

    silenceTimerRef.current = setTimeout(() => {
      if (recordPhaseRef.current === "recording") {
        if (Date.now() - lastSpeechTimeRef.current >= silenceTimeout) {
          stopRecording(true);
        }
      }
    }, silenceTimeout + 500);
  };

  const stopRecording = (autoSubmit = false) => {
    if (!recorderRef.current || recordPhase !== "recording") return;
    clearInterval(timerRef.current);
    clearTimeout(silenceTimerRef.current);
    try {
      recognitionRef.current?.stop();
    } catch (_) {}

    recorderRef.current.stopRecording(() => {
      setRecordPhase("submitting");
      const finalTranscript =
        finalTranscriptRef.current.trim() || "(No speech detected)";
      onRecordingComplete(finalTranscript, recordingTime);
    });
  };

  const formatTime = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="cr-recorder-panel" data-phase={recordPhase}>
      {/* Header */}
      <div className="cr-panel-header">
        <span
          className={`cr-panel-dot ${recordPhase === "recording" ? "cr-dot-red cr-dot-blink" : "cr-dot-blue"}`}
        />
        <span className="cr-panel-title">You — Live Camera</span>
        {recordPhase === "recording" && (
          <span className="cr-status-badge cr-badge-rec">
            REC {formatTime(recordingTime)}
          </span>
        )}
      </div>

      {/* Camera Feed */}
      <div
        className={`cr-user-body ${recordPhase === "recording" ? "is-recording" : ""}`}
      >
        <div className="cr-video-wrap">
          <video ref={videoRef} autoPlay playsInline className="cr-video" />
          {countdown > 0 && (
            <div className="cr-countdown-overlay">
              Starting in <strong>{countdown}</strong>…
            </div>
          )}
        </div>
      </div>

      {/* Waveform */}
      {recordPhase === "recording" && (
        <div className="cr-mic-row">
          <div className="cr-waveform">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div
                key={i}
                className="cr-wave-bar"
                style={{ animationDelay: `${i * 0.08}s` }}
              />
            ))}
          </div>
          <span>Speak clearly</span>
        </div>
      )}

      {/* Controls */}
      <div className="cr-controls">
        {recordPhase === "idle" && countdown === 0 && (
          <span className="cr-status-chip cr-chip-idle">
            <span className="cr-status-dot" />
            Waiting for AI…
          </span>
        )}

        {recordPhase === "idle" && countdown > 0 && (
          <span className="cr-status-chip cr-chip-waiting">
            <span className="cr-status-dot cr-dot-pulse" />
            Starting in {countdown}s
          </span>
        )}

        {recordPhase === "recording" && (
          <button
            onClick={() => stopRecording(false)}
            className="cr-btn cr-btn-stop"
          >
            <IconStop />
            Stop Recording
          </button>
        )}

        {recordPhase === "submitting" && (
          <div className="cr-btn-loading">
            <span className="cr-spinner" />
            Submitting…
          </div>
        )}
      </div>

      {/* Tips */}
      {recordPhase === "recording" && (
        <div className="cr-tips">
          Fullscreen Active • Speak naturally • 10 s silence = Auto Submit
        </div>
      )}
    </div>
  );
};

export default CommunicationRecorder;
