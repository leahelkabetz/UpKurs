
import express from "express";
import cors from "cors";
import OpenAI from "openai";
import dotenv from 'dotenv';
dotenv.config();

const requestCounts = {};
const MAX_REQUESTS_PER_USER = 5;
const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/chat", async (req, res) => {
    const { messages, userId } = req.body;

    if (!userId) {
        return res.status(400).json({ reply: "לא נשלח מזהה משתמש 🆔" });
    }

    // שמירת מספר הבקשות לפי userId במקום IP
    requestCounts[userId] = (requestCounts[userId] || 0) + 1;

    if (requestCounts[userId] > MAX_REQUESTS_PER_USER) {
        return res.status(429).json({ reply: "הגעת למכסת השאלות שלך 🛑" });
    }

    try {
        const systemMessage = {
            role: "system",
            content:
                "אתהב צ'אט בוט באתר קורסים שנקרא UpKurs שמוכר רק קורסים מתחומים ",
        };

        const fullMessages = [systemMessage, ...messages];

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: fullMessages,
        });

        const reply = completion.choices[0].message.content;
        res.json({ reply });
    } catch (err) {
        console.error("❌ שגיאה בשרת:", err?.response?.data || err.message || err);
        res.status(500).json({ reply: "שגיאה בתקשורת עם GPT 😢" });
    }
});


app.listen(3001, () => {
    console.log("✅ GPT Server רץ על http://localhost:3001");
});
