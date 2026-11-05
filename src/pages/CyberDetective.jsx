import React, { useState } from "react";
import "./CyberDetective.css";

const cases = [
  {
    id: 1,
    icon: "📸",
    title: "The Fake Insta Profile",
    platform: "INSTAGRAM",
    story:
      "Your friend messages you from a new Instagram account saying their old account was deleted. A few minutes later, they ask you to urgently send money.",
    evidence: [
      {
        title: "Profile Check",
        icon: "👤",
        text: "The account is newly created and has very few posts or genuine interactions.",
      },
      {
        title: "Identity Check",
        icon: "🔍",
        text: "The account uses your friend's photos, but the username has small spelling changes.",
      },
      {
        title: "Message Pattern",
        icon: "💸",
        text: "The conversation suddenly turns into an urgent request for money.",
      },
    ],
    question: "What should you do?",
    options: [
      "Verify by calling your friend on their known number",
      "Send money because the profile looks familiar",
      "Share your banking details to help them",
    ],
    answer: 0,
    explanation:
      "Fake profiles often copy photos and names to impersonate someone you trust. Always verify through another trusted channel before sending money.",
  },
  {
    id: 2,
    icon: "🎁",
    title: "The Giveaway DM",
    platform: "INSTAGRAM",
    story:
      "You receive a DM claiming that you won a popular brand's giveaway. The message says you must click a link within 10 minutes to claim your prize.",
    evidence: [
      {
        title: "Account Check",
        icon: "👤",
        text: "The account has a suspicious username and does not match the official brand account.",
      },
      {
        title: "Link Check",
        icon: "🔗",
        text: "The link uses an unfamiliar website name instead of the brand's official domain.",
      },
      {
        title: "Pressure Check",
        icon: "⏰",
        text: "The short deadline is designed to make you act before thinking.",
      },
    ],
    question: "What's the safest move?",
    options: [
      "Open the official brand page and verify the giveaway",
      "Click the link immediately before the prize expires",
      "Share the message with your password details",
    ],
    answer: 0,
    explanation:
      "Real promotions can be verified through official accounts and websites. Don't let urgency push you into clicking an unknown link.",
  },
  {
    id: 3,
    icon: "👻",
    title: "The Snapchat Trap",
    platform: "SNAPCHAT",
    story:
      "An unknown account starts a friendly conversation and later sends inappropriate content. Soon after, the person threatens to share screenshots unless money is sent.",
    evidence: [
      {
        title: "Unknown Account",
        icon: "🕶️",
        text: "The account has no trusted connection to you and provides little genuine identity information.",
      },
      {
        title: "Sudden Pressure",
        icon: "⚠️",
        text: "The conversation quickly changes from casual chat to threats and demands.",
      },
      {
        title: "Payment Demand",
        icon: "💳",
        text: "The person uses fear to pressure you into sending money.",
      },
    ],
    question: "What is the best response?",
    options: [
      "Save evidence, block the account and report the incident",
      "Keep paying so the person stops threatening you",
      "Send more personal content to explain yourself",
    ],
    answer: 0,
    explanation:
      "Do not give in to pressure. Preserve relevant evidence, stop engaging, block the account and seek help through trusted reporting channels.",
  },
  {
    id: 4,
    icon: "💬",
    title: "The WhatsApp Malware Link",
    platform: "WHATSAPP",
    story:
      "You receive a message saying, 'Is this you in this video?' with a shortened link from an unknown contact.",
    evidence: [
      {
        title: "Unknown Sender",
        icon: "📱",
        text: "You do not recognize the contact or know why they are messaging you.",
      },
      {
        title: "Suspicious Link",
        icon: "🔗",
        text: "The shortened URL hides the actual website destination.",
      },
      {
        title: "Curiosity Trap",
        icon: "👀",
        text: "The message is written to make you click without checking first.",
      },
    ],
    question: "What should you do?",
    options: [
      "Avoid the link and verify with the sender separately",
      "Download anything the link asks you to install",
      "Forward the link to everyone to ask if it is real",
    ],
    answer: 0,
    explanation:
      "Unexpected links can lead to phishing pages or malicious downloads. Verify before clicking, especially when the message creates curiosity or panic.",
  },
  {
    id: 5,
    icon: "💳",
    title: "The UPI Collect Request",
    platform: "UPI",
    story:
      "Someone says they need to send you money and asks you to approve a collect request in your UPI app.",
    evidence: [
      {
        title: "Request Type",
        icon: "📲",
        text: "A collect request asks you to authorize a payment from your account.",
      },
      {
        title: "False Promise",
        icon: "💰",
        text: "The person claims approving the request will help you receive money.",
      },
      {
        title: "Payment Screen",
        icon: "🔐",
        text: "Your app may ask for a UPI PIN to authorize money leaving your account.",
      },
    ],
    question: "What's the correct action?",
    options: [
      "Decline and check the transaction details carefully",
      "Enter your UPI PIN to receive the money",
      "Share your UPI PIN in the chat",
    ],
    answer: 0,
    explanation:
      "Always read UPI prompts carefully. Your UPI PIN is used to authorize payments and should never be shared with another person.",
  },
  {
    id: 6,
    icon: "📷",
    title: "The QR Code Scam",
    platform: "PAYMENT",
    story:
      "A seller says you will receive a refund after scanning a QR code. They then ask you to enter your UPI PIN.",
    evidence: [
      {
        title: "QR Reality Check",
        icon: "📷",
        text: "Scanning a QR code can initiate a payment flow rather than automatically receiving money.",
      },
      {
        title: "PIN Request",
        icon: "🔐",
        text: "The transaction asks for your UPI PIN before completing.",
      },
      {
        title: "Unexpected Refund",
        icon: "🤔",
        text: "You did not initiate a verified refund through the official service.",
      },
    ],
    question: "What should you do?",
    options: [
      "Stop and verify the refund through the official service",
      "Enter your PIN because the seller promised a refund",
      "Share a screenshot of your UPI PIN",
    ],
    answer: 0,
    explanation:
      "Be cautious when someone instructs you to scan a code or enter a PIN to receive money. Verify the transaction independently.",
  },
  {
    id: 7,
    icon: "💼",
    title: "The Part-Time Job Trap",
    platform: "JOB SCAM",
    story:
      "A social media ad promises easy online tasks and huge daily earnings. After a few tasks, you are asked to deposit money to unlock higher-paying work.",
    evidence: [
      {
        title: "Unrealistic Earnings",
        icon: "💸",
        text: "The promised income is unusually high for very simple tasks.",
      },
      {
        title: "Deposit Demand",
        icon: "💳",
        text: "You are asked to pay money before receiving the promised earnings.",
      },
      {
        title: "No Verification",
        icon: "🏢",
        text: "The recruiter cannot provide clear, verifiable company information.",
      },
    ],
    question: "What should you do?",
    options: [
      "Research the company independently and avoid paying deposits",
      "Borrow money to unlock the next task",
      "Share your banking password for salary processing",
    ],
    answer: 0,
    explanation:
      "Legitimate employers generally do not require you to deposit money to unlock a job. Verify the organization independently.",
  },
  {
    id: 8,
    icon: "📱",
    title: "The Loan App Nightmare",
    platform: "MOBILE APP",
    story:
      "A loan app promises instant money but asks for access to your contacts, photos and other personal data before approval.",
    evidence: [
      {
        title: "Permission Check",
        icon: "🔐",
        text: "The app requests access that may not be necessary for a simple loan service.",
      },
      {
        title: "Source Check",
        icon: "📦",
        text: "The app was promoted through an unknown link rather than a trusted source.",
      },
      {
        title: "Privacy Risk",
        icon: "👥",
        text: "Excessive permissions can expose sensitive information and contacts.",
      },
    ],
    question: "What's the smart move?",
    options: [
      "Review permissions and use only verified financial services",
      "Allow every permission without checking",
      "Install more apps from the same unknown link",
    ],
    answer: 0,
    explanation:
      "Always check an app's source, permissions and legitimacy before sharing sensitive information.",
  },
  {
    id: 9,
    icon: "🛒",
    title: "The Too-Good-To-Be-True Store",
    platform: "SHOPPING",
    story:
      "You find a website selling expensive products at an unbelievable discount. The site only accepts advance payment.",
    evidence: [
      {
        title: "Price Check",
        icon: "🏷️",
        text: "The discount is far beyond what established stores normally offer.",
      },
      {
        title: "Website Check",
        icon: "🌐",
        text: "The website has little verifiable business information or history.",
      },
      {
        title: "Payment Pressure",
        icon: "💳",
        text: "The store pushes advance payment with limited customer protection.",
      },
    ],
    question: "What should you do?",
    options: [
      "Verify the seller and website before making any payment",
      "Pay immediately because the discount may disappear",
      "Share your card details through chat",
    ],
    answer: 0,
    explanation:
      "Extreme discounts and pressure for advance payment are warning signs. Research unfamiliar sellers before paying.",
  },
  {
    id: 10,
    icon: "🎭",
    title: "The Deepfake Emergency Call",
    platform: "AI SCAM",
    story:
      "You receive a call that sounds exactly like a family member saying they are in an emergency and urgently need money.",
    evidence: [
      {
        title: "Unexpected Emergency",
        icon: "🚨",
        text: "The caller creates immediate panic and asks for fast action.",
      },
      {
        title: "Payment Pressure",
        icon: "💸",
        text: "You are asked to send money before independently verifying the situation.",
      },
      {
        title: "Verification Option",
        icon: "📞",
        text: "You can contact the family member through another known number.",
      },
    ],
    question: "What should you do first?",
    options: [
      "Verify the emergency through another trusted contact method",
      "Send money immediately because the voice sounds familiar",
      "Share your banking login to speed up the transfer",
    ],
    answer: 0,
    explanation:
      "AI can imitate voices. Treat unexpected emergency payment requests carefully and verify through an independent channel.",
  },
  {
    id: 11,
    icon: "📞",
    title: "The Fake Customer Care Number",
    platform: "SEARCH SCAM",
    story:
      "You search online for customer support and call a number from an unofficial post. The person asks for remote access to your phone.",
    evidence: [
      {
        title: "Search Result Check",
        icon: "🔎",
        text: "Not every phone number shown online belongs to the official company.",
      },
      {
        title: "Remote Access",
        icon: "📱",
        text: "The caller asks you to install software that could control or view your device.",
      },
      {
        title: "Sensitive Data",
        icon: "🔐",
        text: "The caller asks for passwords, OTPs or payment details.",
      },
    ],
    question: "What is safest?",
    options: [
      "Use the official company's verified support channel",
      "Install remote access software for the unknown caller",
      "Read your OTP aloud to prove your identity",
    ],
    answer: 0,
    explanation:
      "Find support contacts through official apps and websites. Never share passwords or OTPs with an unverified caller.",
  },
  {
    id: 12,
    icon: "📲",
    title: "The SIM Swap Warning",
    platform: "ACCOUNT SECURITY",
    story:
      "Your phone suddenly loses network service, and soon after you receive alerts about password reset attempts on your accounts.",
    evidence: [
      {
        title: "Network Loss",
        icon: "📵",
        text: "Unexpected loss of mobile service can be an important warning sign.",
      },
      {
        title: "Account Alerts",
        icon: "🔔",
        text: "Password reset notifications appear for accounts you did not try to access.",
      },
      {
        title: "Time Sensitive",
        icon: "⚡",
        text: "Quick action can help protect accounts when suspicious activity is detected.",
      },
    ],
    question: "What should you do?",
    options: [
      "Contact your mobile provider and secure important accounts",
      "Ignore the alerts and wait several days",
      "Share OTPs with anyone who calls about the issue",
    ],
    answer: 0,
    explanation:
      "Unexpected service loss combined with account alerts should be taken seriously. Contact official providers and secure your accounts.",
  },
  {
    id: 13,
    icon: "📦",
    title: "The Fake APK Download",
    platform: "MALWARE",
    story:
      "You receive an SMS saying you have an unpaid delivery fee. The link downloads an APK file and asks you to install it.",
    evidence: [
      {
        title: "Unexpected File",
        icon: "📦",
        text: "You were not expecting an app installation from a delivery service.",
      },
      {
        title: "Unknown Source",
        icon: "⚠️",
        text: "The download does not come from a trusted app store or verified service.",
      },
      {
        title: "Permission Risk",
        icon: "🔐",
        text: "A malicious app may request access to messages, notifications or other data.",
      },
    ],
    question: "What should you do?",
    options: [
      "Avoid installing it and verify the delivery through the official app",
      "Install the APK immediately",
      "Disable all security warnings and continue",
    ],
    answer: 0,
    explanation:
      "Be very cautious with unexpected app files from messages. Verify the service independently before downloading anything.",
  },
  {
    id: 14,
    icon: "🎮",
    title: "The Gaming Account Deal",
    platform: "GAMING",
    story:
      "Someone offers free game currency and asks you to log in through a special website using your gaming account credentials.",
    evidence: [
      {
        title: "Free Reward Trap",
        icon: "🎁",
        text: "The offer promises valuable in-game items for almost nothing.",
      },
      {
        title: "Fake Login",
        icon: "🔑",
        text: "The website asks for your account credentials outside the official game platform.",
      },
      {
        title: "Account Risk",
        icon: "🛡️",
        text: "Sharing login details can lead to account theft or unauthorized access.",
      },
    ],
    question: "What's the right move?",
    options: [
      "Use only official game stores and login pages",
      "Enter your credentials on the free reward website",
      "Share your password with the person offering the deal",
    ],
    answer: 0,
    explanation:
      "Free currency and skin scams often target gaming accounts. Never enter credentials on an unverified website.",
  },
  {
    id: 15,
    icon: "📈",
    title: "The Investment Group",
    platform: "SOCIAL MEDIA",
    story:
      "You are added to a group showing screenshots of huge investment profits. An admin promises guaranteed returns if you invest today.",
    evidence: [
      {
        title: "Guaranteed Returns",
        icon: "📈",
        text: "The group promises profits with no realistic discussion of risk.",
      },
      {
        title: "Social Proof",
        icon: "💬",
        text: "Screenshots and testimonials can be manipulated or fabricated.",
      },
      {
        title: "Urgency",
        icon: "⏳",
        text: "The admin pushes you to invest immediately without independent research.",
      },
    ],
    question: "What should you do?",
    options: [
      "Research independently and avoid guaranteed-return claims",
      "Transfer money because everyone in the group seems successful",
      "Share your banking credentials with the admin",
    ],
    answer: 0,
    explanation:
      "Investment decisions should never rely only on social media claims. Be cautious of guaranteed returns and pressure to invest quickly.",
  },
  {
    id: 16,
    icon: "🚨",
    title: "The Digital Arrest Call",
    platform: "IMPERSONATION",
    story:
      "A caller claims to be an official and says your identity is linked to a serious crime. They tell you not to speak to anyone and demand immediate action.",
    evidence: [
      {
        title: "Fear Tactics",
        icon: "😨",
        text: "The caller uses alarming claims to create panic.",
      },
      {
        title: "Isolation",
        icon: "🤫",
        text: "You are told not to discuss the call with family or trusted people.",
      },
      {
        title: "Immediate Demand",
        icon: "⚡",
        text: "The caller pressures you to act before independently verifying their identity.",
      },
    ],
    question: "What should you do?",
    options: [
      "Stay calm, disconnect and verify through official channels",
      "Follow every instruction because the caller sounds authoritative",
      "Share personal and financial information to clear your name",
    ],
    answer: 0,
    explanation:
      "Scammers can impersonate officials and use fear to manipulate victims. Independently verify unexpected claims through official channels.",
  },
];

export default function CyberDetective() {
  const [caseIndex, setCaseIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [decisionHistory, setDecisionHistory] = useState([]);
  const [viewingPrevious, setViewingPrevious] = useState(false);
  const [previousCaseIndex, setPreviousCaseIndex] = useState(null);

  const currentCase = cases[caseIndex];

  // Final investigation summary
  const correctCount = decisionHistory.filter(
    (item) => item.selected === cases[item.caseIndex].answer
  ).length;
  const wrongCount = decisionHistory.length - correctCount;

  const toggleEvidence = (index) => {
    setRevealed((previous) =>
      previous.includes(index)
        ? previous.filter((item) => item !== index)
        : [...previous, index]
    );
  };

  const handleSubmit = () => {
    if (selected === null) return;
    setDecisionHistory((previous) => previous.some((item) => item.caseIndex === caseIndex) ? previous : [...previous, { caseIndex, selected }]);
    setSubmitted(true);
  };

  const openPreviousDecision = () => {
    const previousDecision = decisionHistory.filter((item) => item.caseIndex < caseIndex).sort((a, b) => b.caseIndex - a.caseIndex)[0];
    if (!previousDecision) return;
    setPreviousCaseIndex(previousDecision.caseIndex);
    setViewingPrevious(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closePreviousDecision = () => {
    setViewingPrevious(false);
    setPreviousCaseIndex(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const nextCase = () => {
    if (caseIndex < cases.length - 1) {
      setCaseIndex((previous) => previous + 1);
      setSelected(null);
      setRevealed([]);
      setSubmitted(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setCompleted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const restartInvestigation = () => {
    setCaseIndex(0);
    setSelected(null);
    setRevealed([]);
    setSubmitted(false);
    setCompleted(false);
    setDecisionHistory([]);
    setViewingPrevious(false);
    setPreviousCaseIndex(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (viewingPrevious && previousCaseIndex !== null) {
    const previousCase = cases[previousCaseIndex];
    const previousDecision = decisionHistory.find((item) => item.caseIndex === previousCaseIndex);
    const wasCorrect = previousDecision?.selected === previousCase.answer;

    return (
      <div className="detective-page">
        <section className="detective-hero previous-hero">
          <span className="detective-tag">🕵️ YOUR PREVIOUS DECISION</span>
          <h1>Review <span>Your Call.</span></h1>
          <p>Here's the decision you made in this case and what the safest response was.</p>
        </section>

        <main className="detective-container previous-decision-view">
          <div className="case-heading">
            <div>
              <span className="case-label">{previousCase.platform} · REVIEW MODE</span>
              <h2><span className="case-title-icon">{previousCase.icon}</span>{previousCase.title}</h2>
            </div>
            <div className="case-number">#{String(previousCase.id).padStart(2, "0")}</div>
          </div>

          <div className="detective-story">
            <div className="story-header"><span>THE INCIDENT</span><span className="live-dot">● REVIEWING CASE</span></div>
            <p>{previousCase.story}</p>
          </div>

          <section className="decision-section previous-decision-section">
            <span className="section-kicker">YOUR PREVIOUS CALL</span>
            <h3>{wasCorrect ? "Smart decision! ✓" : "A learning moment."}</h3>

            <div className={`previous-answer ${wasCorrect ? "correct" : "incorrect"}`}>
              <span className="previous-answer-label">YOU SELECTED</span>
              <strong>{previousCase.options[previousDecision?.selected]}</strong>
            </div>

            <div className="correct-answer">
              <span className="previous-answer-label">SAFEST RESPONSE</span>
              <strong>{previousCase.options[previousCase.answer]}</strong>
            </div>

            <div className="previous-explanation">
              <span>WHY IT MATTERS</span>
              <p>{previousCase.explanation}</p>
            </div>

            <button className="previous-back-button" onClick={closePreviousDecision} type="button">← Back to Current Case</button>
          </section>
        </main>
      </div>
    );
  }

  if (completed) {
    const scorePercentage = Math.round(
      (correctCount / cases.length) * 100
    );

    return (
      <div className="detective-page completion-page">
        <div className="completion-dashboard">
          <div className="completion-top">
            <div className="complete-icon">🕵️‍♂️</div>

            <span className="completion-tag">
              INVESTIGATION COMPLETE
            </span>

            <h2>
              You Cracked the Cases! <span>🎉</span>
            </h2>

            <p>
              You've explored 16 real-world cybercrime patterns and
              learned how to make safer digital decisions.
            </p>
          </div>

          <div className="completion-stats">
            <div className="completion-stat cases-stat">
              <div className="stat-icon">📁</div>
              <div>
                <strong>{cases.length}</strong>
                <span>CASES EXPLORED</span>
              </div>
            </div>

            <div className="completion-stat correct-stat">
              <div className="stat-icon">✓</div>
              <div>
                <strong>{correctCount}</strong>
                <span>CORRECT DECISIONS</span>
              </div>
            </div>

            <div className="completion-stat learning-stat">
              <div className="stat-icon">✕</div>
              <div>
                <strong>{wrongCount}</strong>
                <span>LEARNING MOMENTS</span>
              </div>
            </div>
          </div>

          <div className="achievement-card">
            <div className="achievement-icon">🏆</div>

            <div className="achievement-content">
              <h3>
                {scorePercentage >= 75
                  ? "Sharp Eye!"
                  : scorePercentage >= 50
                  ? "Good Detective!"
                  : "Keep Investigating!"}
              </h3>

              <p>
                {scorePercentage >= 75
                  ? "You made smart choices and spotted most of the threats!"
                  : scorePercentage >= 50
                  ? "You're learning to spot suspicious patterns online!"
                  : "Every case helps you become safer and smarter online!"}
              </p>
            </div>

            <span className="achievement-spark">✦</span>
          </div>

          <button
            className="restart-button"
            onClick={restartInvestigation}
            type="button"
          >
            Start Again ↻
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="detective-page">
      <section className="detective-hero">
        <span className="detective-tag">
          🕵️ CYBERAWARE INVESTIGATION UNIT
        </span>

        <h1>
          Cyber <span>Detective.</span>
        </h1>

        <p>
          A suspicious message. A hidden clue. One smart decision.
          Can you crack the case?
        </p>

        <div className="detective-progress">
          <span>CASE {String(caseIndex + 1).padStart(2, "0")}</span>

          <div className="detective-progress-track">
            <div
              style={{
                width: `${((caseIndex + 1) / cases.length) * 100}%`,
              }}
            />
          </div>

          <span>{caseIndex + 1} / {cases.length}</span>
        </div>
      </section>

      <main className="detective-container">
        <div className="case-heading">
          <div>
            <span className="case-label">
              {currentCase.platform} · ACTIVE CASE
            </span>
            <h2>
              <span className="case-title-icon">{currentCase.icon}</span>
              {currentCase.title}
            </h2>
          </div>

          <div className="case-number">
            #{String(currentCase.id).padStart(2, "0")}
          </div>
        </div>

        <div className="detective-story">
          <div className="story-header">
            <span>THE INCIDENT</span>
            <span className="live-dot">● LIVE CASE</span>
          </div>
          <p>{currentCase.story}</p>
        </div>

        <section className="evidence-section">
          <div className="section-title-row">
            <div>
              <span className="section-kicker">LOOK CLOSER</span>
              <h3>Spot the Red Flags 🔍</h3>
            </div>
            <span className="evidence-count">
              {revealed.length}/{currentCase.evidence.length} CHECKED
            </span>
          </div>

          <p className="section-description">
            Tap each evidence card and uncover what doesn't feel right.
          </p>

          <div className="evidence-grid">
            {currentCase.evidence.map((item, index) => {
              const isRevealed = revealed.includes(index);

              return (
                <button
                  className={`evidence-card ${
                    isRevealed ? "revealed" : ""
                  }`}
                  key={index}
                  onClick={() => toggleEvidence(index)}
                  type="button"
                >
                  <div className="evidence-card-top">
                    <span className="evidence-icon">{item.icon}</span>
                    <span className="evidence-status">
                      {isRevealed ? "FOUND ✓" : "TAP TO CHECK"}
                    </span>
                  </div>

                  <h4>{item.title}</h4>

                  {isRevealed ? (
                    <p>{item.text}</p>
                  ) : (
                    <span className="hidden-clue">
                      Reveal this clue →
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        <section className="decision-section">
          <span className="section-kicker">YOUR MOVE</span>
          <h3>Make Your Call 🎯</h3>
          <p>{currentCase.question}</p>

          <div className="decision-options">
            {currentCase.options.map((option, index) => {
              let stateClass = "";

              if (submitted) {
                if (index === currentCase.answer) {
                  stateClass = "correct";
                } else if (index === selected) {
                  stateClass = "incorrect";
                }
              }

              return (
                <button
                  key={index}
                  className={`decision-option ${
                    selected === index ? "selected" : ""
                  } ${stateClass}`}
                  onClick={() => !submitted && setSelected(index)}
                  disabled={submitted}
                  type="button"
                >
                  <span className="option-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="option-text">{option}</span>

                  {selected === index && (
                    <span className="selected-check">✓</span>
                  )}
                </button>
              );
            })}
          </div>

          {!submitted ? (
            <div className="decision-actions">
              {decisionHistory.some((item) => item.caseIndex < caseIndex) && (
                <button
                  className="previous-decision-button"
                  onClick={openPreviousDecision}
                  type="button"
                >
                  ← Your Previous Decision
                </button>
              )}

              <button
                className="detective-submit"
                onClick={handleSubmit}
                disabled={selected === null}
                type="button"
              >
                Lock My Decision →
              </button>
            </div>
          ) : (
            <div
              className={`investigation-result ${
                selected === currentCase.answer ? "correct" : "incorrect"
              }`}
            >
              <div className="result-icon">
                {selected === currentCase.answer ? "✓" : "!"}
              </div>

              <div>
                <span>
                  {selected === currentCase.answer
                    ? "SMART CALL"
                    : "LET'S BREAK IT DOWN"}
                </span>

                <h3>
                  {selected === currentCase.answer
                    ? "You spotted the safest move!"
                    : "Not quite — here's what to watch for."}
                </h3>

                <p>{currentCase.explanation}</p>
              </div>

              <div className="result-actions">
                <button className="detective-submit" onClick={nextCase} type="button">
                  {caseIndex === cases.length - 1 ? "Complete Investigation →" : "Open Next Case →"}
                </button>
              </div>
            </div>
          )}
        </section>
      </main>

      <div className="detective-disclaimer">
        Educational simulations inspired by common real-world cybercrime
        patterns. Always verify suspicious activity through trusted channels.
      </div>
    </div>
  );
}