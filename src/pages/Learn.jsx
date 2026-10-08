import React, { useState } from "react";
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

function Learn() {
  const [selectedTopic, setSelectedTopic] = useState(null);

  if (selectedTopic) {
    return (
      <TopicDetails
        topic={selectedTopic}
        onBack={() => setSelectedTopic(null)}
      />
    );
  }

  return (
    <div className="learn-page">

      {/* HERO */}
      <section className="learn-hero">

        <div className="learn-badge">
          🛡️ CYBER SAFETY ACADEMY
        </div>

        <h1>
          Learn to Stay
          <span> Cyber Safe.</span>
        </h1>

        <p>
          Understand common online threats, recognize warning signs and learn
          how to protect yourself before it is too late.
        </p>

      </section>


      {/* TOPICS */}
      <section className="topics-section">

        <div className="section-heading">

          <div>
            <p className="small-label">
              EXPLORE TOPICS
            </p>

            <h2>
              Master Your Digital Safety
            </h2>
          </div>

          <p className="topic-count">
            {topics.length} Topics
          </p>

        </div>


        {/* TOPIC CARDS */}
        <div className="topics-grid">

          {topics.map((topic) => (

            <div
              className="topic-card"
              key={topic.id}
            >

              <div className="topic-top">

                <div className="topic-icon">
                  {topic.icon}
                </div>

                <span>
                  {topic.level}
                </span>

              </div>


              <h3>
                {topic.title}
              </h3>


              <p>
                {topic.description}
              </p>


              <button
                className="learn-button"
                onClick={() => setSelectedTopic(topic.id)}
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