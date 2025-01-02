import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Grid, CircularProgress } from '@mui/material';
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import Navbar from '../Navbar';
import Footer from '../Footer';

const QuestionData = () => {
  const token = localStorage.getItem('Token');

  const [allQues, setAllQues] = useState([]);
  const [filterQues, setFilterQues] = useState([]);
  const [loading, setLoading] = useState(true);  // Added loading state

  const location = useLocation();
  const navigate = useNavigate();
  const subcategory = location.state?.subcategory || "";

  useEffect(() => {
    axios.get('https://interviewhub-3ro7.onrender.com/questions/', {
      headers: {
        Authorization: token,
      }
    })
      .then((res) => {
        const questions = res.data.data;
        setAllQues(questions);

        if (subcategory) {
          const filtered = questions.filter((el) => el.subcatagoryID.subCatagoryname === subcategory);
          setFilterQues(filtered);
        }
        setLoading(false);  // Set loading to false once the data is fetched
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);  // In case of an error, stop the loading
      });
  }, [subcategory, token]);

  return (
    <>
      <Navbar />
      {/* Header Section */}
      <Box
        sx={{
          padding: "50px 0",
          background: "#eef7fd",
          borderBottom: "1px solid #4b81a8",
        }}
      >
        <Container>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Typography variant="h4" sx={{ color: "#124265" }}>
              Ques - Ans
            </Typography>
            <Typography sx={{ fontSize: "16px", color: "#4b81a8" }}>
              <Link to="/" style={{ textDecoration: "none", color: "#4b81a8" }}>
                Home
              </Link>{" "}
              / Ques - Ans
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Box sx={{ padding: "40px 15px" }}>
        <Container>
          {/* Loading Spinner */}
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              {/* Filtered Questions Section */}
              <Typography
                variant="h5"
                sx={{ textAlign: 'center', color: '#124265', fontWeight: "700", marginBottom: "20px" }}
              >
                Filtered Questions
              </Typography>
              <Grid container spacing={3}>
                {filterQues.length > 0 ? (
                  filterQues.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={item._id}>
                      <Box
                        sx={{
                          background: "#eef7fd",
                          padding: "20px",
                          borderRadius: "8px",
                          boxShadow: "inset 0 0 10px #84c6f31f",
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{ color: '#124265', marginBottom: "10px" }}
                        >
                          {index + 1}. {item.questions}
                        </Typography>
                        <Typography
                          sx={{ color: 'gray', fontSize: "16px" }}
                        >
                          {"Ans: "} {item.answer}
                        </Typography>
                      </Box>
                    </Grid>
                  ))
                ) : (
                  <Typography
                    sx={{
                      width: "100%",
                      textAlign: "center",
                      color: "gray",
                      marginTop: "20px",
                    }}
                  >
                    No questions found for the selected subcategory
                  </Typography>
                )}
              </Grid>

              {/* All Questions Section */}
              <Typography
                variant="h5"
                sx={{
                  textAlign: 'center',
                  color: '#124265',
                  fontWeight: "700",
                  marginTop: "40px",
                  marginBottom: "20px",
                }}
              >
                All Questions
              </Typography>
              <Grid container spacing={3}>
                {allQues.map((item, index) => (
                  <Grid item xs={12} sm={6} md={4} key={item._id}>
                    <Box
                      sx={{
                        background: "#eef7fd",
                        padding: "20px",
                        borderRadius: "8px",
                        boxShadow: "inset 0 0 10px #84c6f31f",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ color: '#124265', marginBottom: "10px" }}
                      >
                        {index + 1}. {item.questions}
                      </Typography>
                      <Typography
                        sx={{ color: 'gray', fontSize: "16px" }}
                      >
                        {"Ans: "} {item.answer}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default QuestionData;
