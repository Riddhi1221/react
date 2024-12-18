import React, { useEffect, useState } from "react";
import Drawer from "../../Components/Drawer";
import TextField from "../../Components/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Switch, TableCell, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { useFormik } from "formik";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import TableComponent from "../../Components/TableComponent";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import * as Yup from "yup";

const SubCategory = () => {
  const token = localStorage.getItem("Token");
  const [subcategory, setSubCategory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [eid, setEid] = useState(null);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const TableHeader = ["Index", "SubCategory Name", "Category Name", "Status", "Delete", "Update"];

  // Formik for form handling
  const formik = useFormik({
    initialValues: {
      subCatagoryname: "",
      catagoryID: "",
    },
    validationSchema: Yup.object().shape({
      subCatagoryname: Yup.string().required("Subcategory Name is required!"),
      catagoryID: Yup.string().required("Category is required!"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const url = eid
          ? `https://interviewhub-3ro7.onrender.com/subcatagory/${eid}`
          : "https://interviewhub-3ro7.onrender.com/subcatagory/create";
        const method = eid ? "patch" : "post";
        const res = await axios[method](url, values, {
          headers: { Authorization: token },
        });
        toast.success(res.data.message);
        resetForm();
        setEid(null);
        handleClose();
        dataFetch();
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while saving the subcategory.");
      }
    },
  });

  // Fetch subcategories
  const dataFetch = async () => {
    try {
      const res = await axios.get("https://interviewhub-3ro7.onrender.com/subcatagory/", {
        headers: { Authorization: token },
      });
      setSubCategory(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch categories for dropdown
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

  const searchCat = (values) => {
    console.log("function call ==> ", values)
    axios.get("https://interview-portal-api.onrender.com/subcatagory/?search=" + values, {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        console.log("==================", res)
        // setSubcategories(res.data.data);
        setSubCategory(res.data.data.filter(
          (item) => item.catagoryID && item.catagoryID.status === 'on'
        ));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    // console.log("===>",value);
    setSearch(value);    //je type thy ae 
    searchCat(value);
  };


  
  // const searchCat = async (value) => {
  //   try {
  //     const res = await axios.get(
  //       `https://interviewhub-3ro7.onrender.com/subcatagory/?search=${(value)}`,
  //       { headers: { Authorization: token } }
  //     );
  //     setSubCategory(res.data.data);
  //   } catch (error) {
  //     console.error("Search error:", error);
  //     toast.error("Failed to fetch search results.");
  //   }
  // };
  

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const updateData = (id) => {
    setEid(id);
    const dataFind = subcategory.find((el) => el._id === id);
    formik.setValues({
      subCatagoryname: dataFind.subCatagoryname,
      catagoryID: dataFind.catagoryID?._id || "",
    });
    handleClickOpen();
  };

  const switchToggle = async (id) => {
    const findData = subcategory.find((el) => el._id === id);
    try {
      await axios.patch(
        `https://interviewhub-3ro7.onrender.com/subcatagory/${id}`,
        { status: findData.status === "on" ? "off" : "on" },
        { headers: { Authorization: token } }
      );
      dataFetch();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteData = async (id) => {
    try {
      const res = await axios.delete(
        `https://interviewhub-3ro7.onrender.com/subcatagory/${id}`,
        { headers: { Authorization: token } }
      );
      toast.success(res.data.message);
      dataFetch();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dataFetch();
    fetchCategories(); // Fetch categories for dropdown
    if (!search) {
      dataFetch();
    }
  }, []);

  // useEffect(() => {
  //   if (!search) {
  //     dataFetch();
  //   }
  // }, [search]);
  

  return (
    <Drawer>
      <Box sx={{ padding: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
          <TextField
            label="Search Subcategory"
            variant="outlined"
            value={search}
            onChange={handleSearch}
            sx={{ width: "70%" }}
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ backgroundColor: "#79797a" }}
            onClick={() => {
              setEid(null);
              formik.resetForm();
              handleClickOpen();
            }}
          >
            Add Subcategory
          </Button>
        </Box>
        <TableComponent
          TableHeader={TableHeader}
          TableData={subcategory}
          renderRow={(row, index) => (
            <>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{row.subCatagoryname}</TableCell>
              <TableCell>{row.catagoryID?.catagoryName}</TableCell>
              <TableCell>
                <Switch
                  checked={row.status === "on"}
                  onChange={() => switchToggle(row._id)}
                />
              </TableCell>
              <TableCell>
                <Button variant="contained" color="error" onClick={() => deleteData(row._id)}>
                  <DeleteIcon />
                </Button>
              </TableCell>
              <TableCell>
                <Button variant="contained" color="success" onClick={() => updateData(row._id)}>
                  <EditIcon />
                </Button>
              </TableCell>
            </>
          )}
        />
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{eid ? "Update Subcategory" : "Add Subcategory"}</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <TextField
              fullWidth
              label="Subcategory Name"
              name="subCatagoryname"
              onChange={formik.handleChange}
              value={formik.values.subCatagoryname}
              error={formik.touched.subCatagoryname && Boolean(formik.errors.subCatagoryname)}
              helperText={formik.touched.subCatagoryname && formik.errors.subCatagoryname}
              sx={{ marginBottom: 2 }}
            />
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                name="catagoryID"
                value={formik.values.catagoryID}
                onChange={formik.handleChange}
                error={formik.touched.catagoryID && Boolean(formik.errors.catagoryID)}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat._id} value={cat._id}>
                    {cat.catagoryName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" type="submit">
              {eid ? "Update" : "Add"} Subcategory
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <ToastContainer />
    </Drawer>
  );
};

export default SubCategory;

