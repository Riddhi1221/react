import React, { useEffect, useState } from "react";
import Drawer from "../../Components/Drawer";
import TextField from "../../Components/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, Box, Switch, TableCell, CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import TableComponent from "../../Components/TableComponent";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Category = () => {
  let token = localStorage.getItem("Token");
  let [category, setCategory] = useState([]);
  let [eid, setEid] = useState(null);
  let [search, setSearch] = useState("");
  let [loading, setLoading] = useState(false); // Loader state
  let [submitting, setSubmitting] = useState(false); // Form submission state
  let TableHeader = ["Index", "Category Name", "Status", "Delete", "Update"];

  const formik = useFormik({
    initialValues: {
      categoryName: "",
    },
    onSubmit: async (values, { resetForm }) => {
      setSubmitting(true); // Start form submission loader
      try {
        let res;
        if (eid && eid.length) {
          res = await axios.patch(
            `https://interviewback-ucb4.onrender.com/category/${eid}`,
            values,
            {
              headers: {
                Authorization: token,
              },
            }
          );
        } else {
          res = await axios.post(
            "https://interviewback-ucb4.onrender.com/category/create",
            values,
            {
              headers: {
                Authorization: token,
              },
            }
          );
        }
        setEid(null);
        toast.success(res.data.message);
        resetForm();
        handleClose();
        dataFetch();
      } catch (error) {
        toast.error("An error occurred while submitting the form.");
      } finally {
        setSubmitting(false); // End form submission loader
      }
    },
  });

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dataFetch = async () => {
    setLoading(true); // Start loading
    try {
      let res = await axios.get("https://interviewback-ucb4.onrender.com/category/", {
        headers: {
          Authorization: token,
        },
      });
      setCategory(res.data.data);
      localStorage.setItem("category", res.data.data.length);
    } catch (error) {
      toast.error("Failed to fetch categories.");
    } finally {
      setLoading(false); // End loading
    }
  };

  const searchCat = (values) => {
    axios
      .get("https://interviewback-ucb4.onrender.com/category/?search=" + values, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setCategory(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    searchCat(value);
  };

  const updateData = (id) => {
    setEid(id);
    let dataFind = category.find((el) => el._id === id);
    formik.setValues(dataFind);
    handleClickOpen();
  };

  const switchToggle = async (id) => {
    let findData = category.find((el) => el._id === id);
    try {
      await axios.patch(
        `https://interviewback-ucb4.onrender.com/category/${id}`,
        { status: findData.status === "on" ? "off" : "on" },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      dataFetch();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSwitchToggle = async (id) => {
    const categoryToToggle = category.find((cat) => cat._id === id);
    const newStatus = categoryToToggle.status === "on" ? "off" : "on";

    try {

      await axios.patch(
        "https://interviewback-ucb4.onrender.com/category/${id}",
        { status: newStatus },
        { headers: { Authorization: token } }
      );


      const subcategoryRes = await axios.get("https://interviewback-ucb4.onrender.com/subcategory/", {
        headers: { Authorization: token },
      });

      const relatedSubcategories = subcategoryRes.data.data.filter(
        (sub) => sub.categoryID?._id === id
      );


      for (const sub of relatedSubcategories) {
        await axios.patch(
          "https://interviewback-ucb4.onrender.com/subcategory/${sub._id}",
          { status: newStatus },
          { headers: { Authorization: token } }
        );
      }

      dataFetch();
    } catch (error) {
      toast.error("Failed to toggle status");
      console.error(error);
    }
  };

  const deleteData = async (id) => {
    try {
      let res = await axios.delete(`https://interviewback-ucb4.onrender.com/category/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      dataFetch();
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dataFetch();
  }, []);

  return (
    <Drawer>
      <Box sx={{
        padding: 2, flexGrow: 1,
        minHeight: "100vh",
        backgroundColor: "#f4f4f4",
        display: "flex",
        flexDirection: "column"
      }}
      >
        <Grid container spacing={2} sx={{ p: 2 }}>
          <Grid container spacing={2} alignItems="center" sx={{ marginBottom: 2 }}>
            <Grid item xs={12} sm={4} md={8}>
              <TextField
                label="Search category"
                variant="outlined"
                value={search}
                onChange={handleSearch}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={8} md={4} sx={{ display: "flex", justifyContent: "end" }}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<AddIcon />}
                sx={{ backgroundColor: "#79797a" }}
                onClick={() => {
                  setEid(null);
                  setOpen(true);
                }}
              >
                Add Category
              </Button>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            {loading ? ( // Show loader while fetching data
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
                <CircularProgress />
              </Box>
            ) : (
              <TableComponent
                TableHeader={TableHeader}
                TableData={category}
                renderRow={(row, index) => (
                  <>
                    <TableCell component="th" scope="row" align="center">
                      {index + 1}
                    </TableCell>
                    <TableCell align="center">{row.categoryName}</TableCell>
                    <TableCell align="center">
                      <Switch
                        checked={row.status === "on"}
                        onChange={() => switchToggle(row._id)}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        onClick={() => deleteData(row._id)}
                        sx={{ backgroundColor: "red" }}
                      >
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        onClick={() => updateData(row._id)}
                        sx={{ backgroundColor: "green" }}
                      >
                        <EditIcon />
                      </Button>
                    </TableCell>
                  </>
                )}
              />
            )}
          </Grid>
        </Grid>
      </Box>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{eid ? "Update Category" : "Add Category"}</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <TextField
              label="Category Name"
              name="categoryName"
              onChange={formik.handleChange}
              value={formik.values.categoryName}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button variant="contained" type="submit" disabled={submitting}>
              {submitting ? <CircularProgress size={24} /> : eid ? "Update Category" : "Add Category"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <ToastContainer />
    </Drawer>
  );
};

export default Category;
