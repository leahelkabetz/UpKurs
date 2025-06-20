// import React, { useState } from 'react';
// import { BrowserRouter } from 'react-router-dom';
// import MainRoutes from './MainRoutes';
// import { useSelector } from 'react-redux';
// import { RootState } from './redux/store';
// import LoginPage from "./pages/LoginPage";
// import { Box, Typography } from '@mui/material';
// import RegisterModal from "./Components/Register";
// import GlobalToast from './Components/GlobalToast';

// function App() {
//   const [showRegister, setShowRegister] = useState(false);
//   const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

//   const openRegister = () => setShowRegister(true);


//   return (
//     <div>
//       <GlobalToast />

//       <Box>
//         {isLoggedIn ? <MainRoutes openRegister={openRegister} />
//           : <LoginPage openRegister={openRegister} />}
//         <RegisterModal show={showRegister} onClose={() => setShowRegister(false)} />
//       </Box>
//       {/* <Box
//         component="footer"
//         sx={{
//           textAlign: 'center',
//           marginTop:0,
//           padding: 2,
//           background: '#f5f5f5',
//           borderTop: '1px solid #ddd',
//         }}
//       >
//         <Typography variant="body2" color="text.secondary">
//           © 2025 | UpKurs - Learn. Grow. Achieve. | Developed by Leah Elkabetz
//         </Typography>
//       </Box> */}
//     </div>
//   )

// }

// export default App;
import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import MainRoutes from './MainRoutes';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import LoginPage from "./pages/LoginPage";
import { Box, Typography } from '@mui/material';
import RegisterModal from "./Components/Register";
import GlobalToast from './Components/GlobalToast';

function App() {
  const [showRegister, setShowRegister] = useState(false);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const openRegister = () => setShowRegister(true);

  return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          fontFamily: 'inherit',
        }}
      >
        {/* תוכן ראשי */}
        <Box sx={{ flex: 1 }}>
          <GlobalToast />
          {isLoggedIn ? (
            <MainRoutes openRegister={openRegister} />
          ) : (
            <LoginPage openRegister={openRegister} />
          )}
          <RegisterModal show={showRegister} onClose={() => setShowRegister(false)} />
        </Box>
      </Box>
  );
}

export default App;
