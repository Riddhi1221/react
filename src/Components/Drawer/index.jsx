import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import { Drawer as MuiDrawer, Typography, Toolbar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { SpaceDashboard, Menu, Category, FolderCopy, QuestionMark, Login } from "@mui/icons-material";
import { Link } from "react-router-dom";

// Import the missing components
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const drawerWidth = 240;

let pages = [
  {
    name: "Dashboard",
    path: "/admin/",
    icon: <SpaceDashboard />,
  },
  {
    name: "Category",
    path: "/admin/category",
    icon: <Category />,
  },
  {
    name: "Sub Category",
    path: "/admin/subcategory",
    icon: <FolderCopy />,
  },
  {
    name: "Q & A",
    path: "/admin/qa",
    icon: <QuestionMark />,
  },
  {
    name: "Login",
    path: "/admin/login",
    icon: <Login />,
  },
  {
    name: "Signup",
    path: "/admin/signup",
    icon: <Login />,
  },
];

function Drawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

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
    <div>
      <Toolbar />
      <Divider />
      <List>
        {pages.map((page, index) => (
          <Link key={index} to={page.path} style={{ textDecoration: "none" }}>
            <ListItem disablePadding>
              <ListItemButton
                sx={{
                  "&:hover": {
                    backgroundColor: "#f0f0f0", // Set hover background color
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: "black", // Default color for icons
                    "&:hover": {
                      color: "black", // Icon color on hover
                    },
                  }}
                >
                  {page.icon}
                </ListItemIcon>
                <ListItemText
                  primary={page.name}
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    color: "black", // Default text color is black
                    textTransform: "uppercase",
                    "&:hover": {
                      color: "black", // Text color stays black on hover
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

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          background: "#3498db",
          display: "flex",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px}` },
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: { sm: "none" },
              color: "#fff",
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
            keepMounted: true, // Better open performance on mobile.
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
              backgroundColor: "rgb(90, 129, 239)",
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
