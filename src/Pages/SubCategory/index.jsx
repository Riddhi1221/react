// import React, { useEffect, useState } from "react";
// import Drawer from "../../Components/Drawer";
// import TextField from "../../Components/TextField";
// import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogTitle from "@mui/material/DialogTitle";
// import { Box, Switch, TableCell, MenuItem, Select, InputLabel, FormControl, Grid, CircularProgress } from "@mui/material";
// import { useFormik } from "formik";
// import AddIcon from "@mui/icons-material/Add";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import TableComponent from "../../Components/TableComponent";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import { useTheme, useMediaQuery } from "@mui/material";
// import * as Yup from "yup";

// const SubCategory = () => {
//   const token = localStorage.getItem("Token");
//   const [subcategory, setSubCategory] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [eid, setEid] = useState(null);
//   const [search, setSearch] = useState("");
//   const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState(true); // Add loading state
//   const theme = useTheme();
//   const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

//   const TableHeader = ["Index", "SubCategory Name", "Category Name", "Status", "Delete", "Update"];

//   const formik = useFormik({
//     initialValues: {
//       subCategoryname: "",
//       categoryID: "",
//     },
//     validationSchema: Yup.object().shape({
//       subCategoryname: Yup.string().required("Subcategory Name is required!"),
//       catagoryID: Yup.string().required("Category is required!"),
//     }),
//     onSubmit: async (values, { resetForm }) => {
//       try {
//         let res;
//         if (eid) {
//           res = await axios.patch(`https://interviewback-ucb4.onrender.com/subcategory/${eid}`, values, {
//             headers: { Authorization: token },
//           });
//         } else {
//           res = await axios.post("https://interviewback-ucb4.onrender.com/subcategory/create", values, {
//             headers: { Authorization: token },
//           });
//         }

//         // Success message and actions
//         toast.success(res.data.message);
//         resetForm();
//         setEid(null);
//         handleClose();
//         dataFetch(); // Refresh data after submitting
//       } catch (error) {
//         console.error(error);
//         toast.error("An error occurred while saving the subcategory.");
//       }

//     },
//   });

//   // Fetch data functions
//   const dataFetch = async () => {
//     try {
//       setLoading(true); // Set loading to true while fetching
//       const res = await axios.get("https://interviewback-ucb4.onrender.com/subcategory/", {
//         headers: { Authorization: token },
//       });
//       const fetchedData = res.data.data;
//       setSubCategory(fetchedData);
//       localStorage.setItem("subcategory", fetchedData.length);
//       console.log("Fetched Subcategories:", fetchedData); // Debugging log
//     } catch (error) {
//       console.error("Error fetching subcategories:", error);
//       toast.error("Failed to fetch subcategories. Please try again later.");
//     } finally {
//       setLoading(false); // Set loading to false when done
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get("https://interviewback-ucb4.onrender.com/category/", {
//         headers: { Authorization: token },
//       });
//       setCategories(res.data.data);
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to fetch categories.");
//     }
//   };

//   const handleSearch = (e) => {
//     const value = e.target.value;
//     setSearch(value);
//     axios.get(`https://interviewback-ucb4.onrender.com/subcategory/?search=${value}`, {
//       headers: { Authorization: token },
//     })
//       .then((res) => setSubCategory(res.data.data))
//       .catch((err) => console.error(err));
//   };

//   const handleClickOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const updateData = (id) => {
//     setEid(id);
//     const dataFind = subcategory.find((el) => el._id === id);
//     formik.setValues({
//       subCategoryname: dataFind.subCategoryname,
//       catagoryID: dataFind.catagoryID?._id || "",
//     });
//     handleClickOpen();
//   };

//   const switchToggle = async (id) => {
//     const findData = subcategory.find((el) => el._id === id);
//     try {
//       await axios.patch(
//         `https://interviewhub-3ro7.onrender.com/subcategory/${id}`,
//         { status: findData.status === "on" ? "off" : "on" },
//         { headers: { Authorization: token } }
//       );
//       dataFetch();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const deleteData = async (id) => {
//     try {
//       const res = await axios.delete(
//         `https://interviewback-ucb4.onrender.com/subcategory/${id}`,
//         { headers: { Authorization: token } }
//       );
//       toast.success(res.data.message);
//       dataFetch();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     dataFetch();
//     fetchCategories();
//   }, []);

//   return (
//     <Drawer>
//       <Box sx={{ padding: 2 }}>
//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={9}>
//             <TextField
//               fullWidth
//               label="Search Subcategory"
//               variant="outlined"
//               value={search}
//               onChange={handleSearch}
//             />
//           </Grid>
//           <Grid item xs={12} sm={3}>
//             <Button
//               fullWidth
//               variant="contained"
//               startIcon={<AddIcon />}
//               sx={{ backgroundColor: "#79797a" }}
//               onClick={() => {
//                 setEid(null);
//                 formik.resetForm();
//                 handleClickOpen();
//               }}
//             >
//               Add Subcategory
//             </Button>
//           </Grid>
//         </Grid>

//         {/* Show loading spinner while fetching data */}
//         {loading ? (
//           <Box sx={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
//             <CircularProgress />
//           </Box>
//         ) : (
//           <Box sx={{ marginTop: 2, overflowX: 'auto' }}>
//             <TableComponent
//               TableHeader={TableHeader}
//               TableData={subcategory}
//               renderRow={(row, index) => (
//                 <>
//                   <TableCell>{index + 1}</TableCell>
//                   <TableCell>{row.subCategoryname}</TableCell>
//                   <TableCell>{row.categoryID?.categoryName}</TableCell>
//                   <TableCell>
//                     <Switch
//                       checked={row.status === "on"}
//                       onChange={() => switchToggle(row._id)}
//                     />
//                   </TableCell>
//                   <TableCell>
//                     <Button variant="contained" color="error" onClick={() => deleteData(row._id)}>
//                       <DeleteIcon />
//                     </Button>
//                   </TableCell>
//                   <TableCell>
//                     <Button variant="contained" color="success" onClick={() => updateData(row._id)}>
//                       <EditIcon />
//                     </Button>
//                   </TableCell>
//                 </>
//               )}
//             />
//           </Box>
//         )}
//       </Box>

//       <Dialog open={open} onClose={handleClose} fullWidth maxWidth={isSmall ? "xs" : "sm"}>
//         <DialogTitle>{eid ? "Update Subcategory" : "Add Subcategory"}</DialogTitle>
//         <form onSubmit={formik.handleSubmit}>
//           <DialogContent>
//             <TextField
//               fullWidth
//               label="Subcategory Name"
//               name="subCategoryname"
//               onChange={formik.handleChange}
//               value={formik.values.subCategoryname}
//               error={formik.touched.subCategoryname && Boolean(formik.errors.subCategoryname)}
//               helperText={formik.touched.subCategoryname && formik.errors.subCategoryname}
//               sx={{ marginBottom: 2 }}
//             />
//             <FormControl fullWidth>
//               <InputLabel>Category</InputLabel>
//               <Select
//                 name="catagoryID"
//                 value={formik.values.categoryID}
//                 onChange={formik.handleChange}
//                 error={formik.touched.categoryID && Boolean(formik.errors.categoryID)}
//               >
//                 {categories.map((cat) => (
//                   <MenuItem key={cat._id} value={cat._id}>{cat.categoryName}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </DialogContent>
//           <DialogActions>
//             <Button variant="contained" type="submit">
//               {eid ? "Update" : "Add"} Subcategory
//             </Button>
//           </DialogActions>
//         </form>
//       </Dialog>
//       <ToastContainer />
//     </Drawer>
//   );
// };

// export default SubCategory;



import React, { useEffect, useState } from "react";
import Drawer from "../../Components/Drawer";
import TextField from "../../Components/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Switch, TableCell, MenuItem, Select, InputLabel, FormControl, Grid, CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import TableComponent from "../../Components/TableComponent";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useTheme, useMediaQuery } from "@mui/material";
import * as Yup from "yup";

const SubCategory = () => {
  const token = localStorage.getItem("Token");
  const [subcategory, setSubCategory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [eid, setEid] = useState(null);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const TableHeader = ["Index", "SubCategory Name", "Category Name", "Status", "Delete", "Update"];

  const formik = useFormik({
    initialValues: {
      subCategoryname: "",
      categoryID: "",
    },
    validationSchema: Yup.object({
      subCategoryname: Yup.string().required("Subcategory Name is required!"),
      categoryID: Yup.string().required("Category is required!"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        let res;
        if (eid) {
          res = await axios.patch(
            `https://interviewback-ucb4.onrender.com/subcategory/${eid}`,
            values,
            { headers: { Authorization: token } }
          );
        } else {
          res = await axios.post(
            "https://interviewback-ucb4.onrender.com/subcategory/create",
            values,
            { headers: { Authorization: token } }
          );
        }
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

  const dataFetch = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://interviewback-ucb4.onrender.com/subcategory/", {
        headers: { Authorization: token },
      });
      const dataFetch = res.data.data;
      setSubCategory(dataFetch);
      localStorage.setItem("subcategory", dataFetch.length)
    } catch (error) {
      toast.error("Failed to fetch subcategories.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get("https://interviewback-ucb4.onrender.com/category/", {
        headers: { Authorization: token },
      });
      setCategories(res.data.data);
    } catch (error) {
      toast.error("Failed to fetch categories.");
    }
  };

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearch(value);
    try {
      const res = await axios.get(
        `https://interviewback-ucb4.onrender.com/subcategory/?search=${value}`,
        { headers: { Authorization: token } }
      );
      setSubCategory(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const updateData = (id) => {
    setEid(id);
    const dataFind = subcategory.find((el) => el._id === id);
    formik.setValues({
      subCategoryname: dataFind.subCategoryname,
      categoryID: dataFind.categoryID?._id || "",
    });
    handleClickOpen();
  };

  const switchToggle = async (id) => {
    const findData = subcategory.find((el) => el._id === id);
    try {
    await axios.patch(
      "https://interviewback-ucb4.onrender.com/subcategory/${id}",
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
        `https://interviewback-ucb4.onrender.com/subcategory/${id}`,
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
    fetchCategories();
  }, []);

  return (
    <Drawer>
      <Box sx={{ padding: 2 ,flexGrow: 1, 
        minHeight: "100vh", 
        backgroundColor: "#f4f4f4",
        display: "flex",    
        flexDirection: "column"}}>
        <Grid container spacing={2} alignItems="center" sx={{ marginBottom: 2 }}>
          <Grid item xs={12} sm={4} md={8}>
            <TextField
              fullWidth
              label="Search Subcategory"
              variant="outlined"
              value={search}
              onChange={handleSearch}
            />
          </Grid>
          <Grid item xs={12} sm={8} md={4}>
            <Button
              fullWidth
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
          </Grid>
        </Grid>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ marginTop: 2, overflowX: "auto" }}>
            <TableComponent
              TableHeader={TableHeader}
              TableData={subcategory}
              renderRow={(row, index) => (
                <>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{row.subCategoryname}</TableCell>
                  <TableCell align="center">{row.categoryID?.categoryName}</TableCell>
                  <TableCell align="center">
                    <Switch
                      checked={row.status === "on"}
                      onChange={() => switchToggle(row._id)}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Button variant="contained" color="error" onClick={() => deleteData(row._id)}>
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button variant="contained" color="success" onClick={() => updateData(row._id)}>
                      <EditIcon />
                    </Button>
                  </TableCell>
                </>
              )}
            />
          </Box>
        )}
      </Box>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth={isSmall ? "xs" : "sm"}>
        <DialogTitle>{eid ? "Update Subcategory" : "Add Subcategory"}</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <TextField
              fullWidth
              label="Subcategory Name"
              name="subCategoryname"
              onChange={formik.handleChange}
              value={formik.values.subCategoryname}
              error={formik.touched.subCategoryname && Boolean(formik.errors.subCategoryname)}
              helperText={formik.touched.subCategoryname && formik.errors.subCategoryname}
              sx={{ marginBottom: 2 }}
            />
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                name="categoryID"
                value={formik.values.categoryID}
                onChange={formik.handleChange}
                error={formik.touched.categoryID && Boolean(formik.errors.categoryID)}
              >
                <MenuItem value="" disabled>
                  Select a Category
                </MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat._id} value={cat._id}>
                    {cat.categoryName}
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

