import React from "react";
// import Drawer from '..'
import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import SummarizeIcon from "@mui/icons-material/Summarize";
import Drawer from "../../Components/Drawer";

const Dashboard = () => {
  const cardData = [
    {
      title: "Category",
      value: 0,
      icon: <CategoryIcon fontSize="large" />,
      bgColor: "#E3F2FD",
    },
    {
      title: "Subcategory",
      value: 0,
      icon: <SubdirectoryArrowRightIcon fontSize="large" />,
      bgColor: "#E8F5E9",
    },
    {
      title: "Total",
      value: 0,
      icon: <SummarizeIcon fontSize="large" />,
      bgColor: "#FFF3E0",
    },
  ];

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
