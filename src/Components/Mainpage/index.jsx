import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Container, Grid } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SchoolIcon from '@mui/icons-material/School';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import InterestsIcon from '@mui/icons-material/Interests';
import ControlPointDuplicateIcon from '@mui/icons-material/ControlPointDuplicate';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import image from '../../images/interviews.png'



const Mainpage = () => {

    let categoryData = localStorage.getItem("category")
    let subcategory = localStorage.getItem("subcategory")
    let question = localStorage.getItem("question")

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
                                    <a href='/' style={{ color: '#fff' }} >QuickStart</a>
                                </Typography>
                                <Button><a href="/login" style={{ color: "#4b81a8", border: "1px solid #fff", padding: "8px 25px", borderRadius: "4px", background: "#fff" }}>LOGIN</a></Button>
                                <Button><a href="/signup" style={{
                                    color: "#fff", border: "1px solid #fff", padding: "8px 25px", borderRadius: "4px", background: "#4b81a8"
                                    , display: { xs: "none" }
                                }}>SIGN UP</a></Button>
                                
                            </Toolbar>
                        </Container>
                    </AppBar>
                </Box>
            </header>



            {/* Slider */}

            <section className='slider'>
                <Container >
                    <Grid xs={8} sx={{ display: "flex", justifyContent: "center" }}>
                        <Typography component="h1" sx={{ fontSize: "56px", fontWeight: "700", color: "#124265", zIndex: "10", textAlign: "center" }}>
                            Quick Start for <br />interview practice
                        </Typography>
                    </Grid>
                    <Typography component="p" sx={{ marginTop: "10px", fontSize: "22px", textAlign: "center", letterSpacing: "1px" }}>
                        All your hard work will pay off. My best wishes are with you.

                    </Typography>
                    <Typography sx={{ textAlign: "center", marginTop: "30px" }}>
                        <Button className='slider-btn' sx={{ color: "#fff", border: "1px solid #fff", padding: "14px 50px", borderRadius: "4px", background: "#4b81a8", zIndex: "10" }}>Get Started</Button>
                    </Typography>


                    {/* cards */}


                    <Typography sx={{ marginTop: "80px", display: "flex", columnGap: "20px" }}>
                        <Card sx={{
                            width: {
                                xs: "100%",
                                sm: "50%",
                                md: "33%",
                                lg: "33%",
                                xl: "33%",
                            },

                            zIndex: "10"
                        }}>

                            <CardActionArea sx={{ zIndex: "10" }} >
                                <a href='/CatagoryData'>
                                    <CardContent sx={{ padding: "50px" }}>
                                        <InterestsIcon sx={{ marginBottom: "20px", color: "#4b81a8", fontSize: "32px" }} />
                                        <Typography variant="h5" component="div" sx={{ marginBottom: "20px", color: "#124265", fontWeight: "600" }}>
                                            Catagory
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" fontSize="16px">
                                            All your hard work will pay off. My best wishes are with you.
                                        </Typography>
                                    </CardContent>
                                </a>
                            </CardActionArea>

                        </Card>


                        <Card sx={{
                            width: {
                                xs: "100%",
                                sm: "50%",
                                md: "33%",
                                lg: "33%",
                                xl: "33%",
                            },

                            zIndex: "10"
                        }}>
                            <CardActionArea sx={{ zIndex: "10" }}>
                                <a href='/SubcatagoryData'>
                                    <CardContent sx={{ padding: "50px" }}>
                                        <ControlPointDuplicateIcon sx={{ marginBottom: "20px", color: "#4b81a8", fontSize: "32px" }} />
                                        <Typography variant="h5" component="div" sx={{ marginBottom: "20px", color: "#124265", fontWeight: "600" }}>
                                            Sub Catagory
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" fontSize="16px">
                                            All your hard work will pay off. My best wishes are with you.
                                        </Typography>
                                    </CardContent>
                                </a>
                            </CardActionArea>
                        </Card>


                        <Card sx={{
                            width: {
                                xs: "100%",
                                sm: "50%",
                                md: "33%",
                                lg: "33%",
                                xl: "33%",
                            },

                            zIndex: "10"
                        }}>
                            <CardActionArea sx={{ zIndex: "10" }}>
                                <a href='/QuestionData'>
                                    <CardContent sx={{ padding: "50px" }}>
                                        <HelpOutlineIcon sx={{ marginBottom: "20px", color: "#4b81a8", fontSize: "32px" }} />
                                        <Typography variant="h5" component="div" sx={{ marginBottom: "20px", color: "#124265", fontWeight: "600" }}>
                                            Que - Ans
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" fontSize="16px">
                                            All your hard work will pay off. My best wishes are with you.
                                        </Typography>
                                    </CardContent>
                                </a>
                            </CardActionArea>
                        </Card>
                    </Typography>

                </Container>
            </section >


            {/* dashboard */}

            < section style={{ padding: "80px 0px" }}>
                <Typography sx={{ background: "#eef7fd" }}>
                    <Container>
                        <Typography display="flex" justifyContent="space-between">

                            <CardContent>
                                <Typography sx={{ padding: "20px", textAlign: "center" }}>
                                    <h1 style={{ marginBottom: "10px", fontSize: "60px", fontWeight: "700", color: "#4b81a8" }}>{categoryData || 0}</h1>
                                    <p style={{ fontSize: "18px", color: "gray", letterSpacing: "1px" }}>Catagory</p>
                                </Typography>
                            </CardContent>

                            <CardContent>
                                <Typography sx={{ padding: "20px", textAlign: "center" }}>
                                    <h1 style={{ marginBottom: "10px", fontSize: "60px", fontWeight: "700", color: "#4b81a8" }}>{subcategory || 0}</h1>
                                    <p style={{ fontSize: "18px", color: "gray", letterSpacing: "1px" }}>Sub Catagory</p>
                                </Typography>
                            </CardContent>

                            <CardContent>
                                <Typography sx={{ padding: "20px", textAlign: "center" }}>
                                    <h1 style={{ marginBottom: "10px", fontSize: "60px", fontWeight: "700", color: "#4b81a8" }}>{question || 0}</h1>
                                    <p style={{ fontSize: "18px", color: "gray", letterSpacing: "1px" }}>Que - Ans</p>
                                </Typography>
                            </CardContent>

                        </Typography>
                    </Container>
                </Typography>
            </section >



            {/* part */}

            < section style={{ paddingBottom: "50px" }}>
                <Box>
                    <Container sx={{ display: "flex" , alignItems:"center"}}>
                        <Box sx={{ width: "50%" }}>
                            <img src={image} alt="" style={{ width: "100%" }} />
                        </Box>

                        <Box sx={{  paddingLeft: "15px", width: "50%" }}>
                            <h2 style={{ fontSize: "50px", marginBottom: "15px", marginLeft: '15px', letterSpacing: "1px" }}>Develop an Enjoyable <span style={{ color: "#4b81a8" }}>Learning</span> Roadmap</h2>
                            <p style={{ color: "gray", paddingLeft: "15px", letterSpacing: "0.3px" }}>Make your learning roadmap to prepare for data science, software development, web development, app development, game development with Exam Keeda. Our platform gives you the opportunity to learn programming languages like C, C++, Python, PHP, JavaScript(JS), JAVA and many more in different ways, like through tutorials, study materials, codding competitions, MCQ quizzes, projects, and more.</p>

                        </Box>
                    </Container>

                </Box>
            </section >


            <footer className='footer'>
                <Container sx={{ padding: "50px 15px" }}>
                    <Box sx={{ display: "flex" }}>


                        <Box width="60%">
                            <Grid sx={{ display: "flex", alignItems: "center" }}>
                                <a href="" style={{ fontSize: "32px", color: "#124265", fontWeight: "700", letterSpacing: "1px", marginBottom: "20px" }}>QuickStart</a>
                            </Grid>
                            <p style={{ fontSize: "15px", letterSpacing: "1px" }}>QuickStart is an online practice platform <br /> that has been operating since 2024 until now.</p>
                            <Box className="social-links" sx={{ display: "flex", marginTop: "1.5rem" }}>
                                <a href="">< TwitterIcon className='icon' sx={{ color: '#4b81a8' }} /></a>
                                <a href="">< FacebookIcon className='icon' sx={{ color: '#4b81a8' }} /></a>
                                <a href="">< LinkedInIcon className='icon' sx={{ color: '#4b81a8' }} /></a>
                                <a href="">< GitHubIcon className='icon' sx={{ color: '#4b81a8' }} /></a>
                            </Box>
                        </Box>

                        {/* <Box width="50%">
                            <h4 style={{ color: "#124265", marginBottom: "20px", fontSize: '18px' }}>Useful Links</h4>
                            <a href='' style={{ fontSize: '14px', color: 'gray' }}>Home</a>
                        </Box> */}

                    </Box>



                    <Typography sx={{ marginTop: "50px" }}></Typography>


                    <Box sx={{ textAlign: "center", padding: "30px 0px", color: "#fff", background: "#4b81a8" }}>
                        <p>© <span>Copyright</span> <strong>QuickStart</strong> <span>All Rights Reserved</span></p>
                        <Box sx={{ marginTop: "10px" }}>
                            Designed by <a href="/" style={{ color: "#eef7fd" }}>Riddhi Chheta</a>
                        </Box>
                    </Box>
                </Container>




            </footer>



        </>
    )
}

export default Mainpage;
