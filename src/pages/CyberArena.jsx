import React, { useState, useEffect } from "react";
import "./CyberArena.css";

const missions = [
  {
    id: 1,
    category: "PHISHING DETECTIVE",
    title: "The Suspicious Bank Message",
    difficulty: "Easy",
    points: 100,
    scenario:
      "Your bank account will be blocked within 2 hours. Verify your KYC immediately using this link.",
    question: "Which is the biggest warning sign?",
    options: [
      "The message mentions a bank",
      "Urgent threat and unexpected verification link",
      "The message is short",
      "It mentions KYC",
    ],
    answer: 1,
    explanation:
      "Scammers create urgency and use unexpected links to make victims reveal personal and banking information.",
  },
  {
    id: 2,
    category: "UPI FRAUD DETECTIVE",
    title: "The Fake Payment Request",
    difficulty: "Medium",
    points: 150,
    scenario:
      "A stranger says they are sending you ₹5,000 and asks you to scan a QR code and enter your UPI PIN to receive it.",
    question: "What should you do?",
    options: [
      "Scan the QR code immediately",
      "Enter your UPI PIN",
      "Refuse and verify the payment independently",
      "Share your UPI PIN with the sender",
    ],
    answer: 2,
    explanation:
      "A UPI PIN authorises a payment. You do not need to enter it to receive money.",
  },
  {
    id: 3,
    category: "JOB SCAM DETECTIVE",
    title: "The Too-Good-To-Be-True Job",
    difficulty: "Hard",
    points: 200,
    scenario:
      "A recruiter promises ₹8,000 daily for simple online tasks but asks you to deposit ₹2,000 to unlock your earnings.",
    question: "What is the safest decision?",
    options: [
      "Pay the refundable deposit",
      "Borrow money and complete the task",
      "Stop and independently verify the employer",
      "Share your bank details",
    ],
    answer: 2,
    explanation:
      "Legitimate employers generally do not require deposits to release wages. This is a common task-scam warning sign.",
  },
];

const storageKey = "cyberaware-arena-progress";

function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    return {
      completed: Array.isArray(saved?.completed) ? saved.completed : [],
      xp: Number(saved?.xp) || 0,
    };
  } catch {
    return { completed: [], xp: 0 };
  }
}

export default function CyberArena({ initialMission = null, onInitialMissionHandled }) {
  const [progress, setProgress] = useState(loadProgress);
  const [activeMission, setActiveMission] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(progress));
    } catch (error) {
      console.error("Could not save Cyber Arena progress:", error);
    }
  }, [progress]);

  const mission = missions.find((item) => item.id === activeMission);
  const completedCount = progress.completed.length;
  const progressPercent = Math.round(
    (completedCount / missions.length) * 100
  );

  function startMission(id) {
    setActiveMission(id);
    setSelectedAnswer(null);
    setSubmitted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  useEffect(() => {
    if (initialMission !== null && missions.some((item) => item.id === Number(initialMission))) {
      setActiveMission(Number(initialMission));
      setSelectedAnswer(null);
      setSubmitted(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
      onInitialMissionHandled?.();
    }
  }, [initialMission, onInitialMissionHandled]);

  function checkAnswer() {
    if (selectedAnswer === null || submitted || !mission) return;

    setSubmitted(true);

    if (
      selectedAnswer === mission.answer &&
      !progress.completed.includes(mission.id)
    ) {
      setProgress((previous) => ({
        completed: [...previous.completed, mission.id],
        xp: previous.xp + mission.points,
      }));
    }
  }

  function backToArena() {
    setActiveMission(null);
    setSelectedAnswer(null);
    setSubmitted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function playNextMission() {
    const nextMission = missions.find(
      (item) => !progress.completed.includes(item.id)
    );

    if (nextMission) {
      startMission(nextMission.id);
    } else {
      backToArena();
    }
  }

  return (
    <main className="arena-page">
      <section className="arena-hero">
        <div className="arena-kicker">⚡ INTERACTIVE CYBER EXPERIENCE</div>

        <h1>
          WELCOME TO <span>CYBER ARENA.</span>
        </h1>

        <p>
          Think like a cyber detective. Identify digital traps, make smart
          decisions and build your online safety skills.
        </p>

        <div className="arena-hero-stats">
          <div>
            <strong>{progress.xp}</strong>
            <span>TOTAL XP</span>
          </div>
          <div>
            <strong>
              {completedCount}/{missions.length}
            </strong>
            <span>MISSIONS COMPLETED</span>
          </div>
          <div>
            <strong>{progressPercent}%</strong>
            <span>YOUR PROGRESS</span>
          </div>
        </div>
      </section>

      {!mission ? (
        <>
          <section className="arena-progress-panel">
            <div>
              <span>YOUR MISSION PROGRESS</span>
              <strong>{progressPercent}% Completed</strong>
            </div>

            <div className="arena-progress-track">
              <div style={{ width: `${progressPercent}%` }} />
            </div>
          </section>

          <section className="arena-missions">
            <div className="arena-section-heading">
              <div>
                <span>CHOOSE YOUR CHALLENGE</span>
                <h2>Mission Control</h2>
              </div>
              <span className="arena-live-label">● 3 MISSIONS</span>
            </div>

            <div className="arena-mission-grid">
              {missions.map((item) => {
                const completed = progress.completed.includes(item.id);

                return (
                  <article className="arena-mission-card" key={item.id}>
                    <div className="arena-card-top">
                      <span>MISSION 0{item.id}</span>
                      <span className="arena-difficulty">
                        {item.difficulty}
                      </span>
                    </div>

                    <div className="arena-mission-icon">
                      {item.id === 1 ? "✉" : item.id === 2 ? "₹" : "▣"}
                    </div>

                    <span className="arena-category">{item.category}</span>

                    <h3>{item.title}</h3>

                    <p>
                      Investigate the situation and identify the safest
                      response.
                    </p>

                    <div className="arena-card-footer">
                      <strong>⚡ {item.points} XP</strong>

                      <button
                        onClick={() => startMission(item.id)}
                        type="button"
                      >
                        {completed ? "PLAY AGAIN ↗" : "START MISSION ↗"}
                      </button>
                    </div>

                    {completed && (
                      <div className="arena-completed">✓ COMPLETED</div>
                    )}
                  </article>
                );
              })}
            </div>
          </section>

          <section className="arena-achievement">
            <div className="arena-achievement-icon">🏆</div>
            <div>
              <span>YOUR ACHIEVEMENT</span>
              <h3>
                {completedCount === missions.length
                  ? "Cyber Safety Champion"
                  : completedCount > 0
                    ? "Cyber Explorer"
                    : "Rookie Detective"}
              </h3>
              <p>
                Complete missions, earn XP and improve your cyber safety
                knowledge.
              </p>
            </div>
          </section>
        </>
      ) : (
        <section className="arena-game">
          <button
            className="arena-back"
            onClick={backToArena}
            type="button"
          >
            ← BACK TO MISSIONS
          </button>

          <div className="arena-game-card">
            <span className="arena-category">{mission.category}</span>

            <h2>{mission.title}</h2>

            <div className="arena-scenario">
              <span>📩 INCIDENT REPORT</span>
              <p>{mission.scenario}</p>
            </div>

            <h3>{mission.question}</h3>

            <div className="arena-options">
              {mission.options.map((option, index) => {
                let className = "";

                if (selectedAnswer === index) {
                  className = "selected";
                }

                if (submitted && index === mission.answer) {
                  className = "correct";
                } else if (submitted && selectedAnswer === index) {
                  className = "incorrect";
                }

                return (
                  <button
                    className={className}
                    key={option}
                    type="button"
                    onClick={() => {
                      if (!submitted) setSelectedAnswer(index);
                    }}
                    disabled={submitted}
                  >
                    <span>{String.fromCharCode(65 + index)}.</span>
                    {option}
                  </button>
                );
              })}
            </div>

            {!submitted ? (
              <button
                className="arena-submit"
                type="button"
                onClick={checkAnswer}
                disabled={selectedAnswer === null}
              >
                SUBMIT ANSWER ↗
              </button>
            ) : (
              <div className="arena-feedback">
                <h3>
                  {selectedAnswer === mission.answer
                    ? `🎉 Correct! You earned ${mission.points} XP.`
                    : "❌ Not quite! Learn from this incident."}
                </h3>
                <p>{mission.explanation}</p>

                <div className="arena-feedback-actions">
                  <button
                    className="arena-submit"
                    type="button"
                    onClick={playNextMission}
                  >
                    {completedCount === missions.length
                      ? "BACK TO ARENA"
                      : "CONTINUE ↗"}
                  </button>
                  <button
                    className="arena-back"
                    type="button"
                    onClick={backToArena}
                  >
                    VIEW ALL MISSIONS
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
