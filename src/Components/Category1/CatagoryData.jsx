import { Container, Typography, Box, Button , Grid} from '@mui/material';
import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import Footer from '../Footer'

const CatagoryData = () => {
  const token = localStorage.getItem('token');

  const [categories, setCategories] = useState([]);
  const [filterCat, setFilterCat] = useState([]);
  const [showAll, setShowAll] = useState(true);

  const getCategory = () => {
    axios.get('https://interviewhub-3ro7.onrender.com/catagory/', {
      headers: {
        Authorization: token,
      }
    })
    .then((res) => {
      const data = res.data.data;
      setCategories(data);
      filterCategories(data, showAll);
    })
    .catch((error) => {
      console.error("Error fetching categories:", error);
    });
  }

  const filterCategories = (data, showAll) => {
    if (showAll) {
      setFilterCat(data);
    } else {
      const filtered = data.filter((el) => el.status === 'on');
      setFilterCat(filtered);
    }
  }

  const CategoryView = () => {
    const newShowAll = !showAll;
    setShowAll(newShowAll);
    filterCategories(categories, newShowAll);
  }

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <>
            <Navbar />
      <Typography style={{ padding: "50px 0", background: "#eef7fd", borderBottom: "1px solid #4b81a8" }}>
        <Container>
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: "10px", justifyContent: 'space-between' }}>
            <h1 style={{ color: "#124265" }}>Category</h1>
            <p style={{ marginLeft: '48px' }}>
              <a href="/" style={{ color: "#4b81a8" }}>Home</a> / Category
            </p>
          </Box>
          <Button variant="contained" onClick={CategoryView} sx={{ backgroundColor:"#4b81a8"}}>
            {showAll ? 'Show Only Active Categories' : 'Show All Categories'}
          </Button>
        </Container>
      </Typography>
      <Box sx={{ padding: "80px 0" }}>
        <Container sx={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
          <Typography variant="h4" sx={{ width: '100%', textAlign: 'center', color: '#124265' }}>
            All Categories
          </Typography>
          {filterCat.map((item, i) => (
            <Box key={i} sx={{ marginTop: "50px" }}>
              {/* Updated Link for React Router DOM v6 */}
              <Link
                to="/SubcatagoryData"
                state={{ category: item.catagoryName }}
                style={{ textDecoration: 'none' }}
              >
                <Box
                  className="box"
                  sx={{
                    width: "250px",
                    background: "#eef7fd",
                    padding: "35px 0",
                    borderRadius: "8px",
                    boxShadow: "inset 0 0 10px #4b81a8",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{ textAlign: "center", color: '#124265' }}
                  >
                    {i + 1}.&nbsp; {item.catagoryName}
                  </Typography>
                </Box>
              </Link>
            </Box>
          ))}
        </Container>
      </Box>
            <Footer />
    </>
  );
}

export default CatagoryData;

