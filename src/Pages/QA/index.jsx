import React, { useState } from "react";
import Drawer from '../../Components/Drawer'
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

const QA = () => {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "What is React?",
      answer: "React is a JavaScript library for building user interfaces.",
      subcategory: "Frontend",
      category: "Development",
      status: "Active",
    },
    {
      id: 2,
      question: "What is a Hook in React?",
      answer: "A Hook is a special function that lets you use React features.",
      subcategory: "Hooks",
      category: "Development",
      status: "Active",
    },
    {
      id: 3,
      question: "What is a State in React?",
      answer: "State is a built-in object that stores component data.",
      subcategory: "State Management",
      category: "Development",
      status: "Inactive",
    },
  ]);

  const [search, setSearch] = useState("");

  const handleDelete = (id) => {
    setQuestions(questions.filter((question) => question.id !== id));
  };

  const handleUpdate = (id) => {
    alert(`Update Q&A with ID: ${id}`);
  };

  const handleAddQA = () => {
    alert("Open Add Q&A Modal");
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredQuestions = questions.filter(
    (item) =>
      item.question.toLowerCase().includes(search.toLowerCase()) ||
      item.answer.toLowerCase().includes(search.toLowerCase()) ||
      item.subcategory.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Drawer>
<Box sx={{ padding: 2 }}>
{/* Header Section */}
<Box
  sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  }}
>
  <TextField
    label="Search Q&A"
    variant="outlined"
    value={search}
    onChange={handleSearch}
    sx={{ width: "60%" }}
  />
  <Button
    variant="contained"
    startIcon={<AddIcon />}
    onClick={handleAddQA}
  >
    Add Q&A
  </Button>
</Box>

{/* Table Section */}
<TableContainer component={Paper}>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>No</TableCell>
        <TableCell>Questions</TableCell>
        <TableCell>Answer</TableCell>
        <TableCell>Subcategory</TableCell>
        <TableCell>Category</TableCell>
        <TableCell>Status</TableCell>
        <TableCell align="center">Delete</TableCell>
        <TableCell align="center">Update</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {filteredQuestions.length > 0 ? (
        filteredQuestions.map((item, index) => (
          <TableRow key={item.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{item.question}</TableCell>
            <TableCell>{item.answer}</TableCell>
            <TableCell>{item.subcategory}</TableCell>
            <TableCell>{item.category}</TableCell>
            <TableCell>{item.status}</TableCell>
            <TableCell align="center">
              <IconButton
                color="error"
                onClick={() => handleDelete(item.id)}
              >
                <DeleteIcon />
              </IconButton>
            </TableCell>
            <TableCell align="center">
              <IconButton
                color="primary"
                onClick={() => handleUpdate(item.id)}
              >
                <EditIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={8} align="center">
            <Typography>No Q&A found.</Typography>
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>
</TableContainer>
</Box>
    </Drawer>
  );
};

export default QA;

