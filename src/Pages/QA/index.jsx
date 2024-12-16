import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
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
  const [qaData, setQAData] = useState([]); // All Q&A data
  const [categories, setCategories] = useState([]); // Categories
  const [subcategories, setSubcategories] = useState([]); // Subcategories
  const [search, setSearch] = useState(""); // Search input
  const [dialogOpen, setDialogOpen] = useState(false); // Dialog state
  const [editMode, setEditMode] = useState(false); // Track Add/Edit mode
  const [currentQA, setCurrentQA] = useState({
    id: null,
    questions: "",
    answer: "",
    subCatagoryID: "",
  }); // Current QA data for Add/Edit

  const tableHeaders = ["Index", "Questions", "Answer", "Subcategory", "Category", "Actions"];

  // Fetch Q&A data
  const fetchQAData = async () => {
    try {
      const res = await axios.get("https://interviewhub-3ro7.onrender.com/questions/", {
        headers: { Authorization: token },
      });
      setQAData(res.data.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch Q&A data.");
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get("https://interviewhub-3ro7.onrender.com/catagory/", {
        headers: { Authorization: token },
      });
      setCategories(res.data.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch categories.");
    }
  };

  // Fetch subcategories
  const fetchSubcategories = async () => {
    try {
      const res = await axios.get("https://interviewhub-3ro7.onrender.com/subcatagory/", {
        headers: { Authorization: token },
      });
      setSubcategories(res.data.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch subcategories.");
    }
  };

  // Handle Add/Edit Dialog Open
  const openDialog = (qa = null) => {
    if (qa) {
      // Edit mode
      setCurrentQA({
        id: qa._id,
        questions: qa.questions,
        answer: qa.answer,
        subCatagoryID: qa.subCatagoryID,
      });
      setEditMode(true);
    } else {
      // Add mode
      setCurrentQA({
        id: null,
        questions: "",
        answer: "",
        subCatagoryID: "",
      });
      setEditMode(false);
    }
    setDialogOpen(true);
  };

  // Handle Add/Edit Dialog Close
  const closeDialog = () => {
    setDialogOpen(false);
    setCurrentQA({
      id: null,
      questions: "",
      answer: "",
      subCatagoryID: "",
    });
  };

  // Handle Add/Edit Form Submit
  const handleSubmit = async () => {
    try {
      if (editMode) {
        // Update QA
        await axios.patch(
          `https://interviewhub-3ro7.onrender.com/questions/${currentQA.id}`,
          {
            questions: currentQA.questions,
            answer: currentQA.answer,
            subCatagoryID: currentQA.subCatagoryID,
          },
          { headers: { Authorization: token } }
        );
        toast.success("Q&A updated successfully!");
      } else {
        // Add QA
        await axios.post(
          "https://interviewhub-3ro7.onrender.com/questions/create",
          {
            questions: currentQA.questions,
            answer: currentQA.answer,
            subCatagoryID: currentQA.subCatagoryID,
          },
          { headers: { Authorization: token } }
        );
        toast.success("Q&A added successfully!");
      }
      fetchQAData();
      closeDialog();
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit Q&A.");
    }
  };

  // Handle Delete QA
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://interviewhub-3ro7.onrender.com/questions/${id}`, {
        headers: { Authorization: token },
      });
      toast.success("Q&A deleted successfully!");
      fetchQAData();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete Q&A.");
    }
  };

  // Filter QA Data by Search
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
        <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
          <TextField
            label="Search Q&A"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ width: "70%" }}
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => openDialog()}
            sx={{ backgroundColor: "#79797a" }}
          >
            Add Q&A
          </Button>
        </Box>

        {/* Q&A Table */}
        <TableComponent
          TableHeader={tableHeaders}
          TableData={filteredQAData}
          renderRow={(row, index) => (
            <>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{row.questions}</TableCell>
              <TableCell>{row.answer}</TableCell>
              <TableCell>{row.subCatagoryID?.subCatagoryname || "N/A"}</TableCell>
              <TableCell>{row.subCatagoryID?.catagoryID?.catagoryName || "N/A"}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => openDialog(row)}
                  startIcon={<EditIcon />}
                  sx={{ marginRight: 1 }}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(row._id)}
                  startIcon={<DeleteIcon />}
                >
                  Delete
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
              value={currentQA.subCatagoryID}
              onChange={(e) =>
                setCurrentQA((prev) => ({ ...prev, subCatagoryID: e.target.value }))
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

