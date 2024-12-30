import { Container, Typography, Box } from '@mui/material';
import { Link } from "react-router-dom";
import {  useLocation } from "react-router-dom/cjs/react-router-dom.min";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SubcatagoryData = () => {

  const token = localStorage.getItem('token');

  const [allSubcategories, setAllSubcategories] = useState([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);

  const location = useLocation();
  const { category } = location.state || {};

  useEffect(() => {
    axios.get('https://interviewhub-3ro7.onrender.com/subcatagory/', {
      headers: {
        Authorization: token,
      }
    })
      .then((res) => {
        console.log("res--->", res.data.data);
        setAllSubcategories(res.data.data);

        if (category) {
          const filter = res.data.data.filter((el) => el.catagoryID.catagoryName === category);
          setFilteredSubcategories(filter);
          console.log("Filtered Data:", filter);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [category]);

  return (
    <>
      <Typography style={{ padding: "50px 0", background: "#eef7fd", borderBottom: "1px solid #4b81a8" }}>
        <Container>
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: "10px", justifyContent: 'space-between' }}>
            <h1 style={{ color: "#124265" }}>Sub Category</h1>
            <p style={{ marginLeft: '48px' }}> <a href="/" style={{ color: "#3ca1e9" }}>Home</a> / SubCategory</p>
          </Box>
        </Container>
      </Typography>
      <Box sx={{padding:"80px 0"}}>
        <Container sx={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
          <Typography variant="h4" sx={{ width: '100%', textAlign: 'center',color: '#124265' }}>Filtered Subcategories</Typography>
          {
            filteredSubcategories.length > 0 ? filteredSubcategories.map((item, index) => (
              <Box key={item._id} sx={{ marginTop: "50px" }}>
                <Link to={{ pathname: '/QuestionData', state: { subcategory: item.subCatagoryname } }}>
                  <Box className="box" sx={{ width: "250px", background: "#eef7fd", padding: "35px 0", borderRadius: "8px", boxShadow: "inset 0 0 10px #84c6f31f" }}>
                    <Typography variant='h5' sx={{ textAlign: "center", color: '#124265' }}> {index + 1}. {item.subCatagoryname}</Typography>
                  </Box>
                </Link>
              </Box>
            )) : <Typography sx={{ marginTop: '20px', textAlign: 'center', color: 'gray' }}>"No subcategories found for the selected category"</Typography>
          }

          <Typography variant="h4" sx={{ width: '100%', textAlign: 'center', marginTop: '40px', color: '#124265' }}>All Subcategories</Typography>
          {
            allSubcategories.map((item, index) => (
              <Box key={item._id} sx={{ marginTop: "50px" }}>
                <Link to={{ pathname: '/QuestionData', state: { subcategory: item.subCatagoryname } }}>
                  <Box className="box" sx={{ width: "250px", background: "#eef7fd", padding: "35px 0", borderRadius: "8px", boxShadow: "inset 0 0 10px #84c6f31f" }}>
                    <Typography variant='h5' sx={{ textAlign: "center", color: '#124265' }}> {index + 1}. {item.subCatagoryname}</Typography>
                  </Box>
                </Link>
              </Box>
            ))
          }
        </Container>
      </Box>
    </>
  );
};

export default SubcatagoryData;
