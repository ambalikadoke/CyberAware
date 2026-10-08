import React from "react";
import "./TopicDetails.css";

const topicData = {
  phishing: {
    icon: "🎣",
    title: "Phishing & Scam Messages",
    subtitle:
      "Learn how scammers use fake messages, emails and links to steal your information.",
    what:
      "Phishing is a cyber attack where scammers pretend to be a trusted person, company or service to trick you into sharing sensitive information or clicking a malicious link.",
    signs: [
      "Urgent messages asking you to act immediately",
      "Unknown or suspicious links",
      "Requests for passwords, OTPs, PINs or card details",
      "Spelling mistakes or unusual sender addresses",
      "Promises of prizes, refunds or unexpected rewards",
    ],
    safety: [
      "Never share OTP, PIN, CVV or passwords with anyone.",
      "Check the sender and website address carefully.",
      "Do not click links from unexpected messages.",
      "Open the official website or app yourself instead.",
      "When in doubt, verify through an official contact number.",
    ],
  },

  upi: {
    icon: "💳",
    title: "UPI & Payment Fraud",
    subtitle:
      "Understand common UPI scams and protect your money during digital payments.",
    what:
      "UPI fraud happens when scammers manipulate users into approving payments, sharing sensitive information or installing malicious applications.",
    signs: [
      "Someone asks you to scan a QR code to receive money",
      "Unexpected collect/payment requests",
      "Fake customer-care calls",
      "Requests to share your UPI PIN or OTP",
      "Pressure to complete a payment immediately",
    ],
    safety: [
      "Remember: receiving money does not require your UPI PIN.",
      "Never share your UPI PIN or OTP.",
      "Check the recipient name before approving a payment.",
      "Do not install remote-access apps on someone's request.",
      "Contact your bank immediately if you notice an unauthorized transaction.",
    ],
  },

  apps: {
    icon: "📱",
    title: "Fake & Malicious Apps",
    subtitle:
      "Learn how suspicious apps can misuse permissions and steal your data.",
    what:
      "Malicious apps are applications designed to perform harmful activities such as stealing information, displaying unwanted content or abusing device permissions.",
    signs: [
      "App downloaded from an unknown website",
      "Too many unnecessary permissions",
      "Very few or suspicious reviews",
      "Requests for SMS, contacts or accessibility access without a clear reason",
      "Promises that sound too good to be true",
    ],
    safety: [
      "Prefer official app stores.",
      "Check the developer name and reviews.",
      "Review permissions before installation.",
      "Keep your phone and apps updated.",
      "Remove apps that behave suspiciously.",
    ],
  },

  loan: {
    icon: "💰",
    title: "Loan App Scams",
    subtitle:
      "Recognize fake loan offers designed to steal money or personal information.",
    what:
      "Loan scams often attract users with instant loans, very low interest rates or minimal documentation and then demand fees or access to personal data.",
    signs: [
      "Guaranteed loan approval without proper checks",
      "Large processing fees before receiving a loan",
      "Threatening messages or calls",
      "Requests for excessive phone permissions",
      "Unknown apps or websites claiming to be lenders",
    ],
    safety: [
      "Verify the lender before sharing personal information.",
      "Avoid paying suspicious advance fees.",
      "Check the app's developer and permissions.",
      "Do not share OTPs, PINs or banking credentials.",
      "Keep evidence of suspicious calls, messages and transactions.",
    ],
  },

  shopping: {
    icon: "🛒",
    title: "Fake Shopping Websites",
    subtitle:
      "Learn how fake online stores can steal money and personal information.",
    what:
      "Fake shopping websites imitate genuine stores and use unrealistic discounts or limited-time offers to convince users to make payments.",
    signs: [
      "Prices far below normal market prices",
      "New or suspicious domain name",
      "No proper contact information",
      "Only advance payment options",
      "Poor grammar or copied website content",
    ],
    safety: [
      "Research the website before purchasing.",
      "Check the domain carefully.",
      "Use trusted payment methods.",
      "Avoid websites that pressure you to pay immediately.",
      "Keep transaction records and order information.",
    ],
  },

  jobs: {
    icon: "💼",
    title: "Job & Part-time Scams",
    subtitle:
      "Identify fake job offers, task scams and fraudulent work-from-home schemes.",
    what:
      "Job scams promise easy income or guaranteed employment and may ask victims to pay registration fees, complete fake tasks or share personal information.",
    signs: [
      "Guaranteed high income for very little work",
      "Registration or security fees",
      "Recruiters contacting you through random messaging accounts",
      "Pressure to deposit money to unlock tasks",
      "No verifiable company information",
    ],
    safety: [
      "Verify the company independently.",
      "Never pay money to get a genuine job.",
      "Do not share sensitive financial information.",
      "Be careful with task-based investment schemes.",
      "Research the recruiter and company before proceeding.",
    ],
  },

  passwords: {
    icon: "🔐",
    title: "Password & Account Security",
    subtitle:
      "Build stronger account protection and reduce the risk of account takeover.",
    what:
      "Weak or reused passwords can make multiple accounts vulnerable if one password is exposed.",
    signs: [
      "Using the same password everywhere",
      "Very short or predictable passwords",
      "Sharing passwords with others",
      "No two-factor authentication",
      "Ignoring login alerts",
    ],
    safety: [
      "Use a strong and unique password for important accounts.",
      "Enable two-factor authentication whenever available.",
      "Never share passwords or authentication codes.",
      "Review account login activity.",
      "Change compromised passwords immediately.",
    ],
  },

  social: {
    icon: "📲",
    title: "Social Media Safety",
    subtitle:
      "Protect your identity, privacy and social media accounts.",
    what:
      "Oversharing information online can help scammers perform impersonation, social engineering and account takeover attacks.",
    signs: [
      "Unknown accounts sending urgent requests",
      "Suspicious giveaway or investment messages",
      "Fake profiles pretending to be friends",
      "Requests for private information",
      "Unexpected login notifications",
    ],
    safety: [
      "Use strong privacy settings.",
      "Avoid sharing sensitive personal information publicly.",
      "Enable two-factor authentication.",
      "Verify unexpected requests through another channel.",
      "Report suspicious accounts and messages.",
    ],
  },
};

function TopicDetails({ topic = "phishing", onBack }) {
  const data = topicData[topic] || topicData.phishing;

  return (
    <div className="topic-details-page">

      <button className="topic-back-button" onClick={onBack}>
        ← Back to Learn
      </button>

      <section className="topic-details-hero">

        <div className="topic-large-icon">
          {data.icon}
        </div>

        <div>
          <div className="topic-label">CYBER SAFETY GUIDE</div>

          <h1>{data.title}</h1>

          <p>{data.subtitle}</p>
        </div>

      </section>


      <section className="topic-content">

        <div className="info-card">

          <div className="info-number">01</div>

          <h2>What is it?</h2>

          <p>{data.what}</p>

        </div>


        <div className="info-card">

          <div className="info-number">02</div>

          <h2>🚩 Warning Signs</h2>

          <ul>
            {data.signs.map((sign, index) => (
              <li key={index}>
                <span>⚠️</span>
                {sign}
              </li>
            ))}
          </ul>

        </div>


        <div className="info-card safety-card">

          <div className="info-number">03</div>

          <h2>🛡️ How to Stay Safe</h2>

          <ul>
            {data.safety.map((tip, index) => (
              <li key={index}>
                <span>✓</span>
                {tip}
              </li>
            ))}
          </ul>

        </div>


        <div className="remember-card">

          <div className="remember-icon">🧠</div>

          <div>
            <h3>Remember</h3>
            <p>
              If something feels urgent, suspicious or too good to be true,
              stop and verify before taking action.
            </p>
          </div>

        </div>

      </section>

    </div>
  );
}

export default TopicDetails;