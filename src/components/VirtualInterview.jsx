import React, { useState, useRef, useEffect, useCallback } from "react";
import RecordRTC from "recordrtc";
import TextToSpeech from "./TextToSpeech";
import "../styles/VirtualInterview.css";

const VirtualInterview = ({
  question,
  questionIndex,
  totalQuestions,
  onAnswerComplete,
}) => {
  const [aiPhase, setAiPhase] = useState("speaking");
  const [recordPhase, setRecordPhase] = useState("idle"); // idle | recording | submitting
  const [recordingTime, setRecordingTime] = useState(0);
  const [countdown, setCountdown] = useState(0);

  const isLastQuestion = questionIndex + 1 === totalQuestions;

  // Refs
  const recorderRef = useRef(null);
  const streamRef = useRef(null);
  const timerRef = useRef(null);
  const silenceTimerRef = useRef(null);
  const recognitionRef = useRef(null);
  const videoRef = useRef(null);
  const lastSpeechTimeRef = useRef(Date.now());
  const finalTranscriptRef = useRef("");
  const recordPhaseRef = useRef("idle");

  // Cleanup function
  const stopAllMedia = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (timerRef.current) clearInterval(timerRef.current);
    // if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
    try {
      recognitionRef.current?.stop();
    } catch (_) {}
  }, []);

  // Reset state when question changes
  useEffect(() => {
    // stopAllMedia();
    setAiPhase("speaking");
    setRecordPhase("idle");
    setRecordingTime(0);
    setCountdown(0);
    finalTranscriptRef.current = "";
    lastSpeechTimeRef.current = Date.now();
  }, [question]);

  useEffect(() => {
    recordPhaseRef.current = recordPhase;
  }, [recordPhase]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAllMedia();
    };
  }, [stopAllMedia]);

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

    recognition.onresult = (e) => {
      lastSpeechTimeRef.current = Date.now();
      // if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);

      let final = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) {
          final += e.results[i][0].transcript + " ";
        }
      }
      if (final) finalTranscriptRef.current += final;

      // startSilenceDetection();
    };

    recognition.onerror = (e) => console.error("SpeechRecognition error:", e);
    recognitionRef.current = recognition;

    return () => recognition.stop();
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
        // await videoRef.current.play().catch(() => {});
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

  const handleAiSpeechEnd = async () => {
    setAiPhase("waiting");
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

    // startSilenceDetection();
  };

  // const startSilenceDetection = () => {
  //   if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);

  //   silenceTimerRef.current = setTimeout(() => {
  //     if (recordPhaseRef.current === "recording") {
  //       const silenceDuration = Date.now() - lastSpeechTimeRef.current;
  //       if (silenceDuration >= 15000) {
  //         console.log("Auto stopping recording due to silence...");
  //         stopRecording(true);
  //       }
  //     }
  //   }, 15500);
  // };

  const stopRecording = async (autoSubmit = false) => {
    if (!recorderRef.current || recordPhase !== "recording") return;

    clearInterval(timerRef.current);
    // clearTimeout(silenceTimerRef.current);
    try {
      recognitionRef.current?.stop();
    } catch (_) {}

    recorderRef.current.stopRecording(async () => {
      setRecordPhase("submitting");

      const transcriptToSend =
        finalTranscriptRef.current.trim() || "(No speech detected)";

      try {
        await onAnswerComplete(transcriptToSend, recordingTime);

        // Only reset UI if not the last question
        if (!isLastQuestion) {
          setRecordPhase("idle");
        }
      } catch (err) {
        console.error("Error in onAnswerComplete:", err);
        setRecordPhase("recording"); // Only revert on actual error
      }
    });
  };

  const formatTime = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="vi-root">
      <div className="vi-progress">
        <div className="vi-progress-labels">
          <span>
            Question {questionIndex + 1} of {totalQuestions}
          </span>
          <span>
            {Math.round((questionIndex / totalQuestions) * 100)}% complete
          </span>
        </div>
        <div className="vi-progress-track">
          <div
            className="vi-progress-fill"
            style={{ width: `${(questionIndex / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      <div className="vi-split">
        {/* AI Interviewer Panel */}
        <div className="vi-panel vi-ai-panel">
          <div className="vi-panel-header">
            <span className="vi-panel-dot vi-dot-green" />
            <span className="vi-panel-title">AI Interviewer — Alex</span>
            <span
              className={`vi-status-badge ${aiPhase === "speaking" ? "badge-speaking" : "badge-wait"}`}
            >
              {aiPhase === "speaking" ? "Speaking" : "Listening"}
            </span>
          </div>

          <div className="vi-ai-body">
            <div
              className={`vi-avatar-wrap ${aiPhase === "speaking" ? "is-speaking" : ""}`}
            >
              <div className="vi-ring vi-ring-1" />
              <div className="vi-ring vi-ring-2" />
              <div className="vi-ring vi-ring-3" />
              <div className="vi-avatar">👩‍💼</div>
            </div>

            <div className="vi-ai-name">Alex Rivera</div>
            <div className="vi-ai-role">Senior Technical Recruiter</div>
            <div className="mock-question">{question}</div>

            {countdown > 0 && (
              <div className="countdown-overlay">
                Recording starts in <strong>{countdown}</strong>...
              </div>
            )}

            <div style={{ display: "none" }}>
              <TextToSpeech
                text={question}
                autoSpeak={true}
                onSpeakEnd={handleAiSpeechEnd}
              />
            </div>

            {aiPhase === "waiting" && (
              <div className="vi-waiting-hint">I'm listening...</div>
            )}
          </div>
        </div>

        {/* User Camera Panel */}
        <div className="vi-panel vi-user-panel">
          <div className="vi-panel-header">
            <span
              className={`vi-panel-dot ${recordPhase === "recording" ? "vi-dot-red vi-dot-blink" : "vi-dot-blue"}`}
            />
            <span className="vi-panel-title">You — Live Camera</span>
            {recordPhase === "recording" && (
              <span className="vi-status-badge badge-rec">
                REC {formatTime(recordingTime)}
              </span>
            )}
          </div>

          <div className="vi-user-body">
            <div
              className={`vi-video-wrap ${recordPhase === "recording" ? "is-recording" : ""}`}
            >
              <video ref={videoRef} autoPlay playsInline className="vi-video" />
            </div>

            {recordPhase === "recording" && (
              <div className="vi-mic-row">
                <div className="vi-waveform">
                  {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <div
                      key={i}
                      className="vi-wave-bar"
                      style={{ animationDelay: `${i * 0.08}s` }}
                    />
                  ))}
                </div>
                <span>Speak clearly</span>
              </div>
            )}
          </div>

          <div className="vi-controls">
            {recordPhase === "recording" && (
              <button
                className="vi-btn vi-btn-stop"
                onClick={() => stopRecording(false)}
              >
                Stop Recording
              </button>
            )}

            {recordPhase === "submitting" && (
              <div className="vi-btn vi-btn-loading">
                <span className="vi-spinner" /> Submitting Answer...
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="vi-tips">Fullscreen Active • Speak naturally</div>
    </div>
  );
};

export default VirtualInterview;
