import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Container, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import InterestsIcon from '@mui/icons-material/Interests';
import ControlPointDuplicateIcon from '@mui/icons-material/ControlPointDuplicate';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import image from '../../images/interviews.png'
import Navbar from '../Navbar';
import Footer from '../Footer';



const Mainpage = () => {

    let categoryData = localStorage.getItem("category")
    let subcategory = localStorage.getItem("subcategory")
    let question = localStorage.getItem("question")

    return (
        <>

            <Navbar />

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
                        <Button ><a href="/login" className='slider-btn' style={{ color: "#fff", border: "1px solid #fff", padding: "14px 50px", borderRadius: "4px", background: "#4b81a8", zIndex: "10" }}>Get Started </a></Button>
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
                    <Container sx={{ display: "flex", alignItems: "center" }}>
                        <Box sx={{ width: "50%" }}>
                            <img src={image} alt="" style={{ width: "100%" }} />
                        </Box>

                        <Box sx={{ paddingLeft: "15px", width: "50%" }}>
                            <h2 style={{ fontSize: "50px", marginBottom: "15px", marginLeft: '15px', letterSpacing: "1px" }}>Develop an Enjoyable <span style={{ color: "#4b81a8" }}>Learning</span> Roadmap</h2>
                            <p style={{ color: "gray", paddingLeft: "15px", letterSpacing: "0.3px" }}>Make your learning roadmap to prepare for data science, software development, web development, app development, game development with Exam Keeda. Our platform gives you the opportunity to learn programming languages like C, C++, Python, PHP, JavaScript(JS), JAVA and many more in different ways, like through tutorials, study materials, codding competitions, MCQ quizzes, projects, and more.</p>

                        </Box>
                    </Container>

                </Box>
            </section >
            <Footer />


        </>
    )
}

export default Mainpage;
