import { Container, Typography, Box, Button, Grid } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import Footer from '../Footer';

const CatagoryData = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [categories, setCategories] = useState([]);
  const [filterCat, setFilterCat] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [error, setError] = useState('');

        const getCategory = () => {
          axios.get('https://interviewhub-3ro7.onrender.com/catagory/', {
            headers: {
              Authorization: token,
            }
          })
          .then((res) => {
            const data = res.data.data;
            setCategories(res.data.data);
            filterCategories(data, showAll);
          })
          .catch((err) => {
            console.log("err", err);
          });
        }

  const filterCategories = (data, showAll) => {
    if (showAll) {
      setFilterCat(data);
    } else {
      const filtered = data.filter((el) => el.status === 'on');
      setFilterCat(filtered);
    }
  };

  const toggleCategoryView = () => {
    const newShowAll = !showAll;
    setShowAll(newShowAll);
    filterCategories(categories, newShowAll);
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <>
      <Navbar />
      {/* Header Section */}
      <Box sx={{ padding: "50px 0", background: "#eef7fd", borderBottom: "1px solid #4b81a8" }}>
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
            <Typography variant="h4" sx={{ color: "#124265" }}>Category</Typography>
            <Typography>
              <Link to="/" style={{ textDecoration: 'none', color: "#4b81a8" }}>
                Home
              </Link>{" "}
              / Category
            </Typography>
          </Box>
          <Button
            variant="contained"
            onClick={toggleCategoryView}
            sx={{
              backgroundColor: "#4b81a8",
              marginTop: { xs: 2, sm: 0 },
              alignSelf: "flex-end",
            }}
          >
            {showAll ? 'Show Only Active Categories' : 'Show All Categories'}
          </Button>
        </Container>
      </Box>

      {/* Categories Section */}
      <Box sx={{ padding: "40px 15px" }}>
        <Container>
          <Typography
            variant="h4"
            sx={{ textAlign: "center", color: "#124265", marginBottom: "20px" }}
          >
            {showAll ? 'All Categories' : 'Active Categories'}
          </Typography>
          {error && (
            <Typography color="error" sx={{ textAlign: "center", marginBottom: "20px" }}>
              {error}
            </Typography>
          )}
          <Grid container spacing={3} justifyContent="center">
            {filterCat.length > 0 ? (
              filterCat.map((item, i) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                  <Link
                    to="/SubcatagoryData"
                    state={{ category: item.catagoryName }}
                    style={{ textDecoration: 'none' }}
                  >
                    <Box
                      sx={{
                        background: "#eef7fd",
                        padding: "20px",
                        borderRadius: "8px",
                        boxShadow: "inset 0 0 10px #4b81a8",
                        textAlign: "center",
                        transition: "transform 0.2s ease",
                        "&:hover": {
                          transform: "scale(1.05)",
                        },
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ color: "#124265" }}
                      >
                        {i + 1}. {item.catagoryName}
                      </Typography>
                    </Box>
                  </Link>
                </Grid>
              ))
            ) : (
              !error && (
                <Typography sx={{ textAlign: "center", color: "#4b81a8", marginTop: "20px" }}>
                  No categories available to display.
                </Typography>
              )
            )}
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default CatagoryData;
