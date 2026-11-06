import React, { useEffect, useRef, useState } from "react";
import "./CyraX.css";

const API_URL = "http://localhost:5000/api/chat";

const INITIAL_MESSAGE = {
  type: "bot",
  text: "Hello! I'm CYRA X, your Cyber Awareness Assistant. I'm here to help you stay safe online and guide you through cybersecurity concerns, online scams, fraud prevention, and digital safety. How can I assist you today?",
};

const QUICK_QUESTIONS = [
  { icon: "💳", text: "Is this payment safe?" },
  { icon: "🔗", text: "Check a suspicious link" },
  { icon: "🚨", text: "I think this is a scam" },
];

function getDefaultResponse(input) {
  const text = input.toLowerCase().trim();

  const contains = (...words) =>
    words.some((word) => text.includes(word));

  if (
    contains(
      "otp",
      "one time password",
      "ओटीपी",
      "ओटिपी"
    )
  ) {
    return "🚨 Never share your OTP with anyone. Banks and genuine services should not ask you to disclose your OTP over a call or message. If someone is asking for it, stop and verify through the official service.";
  }

  if (
    contains(
      "upi",
      "payment",
      "qr code",
      "पैसे पाठव",
      "यूपीआय",
      "पेमेंट"
    )
  ) {
    return "🔐 Before making a UPI payment, verify the receiver and amount carefully. You generally do not need to enter your UPI PIN to receive money. Never approve an unexpected collect request.";
  }

  if (
    contains(
      "phishing",
      "suspicious link",
      "fake link",
      "फिशिंग",
      "संशयास्पद लिंक"
    )
  ) {
    return "🔍 Phishing messages often create urgency or promise rewards. Check the sender and website address carefully. Avoid opening suspicious links and never enter passwords or OTPs on untrusted websites.";
  }

  if (
    contains(
      "fake app",
      "unknown apk",
      "app permission",
      "फेक ऐप",
      "बनावट अॅप"
    )
  ) {
    return "📱 Before installing an app, verify its developer, reviews, official source and requested permissions. Avoid installing APK files received through unknown links. Unnecessary permissions can be a warning sign.";
  }

  if (contains("password", "पासवर्ड")) {
    return "🔑 Use a strong, unique password for each important account. Enable two-factor authentication where available. Never share passwords, recovery codes or OTPs with anyone.";
  }

  if (
    contains(
      "scam",
      "fraud",
      "cheated",
      "फ्रॉड",
      "फसवणूक",
      "धोखा"
    )
  ) {
    return "🛡️ If you suspect a scam, stop communicating with the suspected scammer. Do not send more money. Preserve messages, screenshots and transaction details. In India, you can report financial cyber fraud through the official helpline 1930 or the National Cyber Crime Reporting Portal.";
  }

  if (
    contains(
      "fake job",
      "job scam",
      "loan scam",
      "lottery",
      "नोकरी",
      "लॉटरी",
      "लोन"
    )
  ) {
    return "⚠️ Be careful with jobs, loans or prizes that demand upfront payments. Verify the organisation through independently found official contact details before sending money or documents.";
  }

  if (
  /^(hi|hello|hey|hii|hlo|नमस्कार|नमस्ते|हाय)[!. ]*$/i.test(text)
) {
  return "Hello! I'm CYRA X, your Cyber Awareness Assistant. I'm here to help you stay safe online and guide you through cybersecurity concerns, online scams, fraud prevention, and digital safety. How can I assist you today?";
}

  return null;
}

function CyraX() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, isLoading]);

  const sendMessage = async (text = message) => {
    const userMessage = text.trim();

    if (!userMessage || isLoading) return;

    setMessage("");
    setErrorMessage("");

    const currentMessages = messages;

    setMessages((previous) => [
      ...previous,
      {
        type: "user",
        text: userMessage,
      },
    ]);

    const defaultResponse = getDefaultResponse(userMessage);

    if (defaultResponse) {
      setMessages((previous) => [
        ...previous,
        {
          type: "bot",
          text: defaultResponse,
        },
      ]);
      return;
    }

    const history = currentMessages
      .filter(
        (item) =>
          (item.type === "user" || item.type === "bot") &&
          typeof item.text === "string"
      )
      .slice(-10)
      .map((item) => ({
        role: item.type === "user" ? "user" : "model",
        text: item.text,
      }));

    setIsLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          history,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "CYRA X couldn't answer right now. Please try again."
        );
      }

      setMessages((previous) => [
        ...previous,
        {
          type: "bot",
          text: data.reply,
        },
      ]);
    } catch (error) {
      console.error("CYRA X request failed:", error);

      setErrorMessage(
        "AI is temporarily unavailable. Check your connection or try again shortly."
      );

      setMessages((previous) => [
        ...previous,
        {
          type: "bot",
text:
  "CYRA X is temporarily unavailable. Please check your connection and try again in a moment.",        },
      ]);
    } finally {
      setIsLoading(false);

      setTimeout(() => {
        textareaRef.current?.focus();
      }, 50);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    if (isLoading) return;

    setMessages([INITIAL_MESSAGE]);
    setMessage("");
    setErrorMessage("");
  };

  return (
    <main className="cyrax-page">
      <div className="cyrax-glow glow-one" />
      <div className="cyrax-glow glow-two" />

      <section className="cyrax-layout">
        {/* SIMPLE BRAND PANEL */}
        <aside className="cyrax-side-panel">
          <div className="cyrax-brand-top">
            <div className="cyrax-avatar">
              <span>✦</span>
            </div>

            <div>
              <div className="cyrax-title">
                CYRA <span>X</span>
              </div>
<p>Smart. Safe. Always here. ✦</p>            </div>
          </div>

          <div className="cyrax-side-content">
            <span className="cyrax-eyebrow">
              <i />
              CYBERAWARE AI
            </span>

            <h1>
              Stay curious.
              <span> Stay protected.</span>
            </h1>

            <p>
              Simple answers for safer choices online.
            </p>
          </div>

          <div className="cyrax-side-footer">
            <span className="cyrax-status-dot" />
            CYRA X IS READY
          </div>
        </aside>

        {/* CHAT PANEL */}
        <section
          className="cyrax-chat"
          aria-label="CYRA X conversation"
        >
          <header className="cyrax-chat-header">
            <div className="cyrax-chat-heading">
              <div className="cyrax-chat-icon">✦</div>

              <div>
                <div className="chat-heading-row">
                  <h2>Chat with CYRA X</h2>

                  <span className="chat-live">
                    <i />
                    Ready
                  </span>
                </div>

<p>Ask in any language — CYRA replies in English</p>              </div>
            </div>

            <button
              type="button"
              className="cyrax-clear-button"
              onClick={clearChat}
              disabled={isLoading}
              title="Clear conversation"
            >
              <span>↻</span>
              <span>New chat</span>
            </button>
          </header>

          <div
            className="cyrax-messages"
            aria-live="polite"
            aria-busy={isLoading}
          >
            <div className="cyrax-chat-welcome">
              <h3>Hey, I'm CYRA X 👋</h3>
              <p>What can I help you with today?</p>
            </div>

            {messages.map((item, index) => (
              <div
                key={`${index}-${item.type}`}
                className={`cyrax-message-row ${item.type}`}
              >
                {item.type === "bot" && (
                  <div className="cyrax-small-avatar">✦</div>
                )}

                <div className="cyrax-message-content">
                  {item.type === "bot" && (
                    <span className="cyrax-sender-label">
                      CYRA X
                    </span>
                  )}

                  <div className="cyrax-bubble">
                    {item.text}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="cyrax-message-row bot">
                <div className="cyrax-small-avatar">✦</div>

                <div className="cyrax-message-content">
                  <span className="cyrax-sender-label">
                    CYRA X
                  </span>

                  <div className="cyrax-bubble cyrax-typing">
                    <span />
                    <span />
                    <span />
                    <small>CYRA is thinking...</small>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {messages.length <= 2 && !isLoading && (
            <section className="cyrax-quick-section">
              <div className="cyrax-quick-heading">
                <h3>Try one of these</h3>
              </div>

              <div className="cyrax-quick-buttons">
                {QUICK_QUESTIONS.map((question) => (
                  <button
                    type="button"
                    key={question.text}
                    onClick={() => sendMessage(question.text)}
                    disabled={isLoading}
                  >
                    <span className="quick-question-icon">
                      {question.icon}
                    </span>

                    <span className="quick-question-text">
                      {question.text}
                    </span>

                    <span className="quick-arrow">↗</span>
                  </button>
                ))}
              </div>
            </section>
          )}

          {errorMessage && (
            <div className="cyrax-error">
              <span>{errorMessage}</span>

              <button
                type="button"
                onClick={() => {
                  setErrorMessage("");
                  textareaRef.current?.focus();
                }}
              >
                Dismiss
              </button>
            </div>
          )}

          <form
            className="cyrax-input-area"
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage();
            }}
          >
            <div className="cyrax-input-wrap">
              <textarea
                ref={textareaRef}
                value={message}
                onChange={(event) =>
                  setMessage(event.target.value)
                }
                onKeyDown={handleKeyDown}
                placeholder="Ask CYRA anything..."
                rows={1}
                maxLength={4000}
                disabled={isLoading}
              />

              <span className="input-hint">
                Enter to send
              </span>
            </div>

            <button
              type="submit"
              className="cyrax-send"
              disabled={!message.trim() || isLoading}
              aria-label="Send message"
            >
              {isLoading ? "…" : "↑"}
            </button>
          </form>
        </section>
      </section>
    </main>
  );
}

export default CyraX;