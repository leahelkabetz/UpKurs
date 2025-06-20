
import React, { useState } from "react";
import { Box, IconButton, InputBase, Typography, CircularProgress } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import "./ChatBox.scss"; 
import { ChatMessage, sendToGPT } from "../../api/sendToGPT";

const ChatBox = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: "היי, איך אפשר לעזור לך?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages: ChatMessage[] = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const reply = await sendToGPT(newMessages);
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch (err) {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "⚠️ שגיאה בשרת. נסי שוב מאוחר יותר." },
      ]);
    }

    setLoading(false);
  };

  return (
    // <Box dir="rtl" sx={{ p: 2, bgcolor: "#f5f5f5", borderRadius: 2, maxHeight: 500, display: "flex", flexDirection: "column" }}>
    //   <Box sx={{ flexGrow: 1, overflowY: "auto", mb: 2 }}>
    //     {messages.map((msg, i) => (
    //       <Typography key={i} align={msg.role === "user" ? "right" : "left"} sx={{ mb: 1 }}>
    //         <b>{msg.role === "user" ? "את" : "בוט"}:</b> {msg.content}
    //       </Typography>
    //     ))}
    //     {loading && (
    //       <Box className="dots-loader" sx={{ textAlign: "left", pl: 1, color: "#197d91" }} />
    //     )}
    //   </Box>

    //   <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
    //     <InputBase
    //       fullWidth
    //       placeholder="הקלידי הודעה..."
    //       value={input}
    //       onChange={(e) => setInput(e.target.value)}
    //       onKeyDown={(e) => e.key === "Enter" && sendMessage()}
    //       sx={{
    //         px: 2,
    //         py: 1,
    //         bgcolor: "#fff",
    //         borderRadius: "20px",
    //         boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
    //         fontSize: "1rem",
    //       }}
    //     />
    //     <IconButton onClick={sendMessage} sx={{ color: "#197d91" }}>
    //       <SendIcon />
    //     </IconButton>
    //   </Box>
    // </Box>
    <Box dir="rtl" sx={{ p: 2, bgcolor: "#f5f5f5", borderRadius: 2, maxHeight: 500, display: "flex", flexDirection: "column" }}>
  <Box sx={{ flexGrow: 1, overflowY: "auto", mb: 2, display: "flex", flexDirection: "column", gap: 1 }}>
    {messages.map((msg, i) => (
      <Box
        key={i}
        sx={{
          alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
          bgcolor: msg.role === "user" ? "#197d91" : "#e0e0e0",
          color: msg.role === "user" ? "white" : "black",
          px: 2,
          py: 1,
          borderRadius: 3,
          maxWidth: "80%",
        }}
      >
        <Typography variant="body2">{msg.content}</Typography>
      </Box>
    ))}

    {loading && (
      <Box sx={{ alignSelf: "flex-start", pl: 1 }}>
        <span className="dots-loader" />
      </Box>
    )}
  </Box>

  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
    <InputBase
      fullWidth
      placeholder="הקלידי הודעה..."
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      sx={{
        px: 2,
        py: 1,
        bgcolor: "#fff",
        borderRadius: "20px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
        fontSize: "1rem",
      }}
    />
    <IconButton onClick={sendMessage} sx={{ color: "#197d91" , transform: "rotate(180deg)" }}>
      <SendIcon />
    </IconButton>
  </Box>
</Box>

  );
};

export default ChatBox;
