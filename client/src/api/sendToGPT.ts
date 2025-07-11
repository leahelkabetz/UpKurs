import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

// export const sendToGPT = async (messages: any[]) => {
//   try {
//     const res = await fetch("http://localhost:3001/chat", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ messages }),
//     });

//     const data = await res.json();
//     return data.reply;
//   } catch (err) {
//     console.error("שגיאה בשליחת GPT:", err);
//     return "⚠️ לא הצלחתי להתחבר לבוט כרגע.";
//   }
// };


export const sendToGPT = async (messages: any[], userId: string) => {
  try {
    const res = await fetch("http://localhost:3001/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages, userId }),
    });

    const data = await res.json();
    return data.reply;
  } catch (err) {
    console.error("שגיאה בשליחת GPT:", err);
    return "⚠️ לא הצלחתי להתחבר לבוט כרגע.";
  }
};


