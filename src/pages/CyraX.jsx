import React, { useEffect, useRef, useState } from "react";
import "./CyraX.css";

const API_URL = "http://localhost:5000/api/chat";

const INITIAL_MESSAGE = {
  type: "bot",
  text: "Hey! 👋 I'm CYRA X, your AI assistant from CyberAware. Ask me about online safety, scams, or anything else. You can talk to me in Marathi, Hindi, English or Hinglish!",
};

const QUICK_QUESTIONS = [
  "I received an OTP request",
  "Is this UPI payment safe?",
  "How do I identify phishing?",
  "How can I spot a fake app?",
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

  if (
    contains(
      "password",
      "पासवर्ड"
    )
  ) {
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
    /^(hi|hello|hey|hii|hlo|नमस्कार|नमस्ते|हाय)[!. ]*$/i.test(
      text
    )
  ) {
    return "Hey there! 👋😊 I'm CYRA X. You can ask me about cybersecurity, technology, studies or everyday questions. Which language would you like to chat in?";
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

  // Automatically scroll to the latest message.
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

    // Known cybersecurity questions receive instant local responses.
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

    // Send the previous conversation context to the AI backend.
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

      // Keep the user message visible and offer a retry.
      setMessages((previous) => [
        ...previous,
        {
          type: "bot",
          text:
            "Sorry, bhava! 😅 I couldn't connect to the AI service right now. Your message is still here. Please try again in a moment.",
        },
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
      <section className="cyrax-header">
        <div className="cyrax-avatar">🤖</div>

        <div className="cyrax-brand">
          <div className="cyrax-title">
            CYRA <span>X</span>
          </div>

          <p>Your AI Cyber Safety Assistant</p>
        </div>

        <div className="cyrax-status">
          <span className="cyrax-status-dot" />
          <span>Assistant</span>
        </div>
      </section>

      <section className="cyrax-intro">
        <span className="cyrax-eyebrow">
          YOUR DIGITAL SAFETY COMPANION
        </span>

        <h1>
          Stay Smart. <span>Stay Safe.</span>
        </h1>

        <p>
          Ask questions, explore cybersecurity, or simply start
          a conversation. CYRA X is here to help.
        </p>
      </section>

      <section
        className="cyrax-chat"
        aria-label="CYRA X conversation"
      >
        <header className="cyrax-chat-header">
          <div className="cyrax-chat-heading">
            <div className="cyrax-chat-icon">✦</div>

            <div>
              <h2>Chat with CYRA X</h2>
              <p>Ask in your preferred language</p>
            </div>
          </div>

          <button
            type="button"
            className="cyrax-clear-button"
            onClick={clearChat}
            disabled={isLoading}
            title="Clear conversation"
          >
            <span aria-hidden="true">↻</span>
            <span>New chat</span>
          </button>
        </header>

        <div
          className="cyrax-messages"
          aria-live="polite"
          aria-busy={isLoading}
        >
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

                <div
                  className="cyrax-bubble cyrax-typing"
                  aria-label="CYRA X is thinking"
                >
                  <span />
                  <span />
                  <span />
                  <small>Thinking...</small>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {messages.length <= 2 && !isLoading && (
          <section className="cyrax-quick-section">
            <div className="cyrax-quick-heading">
              <span>✦</span>
              <p>Try asking</p>
            </div>

            <div className="cyrax-quick-buttons">
              {QUICK_QUESTIONS.map((question) => (
                <button
                  type="button"
                  key={question}
                  onClick={() => sendMessage(question)}
                  disabled={isLoading}
                >
                  {question}
                  <span aria-hidden="true">↗</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {errorMessage && (
          <div className="cyrax-error" role="status">
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
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message CYRA X in any language..."
            rows={1}
            maxLength={4000}
            disabled={isLoading}
            aria-label="Type your message"
          />

          <button
            type="submit"
            className="cyrax-send"
            disabled={!message.trim() || isLoading}
            aria-label="Send message"
            title="Send message"
          >
            {isLoading ? "…" : "↑"}
          </button>
        </form>

        <footer className="cyrax-warning">
          <span>🛡️</span>
          Never share your OTP, PIN, password, CVV or API key.
          CYRA X provides awareness guidance, not professional
          financial or legal advice.
        </footer>
      </section>

      <p className="cyrax-footer-note">
        Powered by CyberAware <span>·</span> Think before you click.
      </p>
    </main>
  );
}

export default CyraX;