
import { AppBar, Toolbar, Box, Typography, IconButton, Button, Badge } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { colors } from "../styles/theme";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { logout } from "../redux/slices/authSlice";

type NavbarProps = {
  onChatClick?: () => void;
};

const Navbar = ({ onChatClick }: NavbarProps) => {
  const navigate = useNavigate();
  const username = useSelector((state: RootState) => state.auth.username);
  const isAdmin = useSelector((state: RootState) => state.auth.isAdmin);
  const cartCount = useSelector((state: RootState) => state.cart.items.length);
  const [cartBounce, setCartBounce] = useState(false);

  const dispatch = useDispatch();
console.log("שם",username);
  useEffect(() => {
    if (cartCount > 0) {
      setCartBounce(true);
      const timer = setTimeout(() => setCartBounce(false), 400);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  return (
    <AppBar position="static"
      sx={{
        position: 'fixed',
        top: 0,
        lef: 0,
        right: 0,
        width: '100%',
        zIndex: 1000,
        boxShadow: 1,
        backgroundColor: colors.Primary, direction: "rtl", px: 3,
        mb: 20
      }}>
      {/* <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 200 }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", color: "white", cursor: 'pointer' }}>
              Upkurs
            </Typography>
          </Link>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            position: "absolute",
            right: 0,
            left: 0,
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <Box sx={{ pointerEvents: "auto", display: "flex", gap: 4 }}>
            <Button
              color="inherit"
              startIcon={<SchoolIcon sx={{ ml: 1 }} />}
              sx={{ color: "white", fontSize: 16, py: 1 }}
              onClick={() => navigate("/courses")}
            >
              הקורסים שלנו
            </Button>
            <Button
              color="inherit"
              startIcon={<ThumbUpIcon sx={{ ml: 1 }} />}
              sx={{ color: "white", fontSize: 16, py: 1 }}
              onClick={() => navigate("/feedback")}
            >
              המלצות סטודנטים
            </Button>
            <Button
              color="inherit"
              startIcon={<InfoOutlinedIcon sx={{ ml: 1 }} />}
              sx={{ color: "white", fontSize: 16, py: 1 }}
              onClick={() => navigate("/about")}
            >
              מי אנחנו
            </Button>
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 200, justifyContent: "flex-end" }}>
          <IconButton sx={{ color: "white" }} onClick={() => navigate("/editPropile")}>
            <PersonIcon />
          </IconButton>


          <Typography
            onClick={() => navigate("/editPropile")}
            sx={{
              color: "white",
              fontWeight: "bold",
              maxWidth: 100,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              cursor: "pointer", 
              ml:5,
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            שלום, {isAdmin ? "מנהל" : username}
          </Typography>

          {!isAdmin && (
            <IconButton sx={{ color: "white" }} onClick={() => navigate("/cart")}>
              <Badge
                badgeContent={cartCount}
                color="error"
                sx={{
                  '& .MuiBadge-badge': {
                    animation: cartBounce ? 'bounce 0.4s ease' : 'none',
                    transformOrigin: 'center',
                  },
                }}
              >
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          )}
          <IconButton sx={{ color: "white" }} onClick={onChatClick}>
            <ChatIcon />
          </IconButton>

          <IconButton sx={{ color: "white" }} onClick={() => navigate("/login")}>
            <LogoutIcon />
          </IconButton>
        </Box>
        
      </Toolbar> */}
      <Toolbar
  sx={{
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 2,
  }}
>
  {/* צד שמאל (לוגו) */}
  <Box sx={{ display: "flex", alignItems: "center", minWidth: 150 }}>
    <Link to="/" style={{ textDecoration: "none" }}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          color: "white",
          cursor: "pointer",
          fontSize: { xs: 18, sm: 20, md: 24 },
        }}
      >
        Upkurs
      </Typography>
    </Link>
  </Box>

  {/* תפריט אמצע */}
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      justifyContent: "center",
    gap: { xs: 1.5, sm: 3.5 },
      flex: 1,
      order: { xs: 3, sm: 2 },
      my: { xs: 1, sm: 0 },
    }}
  >
    <Button
      color="inherit"
      startIcon={<SchoolIcon fontSize="medium" sx={{marginLeft:1.5}}/>}
      sx={{ color: "white", fontSize: 14 }}
      onClick={() => navigate("/courses")}
    >
      הקורסים שלנו
    </Button>
    <Button
      color="inherit"
      startIcon={<ThumbUpIcon fontSize="medium" sx={{marginLeft:1.5}}/>}
      sx={{ color: "white", fontSize: 14 }}
      onClick={() => navigate("/feedback")}
    >
      המלצות סטודנטים
    </Button>
    <Button
      color="inherit"
      startIcon={<InfoOutlinedIcon fontSize="medium"sx={{marginLeft:1.5}}/>}
      sx={{ color: "white", fontSize: 14 }}
      onClick={() => navigate("/about")}
    >
      מי אנחנו
    </Button>
  </Box>

  {/* צד ימין – אייקונים */}
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 1.5,
      minWidth: 150,
      justifyContent: "flex-end",
      order: { xs: 2, sm: 3 },
      width: { xs: "100%", sm: "auto" },
    }}
  >
    <IconButton sx={{ color: "white", marginRight:0}} onClick={() => navigate("/editPropile")}>
      <PersonIcon />
    </IconButton>

    <Typography
      onClick={() => navigate("/editPropile")}
      sx={{
        color: "white",
        fontWeight: "bold",
        maxWidth: 100,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        cursor: "pointer",
        marginLeft:0.7,
        "&:hover": {
          textDecoration: "underline",
        },
      }}
    >
      שלום, {isAdmin ? "מנהל" : username}
    </Typography>

    {!isAdmin && (
      <IconButton sx={{ color: "white" }} onClick={() => navigate("/cart")}>
        <Badge
          badgeContent={cartCount}
          color="error"
          sx={{
            "& .MuiBadge-badge": {
              animation: cartBounce ? "bounce 0.4s ease" : "none",
              transformOrigin: "center",
            },
          }}
        >
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    )}

    <IconButton sx={{ color: "white" }} onClick={onChatClick}>
      <ChatIcon />
    </IconButton>

    <IconButton sx={{ color: "white" }} onClick={() => {
      dispatch(logout());
      navigate("/login");
    }}>
      <LogoutIcon />
    </IconButton>
  </Box>
</Toolbar>

    </AppBar>
  );
};

export default Navbar;
