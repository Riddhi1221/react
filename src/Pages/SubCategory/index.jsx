import React, { useState } from "react";
import Drawer from '../../Components/Drawer'
import {
  Box,
  Button,
  TextField,
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
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

const Subcategory = () => {
  const [search, setSearch] = useState("");
  const [subcategories, setSubcategories] = useState([
    { id: 1, name: "Laptops", category: "Electronics", status: "Active" },
    { id: 2, name: "Sofas", category: "Furniture", status: "Inactive" },
    { id: 3, name: "T-Shirts", category: "Clothing", status: "Active" },
  ]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleDelete = (id) => {
    setSubcategories(subcategories.filter((subcategory) => subcategory.id !== id));
  };

  const handleUpdate = (id) => {
    alert(`Update subcategory with ID: ${id}`);
  };

  const handleAddSubcategory = () => {
    alert("Open Add Subcategory Modal");
  };

  const filteredSubcategories = subcategories.filter((subcategory) =>
    subcategory.name.toLowerCase().includes(search.toLowerCase())
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
          label="Search Subcategory"
          variant="outlined"
          value={search}
          onChange={handleSearch}
          sx={{ width: "60%" }}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddSubcategory}
        >
          Add Subcategory
        </Button>
      </Box>

      {/* Table Section */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Subcategory</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Delete</TableCell>
              <TableCell align="center">Update</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSubcategories.length > 0 ? (
              filteredSubcategories.map((subcategory, index) => (
                <TableRow key={subcategory.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{subcategory.name}</TableCell>
                  <TableCell>{subcategory.category}</TableCell>
                  <TableCell>{subcategory.status}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(subcategory.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={() => handleUpdate(subcategory.id)}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography>No subcategories found.</Typography>
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

export default Subcategory;
