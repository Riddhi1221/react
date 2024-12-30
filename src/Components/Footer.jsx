import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Container, Grid } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
    return (
        <div>

            <footer className='footer'>
                <Container sx={{ padding: "50px 0px" }}>
                    <Box sx={{ display: "flex" }}>


                        <Box width="60%">
                            <Grid sx={{ display: "flex", alignItems: "center" }}>
                                <a href="" style={{ fontSize: "32px", color: "#124265", fontWeight: "700", letterSpacing: "1px", marginBottom: "20px" }}>QuickStart</a>
                            </Grid>
                            <p style={{ fontSize: "15px", letterSpacing: "1px" }}>QuickStart is an online practice platform <br /> that has been operating since 2024 until now.</p>
                            <Box className="social-links" sx={{ display: "flex", marginTop: "1.5rem" }}>
                                <a href="">< TwitterIcon className='icon' sx={{ color: '#3ca1e9' }} /></a>
                                <a href="">< FacebookIcon className='icon' sx={{ color: '#3ca1e9' }} /></a>
                                <a href="">< LinkedInIcon className='icon' sx={{ color: '#3ca1e9' }} /></a>
                                <a href="">< GitHubIcon className='icon' sx={{ color: '#3ca1e9' }} /></a>
                            </Box>
                        </Box>

                        <Box width="50%">
                            <h4 style={{ color: "#124265", marginBottom: "20px", fontSize: '18px' }}>Useful Links</h4>
                            <a href='' style={{ fontSize: '14px', color: 'gray' }}>Home</a>
                        </Box>

                    </Box>



                    <Typography sx={{ height: "50px" }}></Typography>


                    <Box sx={{ textAlign: "center", padding: "30px 0px", color: "#fff", background: "#3ca1e9" }}>
                        <p>© <span>Copyright</span> <strong>QuickStart</strong> <span>All Rights Reserved</span></p>
                        <Box sx={{ marginTop: "10px" }}>
                            Designed by <a href="/" style={{ color: "#eef7fd" }}>Chandrika Sarvaiya</a>
                        </Box>
                    </Box>
                </Container>




            </footer>
        </div>
    )
}

export default Footer