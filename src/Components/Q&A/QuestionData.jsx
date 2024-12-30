import React, { useEffect, useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import Navbar from '../Navbar';
import Footer from '../Footer';

const QuestionData = () => {
  const token = localStorage.getItem('token');

  const [allQues, setAllQues] = useState([]);
  const [filterQues, setFilterQues] = useState([]);

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
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [subcategory, token]);

  const handleNavigation = (path, state) => {
    navigate(path, { state });
  };

  return (
    <>
    <Navbar />
      <Typography style={{ padding: "50px 0", background: "#eef7fd", borderBottom: "1px solid #4b81a8" }}>
        <Container>
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: "10px", justifyContent: 'space-between' }}>
            <h1 style={{ color: "#124265" }}>Ques - Ans</h1>
            <p style={{ marginLeft: '48px' }}>
              <Link to="/" style={{ color: "#4b81a8" }}>Home</Link> / Ques - Ans
            </p>
          </Box>
        </Container>
      </Typography>

      <Box sx={{ padding: "80px 0" }}>
        <Container sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Typography variant="h4" sx={{ textAlign: 'center', color: '#124265', fontWeight: "700" }}>
            Filtered Questions
          </Typography>
          {
            filterQues.length > 0 ? filterQues.map((item, index) => (
              <Box key={item._id} sx={{ marginTop: "20px" }}>
                <Box className="box" sx={{
                  width: "100%", background: "#eef7fd", padding: "20px 20px",
                  borderRadius: "8px", boxShadow: "inset 0 0 10px #84c6f31f"
                }}>
                  <Typography variant='h5' sx={{ color: '#124265', marginBottom: "10px" }}>
                    {index + 1}. {item.questions}
                  </Typography>
                  <Typography variant='h5' sx={{ color: 'gray', fontSize: "17px" }}>
                    {"Ans : "} {item.answer}
                  </Typography>
                </Box>
              </Box>
            )) : <Typography sx={{ marginTop: '20px', textAlign: 'center', color: 'gray' }}>
                "No questions found for the selected subcategory"
              </Typography>
          }

          <Typography variant="h4" sx={{ textAlign: 'center', marginTop: '40px', color: '#124265', fontWeight: "700" }}>
            All Questions
          </Typography>
          {
            allQues.map((item, index) => (
              <Box key={item._id} sx={{ marginTop: "20px" }}>
                <Box className="box" sx={{
                  width: "100%", background: "#eef7fd", padding: "20px 20px",
                  borderRadius: "8px", boxShadow: "inset 0 0 10px #84c6f31f"
                }}>
                  <Typography variant='h5' sx={{ color: '#124265', marginBottom: "10px" }}>
                    {index + 1}. {item.questions}
                  </Typography>
                  <Typography variant='h5' sx={{ color: 'gray', fontSize: "17px" }}>
                    {"Ans : "} {item.answer}
                  </Typography>
                </Box>
              </Box>
            ))
          }
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default QuestionData;

