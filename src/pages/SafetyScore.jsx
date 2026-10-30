import { useMemo, useState } from "react";
import "./SafetyScore.css";

const habits = [
  {
    title: "I use strong and unique passwords",
    description: "I avoid reusing passwords across important accounts.",
    icon: "🔐",
  },
  {
    title: "I have enabled two-factor authentication",
    description: "I use an additional verification step wherever possible.",
    icon: "🛡️",
  },
  {
    title: "I never share OTPs or UPI PINs",
    description: "I keep my banking credentials private.",
    icon: "🔒",
  },
  {
    title: "I check links before clicking",
    description: "I verify suspicious links and website addresses.",
    icon: "🔗",
  },
  {
    title: "I review app permissions",
    description: "I avoid unnecessary access to contacts, camera and location.",
    icon: "📱",
  },
  {
    title: "I verify payment requests",
    description: "I check the receiver and amount before approving payments.",
    icon: "💳",
  },
];

export default function SafetyScore() {
  const [checked, setChecked] = useState(
    Array(habits.length).fill(false)
  );

  const score = useMemo(() => {
    const total = checked.filter(Boolean).length;
    return Math.round((total / habits.length) * 100);
  }, [checked]);

  const level =
    score >= 80
      ? "Cyber Smart"
      : score >= 50
      ? "Getting Safer"
      : "Needs Improvement";

  const toggleHabit = (index) => {
    setChecked((previous) =>
      previous.map((value, i) => (i === index ? !value : value))
    );
  };

  const resetScore = () => {
    setChecked(Array(habits.length).fill(false));
  };

  return (
    <div className="safety-score-page">
      <div className="safety-score-container">
        <header className="safety-score-header">
          <span>YOUR DIGITAL WELLNESS</span>
          <h1>My Safety Score</h1>
          <p>
            How safe are your everyday digital habits?
            Complete this quick self-assessment to find out.
          </p>
        </header>

        <section className="score-overview">
          <div
            className="score-orb"
            style={{
              background: `conic-gradient(#ff704c ${
                score * 3.6
              }deg, #334247 0deg)`,
            }}
          >
            <div className="score-orb-inner">
              <strong>{score}</strong>
              <span>OUT OF 100</span>
            </div>
          </div>

          <div className="score-overview-text">
            <span className="score-label">YOUR SAFETY LEVEL</span>
            <h2>{level}</h2>
            <p>
              {score === 100
                ? "Excellent! You follow all the safety habits in this checklist."
                : score >= 80
                ? "Great work! Keep following these habits to stay safer online."
                : score >= 50
                ? "You are building good habits. A few improvements can make you safer."
                : "Start with the basics. Small changes can improve your online safety."}
            </p>
          </div>
        </section>

        <section className="habit-section">
          <div className="habit-heading">
            <div>
              <span>SELF-ASSESSMENT</span>
              <h2>Your Safety Habits</h2>
            </div>
            <strong>
              {checked.filter(Boolean).length}/{habits.length} completed
            </strong>
          </div>

          <div className="habit-list">
            {habits.map((habit, index) => (
              <label
                className={`habit-item ${
                  checked[index] ? "completed" : ""
                }`}
                key={habit.title}
              >
                <span className="habit-icon">{habit.icon}</span>

                <span className="habit-copy">
                  <strong>{habit.title}</strong>
                  <small>{habit.description}</small>
                </span>

                <input
                  type="checkbox"
                  checked={checked[index]}
                  onChange={() => toggleHabit(index)}
                />
              </label>
            ))}
          </div>

          <div className="habit-actions">
            <button type="button" onClick={resetScore}>
              Reset Assessment ↻
            </button>
          </div>
        </section>

        <section className="safety-tip">
          <span>💡</span>
          <div>
            <strong>Cyber Safety Tip</strong>
            <p>
              Your score is a learning indicator, not a security audit.
              Keep updating your habits as online threats change.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}