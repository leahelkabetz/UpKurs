import React from "react";
import { IconButton, Box, Typography, Paper } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ChatBox from "./ChatBox/ChatBox";
import { colors } from "../styles/theme";

const ChatDrawer = ({ open, onClose }) => {
    if (!open) return null;

    return (
        <Box
            sx={{
                position: "fixed",
                bottom: 16,
                right: 16,
                width: 350,
                height: 450,
                zIndex: 1300,
            }}
        >
            <Paper elevation={8} sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <Box
                    sx={{
                        p: 1.5,
                        backgroundColor: colors.Primary,
                        color: "#fff",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexDirection: "row-reverse"

                    }}
                >
                    <Typography variant="subtitle1" marginRight={4}>צ'אט עם הבוט</Typography>
                    <IconButton size="small" onClick={onClose} sx={{ color: "#fff" }}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Box sx={{ flex: 1, p: 1, overflowY: "auto" }}>
                    <ChatBox />
                </Box>
            </Paper>
        </Box>
    );
};

export default ChatDrawer;
