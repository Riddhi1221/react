import React, { useEffect,useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import { Drawer as MuiDrawer, Typography, Toolbar, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { SpaceDashboard, Menu, Category, FolderCopy, QuestionMark, Login ,PersonAdd , Logout} from "@mui/icons-material";
import { Link ,useNavigate} from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Image from '../../images/interview1.png'

const drawerWidth = 240;

let pages = [
  {
    name: "Dashboard",
    path: "/",
    icon: <SpaceDashboard />,
  },
  {
    name: "Category",
    path: "/category",
    icon: <Category />,
  },
  {
    name: "Sub Category",
    path: "/subcategory",
    icon: <FolderCopy />,
  },
  {
    name: "Q & A",
    path: "/qa",
    icon: <QuestionMark />,
  },
];

function Drawer(props) {

  let navigate = useNavigate()
  let Token = localStorage.getItem("Token");
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };
  

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div >
      <Toolbar sx={{justifyContent : "center"}}>
        <img src={Image} width={'100px'} alt="" />
      </Toolbar>
      
      <Divider />
      <List>
        {pages.map((page, index) => (
          <Link key={index} to={page.path} style={{ textDecoration: "none"}}>
            <ListItem disablePadding sx={{color:"#fff","&:hover": {
                    backgroundColor: "#f0f0f0", 
                    color:"black"
                  },}}>
              <ListItemButton>
                <ListItemIcon
                  sx={{
                    color: "#fff"}}
                >
                  {page.icon}
                </ListItemIcon>
                <ListItemText
                  primary={page.name}
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    color: "#fff", 
                    textTransform: "uppercase",
                    "&:hover": {
                      color: "black", 
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

    let logoutPanel = () => {
      localStorage.removeItem("Token")
      navigate("login")
  }

useEffect(() => {
  if(!Token){
      navigate('login')
  }
}, [Token]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          background: "#3498dbp",
          display: "flex",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px}` },
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", background:"rgb(121, 121, 122)" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: { sm: "none" },
              color: "#333",
              
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            <Menu />
          </IconButton >
          <Typography variant="h6" noWrap component="div" sx={{ color: "#fff"}}>
            Admin Panel
          </Typography>
        
          <Box sx={{margin:"5px"}}>
          <Button variant="contained" onClick={logoutPanel} sx={{background:"transparent", boxShadow:"none", color:"white"}}><a href="/login" style={{margin:"5px 5px",color:"white"}}><Logout /></a></Button>
          <Button><a href="/Signup" style={{margin:"5px 5px",color:"white"}}><PersonAdd /></a></Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
          backgroundColor: "#2c3e50",
        }}
        aria-label="mailbox folders"
      >
        <MuiDrawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, 
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#34495e",
              color: "#fff",
            },
          }}
        >
          {drawer}
        </MuiDrawer>
        <MuiDrawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "rgb(121, 121, 122)",
              color: "#fff",
            },
          }}
          open
        >
          {drawer}
        </MuiDrawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: "#ecf0f1",
        }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
}

Drawer.propTypes = {
  window: PropTypes.func,
};

export default Drawer;
