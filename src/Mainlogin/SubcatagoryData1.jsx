import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Grid, CircularProgress } from '@mui/material';
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import Navbar1 from "../Mainlogin/Navbar1";
import Footer1 from "../Mainlogin/Footer1";

const SubcategoryData = () => {
  const token = localStorage.getItem('Token');

  const [allSubcategories, setAllSubcategories] = useState([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state

  const location = useLocation();
  const navigate = useNavigate();
  const category = location.state?.category || "";

  useEffect(() => {
    if (!token) {
      navigate("/login", { state: { redirectTo: "/SubcatagoryData" } });
    } else {
      axios.get('https://interviewhub-3ro7.onrender.com/subcatagory/', {
        headers: {
          Authorization: token,
        }
      })
        .then((res) => {
          setAllSubcategories(res.data.data);
  
          if (category) {
            const filter = res.data.data.filter((el) => el.catagoryID.catagoryName === category);
            setFilteredSubcategories(filter);
          }
          setLoading(false); // Set loading to false after data is fetched
        })
        .catch((err) => {
          console.error("Error:", err);
          setLoading(false); // Set loading to false in case of error
        });
    }
  }, [category, token, navigate]);
  

  const handleNavigation = (subcategory) => {
    navigate('/QuestionData', { state: { subcategory } });
  };

  return (
    <>
      <Navbar1 />
      {/* Header Section */}
      <Typography
        component="div"
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
              Sub Category
            </Typography>
            <Typography sx={{ fontSize: "16px", color: "#4b81a8" }}>
              <Link to="/Mainpage1" style={{ textDecoration: "none", color: "#4b81a8" }}>
                Home
              </Link>{" "}
              / SubCategory
            </Typography>
          </Box>
        </Container>
      </Typography>

      {/* Main Content */}
      <Box sx={{ padding: "40px 15px" }}>
        <Container>
          <Typography
            variant="h5"
            sx={{ textAlign: "center", color: "#124265", marginBottom: "20px" }}
          >
            Filtered Subcategories
          </Typography>

          {/* Show loader while data is being fetched */}
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <Grid container spacing={3} justifyContent="center">
                {filteredSubcategories.length > 0 ? (
                  filteredSubcategories.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
                      <Box
                        className="box"
                        onClick={() => handleNavigation(item.subCatagoryname)}
                        sx={{
                          background: "#eef7fd",
                          padding: "20px",
                          borderRadius: "8px",
                          boxShadow: "inset 0 0 10px #84c6f31f",
                          cursor: "pointer",
                          textAlign: "center",
                          transition: "transform 0.3s",
                          "&:hover": {
                            transform: "scale(1.05)",
                          },
                        }}
                      >
                        <Typography variant="h6" sx={{ color: "#124265" }}>
                          {index + 1}. {item.subCatagoryname}
                        </Typography>
                      </Box>
                    </Grid>
                  ))
                ) : (
                  <Typography
                    sx={{
                      marginTop: "20px",
                      textAlign: "center",
                      color: "gray",
                    }}
                  >
                    No subcategories found for the selected category
                  </Typography>
                )}
              </Grid>

              {/* All Subcategories Section */}
              <Typography
                variant="h5"
                sx={{
                  textAlign: "center",
                  color: "#124265",
                  marginTop: "40px",
                  marginBottom: "20px",
                }}
              >
                All Subcategories
              </Typography>
              <Grid container spacing={3} justifyContent="center">
                {allSubcategories.map((item, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
                    <Box
                      className="box"
                      onClick={() => handleNavigation(item.subCatagoryname)}
                      sx={{
                        background: "#eef7fd",
                        padding: "20px",
                        borderRadius: "8px",
                        boxShadow: "inset 0 0 10px #84c6f31f",
                        cursor: "pointer",
                        textAlign: "center",
                        transition: "transform 0.3s",
                        "&:hover": {
                          transform: "scale(1.05)",
                        },
                      }}
                    >
                      <Typography variant="h6" sx={{ color: "#124265" }}>
                        {index + 1}. {item.subCatagoryname}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </Container>
      </Box>
      <Footer1 />
    </>
  );
};

export default SubcategoryData;
