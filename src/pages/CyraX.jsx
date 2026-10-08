import React, { useState } from "react";
import "./CyraX.css";

function CyraX() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Hi! I'm CYRA X 🤖 Your AI Cyber Safety Assistant. Ask me about scams, phishing, UPI fraud, fake apps, passwords or online safety.",
    },
  ]);

  const getResponse = (input) => {
    const text = input.toLowerCase();

    if (text.includes("otp")) {
      return "Never share your OTP with anyone. 🚨 Banks, UPI apps and genuine services will never ask you to share your OTP over calls or messages.";
    }

    if (text.includes("upi") || text.includes("payment")) {
      return "For UPI safety, never approve an unknown collect request or scan a QR code just to receive money. 🔐 Always verify the receiver before making a payment.";
    }

    if (
      text.includes("phishing") ||
      text.includes("link") ||
      text.includes("url")
    ) {
      return "Be careful with suspicious links. 🔍 Check the website address, avoid urgent messages asking for login details, and never enter your password or OTP on an unknown website.";
    }

    if (
      text.includes("fake app") ||
      text.includes("application") ||
      text.includes("app")
    ) {
      return "Before installing an app, check its developer, reviews, downloads and requested permissions. ⚠️ Avoid APK files received through random links or messages.";
    }

    if (
      text.includes("password") ||
      text.includes("account")
    ) {
      return "Use a strong and unique password for every important account. 🔐 Enable two-factor authentication whenever available and never share your password.";
    }

    if (
      text.includes("scam") ||
      text.includes("fraud") ||
      text.includes("cheat")
    ) {
      return "If you suspect a scam, don't panic. 🚨 Stop communication, don't send money or sensitive information, save screenshots/evidence and report the incident through official cybercrime channels.";
    }

    if (
      text.includes("loan") ||
      text.includes("job") ||
      text.includes("lottery") ||
      text.includes("prize")
    ) {
      return "Be cautious of offers that demand upfront payment or sensitive information. ⚠️ Verify the company independently before sharing documents, money or account details.";
    }

    if (
      text.includes("hello") ||
      text.includes("hi") ||
      text.includes("hey")
    ) {
      return "Hey! 👋 I'm CYRA X. How can I help you stay safer online today?";
    }

    return "I can help you with phishing, UPI fraud, fake apps, suspicious links, passwords, online scams and cyber safety. 🛡️ Try asking me about one of these topics.";
  };

  const sendMessage = () => {
    if (!message.trim()) return;

    const userMessage = message.trim();

    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        text: userMessage,
      },
      {
        type: "bot",
        text: getResponse(userMessage),
      },
    ]);

    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickQuestions = [
    "I received an OTP request",
    "Is this UPI payment safe?",
    "How do I identify phishing?",
    "How can I spot a fake app?",
  ];

  const askQuickQuestion = (question) => {
    setMessages((prev) => [
      ...prev,
      { type: "user", text: question },
      { type: "bot", text: getResponse(question) },
    ]);
  };

  return (
    <div className="cyrax-page">

      <div className="cyrax-header">
        <div className="cyrax-avatar">🤖</div>

        <div>
          <div className="cyrax-title">
            CYRA <span>X</span>
          </div>
          <p>AI Cyber Safety Assistant</p>
        </div>

        <div className="cyrax-status">
          <span></span> Online
        </div>
      </div>

      <div className="cyrax-intro">
        <h2>Stay Smart. Stay Safe. 🛡️</h2>
        <p>
          Ask CYRA X about online scams, phishing, UPI fraud,
          fake apps, suspicious links and digital safety.
        </p>
      </div>

      <div className="cyrax-chat">

        <div className="cyrax-messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`cyrax-message-row ${msg.type}`}
            >
              {msg.type === "bot" && (
                <div className="small-avatar">🤖</div>
              )}

              <div className="cyrax-bubble">
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="quick-section">
          <p>Quick questions</p>

          <div className="quick-buttons">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => askQuickQuestion(question)}
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        <div className="cyrax-input-area">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask CYRA X anything about cyber safety..."
            rows="1"
          />

          <button
            className="cyrax-send"
            onClick={sendMessage}
          >
            ➤
          </button>
        </div>

        <div className="cyrax-warning">
          ⚠️ CYRA X provides awareness guidance only. Never share
          your OTP, PIN, password, CVV or banking credentials.
        </div>

      </div>
    </div>
  );
}

export default CyraX;