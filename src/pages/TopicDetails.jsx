import React from "react";
import "./TopicDetails.css";

const topicContent = {
  phishing: {
    title: "Phishing & Scam Messages",
    icon: "🎣",
    tag: "ESSENTIAL",
    intro:
      "Phishing is when scammers pretend to be a trusted person or organisation to steal your information, money, or account access.",
    example:
      "A message claims your bank account will be blocked today and asks you to open a link and enter your OTP.",
    signs: [
      "Unexpected links or attachments",
      "Urgent threats or prize claims",
      "Misspelled domains or unusual sender addresses",
      "Requests for OTPs, passwords, or bank details",
    ],
    tips: [
      "Open the official app or type the known website address yourself.",
      "Never share an OTP or password with anyone.",
      "Check the sender and the full URL before acting.",
      "Report and delete suspicious messages.",
    ],
  },

  upi: {
    title: "UPI & Payment Fraud",
    icon: "💳",
    tag: "ESSENTIAL",
    intro:
      "UPI fraud often relies on fake collect requests, QR codes, screen-sharing apps, and people pretending to send you money.",
    example:
      "Someone says they are sending a refund and asks you to scan a QR code or enter your UPI PIN to receive it.",
    signs: [
      "A request to enter your UPI PIN to receive money",
      "Unknown collect requests",
      "Pressure to install a screen-sharing app",
      "A payment screenshot without money appearing in your account",
    ],
    tips: [
      "A UPI PIN authorises a payment; it is not needed to receive money.",
      "Check transactions in your own payment app.",
      "Decline requests you do not recognise.",
      "Never share your PIN or allow remote access.",
    ],
  },

  apps: {
    title: "Fake & Malicious Apps",
    icon: "📱",
    tag: "IMPORTANT",
    intro:
      "A malicious app may collect personal data, display deceptive ads, or misuse permissions to access information on your device.",
    example:
      "A website offers a free APK outside the official store and the app asks for SMS, accessibility, and contact access without a clear reason.",
    signs: [
      "App downloaded from an unknown source",
      "Permissions unrelated to the app's purpose",
      "Developer name or reviews look suspicious",
      "Requests to disable device security",
    ],
    tips: [
      "Prefer official app stores and verified developers.",
      "Review permissions and deny unnecessary access.",
      "Keep Android and apps updated.",
      "Uninstall suspicious apps and run a trusted security check.",
    ],
  },

  loan: {
    title: "Loan App Scams",
    icon: "💰",
    tag: "IMPORTANT",
    intro:
      "Fraudulent loan apps may advertise instant approval, hide fees, collect excessive personal data, or use threats to demand money.",
    example:
      "An app promises an instant loan but asks for an advance processing fee and access to contacts before explaining the terms.",
    signs: [
      "Guaranteed loans without clear checks",
      "Advance fees demanded through personal accounts",
      "Unclear interest rates or repayment terms",
      "Unnecessary access to contacts, photos, or messages",
    ],
    tips: [
      "Check the lender and its regulatory status independently.",
      "Read fees, interest, and repayment terms before agreeing.",
      "Do not grant unrelated permissions.",
      "Save evidence and report threats to the appropriate authorities.",
    ],
  },

  shopping: {
    title: "Fake Shopping Websites",
    icon: "🛒",
    tag: "ESSENTIAL",
    intro:
      "Fake shopping stores use unusually low prices, copied product photos, and misleading checkout pages to steal payments or personal details.",
    example:
      "A social media ad offers a premium phone at a tiny fraction of its normal price and accepts only direct transfers.",
    signs: [
      "Prices that seem too good to be true",
      "No clear return policy or contact information",
      "New or misspelled domain names",
      "Only irreversible or unusual payment options",
    ],
    tips: [
      "Research the seller and independent reviews.",
      "Check the domain carefully before paying.",
      "Use trusted payment methods with buyer protection.",
      "Keep order confirmations and payment records.",
    ],
  },

  jobs: {
    title: "Job & Part-time Scams",
    icon: "💼",
    tag: "IMPORTANT",
    intro:
      "Fake recruiters may promise high income for little work and then demand registration fees, deposits, or repeated payments for tasks.",
    example:
      "A recruiter asks you to pay a refundable fee or add money to a task wallet before you can withdraw your supposed earnings.",
    signs: [
      "Payment required to get a job",
      "Unrealistic salary for simple tasks",
      "Recruiter uses unofficial email or messaging only",
      "You must deposit money to unlock earnings",
    ],
    tips: [
      "Verify vacancies on the employer's official careers page.",
      "Never pay a recruiter to secure a job.",
      "Do not share identity documents before verifying the employer.",
      "Stop if a task platform asks you to deposit money to withdraw earnings.",
    ],
  },

  passwords: {
    title: "Password & Account Security",
    icon: "🔐",
    tag: "ESSENTIAL",
    intro:
      "Strong account security makes it harder for someone to guess your password or take over your account using leaked credentials.",
    example:
      "A password reused on several websites is exposed in one data breach and attackers try it on your email and social accounts.",
    signs: [
      "Login alerts you cannot explain",
      "Password reset emails you did not request",
      "Unknown devices or sessions",
      "The same password used across multiple accounts",
    ],
    tips: [
      "Use long, unique passwords or passphrases.",
      "Use a reputable password manager.",
      "Enable multi-factor authentication.",
      "Review active sessions and change compromised passwords.",
    ],
  },

  social: {
    title: "Social Media Safety",
    icon: "📲",
    tag: "IMPORTANT",
    intro:
      "Scammers use fake profiles, impersonation, account takeovers, and emotional manipulation to trick people on social platforms.",
    example:
      "A profile copied from your friend asks urgently for money or sends a link to vote in a contest.",
    signs: [
      "New or duplicate profile asking for money",
      "Unexpected links from a friend",
      "Requests for verification codes",
      "Pressure to keep a conversation secret",
    ],
    tips: [
      "Verify unusual requests using another trusted channel.",
      "Make your profile and posts private where appropriate.",
      "Never share login or verification codes.",
      "Report impersonation and enable multi-factor authentication.",
    ],
  },
};

export default function TopicDetails({ topic }) {
  const data = topicContent[topic] || topicContent.phishing;

  return (
    <main className="topic-details-page">
      <section className="topic-detail-hero">
        <div className="topic-detail-icon" aria-hidden="true">
          {data.icon}
        </div>

        <span className="topic-detail-tag">
          🛡️ {data.tag} · CYBER SAFETY GUIDE
        </span>

        <h1>{data.title}</h1>

        <p>{data.intro}</p>
      </section>

      <section className="topic-detail-content">
        <article className="topic-info-card topic-example-card">
          <span className="topic-card-kicker">
            REAL-WORLD EXAMPLE
          </span>

          <h2>How this scam works</h2>

          <p>{data.example}</p>
        </article>

        <article className="topic-info-card">
          <span className="topic-card-kicker">
            🚩 WATCH OUT
          </span>

          <h2>Warning signs</h2>

          <ul className="topic-check-list warning-list">
            {data.signs.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="topic-info-card topic-safety-card">
          <span className="topic-card-kicker">
            ✓ YOUR SAFETY PLAN
          </span>

          <h2>How to stay safe</h2>

          <ul className="topic-check-list safety-list">
            {data.tips.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <aside className="topic-reminder">
          <span>💡</span>

          <div>
            <strong>Remember</strong>

            <p>
              If something feels suspicious, pause and verify it
              through an official channel before taking action.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}