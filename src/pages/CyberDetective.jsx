import React, { useState } from "react";
import "./CyberDetective.css";

const cases = [
  {
    id: 1,
    title: "The Suspicious Bank Message",
    difficulty: "Beginner",
    story:
      "A student named Aarav receives an SMS claiming that his bank account will be blocked today unless he updates his KYC immediately.",
    evidence: [
      "The message contains an unknown shortened link.",
      "It asks for banking details and OTP.",
      "The sender uses an unofficial mobile number.",
    ],
    suspects: [
      { name: "Official Bank", role: "Bank representative" },
      { name: "Unknown Sender", role: "Unverified mobile number" },
      { name: "College Friend", role: "Known contact" },
    ],
    answer: "Unknown Sender",
    explanation:
      "The unknown sender uses urgency, an unofficial number and asks for sensitive information. These are common phishing warning signs.",
  },
  {
    id: 2,
    title: "The Fake Job Offer",
    difficulty: "Intermediate",
    story:
      "A student receives a work-from-home job offer promising ₹5,000 daily. The recruiter asks for a registration fee before giving the job.",
    evidence: [
      "The salary sounds unusually high for a simple task.",
      "The recruiter demands an advance payment.",
      "There is no verified company information.",
    ],
    suspects: [
      { name: "Verified Company", role: "Registered employer" },
      { name: "Unknown Recruiter", role: "Unverified recruiter" },
      { name: "College Placement Cell", role: "College representative" },
    ],
    answer: "Unknown Recruiter",
    explanation:
      "Demanding money before offering employment and making unrealistic salary promises are warning signs of a possible job scam.",
  },
];

export default function CyberDetective() {
  const [caseIndex, setCaseIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const currentCase = cases[caseIndex];

  const handleSubmit = () => {
    if (!selected) return;

    setSubmitted(true);

    if (selected === currentCase.answer) {
      setScore((previous) => previous + 100);
    }
  };

  const nextCase = () => {
    if (caseIndex < cases.length - 1) {
      setCaseIndex((previous) => previous + 1);
      setSelected("");
      setSubmitted(false);
    } else {
      setCompleted(true);
    }
  };

  const restartGame = () => {
    setCaseIndex(0);
    setSelected("");
    setSubmitted(false);
    setScore(0);
    setCompleted(false);
  };

  return (
    <div className="detective-page">
      <div className="detective-hero">
        <span className="detective-tag">CYBERAWARE INVESTIGATION UNIT</span>
        <h1>Cyber Detective</h1>
        <p>
          Think like a detective. Follow the clues. Identify the cyber threat.
        </p>

        <div className="detective-stats">
          <div>
            <strong>{cases.length}</strong>
            <span>Available Cases</span>
          </div>
          <div>
            <strong>{score}</strong>
            <span>Your XP</span>
          </div>
          <div>
            <strong>{caseIndex + (completed ? 1 : 0)}</strong>
            <span>Cases Played</span>
          </div>
        </div>
      </div>

      {!completed ? (
        <div className="detective-container">
          <div className="case-heading">
            <div>
              <span className="case-label">CASE FILE #{currentCase.id}</span>
              <h2>{currentCase.title}</h2>
            </div>
            <span className="difficulty">{currentCase.difficulty}</span>
          </div>

          <div className="detective-story">
            <span>📁 CASE BRIEFING</span>
            <p>{currentCase.story}</p>
          </div>

          <div className="evidence-section">
            <h3>🔎 Investigate the Evidence</h3>
            <p>Read every clue carefully before making your decision.</p>

            <div className="evidence-grid">
              {currentCase.evidence.map((item, index) => (
                <div className="evidence-card" key={index}>
                  <span>CLUE 0{index + 1}</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="suspect-section">
            <h3>🕵️ Identify the Suspicious Person</h3>
            <p>Who is most likely responsible for this suspicious activity?</p>

            <div className="suspect-grid">
              {currentCase.suspects.map((suspect) => (
                <button
                  key={suspect.name}
                  className={`suspect-card ${
                    selected === suspect.name ? "selected" : ""
                  }`}
                  onClick={() => !submitted && setSelected(suspect.name)}
                  disabled={submitted}
                >
                  <span className="suspect-icon">👤</span>
                  <strong>{suspect.name}</strong>
                  <small>{suspect.role}</small>
                </button>
              ))}
            </div>
          </div>

          {!submitted ? (
            <button
              className="detective-submit"
              onClick={handleSubmit}
              disabled={!selected}
            >
              Submit Investigation →
            </button>
          ) : (
            <div
              className={`investigation-result ${
                selected === currentCase.answer ? "correct" : "incorrect"
              }`}
            >
              <h3>
                {selected === currentCase.answer
                  ? "🎉 Investigation Successful!"
                  : "⚠️ Investigation Incomplete"}
              </h3>

              <p>
                Correct identification: <strong>{currentCase.answer}</strong>
              </p>

              <p>{currentCase.explanation}</p>

              {selected === currentCase.answer && (
                <span className="xp-earned">+100 XP EARNED</span>
              )}

              <button className="detective-submit" onClick={nextCase}>
                {caseIndex === cases.length - 1
                  ? "View Final Results →"
                  : "Next Case →"}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="detective-complete">
          <div className="complete-icon">🏆</div>
          <h2>Investigation Completed!</h2>
          <p>You have completed all available detective cases.</p>
          <div className="final-score">
            <strong>{score} XP</strong>
            <span>Your Total Score</span>
          </div>
          <button className="detective-submit" onClick={restartGame}>
            Play Again ↻
          </button>
        </div>
      )}

      <div className="detective-disclaimer">
        Educational simulation only. All investigation cases are fictional.
      </div>
    </div>
  );
}