import React, { useEffect, useState } from "react";
import "./Learn.css";
import TopicDetails from "./TopicDetails";

const topics = [
  {
    id: "phishing",
    icon: "🎣",
    title: "Phishing & Scam Messages",
    description:
      "Learn how attackers trick you through fake emails, SMS, links and messages.",
    level: "Essential",
  },
  {
    id: "upi",
    icon: "💳",
    title: "UPI & Payment Fraud",
    description:
      "Understand fake payment requests, QR scams, collect requests and UPI fraud.",
    level: "Essential",
  },
  {
    id: "apps",
    icon: "📱",
    title: "Fake & Malicious Apps",
    description:
      "Learn how to identify suspicious apps, dangerous permissions and fake APKs.",
    level: "Important",
  },
  {
    id: "loan",
    icon: "💰",
    title: "Loan App Scams",
    description:
      "Know the warning signs of fake loan apps, harassment scams and data theft.",
    level: "Important",
  },
  {
    id: "shopping",
    icon: "🛒",
    title: "Fake Shopping Websites",
    description:
      "Discover how fake stores steal money, card details and personal information.",
    level: "Essential",
  },
  {
    id: "jobs",
    icon: "💼",
    title: "Job & Part-time Scams",
    description:
      "Identify fake job offers, task scams, registration fees and work-from-home fraud.",
    level: "Important",
  },
  {
    id: "passwords",
    icon: "🔐",
    title: "Password & Account Security",
    description:
      "Build stronger passwords and protect your online accounts from takeover.",
    level: "Essential",
  },
  {
    id: "social",
    icon: "📲",
    title: "Social Media Safety",
    description:
      "Learn how to protect your identity, privacy and accounts on social platforms.",
    level: "Important",
  },
];

const homepageTopicAliases = {
  phishing: "phishing",
  "phishing & scam messages": "phishing",
  "upi scams": "upi",
  "upi & payment fraud": "upi",
  "fake job offers": "jobs",
  "job & part-time scams": "jobs",
  "social media scams": "social",
  "social media safety": "social",
  "shopping frauds": "shopping",
  "fake shopping websites": "shopping",
  "loan app frauds": "loan",
  "loan app scams": "loan",
  "fake apps": "apps",
  "fake & malicious apps": "apps",
  passwords: "passwords",
  "password & account security": "passwords",
};

function getInitialSelection() {
  if (typeof window === "undefined") {
    return { topic: null, origin: null };
  }

  const storedTopic = sessionStorage.getItem("cyberaware-selected-topic");
  const storedOrigin =
    sessionStorage.getItem("cyberaware-topic-origin") || "home";

  sessionStorage.removeItem("cyberaware-selected-topic");
  sessionStorage.removeItem("cyberaware-topic-origin");

  if (!storedTopic) {
    return { topic: null, origin: null };
  }

  const normalized = storedTopic.trim().toLowerCase();
  const topicId = homepageTopicAliases[normalized] || normalized;
  const exists = topics.some((topic) => topic.id === topicId);

  return exists
    ? { topic: topicId, origin: storedOrigin }
    : { topic: null, origin: null };
}

function Learn({ onDetailChange }) {
  const [initialSelection] = useState(getInitialSelection);
  const [selectedTopic, setSelectedTopic] = useState(initialSelection.topic);
  const [detailOrigin, setDetailOrigin] = useState(initialSelection.origin);

  useEffect(() => {
    onDetailChange?.(selectedTopic ? detailOrigin : null);
  }, [selectedTopic, detailOrigin, onDetailChange]);

  useEffect(() => {
    const returnToOverview = () => {
      setSelectedTopic(null);
      setDetailOrigin(null);
      onDetailChange?.(null);
    };

    window.addEventListener(
      "cyberaware-back-to-learn-overview",
      returnToOverview
    );

    return () => {
      window.removeEventListener(
        "cyberaware-back-to-learn-overview",
        returnToOverview
      );
    };
  }, [onDetailChange]);

  const openTopic = (topicId) => {
    setDetailOrigin("overview");
    setSelectedTopic(topicId);
    onDetailChange?.("overview");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (selectedTopic) {
    return <TopicDetails topic={selectedTopic} />;
  }

  return (
    <div className="learn-page">
      <section className="learn-hero">
        <div className="learn-badge">🛡️ CYBER SAFETY ACADEMY</div>
        <h1>
          Learn to Stay
          <span> Cyber Safe.</span>
        </h1>
        <p>
          Understand common online threats, recognize warning signs and learn
          how to protect yourself before it is too late.
        </p>
      </section>

      <section className="topics-section">
        <div className="section-heading">
          <div>
            <p className="small-label">EXPLORE TOPICS</p>
            <h2>Master Your Digital Safety</h2>
          </div>
        </div>

        <div className="topics-grid">
          {topics.map((topic) => (
            <div className="topic-card" key={topic.id}>
              <div className="topic-top">
                <div className="topic-icon">{topic.icon}</div>
                <span>{topic.level}</span>
              </div>

              <h3>{topic.title}</h3>
              <p>{topic.description}</p>

              <button
                className="learn-button"
                onClick={() => openTopic(topic.id)}
                type="button"
              >
                Learn More <span>→</span>
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Learn;
