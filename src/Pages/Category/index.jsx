import React, { useState } from "react";
import Drawer from '../../Components/Drawer'
import { Box,Button,TextField,Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography,} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import Switch from '@mui/material/Switch';

const Category = () => {
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([
    { id: 1, name: "Electronics", status: "Active" },
    { id: 2, name: "Furniture", status: "Inactive" },
    { id: 3, name: "Clothing", status: "Active" },
  ]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleDelete = (id) => {
    setCategories(categories.filter((category) => category.id !== id));
  };

  const handleUpdate = (id) => {
    alert(`Update category with ID: ${id}`);
  };

  const handleAddCategory = () => {
    alert("Open Add Category Modal");
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );
  const label = { inputProps: { 'aria-label': 'Color switch demo' } };

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
          label="Search Category"
          variant="outlined"
          value={search}
          onChange={handleSearch}
          sx={{ width: "60%" }}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddCategory}
        >
          Add Category
        </Button>
      </Box>

      {/* Table Section */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Delete</TableCell>
              <TableCell align="center">Update</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category, index) => (
                <TableRow key={category.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell><Switch {...label} defaultChecked color="default" /></TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(category.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={() => handleUpdate(category.id)}
                    >
                      <EditIcon sx={{color:"#65C466"}} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography>No categories found.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
   </ Drawer>

  );
};

export default Category;

