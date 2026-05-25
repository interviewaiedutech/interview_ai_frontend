import React, { useState } from "react";
import VideoInterview from "../components/VideoInterview";
import SpeechToText from "../components/SpeechToText";
import TextToSpeech from "../components/TextToSpeech";
import axios from "axios";

const VideoMockInterviewPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [isComplete, setIsComplete] = useState(false);

  // Load questions from your backend
  React.useEffect(() => {
    const loadQuestions = async () => {
      const response = await axios.post("/api/interview/generate", {
        role: "Frontend Developer",
        experienceLevel: "Beginner",
        technologyStack: ["React", "JavaScript"],
      });
      setQuestions(response.data.questions);
      setCurrentQuestion(response.data.questions[0]);
    };
    loadQuestions();
  }, []);

  const handleTranscript = (text) => {
    // Save or process the transcribed answer
    console.log("User said:", text);
  };

  const handleVideoAnswer = async (videoBlob) => {
    // Save the video answer (optional - for review)
    const newAnswers = [...answers, { video: videoBlob, transcript: "" }];
    setAnswers(newAnswers);

    // Move to next question
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      setCurrentQuestion(questions[currentIndex + 1]);
    } else {
      setIsComplete(true);
      // Submit all answers to backend
      await axios.post("/api/interview/complete", { answers: newAnswers });
    }
  };

  if (!currentQuestion) {
    return <div className="loading">Loading interview questions...</div>;
  }

  if (isComplete) {
    return (
      <div className="completion">
        <h2>🎉 Interview Complete!</h2>
        <p>
          Your answers have been recorded. Check your progress dashboard for
          feedback.
        </p>
      </div>
    );
  }

  return (
    <div className="video-mock-interview">
      <h1>🎯 AI Video Mock Interview</h1>

      <div className="progress">
        Question {currentIndex + 1} of {questions.length}
        <div className="progress-bar">
          <div
            style={{ width: `${(currentIndex / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="question-section">
        <div className="question-header">
          <h2>Question:</h2>
          <TextToSpeech text={currentQuestion.text} autoSpeak={true} />
        </div>
        <p className="question-text">{currentQuestion.text}</p>
      </div>

      <div className="answer-section">
        <h3>Your Answer:</h3>

        <div className="input-methods">
          <div className="method-card">
            <h4>🎤 Voice Answer</h4>
            <SpeechToText
              onTranscript={handleTranscript}
              isListening={isListening}
              setIsListening={setIsListening}
            />
          </div>

          <div className="method-card">
            <h4>📹 Video Answer (Optional)</h4>
            <VideoInterview
              question={currentQuestion.text}
              onAnswerComplete={handleVideoAnswer}
            />
          </div>
        </div>
      </div>

      <div className="navigation">
        <button onClick={() => handleVideoAnswer(null)} className="next-btn">
          Next Question →
        </button>
      </div>
    </div>
  );
};

export default VideoMockInterviewPage;
