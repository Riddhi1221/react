// import { Container, Typography, Box, Button } from '@mui/material';
// import { Link } from "react-router-dom";
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const CatagoryData = () => {
//   const token = localStorage.getItem('token');

//   const [categories, setCategories] = useState([]);
//   const [filterCat, setFilterCat] = useState([]);
//   const [showAll, setShowAll] = useState(true);

//   const getCategory = () => {
//     axios.get('https://interview-portal-api.onrender.com/catagory/', {
//       headers: {
//         Authorization: token,
//       }
//     })
//     .then((res) => {
//       const data = res.data.data;
//       setCategories(res.data.data);
//       filterCategories(data, showAll);
//     })
//     .catch((err) => {
//       console.log("err", err);
//     });
//   }

//   const filterCategories = (data, showAll) => {
//     if (showAll) {
//       setFilterCat(data);
//     } else {
//       const filtered = data.filter((el) => el.status === 'on');
//       setFilterCat(filtered);
//     }
//   }

//   const CategoryView = () => {
//     const newShowAll = !showAll;
//     setShowAll(newShowAll);
//     filterCategories(categories, newShowAll);
//   }

//   useEffect(() => {
//     getCategory();
//   }, []);

//   return (
//     <>
//       <Typography style={{ padding: "50px 0", background: "#eef7fd", borderBottom: "1px solid #3ca1e9" }}>
//         <Container>
//           <Box sx={{ display: "flex", alignItems: "center", marginBottom: "10px", justifyContent: 'space-between' }}>
//             <h1 style={{ color: "#124265" }}>Category</h1>
//             <p style={{ marginLeft: '48px' }}><a href="/" style={{ color: "#3ca1e9" }}>Home</a> / Category</p>
//           </Box>
//           <Button variant="contained" color="primary" onClick={CategoryView}>
//             {showAll ? 'Show Only Active Categories' : 'Show All Categories'}
//           </Button>
//         </Container>
//       </Typography>
//       <Box sx={{padding:"80px 0"}}>

//       <Container sx={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
//         <Typography variant="h4" sx={{ width: '100%', textAlign: 'center',  color: '#124265'}}>All Categories</Typography>
//         {
//           filterCat.map((item, i) => (
//             <Box key={i} sx={{ marginTop: "50px" }}>
//               <Link to={{ pathname: '/SubcatagoryData', state: { category: item.catagoryName } }}>
//                 <Box className="box" sx={{ width: "250px", background: "#eef7fd", padding: "35px 0", borderRadius: "8px", boxShadow: "inset 0 0 10px #84c6f31f" }}>
//                   <Typography variant='h5' sx={{ textAlign: "center", color: '#124265' }}>
//                     {i + 1}.&nbsp; {item.catagoryName}
//                   </Typography>
//                 </Box>
//               </Link>
//             </Box>
//           ))
//         }
//       </Container>
//       </Box>
//     </>
//   );
// }

// export default CatagoryData;

import { Container, Typography, Box, Button , Grid} from '@mui/material';
import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import SchoolIcon from '@mui/icons-material/School';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import axios from 'axios';

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
     <header>
                <Box sx={{ flexGrow: 1 }} >
                    <AppBar position="sticky" sx={{ padding: "15px 0", backgroundColor: "#4b81a8" }}>
                        <Container maxWidth="992px">
                            <Toolbar>
                                <IconButton
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                // sx={{ mr: 2 }}
                                >
                                    <SchoolIcon />
                                </IconButton>
                                <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: "30px" }}>
                                    <a href='/' style={{ color: '#fff' }} >QuickStart</a>
                                </Typography>
                                <Button><a href="/login" style={{ color: "#4b81a8", border: "1px solid #fff", padding: "8px 25px", borderRadius: "4px", background: "#fff" }}>LOGIN</a></Button>
                                <Button><a href="/signup" style={{
                                    color: "#fff", border: "1px solid #fff", padding: "8px 25px", borderRadius: "4px", background: "#4b81a8"
                                    , display: { xs: "none" }
                                }}>SIGN UP</a></Button>
                                
                            </Toolbar>
                        </Container>
                    </AppBar>
                </Box>
            </header>
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
      <footer className='footer'>
                <Container sx={{ padding: "50px 15px" }}>
                    <Box sx={{ display: "flex" }}>


                        <Box width="60%">
                            <Grid sx={{ display: "flex", alignItems: "center" }}>
                                <a href="" style={{ fontSize: "32px", color: "#124265", fontWeight: "700", letterSpacing: "1px", marginBottom: "20px" }}>QuickStart</a>
                            </Grid>
                            <p style={{ fontSize: "15px", letterSpacing: "1px" }}>QuickStart is an online practice platform <br /> that has been operating since 2024 until now.</p>
                            <Box className="social-links" sx={{ display: "flex", marginTop: "1.5rem" }}>
                                <a href="">< TwitterIcon className='icon' sx={{ color: '#4b81a8' }} /></a>
                                <a href="">< FacebookIcon className='icon' sx={{ color: '#4b81a8' }} /></a>
                                <a href="">< LinkedInIcon className='icon' sx={{ color: '#4b81a8' }} /></a>
                                <a href="">< GitHubIcon className='icon' sx={{ color: '#4b81a8' }} /></a>
                            </Box>
                        </Box>

                        {/* <Box width="50%">
                            <h4 style={{ color: "#124265", marginBottom: "20px", fontSize: '18px' }}>Useful Links</h4>
                            <a href='' style={{ fontSize: '14px', color: 'gray' }}>Home</a>
                        </Box> */}

                    </Box>



                    <Typography sx={{ marginTop: "50px" }}></Typography>


                    <Box sx={{ textAlign: "center", padding: "30px 0px", color: "#fff", background: "#4b81a8" }}>
                        <p>© <span>Copyright</span> <strong>QuickStart</strong> <span>All Rights Reserved</span></p>
                        <Box sx={{ marginTop: "10px" }}>
                            Designed by <a href="/" style={{ color: "#eef7fd" }}>Riddhi Chheta</a>
                        </Box>
                    </Box>
                </Container>




            </footer>
    </>
  );
}

export default CatagoryData;

