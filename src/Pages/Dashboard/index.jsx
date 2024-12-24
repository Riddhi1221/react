import React, { useEffect, useState } from 'react';
import Drawer from "../../Components/Drawer";
import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

const Dashboard = () => {
  let [category, setcategory] = useState([]);
  let [subcategory, setsubcategory] = useState([]);
  let [questions, setquestions] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
  }, [token]);

  useEffect(() => {
    let categoryData = localStorage.getItem("category")
    let subcategory = localStorage.getItem("subcategory")
    let question = localStorage.getItem("question")

    let dataCopy = cardData.map((el, i) => {
      cardData[0].value = categoryData || 0
      cardData[1].value = subcategory || 0
      cardData[2].value = question ||0
      return cardData[i]

    })
    setCardData(dataCopy);
    
  }, [])

  const [cardData, setCardData] = useState([
    {
      icon: <CategoryIcon />,
      title: 'Total Category',
      value: '',
      color: 'dark',
      bgColor: "#E3F2FD",
    },
    {
      icon: <SubdirectoryArrowRightIcon />,
      title: 'Total Subcategory',
      value: subcategory.length,
      color: 'dark',
      bgColor: "#E8F5E9",
    },
    {
      icon: <QuestionMarkIcon />,
      title: 'Total Q/A',
      value: questions.length,
      color: 'dark',
      bgColor: "#FFF3E0",
    },
  ])

  return (
    <Drawer>
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Grid container spacing={2}>
          {cardData.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: 2,
                  backgroundColor: card.bgColor,
                  boxShadow: 2,
                  borderRadius: 2,
                }}
              >
                <Box sx={{ marginRight: 2 }}>{card.icon}</Box>
                <CardContent>
                  <Typography variant="h6">{card.title}</Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {card.value}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Drawer>
  );
};
export default Dashboard;

