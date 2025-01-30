import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Grid, Typography, Button, Card, CardContent, CardActionArea } from "@mui/material";
import InterestsIcon from "@mui/icons-material/Interests";
import ControlPointDuplicateIcon from "@mui/icons-material/ControlPointDuplicate";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";
import image from "../../images/interviews.png";

const Mainpage = () => {
  const [categoryCount, setCategoryCount] = useState(0);
  const [subcategoryCount, setSubcategoryCount] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem("Token");

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;

      setLoading(true);
      try {
        const [categoryRes, subcategoryRes, questionRes] = await Promise.all([
          axios.get("https://interviewback-ucb4.onrender.com/category/count", {
            headers: { Authorization: token },
          }),
        
          
          axios.get("https://interviewback-ucb4.onrender.com/subcategory/count", {
            headers: { Authorization: token },
          }),
          axios.get("https://interviewback-ucb4.onrender.com/questions/count", {
            headers: { Authorization: token },
          }),
        ]);
        
        console.log(categoryRes);
        setCategoryCount(categoryRes.data?.data || 0);
        setSubcategoryCount(subcategoryRes.data?.data || 0);
        setQuestionCount(questionRes.data?.data || 0);

        // Store data in localStorage
        localStorage.setItem("category", categoryRes.data?.data || 0);
        localStorage.setItem("subcategory", subcategoryRes.data?.data || 0);
        localStorage.setItem("question", questionRes.data?.data || 0);
      } 
      catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleCardClick = (link) => {
    token ? navigate(link) : navigate("/login");
  };

  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <section style={{ padding: "50px 0" }}>
        <Container>
          <Grid container justifyContent="center">
            <Typography variant="h1" sx={{ fontSize: { xs: "32px", sm: "48px", md: "56px" }, fontWeight: 700, color: "#124265", textAlign: "center" }}>
              Quick Start for <br /> Interview Practice
            </Typography>
          </Grid>
          <Typography variant="body1" sx={{ mt: 2, fontSize: { xs: "16px", sm: "20px", md: "22px" }, textAlign: "center", letterSpacing: 1 }}>
            All your hard work will pay off. My best wishes are with you.
          </Typography>
          <Typography sx={{ textAlign: "center", mt: 3 }}>
            <Button
              sx={{
                color: "#fff",
                border: "1px solid #fff",
                padding: "14px 50px",
                borderRadius: "4px",
                background: "#4b81a8",
                "&:hover": { background: "#3b6a8c" },
              }}
              onClick={() => navigate("/login")}
            >
              Get Started
            </Button>
          </Typography>

          {/* Cards Section */}
          <Container sx={{ mt: 5, mb: 5 }}>
            <Grid container spacing={3}>
              {[
                { title: "Category", icon: <InterestsIcon />, link: "/CatagoryData" },
                { title: "Sub Category", icon: <ControlPointDuplicateIcon />, link: "/SubcatagoryData" },
                { title: "Que - Ans", icon: <HelpOutlineIcon />, link: "/QuestionData" },
              ].map((item, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card sx={{ textAlign: "center", height: "100%" }}>
                    <CardActionArea onClick={() => handleCardClick(item.link)}>
                      <CardContent sx={{ padding: "30px" }}>
                        {React.cloneElement(item.icon, { sx: { fontSize: 40, color: "#4b81a8", mb: 2 } })}
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
              { count: categoryCount, label: "Category" },
              { count: subcategoryCount, label: "Sub Category" },
              { count: questionCount, label: "Que - Ans" },
            ].map((item, index) => (
              <Grid item xs={12} sm={4} key={index} textAlign="center">
                <CardContent>
                  <Typography component="h1" sx={{ fontSize: "60px", fontWeight: 700, color: "#4b81a8" }}>
                    {loading ? "---" : item.count}
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: 18, color: "gray", letterSpacing: 1 }}>
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
              <Typography variant="h2" sx={{ fontSize: { xs: "28px", sm: "40px", md: "50px" }, fontWeight: 700, mb: 2, letterSpacing: 1 }}>
                Develop an Enjoyable <span style={{ color: "#4b81a8" }}>Learning</span> Roadmap
              </Typography>
              <Typography sx={{ color: "gray", letterSpacing: 0.5 }}>
                Make your learning roadmap to prepare for various fields with Exam Keeda.
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
