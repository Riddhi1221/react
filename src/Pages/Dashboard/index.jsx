import React, { useEffect, useState } from "react";
import Drawer from "../../Components/Drawer";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();
  const token = localStorage.getItem("Token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    // Simulate loading of data from localStorage or API
    const categoryCount = parseInt(localStorage.getItem("category")) || 0;
    const subcategoryCount = parseInt(localStorage.getItem("subcategory")) || 0;
    const questionCount = parseInt(localStorage.getItem("question")) || 0;

    const updatedCardData = [
      {
        icon: <CategoryIcon />,
        title: "Total Categories",
        value: categoryCount,
        color: "dark",
        bgColor: "#E3F2FD",
      },
      {
        icon: <SubdirectoryArrowRightIcon />,
        title: "Total Subcategories",
        value: subcategoryCount,
        color: "dark",
        bgColor: "#E8F5E9",
      },
      {
        icon: <QuestionMarkIcon />,
        title: "Total Q/A",
        value: questionCount,
        color: "dark",
        bgColor: "#FFF3E0",
      },
    ];

    setCardData(updatedCardData);
    setLoading(false); 
  }, [token]);

  const pieChartData = cardData.map((item) => ({
    name: item.title,
    value: item.value,
  }));

  const COLORS = ["#90CAF9", "#A5D6A7", "#FFB74D"];

  return (
    <Drawer>
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        {/* Loading Spinner */}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {/* Card Section */}
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

            {/* Pie Chart Section */}
            <Box sx={{ marginTop: 4 }}>
              <Typography variant="h5" align="center" sx={{ marginBottom: 3 }}>
                Data Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                  >
                    {pieChartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  );
};

export default Dashboard;
