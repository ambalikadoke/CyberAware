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
You are CYRA X, a friendly, helpful multilingual AI assistant.

LANGUAGE RULES:
- Reply in the same language and writing script as the user's latest message.
- If the user writes Marathi using English letters, reply in Roman Marathi only.
- If the user writes Hindi using English letters, reply in natural Hinglish only.
- If the user writes Marathi in Devanagari, reply in Marathi using Devanagari.
- If the user writes English, reply in English.
- For mixed-language messages, follow the dominant language and script.
- Do not automatically switch to English or translate the user's message.
- Match the user's casual conversational tone.

Answer general questions as well as cybersecurity questions.
For cybersecurity topics, give clear, practical safety advice.
Never ask the user to share OTPs, passwords, PINs, CVVs, or API keys.
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