import React, { useState, useRef, useEffect } from "react";

// ============================================================
// TextToSpeech — speaks text via Web Speech API
// Props:
//   text        — string to speak
//   autoSpeak   — speak as soon as text + voices are ready
//   onSpeakEnd  — callback when speech finishes (used by VirtualInterview
//                 to unlock the "Start answering" button)
// ============================================================

const TextToSpeech = ({ text, autoSpeak = false, onSpeakEnd }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voicesReady, setVoicesReady] = useState(false);
  const voicesRef = useRef([]);
  const hasAutoSpokenRef = useRef(false); // prevent double-fire on re-render

  // ─── Load voices ────────────────────────────────────────────
  useEffect(() => {
    const load = () => {
      const v = window.speechSynthesis.getVoices();
      voicesRef.current = v;
      if (v.length > 0) setVoicesReady(true);
    };

    load();
    window.speechSynthesis.onvoiceschanged = load;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  // ─── Auto-speak when question changes ───────────────────────
  useEffect(() => {
    hasAutoSpokenRef.current = false; // reset for every new text
  }, [text]);

  useEffect(() => {
    if (autoSpeak && text && voicesReady && !hasAutoSpokenRef.current) {
      hasAutoSpokenRef.current = true;
      speak();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, voicesReady, autoSpeak]);

  // ─── Speak ──────────────────────────────────────────────────
  const speak = () => {
    if (!text || !window.speechSynthesis) return;

    window.speechSynthesis.cancel(); // stop anything in progress

    const utterance = new SpeechSynthesisUtterance(text);

    // Pick the best available English voice
    const voices = voicesRef.current;
    const preferred =
      voices.find((v) => v.lang === "en-US" && v.name.includes("Google")) ||
      voices.find((v) => v.lang === "en-US" && !v.localService) ||
      voices.find((v) => v.lang.startsWith("en-US")) ||
      voices.find((v) => v.lang.startsWith("en"));

    if (preferred) utterance.voice = preferred;

    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      onSpeakEnd?.();
    };
    utterance.onerror = (e) => {
      // "interrupted" fires when we cancel() for re-record; not a real error
      if (e.error !== "interrupted") console.error("TTS error:", e.error);
      setIsSpeaking(false);
      // Still call onSpeakEnd so the user isn't stuck if TTS fails
      onSpeakEnd?.();
    };

    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <div className="text-to-speech">
      <button
        onClick={isSpeaking ? stop : speak}
        className={`speak-btn ${isSpeaking ? "speaking" : ""}`}
      >
        {isSpeaking ? "🔊 Speaking..." : "🔊 Read Aloud"}
      </button>
      {isSpeaking && (
        <button onClick={stop} className="stop-btn">
          ⏹ Stop
        </button>
      )}
    </div>
  );
};

export default TextToSpeech;
