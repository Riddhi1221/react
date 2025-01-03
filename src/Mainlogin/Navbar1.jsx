import React, { useEffect,useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Container, Drawer, List, ListItem, ListItemText } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Link ,useNavigate} from "react-router-dom";

const Navbar1 = () => {
   let navigate = useNavigate()
    let Token = localStorage.getItem("Token");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Detect mobile screen size
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };
  let logoutPanel = () => {
    localStorage.removeItem("Token")
    navigate("login")
}

useEffect(() => {
  if(!Token){
      navigate('login')
      navigate('/')
  }
}, [Token]);

  return (
    <>
      <header>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="sticky" sx={{ padding: "10px 0", backgroundColor: "#4b81a8" }}>
            <Container maxWidth="lg">
              <Toolbar>
                {/* Logo Section */}
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                >
                  <SchoolIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: "24px" }}>
                  QuickStart
                </Typography>

                {/* Desktop Menu */}
                {!isMobile && (
                  <>
                    <Button onClick={logoutPanel} >
                      <a
                        href="/Mainpage"
                        style={{
                          color: "#4b81a8",
                          border: "1px solid #fff",
                          padding: "8px 20px",
                          borderRadius: "4px",
                          background: "#fff",
                          textDecoration: "none",
                        }}
                      >
                        LOGOUT
                      </a>
                    </Button>
                    <Button>
                      <a
                        href="/dashboard"
                        style={{
                          color: "#fff",
                          border: "1px solid #fff",
                          padding: "8px 20px",
                          borderRadius: "4px",
                          background: "#4b81a8",
                          textDecoration: "none",
                        }}
                      >
                       GOTO ADMIN
                      </a>
                    </Button>
                  </>
                )}

                {/* Mobile Menu */}
                {isMobile && (
                  <IconButton
                    edge="end"
                    color="inherit"
                    aria-label="menu"
                    onClick={() => toggleDrawer(true)}
                  >
                    <MenuIcon />
                  </IconButton>
                )}
              </Toolbar>
            </Container>
          </AppBar>

          {/* Drawer for Mobile Menu */}
          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={() => toggleDrawer(false)}
          >
            <Box
              sx={{ width: 250 }}
              role="presentation"
              onClick={() => toggleDrawer(false)}
              onKeyDown={() => toggleDrawer(false)}
            >
              <List>
                <ListItem button component="a" href="/login">
                  <ListItemText primary="LOGIN" />
                </ListItem>
                <ListItem button component="a" href="/signup">
                  <ListItemText primary="SIGN UP" />
                </ListItem>
              </List>
            </Box>
          </Drawer>
        </Box>
      </header>
    </>
  );
};

export default Navbar1;
