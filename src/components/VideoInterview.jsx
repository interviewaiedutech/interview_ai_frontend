import React, { useState, useRef, useEffect } from "react";
import RecordRTC from "recordrtc";
import "../styles/VideoInterview.css";

const VideoInterview = ({ question, onAnswerComplete, onNextQuestion }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [videoUrl, setVideoUrl] = useState(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [finalTranscript, setFinalTranscript] = useState("");
  //18-05-2026
  const [isSubmitting, setIsSubmitting] = useState(false);

  const recorderRef = useRef(null);
  const streamRef = useRef(null);
  const timerRef = useRef(null);
  const recognitionRef = useRef(null);
  const videoChunksRef = useRef([]);
  const liveVideoRef = useRef(null);
  const previewVideoRef = useRef(null);

  // Reset everything when question changes
  useEffect(() => {
    // Clean up previous recording
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }

    // Reset all states
    setIsRecording(false);
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
    }
    setVideoUrl(null);
    setIsPreviewMode(false);
    setTranscript("");
    setFinalTranscript("");
    setRecordingTime(0);
    recorderRef.current = null;
    videoChunksRef.current = [];
  }, [question]);

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onresult = (event) => {
        let interimTranscript = "";
        let finalTranscriptText = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptPart = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscriptText += transcriptPart + " ";
          } else {
            interimTranscript += transcriptPart;
          }
        }

        if (finalTranscriptText) {
          setFinalTranscript((prev) => prev + finalTranscriptText);
          setTranscript(finalTranscriptText);
        } else {
          setTranscript(interimTranscript);
        }
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
      }
    };
  }, []);
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      streamRef.current = stream;

      if (liveVideoRef.current) {
        liveVideoRef.current.srcObject = stream;
        await liveVideoRef.current.play();
      }

      return stream;
    } catch (error) {
      console.error("Camera error:", error);
      alert("Please allow camera and microphone access to continue");
      return null;
    }
  };

  const startRecording = async () => {
    const stream = await startCamera();
    if (!stream) return;

    // Reset for new recording
    setTranscript("");
    setFinalTranscript("");
    setVideoUrl(null);
    setIsPreviewMode(false);
    videoChunksRef.current = [];

    // Start video recording
    recorderRef.current = new RecordRTC(stream, {
      type: "video",
      mimeType: "video/webm",
      disableLogs: true,
    });
    recorderRef.current.startRecording();

    // Start speech recognition
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.log("Recognition already started");
      }
    }

    setIsRecording(true);

    // Start timer
    setRecordingTime(0);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    if (!recorderRef.current || !isRecording) return;

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    recorderRef.current.stopRecording(() => {
      const blob = recorderRef.current.getBlob();

      if (!blob) {
        console.error("No blob found");
        return;
      }

      const url = URL.createObjectURL(blob);

      setVideoUrl(url);

      if (liveVideoRef.current) {
        liveVideoRef.current.srcObject = null;

        liveVideoRef.current.src = url;

        liveVideoRef.current.load();

        liveVideoRef.current.onloadedmetadata = () => {
          liveVideoRef.current.play().catch((e) => {
            console.log(e);
          });
        };
      }

      setIsPreviewMode(true);

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    });

    setIsRecording(false);
  };

  const handleReRecord = () => {
    // Clean up current video URL
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
    }
    setVideoUrl(null);
    setIsPreviewMode(false);
    setTranscript("");
    // Start fresh recording
    startRecording();
  };

  // const handleSubmitAndNext = () => {
  //   // Send only the transcript to backend, not the video blob
  //   const finalAnswerText = finalTranscript || transcript;

  //   if (onAnswerComplete) {
  //     onAnswerComplete(null, finalAnswerText, recordingTime);
  //   }

  //   if (onNextQuestion) {
  //     onNextQuestion();
  //   }

  //   // Clean up
  //   if (videoUrl) {
  //     URL.revokeObjectURL(videoUrl);
  //   }
  // };
  const handleSubmitAndNext = async () => {
    const finalAnswerText = finalTranscript || transcript;

    try {
      setIsSubmitting(true);

      if (onAnswerComplete) {
        await onAnswerComplete(null, finalAnswerText, recordingTime);
      }

      if (onNextQuestion) {
        onNextQuestion();
      }

      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="video-interview-container">
      <div className="video-interview-card">
        {/* Video Section */}
        <div className="video-section">
          <div className="video-wrapper">
            <video
              ref={liveVideoRef}
              autoPlay
              playsInline
              controls={isPreviewMode}
              muted={!isPreviewMode}
              className="camera-preview"
            />

            {isRecording && (
              <div className="recording-indicator">
                <span className="red-dot"></span>
                Recording... {formatTime(recordingTime)}
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="controls-section">
            {!isRecording && !isPreviewMode && (
              <button onClick={startRecording} className="btn-start">
                🎤 Start Recording
              </button>
            )}

            {isRecording && (
              <button onClick={stopRecording} className="btn-stop">
                ⏹️ Stop Recording
              </button>
            )}

            {isPreviewMode && (
              <div className="preview-controls">
                <button onClick={handleReRecord} className="btn-rerecord">
                  🔄 Re-record
                </button>
                {/* <button onClick={handleSubmitAndNext} className="btn-next">
                  Next Question →
                </button> */}
                <button
                  onClick={handleSubmitAndNext}
                  className="btn-next"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Evaluating..." : "Next Question →"}
                </button>
              </div>
            )}
          </div>

          {/* Live/Preview Transcript */}
          {(isRecording || isPreviewMode) &&
            (transcript || finalTranscript) && (
              <div className="transcript-box">
                <strong>
                  {isRecording ? "Live Transcript:" : "Your Answer Transcript:"}
                </strong>
                <p>{finalTranscript || transcript}</p>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default VideoInterview;
