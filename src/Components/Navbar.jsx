import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Container, Grid } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';


const Navbar = () => {


    return (
        <>
            <header>

                <Box sx={{ flexGrow: 1 }} >
                    <AppBar position="sticky" sx={{ padding: "15px 0", backgroundColor: "#4b81a8" }}>
                        <Container maxWidth="992px">
                            <Toolbar>
                                <IconButton
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                // sx={{ mr: 2 }}
                                >
                                    <SchoolIcon />
                                </IconButton>
                                <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: "30px" }}>
                                    QuickStart
                                </Typography>
                                <Button><a href="/login" className='hover' style={{ color: "#4b81a8", border: "1px solid #fff", padding: "8px 25px", borderRadius: "4px", background: "#fff"  }}>LOGIN</a></Button>
                                <Button><a href="/signup" style={{ color: "#fff", border: "1px solid #fff", padding: "8px 25px", borderRadius: "4px", background: "#4b81a8" }}>SIGN UP</a></Button>

                            </Toolbar>
                        </Container>
                    </AppBar>
                </Box>
            </header>
        </>
    )
}

export default Navbar