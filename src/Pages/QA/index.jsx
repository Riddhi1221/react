import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  TableCell,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import TableComponent from "../../Components/TableComponent";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Drawer from "../../Components/Drawer";

const QA = () => {
  const token = localStorage.getItem("Token");
  const [qaData, setQAData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentQA, setCurrentQA] = useState({
    id: null,
    questions: "",
    answer: "",
    subcatagoryID: "",
  });

  const tableHeaders = [
    "Index",
    "Questions",
    "Answer",
    "Subcategory",
    "Category",
    "Delete",
    "Update",
  ];

  // Fetch Q&A data
  const fetchQAData = async () => {
    try {
      const res = await axios.get("https://interviewhub-3ro7.onrender.com/questions/", {
        headers: { Authorization: token },
      });
      const fetchedData = res.data.data;
      setQAData(fetchedData);
      // Store the length of the fetched data in localStorage
      localStorage.setItem("question", fetchedData.length.toString());
      console.log("Fetched Q&A Data:", fetchedData); // Debugging log
    } catch (error) {
      console.error("Error fetching Q&A data:", error);
      toast.error("Failed to fetch Q&A data. Please try again later.");
    }
  };
  

  // Fetch categories and subcategories
  const fetchCategories = async () => {
    try {
      const res = await axios.get("https://interviewhub-3ro7.onrender.com/catagory/", {
        headers: { Authorization: token },
      });
      setCategories(res.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to fetch categories.");
    }
  };

  const fetchSubcategories = async () => {
    try {
      const res = await axios.get("https://interviewhub-3ro7.onrender.com/subcatagory/", {
        headers: { Authorization: token },
      });
      setSubcategories(res.data.data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      toast.error("Failed to fetch subcategories.");
    }
  };

  const openDialog = (qa = null) => {
    setCurrentQA(
      qa
        ? {
            id: qa._id,
            questions: qa.questions,
            answer: qa.answer,
            subcatagoryID: qa.subcatagoryID,
          }
        : {
            id: null,
            questions: "",
            answer: "",
            subcatagoryID: "",
          }
    );
    setEditMode(!!qa);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setCurrentQA({ id: null, questions: "", answer: "", subcatagoryID: "" });
  };

  const handleSubmit = async () => {
    try {
      if (editMode) {
        await axios.patch(
          `https://interviewhub-3ro7.onrender.com/questions/${currentQA.id}`,
          currentQA,
          { headers: { Authorization: token } }
        );
        toast.success("Q&A updated successfully!");
      } else {
        await axios.post(
          "https://interviewhub-3ro7.onrender.com/questions/create",
          currentQA,
          { headers: { Authorization: token } }
        );
        toast.success("Q&A added successfully!");
      }
      fetchQAData();
      closeDialog();
    } catch (error) {
      console.error("Error submitting Q&A:", error);
      toast.error("Failed to submit Q&A. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://interviewhub-3ro7.onrender.com/questions/${id}`, {
        headers: { Authorization: token },
      });
      toast.success("Q&A deleted successfully!");
      fetchQAData();
    } catch (error) {
      console.error("Error deleting Q&A:", error);
      toast.error("Failed to delete Q&A. Please try again.");
    }
  };

  const filteredQAData = qaData.filter(
    (item) =>
      item.questions.toLowerCase().includes(search.toLowerCase()) ||
      item.answer.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    fetchQAData();
    fetchCategories();
    fetchSubcategories();
  }, []);

  return (
    <Drawer>
      <Box sx={{ padding: 2 }}>
        {/* Search and Add Button */}
        <Grid container spacing={2} alignItems="center" sx={{ marginBottom: 2 }}>
          <Grid item xs={12} sm={8} md={10}>
            <TextField
              label="Search Q&A"
              variant="outlined"
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              fullWidth
              onClick={() => openDialog()}
              sx={{ backgroundColor: "#79797a" }}
            >
              Add Q&A
            </Button>
          </Grid>
        </Grid>

        {/* Q&A Table */}
        <TableComponent
          TableHeader={tableHeaders}
          TableData={filteredQAData}
          renderRow={(row, index) => (
            <>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{row.questions}</TableCell>
              <TableCell>{row.answer}</TableCell>
              <TableCell>{row.subcatagoryID?.subCatagoryname}</TableCell>
              <TableCell>{row.subcatagoryID?.catagoryID?.catagoryName}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(row._id)}
                >
                  <DeleteIcon />
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => openDialog(row)}
                >
                  <EditIcon />
                </Button>
              </TableCell>
            </>
          )}
        />
      </Box>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onClose={closeDialog}>
        <DialogTitle>{editMode ? "Edit Q&A" : "Add Q&A"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Question"
            value={currentQA.questions}
            onChange={(e) =>
              setCurrentQA((prev) => ({ ...prev, questions: e.target.value }))
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Answer"
            value={currentQA.answer}
            onChange={(e) =>
              setCurrentQA((prev) => ({ ...prev, answer: e.target.value }))
            }
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Subcategory</InputLabel>
            <Select
              value={currentQA.subcatagoryID}
              onChange={(e) =>
                setCurrentQA((prev) => ({ ...prev, subcatagoryID: e.target.value }))
              }
            >
              {subcategories.map((sub) => (
                <MenuItem key={sub._id} value={sub._id}>
                  {sub.subCatagoryname}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer />
    </Drawer>
  );
};

export default QA;
