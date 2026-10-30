import { useState } from "react";
import "./ScamSimulator.css";

const scenarios = [
  {
    category: "SMS SCAM",
    title: "You Won a Cashback!",
    message:
      "Congratulations! You have won ₹5,000 cashback. Claim your reward immediately by clicking the link below.",
    sender: "UNKNOWN NUMBER",
    options: [
      "Click the link and claim the cashback",
      "Ignore the message and verify through the official app",
      "Reply with your bank details",
      "Forward the message to friends",
    ],
    correct: 1,
    explanation:
      "Unexpected rewards and unknown links are common scam tactics. Never share banking details or click suspicious links. Verify offers through the official app.",
  },
  {
    category: "UPI FRAUD",
    title: "A Stranger Wants to Send You Money",
    message:
      "A person contacts you saying they are sending you ₹2,000. They ask you to approve a UPI collect request and enter your PIN.",
    sender: "UNKNOWN UPI USER",
    options: [
      "Enter your UPI PIN to receive money",
      "Approve the request immediately",
      "Reject the request and never share your UPI PIN",
      "Share your OTP with the person",
    ],
    correct: 2,
    explanation:
      "A UPI PIN is used to authorise payments, not to receive money. Never approve an unknown collect request.",
  },
  {
    category: "JOB SCAM",
    title: "Work From Home Opportunity",
    message:
      "You are selected for a high-paying work-from-home job! Pay ₹999 registration fees to confirm your position today.",
    sender: "FAKE RECRUITER",
    options: [
      "Pay the registration fee immediately",
      "Share your Aadhaar and bank details",
      "Verify the company and job offer independently",
      "Send money to reserve the position",
    ],
    correct: 2,
    explanation:
      "Fraudulent recruiters often demand advance payments. Verify the company, official website and job listing before sharing information or paying anything.",
  },
];

export default function ScamSimulator() {
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const scenario = scenarios[current];

  const handleSubmit = () => {
    if (answer === null) return;

    setSubmitted(true);

    if (answer === scenario.correct) {
      setScore((previous) => previous + 1);
    }
  };

  const nextScenario = () => {
    if (current < scenarios.length - 1) {
      setCurrent((previous) => previous + 1);
      setAnswer(null);
      setSubmitted(false);
    } else {
      setCompleted(true);
    }
  };

  const restart = () => {
    setCurrent(0);
    setAnswer(null);
    setSubmitted(false);
    setScore(0);
    setCompleted(false);
  };

  return (
    <div className="simulator-page">
      <div className="simulator-container">
        <div className="simulator-header">
          <span className="simulator-tag">INTERACTIVE LEARNING</span>
          <h1>Scam Simulator</h1>
          <p>
            Think like a scam detective. Read the situation, identify
            the red flags and make the safest decision.
          </p>
        </div>

        {!completed ? (
          <>
            <div className="simulator-progress">
              <div>
                <span>SCENARIO {current + 1} OF {scenarios.length}</span>
                <strong>{score} Correct</strong>
              </div>

              <div className="simulator-progress-track">
                <span
                  style={{
                    width: `${((current + 1) / scenarios.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            <section className="simulator-scenario">
              <div className="scenario-top">
                <span>{scenario.category}</span>
                <span>CASE 0{current + 1}</span>
              </div>

              <h2>{scenario.title}</h2>

              <div className="fake-message">
                <div className="fake-message-header">
                  <span className="message-avatar">?</span>
                  <div>
                    <strong>{scenario.sender}</strong>
                    <small>Unknown sender</small>
                  </div>
                  <span className="message-warning">!</span>
                </div>

                <p>{scenario.message}</p>
              </div>

              <h3>What would you do?</h3>

              <div className="simulator-options">
                {scenario.options.map((option, index) => {
                  let className = "";

                  if (answer === index) className = "selected";

                  if (submitted && index === scenario.correct) {
                    className = "correct";
                  } else if (submitted && answer === index) {
                    className = "wrong";
                  }

                  return (
                    <button
                      key={index}
                      className={className}
                      type="button"
                      disabled={submitted}
                      onClick={() => setAnswer(index)}
                    >
                      <span>{String.fromCharCode(65 + index)}</span>
                      {option}
                    </button>
                  );
                })}
              </div>

              {!submitted ? (
                <button
                  className="simulator-submit"
                  type="button"
                  disabled={answer === null}
                  onClick={handleSubmit}
                >
                  SUBMIT DECISION →
                </button>
              ) : (
                <div
                  className={`simulator-feedback ${
                    answer === scenario.correct ? "good" : "bad"
                  }`}
                >
                  <strong>
                    {answer === scenario.correct
                      ? "✓ Excellent! You spotted the scam."
                      : "⚠ Not the safest decision!"}
                  </strong>

                  <p>{scenario.explanation}</p>

                  <button type="button" onClick={nextScenario}>
                    {current === scenarios.length - 1
                      ? "VIEW RESULTS →"
                      : "NEXT SCENARIO →"}
                  </button>
                </div>
              )}
            </section>

            <p className="simulator-disclaimer">
              This is a fictional training experience. Never enter real
              personal, banking or payment information.
            </p>
          </>
        ) : (
          <section className="simulator-result">
            <div className="result-icon">🏆</div>
            <span>SIMULATION COMPLETED</span>
            <h2>Your Result</h2>

            <div className="result-score">
              {score}<small> / {scenarios.length}</small>
            </div>

            <p>
              {score === 3
                ? "Amazing! You have excellent scam awareness."
                : score === 2
                ? "Good work! Keep learning to improve your cyber safety."
                : "Keep practising! Learn to identify suspicious situations."}
            </p>

            <button type="button" onClick={restart}>
              PLAY AGAIN ↻
            </button>
          </section>
        )}
      </div>
    </div>
  );
}