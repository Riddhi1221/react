import React from 'react';
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
import image from '../../images/interviews.png';
import Navbar from '../Navbar';
import Footer from '../Footer';

const Mainpage = () => {
  const categoryData = localStorage.getItem("category") || 0;
  const subcategory = localStorage.getItem("subcategory") || 0;
  const question = localStorage.getItem("question") || 0;

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="slider" style={{ padding: "50px 0" }}>
        <Container>
           <Grid xs={8} sx={{ display: "flex", justifyContent: "center" }}>
                        <Typography component="h1" sx={{ fontSize: { xs: "32px", sm: "48px", md: "56px" }, fontWeight: "700", color: "#124265", zIndex: "10", textAlign: "center" }}>
                            Quick Start for <br />interview practice
                        </Typography>
                    </Grid>
                    <Typography component="p" sx={{ marginTop: "10px", fontSize: { xs: "16px", sm: "20px", md: "22px" }, textAlign: "center", letterSpacing: "1px" }}>
                        All your hard work will pay off. My best wishes are with you.

                    </Typography>
                    <Typography sx={{ textAlign: "center", marginTop: "30px" }}>
                        <Button className='slider-btn' sx={{ color: "#fff", border: "1px solid #fff", padding: "14px 50px", borderRadius: "4px", background: "#4b81a8", zIndex: "10" }}>Get Started</Button>
                    </Typography>
     

      {/* Cards Section */}
      <Container sx={{ mt: 5 ,mb: 5}}>
        <Grid container spacing={3}>
          {[
            { title: "Category", icon: <InterestsIcon />, link: "/CatagoryData" },
            { title: "Sub Category", icon: <ControlPointDuplicateIcon />, link: "/SubcatagoryData" },
            { title: "Que - Ans", icon: <HelpOutlineIcon />, link: "/QuestionData" },
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ textAlign: "center", height: "100%" }}>
                <CardActionArea component="a" href={item.link}>
                  <CardContent sx={{ padding: "30px" }}>
                    {React.cloneElement(item.icon, { sx: { fontSize: "40px", color: "#4b81a8", mb: 2 } })}
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                      {item.title}
                    </Typography>
                    <Typography color="text.secondary">
                      All your hard work will pay off. My best wishes are with you.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      </Container>
      </section>

      {/* Dashboard Section */}
      <section style={{ padding: "50px 0", background: "#eef7fd" }}>
        <Container>
          <Grid container spacing={3} justifyContent="center">
            {[
              { count: categoryData, label: "Category" },
              { count: subcategory, label: "Sub Category" },
              { count: question, label: "Que - Ans" },
            ].map((item, index) => (
              <Grid item xs={12} sm={4} key={index} textAlign="center">
                <CardContent>
                  <Typography
                    component="h1"
                    sx={{
                      fontSize: "60px",
                      fontWeight: 700,
                      color: "#4b81a8",
                    }}
                  >
                    {item.count}
                  </Typography>
                  <Typography
                    component="p"
                    sx={{ fontSize: "18px", color: "gray", letterSpacing: "1px" }}
                  >
                    {item.label}
                  </Typography>
                </CardContent>
              </Grid>
            ))}
          </Grid>
        </Container>
      </section>

      {/* Information Section */}
      <section style={{ padding: "50px 0" }}>
        <Container>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <img src={image} alt="Learning Roadmap" style={{ width: "100%" }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                component="h2"
                sx={{
                  fontSize: { xs: "28px", sm: "40px", md: "50px" },
                  fontWeight: 700,
                  mb: 2,
                  letterSpacing: "1px",
                }}
              >
                Develop an Enjoyable{" "}
                <span style={{ color: "#4b81a8" }}>Learning</span> Roadmap
              </Typography>
              <Typography sx={{ color: "gray", letterSpacing: "0.5px" }}>
                Make your learning roadmap to prepare for data science, software development, web development, app development, game development with Exam Keeda. Our platform gives you the opportunity to learn programming languages like C, C++, Python, PHP, JavaScript(JS), JAVA, and many more in different ways, like through tutorials, study materials, coding competitions, MCQ quizzes, projects, and more.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </section>

      <Footer />
    </>
  );
};

export default Mainpage;
