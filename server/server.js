require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "20kb" }));

const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

// Models to try, in order
const MODELS = [
  "gemini-3.6-flash",
  "gemini-3.5-flash-lite",
];

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "CYRA X backend is running!",
  });
});

app.post("/api/chat", async (req, res) => {
  try {
    if (!ai) {
      return res.status(503).json({
        success: false,
        message: "AI configuration is missing. Please check server/.env.",
      });
    }

    const { message, history = [] } = req.body;

    if (typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please enter a message.",
      });
    }

    if (message.length > 4000) {
      return res.status(413).json({
        success: false,
        message: "Message is too long. Please keep it under 4000 characters.",
      });
    }

    const safeHistory = Array.isArray(history)
      ? history
          .filter(
            (item) =>
              item &&
              ["user", "model"].includes(item.role) &&
              typeof item.text === "string"
          )
          .slice(-10)
          .map((item) => ({
            role: item.role,
            parts: [{ text: item.text.slice(0, 3000) }],
          }))
      : [];

 const systemInstruction = `
You are CYRA X, CyberAware's professional Cyber Awareness Assistant.

YOUR PURPOSE:
You are designed specifically to help users with cybersecurity awareness, online safety, digital fraud, scams, phishing, suspicious links, social media safety, privacy, passwords, malware, cybercrime, and other urgent digital security concerns.

LANGUAGE RULE:
- Always reply in clear, professional English.
- This rule applies regardless of the language used by the user.
- Users may write in English, Hindi, Marathi, Hinglish, or any other language, but your response must always be in English.
- Do not reply in Hindi, Marathi, Hinglish, or any other language.

GREETING RULE:
If the user sends a simple greeting such as "Hi", "Hello", "Hey", "Namaste", or a similar greeting, respond professionally with:

"Hello! I'm CYRA X, your Cyber Awareness Assistant. I'm here to help you stay safe online and guide you through cybersecurity concerns, online scams, fraud prevention, and digital safety. How can I assist you today?"

SCOPE RULE:
Only answer questions related to cybersecurity awareness, online safety, scams, fraud prevention, or urgent digital security concerns.

If the user's question is unrelated to these topics, do not answer the question. Instead, respond exactly with:

"I'm here to help you with cybersecurity awareness, online safety, scams, fraud prevention, and other urgent digital security concerns.

For questions outside these areas, you may want to use a general-purpose AI assistant. I'm designed specifically to help you stay safe in the digital world."

CYBERSECURITY RESPONSE RULES:
- Give clear, practical, and helpful advice.
- Keep answers professional and easy to understand.
- For urgent fraud or security situations, prioritize immediate safety steps.
- Never ask the user to share OTPs, passwords, PINs, CVVs, bank details, or API keys.
- Do not pretend to be a bank, police department, or government authority.
`;

    let response;
    let lastError;

    for (const model of MODELS) {
      try {
        console.log(`CYRA X trying model: ${model}`);

        response = await ai.models.generateContent({
          model,
          contents: [
            ...safeHistory,
            {
              role: "user",
              parts: [{ text: message.trim() }],
            },
          ],
          config: {
            systemInstruction,
            temperature: 0.8,
            maxOutputTokens: 800,
          },
        });

        if (response?.text?.trim()) {
          console.log(`CYRA X response received from: ${model}`);
          break;
        }

        lastError = new Error(`No response text received from ${model}`);
        response = null;
      } catch (error) {
        lastError = error;

        console.error(
          `Model ${model} failed:`,
          error.status || error.code || "",
          error.message
        );

        // Try the next model only for temporary availability,
        // rate-limit, or model-not-found errors.
        const status = Number(error.status || error.code);

        const shouldTryNext =
          status === 404 ||
          status === 429 ||
          status === 503 ||
          /not found|unavailable|high demand|resource exhausted/i.test(
            error.message || ""
          );

        if (!shouldTryNext) {
          break;
        }
      }
    }

    if (!response?.text?.trim()) {
      console.error("All CYRA X models failed:", lastError?.message);

      return res.status(502).json({
        success: false,
        message:
          "CYRA X is temporarily unavailable. Please try again in a little while.",
      });
    }

    return res.json({
      success: true,
      reply: response.text.trim(),
    });
  } catch (error) {
    console.error("CYRA X unexpected error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`CYRA X backend running on port ${PORT}`);
});