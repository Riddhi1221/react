import React, { useEffect, useState } from "react";
import { Container, Typography, Box, Button, Grid, CircularProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar";
import Footer from "../Footer";

const CategoryData = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("Token");
  const [category, setCategory] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state

  // Fetch categories from API
  const fetchCategories = async () => {
    setLoading(true); // Set loading to true before fetching
    try {
      const response = await axios.get("https://interviewhub-3ro7.onrender.com/catagory/", {
        headers: {
          Authorization: token,
        },
      });
      const data = response.data.data;
      setCategory(data);
      filterCategories(data, showAll);
      setLoading(false); // Set loading to false after data is fetched
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("Failed to fetch categories. Please try again later.");
      setLoading(false); // Set loading to false in case of error
    }
  };

  // Filter categories based on status
  const filterCategories = (data, showAll) => {
    if (showAll) {
      setFilteredCategories(data);
    } else {
      const activeCategories = data.filter((category) => category.status === "on");
      setFilteredCategories(activeCategories);
    }
  };

  // Toggle between all categories and active categories
  const toggleCategoryView = () => {
    const newShowAll = !showAll;
    setShowAll(newShowAll);
    filterCategories(category, newShowAll);
  };

  // Handle category click
  const handleCategoryClick = (categoryName) => {
    if (!token) {
      navigate("/login", { state: { redirectTo: "/category" } });
    } else {
      navigate("/SubcatagoryData", { state: { category: categoryName } });
    }
  };

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
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
            <Typography variant="h4" sx={{ color: "#124265" }}>
              Category
            </Typography>
            <Typography>
              <Link to="/" style={{ textDecoration: "none", color: "#4b81a8" }}>
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
            {showAll ? "Show Only Active Categories" : "Show All Categories"}
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
            {showAll ? "All Categories" : "Active Categories"}
          </Typography>
          {error && (
            <Typography color="error" sx={{ textAlign: "center", marginBottom: "20px" }}>
              {error}
            </Typography>
          )}

          {/* Show loader when data is being fetched */}
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={3} justifyContent="center">
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={category._id}>
                    <Box
                      onClick={() => handleCategoryClick(category.catagoryName)}
                      sx={{
                        background: "#eef7fd",
                        padding: "20px",
                        borderRadius: "8px",
                        boxShadow: "inset 0 0 10px #4b81a8",
                        textAlign: "center",
                        transition: "transform 0.2s ease",
                        cursor: "pointer",
                        "&:hover": {
                          transform: "scale(1.05)",
                        },
                      }}
                    >
                      <Typography variant="h6" sx={{ color: "#124265" }}>
                        {index + 1}. {category.catagoryName}
                      </Typography>
                    </Box>
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
          )}
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default CategoryData;
