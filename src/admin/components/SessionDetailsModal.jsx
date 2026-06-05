import React from "react";
import "../styles/SessionDetailsModal.css";

const SessionDetailsModal = ({ session, onClose }) => {
  if (!session) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="session-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Session Details</h2>

          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="session-meta">
          <div>
            <span>User</span>
            <strong>{session.user}</strong>
          </div>

          <div>
            <span>Module</span>
            <strong>{session.type}</strong>
          </div>

          <div>
            <span>Score</span>
            <strong>{session.score}</strong>
          </div>

          <div>
            <span>Date</span>
            <strong>{new Date(session.date).toLocaleString()}</strong>
          </div>
        </div>

        {/* Technical Interview */}
        {session.type === "Technical Interview" && (
          <div className="session-section">
            <h3>Questions</h3>

            {session.questions?.map((q, index) => (
              <div key={index} className="question-card">
                <p>
                  <strong>Q{index + 1}:</strong> {q.question}
                </p>

                <div className="answer-box">
                  <span>Answer</span>
                  <p>{q.answer}</p>
                </div>

                <div className="feedback-box">
                  <span>Feedback</span>
                  <p>{q.feedback}</p>
                </div>

                <div className="score-box">Score: {q.score}</div>
              </div>
            ))}
          </div>
        )}

        {/* JD Prep */}
        {session.type === "JD Prep" && (
          <div className="session-section">
            <h3>Questions</h3>

            {session.questions?.map((q, index) => (
              <div key={index} className="question-card">
                <p>
                  <strong>Q{index + 1}:</strong> {q.question}
                </p>

                <div className="answer-box">
                  <span>Answer</span>

                  <p>{q.answer?.transcript || "No Answer"}</p>
                </div>

                <div className="feedback-box">
                  <span>AI Feedback</span>

                  <p>{q.feedback?.aiFeedback || "No Feedback"}</p>
                </div>

                <div className="score-box">Score: {q.feedback?.score || 0}</div>
              </div>
            ))}
          </div>
        )}

        {/* Communication */}
        {session.type === "Communication" && (
          <div className="session-section">
            <h3>Question</h3>

            <div className="question-card">
              <p>{session.question}</p>
            </div>

            <h3>Transcript</h3>

            <div className="answer-box">
              <p>{session.transcript}</p>
            </div>

            <h3>Evaluation</h3>

            <div className="question-card">
              <p>
                <strong>Content Score:</strong>{" "}
                {session.evaluation?.content?.score || 0}
              </p>

              <p>
                <strong>Delivery Score:</strong>{" "}
                {session.evaluation?.delivery?.score || 0}
              </p>

              <p>
                <strong>Overall Score:</strong>{" "}
                {session.evaluation?.overall?.score || 0}
              </p>

              <p>
                <strong>Feedback:</strong>{" "}
                {session.evaluation?.overall?.feedback || "N/A"}
              </p>
            </div>
          </div>
        )}

        {/* Email */}
        {session.type === "Email" && (
          <div className="session-section">
            <h3>Email Content</h3>

            <div className="answer-box">
              <pre
                style={{
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}
              >
                {session.emailContent}
              </pre>
            </div>

            <h3>Feedback</h3>

            <div className="feedback-box">
              <p>{session.feedback}</p>
            </div>
          </div>
        )}

        {/* Aptitude */}
        {session.type === "Aptitude" && (
          <div className="session-section">
            <h3>Questions</h3>

            {session.questions?.map((q, index) => (
              <div key={index} className="question-card">
                <p>
                  <strong>Q{index + 1}:</strong> {q.questionText}
                </p>

                <p>
                  <strong>Your Answer:</strong> {q.userAnswer}
                </p>

                <p>
                  <strong>Correct Answer:</strong> {q.correctAnswer}
                </p>

                <p>
                  <strong>Result:</strong> {q.isCorrect ? "Correct" : "Wrong"}
                </p>

                <p>
                  <strong>Explanation:</strong> {q.explanation}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionDetailsModal;
