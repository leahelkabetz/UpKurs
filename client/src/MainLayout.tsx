import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Drawer,
  IconButton,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Navbar from './Components/Navbar';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import ChatBox from './Components/ChatBox/ChatBox'; 
import ChatDrawer from './Components/ChatDrawer';

export default function MainLayout() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

const [isChatOpen, setIsChatOpen] = useState(false);
 const handleChatClick = () => {
    setIsChatOpen(true);
  };
  const handleChatClose = () => {
    setIsChatOpen(false);
  };
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      {isLoggedIn && <Navbar onChatClick={handleChatClick} />}

      <Container maxWidth={false} sx={{ mt: 10, px: 2, flex: 1 }}>
        <Outlet />
      </Container>

      <Box
        component="footer"
        sx={{
          textAlign: 'center',
          padding: 2,
          background: '#f5f5f5',
          borderTop: '1px solid #ddd',
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © 2025 | UpKurs - Learn. Grow. Achieve. | Developed by Leah Elkabetz
        </Typography>
      </Box>

      <ChatDrawer open={isChatOpen} onClose={handleChatClose} />

    </Box>
  );
}
