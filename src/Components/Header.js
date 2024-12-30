
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import ControlPointDuplicateIcon from '@mui/icons-material/ControlPointDuplicate';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import InterestsIcon from '@mui/icons-material/Interests';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import { Link, useLocation } from 'react-router-dom/cjs/react-router-dom';
import { Button } from '@mui/material';

const drawerWidth = 240;

const Header = () => {
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeButton, setActiveButton] = useState(1);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleButtonClick = (id) => {
        setActiveButton(id);
    };

    const drawer = (
        <div>
            {/* Drawer Header */}
            <Typography
                component="div"
                sx={{
                    fontSize: '22px',
                    fontWeight: '500',
                    color: '#fff',
                    background: '#2193b0',
                    padding: '16px',
                    textAlign: 'center',
                }}
            >
                INTERVIEW API
            </Typography>

            {/* Drawer Items */}
            <Box sx={{ padding: '16px', backgroundColor: '#2193b0', height: '100%' }}>
                {[ 
                    { id: 1, label: 'Dashboard', icon: <SpaceDashboardIcon />, path: '/admin' },
                    { id: 2, label: 'Category', icon: <InterestsIcon />, path: '/admin/category' },
                    { id: 3, label: 'Sub-Category', icon: <ControlPointDuplicateIcon />, path: '/admin/subcategory' },
                    { id: 4, label: 'Que & Ans', icon: <HelpOutlineIcon />, path: '/admin/questionanswer' },
                ].map((item) => (
                    <Link
                        to={item.path}
                        key={item.id}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                        <Button
                            sx={{
                                color: activeButton === item.id ? '#fff' : '#2193b0',
                                backgroundColor: activeButton === item.id ? '#2193b0' : '#fff',
                                padding: '10px 16px',
                                textTransform: 'capitalize',
                                fontSize: '1rem',
                                width: '100%',
                                textAlign: 'start',
                                justifyContent: 'flex-start',
                                borderRadius: '8px',
                                '&:hover': {
                                    backgroundColor: '#2193b0',
                                    color: '#fff',
                                },
                                marginBottom: '8px',
                                boxShadow:
                                    activeButton === item.id ? '0 4px 8px rgba(0,0,0,0.2)' : 'none',
                            }}
                            onClick={() => handleButtonClick(item.id)}
                        >
                            {item.icon}
                            <Box sx={{ marginLeft: '16px' }}>{item.label}</Box>
                        </Button>
                    </Link>
                ))}
            </Box>
        </div>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            {/* AppBar */}
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    backgroundColor: '#2193b0', // Blue background for AppBar
                }}
            >
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ fontSize: '18px', color: '#fff' }}>
                        Dashboard {location.pathname}
                    </Typography>
                    <Typography>
                        <Link to="/">
                            <LockPersonIcon style={{ color: '#fff', fontSize: '32px' }} />
                        </Link>
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* Drawer */}
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                            backgroundColor: '#2193b0', // Blue background for Drawer
                        },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                            backgroundColor: '#2193b0', // Blue background for permanent Drawer
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>

            {/* Main Content */}
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, backgroundColor: '#e3f2fd' }}
            >
                <Toolbar />
            </Box>
        </Box>
    );
};

export default Header;
