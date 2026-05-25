import React, { useState, useEffect } from "react";

const SpeechToText = ({ onTranscript, isListening, setIsListening }) => {
  const [transcript, setTranscript] = useState("");
  const [recognition, setRecognition] = useState(null);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    // Check browser support
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSupported(false);
      console.warn("Speech recognition not supported in this browser");
      return;
    }

    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = true;
    recognitionInstance.lang = "en-US";

    recognitionInstance.onresult = (event) => {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptPart = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcriptPart;
        } else {
          interimTranscript += transcriptPart;
        }
      }

      const currentTranscript = finalTranscript || interimTranscript;
      setTranscript(currentTranscript);
      onTranscript?.(currentTranscript);
    };

    recognitionInstance.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    setRecognition(recognitionInstance);
  }, [onTranscript]);

  useEffect(() => {
    if (recognition) {
      if (isListening) {
        recognition.start();
      } else {
        recognition.stop();
      }
    }
  }, [isListening, recognition]);

  if (!supported) {
    return (
      <div className="warning">
        ⚠️ Speech recognition not supported. Please use Chrome or Edge.
      </div>
    );
  }

  return (
    <div className="speech-to-text">
      <div className="microphone-status">
        {isListening ? (
          <span className="listening">🎙️ Listening... Speak now</span>
        ) : (
          <span className="not-listening">⏹️ Microphone off</span>
        )}
      </div>

      <div className="transcript-box">
        <p>{transcript || "Your answer will appear here..."}</p>
      </div>

      <button
        onClick={() => setIsListening(!isListening)}
        className={`mic-btn ${isListening ? "active" : ""}`}
      >
        {isListening ? "🔴 Stop Speaking" : "🎤 Start Speaking"}
      </button>
    </div>
  );
};

export default SpeechToText;
