// import React, { useEffect, useState } from "react";
// import Drawer from "../../Components/Drawer";
// import {
//   Box,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
//   Paper,
// } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import axios from "axios";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const QA = () => {
//   const token = localStorage.getItem("Token");
//   const [subcategory, setSubCategory] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [search, setSearch] = useState("");
//   const [eid, setEid] = useState(null);
//   const [open, setOpen] = useState(false);

//   // Table Header
//   const TableHeader = [
//     "Index",
//     "Questions",
//     "Answer",
//     "SubCategory Name",
//     "Category Name",
//     "Delete",
//     "Update",
//   ];

//   // Formik Initialization
//   const formik = useFormik({
//     initialValues: {
//       questions: "",
//       answer: "",
//       subCatagoryname: "",
//       // catagoryID: "",
//     },
//     validationSchema: Yup.object().shape({
//       questions: Yup.string().required("Question is required!"),
//       answer: Yup.string().required("Answer is required!"),
//       subCatagoryname: Yup.string().required("Subcategory Name is required!"),
//       catagoryID: Yup.string().required("Category is required!"),
//     }),
//     onSubmit: async (values, { resetForm }) => {
//       try {
//         const url = eid
//           ? `https://interviewhub-3ro7.onrender.com/questions/${eid}`
//           : "https://interviewhub-3ro7.onrender.com/questions/create";
//         const method = eid ? "patch" : "post";

//         const res = await axios[method](url, values, {
//           headers: { Authorization: token },
//         });
//         toast.success(res.data.message);
//         resetForm();
//         setEid(null);
//         handleClose();
//         dataFetch();
//       } catch (error) {
//         console.error(error);
//         toast.error("An error occurred while saving the subcategory.");
//       }
//     },
//   });

//   // Fetch Subcategories
//   const dataFetch = async () => {
//     try {
//       const res = await axios.get("https://interviewhub-3ro7.onrender.com/subcatagory/", {
//         headers: { Authorization: token },
//       });
//       setSubCategory(res.data.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // Fetch Categories
//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get("https://interviewhub-3ro7.onrender.com/catagory/", {
//         headers: { Authorization: token },
//       });
//       setCategories(res.data.data);
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to fetch categories.");
//     }
//   };

//   // Search Functionality
//   const handleSearch = (e) => {
//     const value = e.target.value;
//     setSearch(value);

//     if (value) {
//       searchCat(value);
//     } else {
//       dataFetch();
//     }
//   };

//   const searchCat = async (value) => {
//     try {
//       const res = await axios.get(
//         `https://interviewhub-3ro7.onrender.com/questions/?search=${encodeURIComponent(
//           value
//         )}`,
//         { headers: { Authorization: token } }
//       );
//       setSubCategory(res.data.data);
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to fetch search results.");
//     }
//   };

//   const handleClickOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const deleteData = async (id) => {
//     try {
//       const res = await axios.delete(
//         `https://interviewhub-3ro7.onrender.com/questions/${id}`,
//         { headers: { Authorization: token } }
//       );
//       toast.success(res.data.message);
//       dataFetch();
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to delete subcategory.");
//     }
//   };

//   const updateData = (values, id) => {
//     axios.patch("https://interview-portal-api.onrender.com/questions/" + id, values, {
//       headers: {
//         Authorization: token,
//       },
//     })
//       .then((res) => {
//         setOpenDialog(false);
//         allDataApi();
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   };

//   const handleOpenDialog = () => {
//     setInitialValues({
//       questions: '',
//       answer: '',
//       subcatagoryID: '',
//     });
//     setEdit(null);
//     setOpenDialog(true);
//   };

//   const Edit = (que) => {
//     setEdit(que._id);
//     setInitialValues({
//       questions: que.questions,
//       answer: que.answer,
//       subcatagoryID: que.subcatagoryID ? que.subcatagoryID._id : '',
//     });
//     setOpenDialog(true);
//   };


//   useEffect(() => {
//     dataFetch();
//     fetchCategories();
//   }, []);

//   return (
//     <Drawer>
//       <Box sx={{ padding: 2 }}>
//         <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
//           <TextField
//             label="Search Q & A"
//             variant="outlined"
//             value={search}
//             onChange={handleSearch}
//             sx={{ width: "70%" }}
//           />
//           <Button
//             variant="contained"
//             startIcon={<AddIcon />}
//             sx={{backgroundColor:"#79797a"}}
//             onClick={() => {
//               setEid(null);
//               formik.resetForm();
//               handleClickOpen();
//             }}
//           >
//             Add Q & A
//           </Button>
//         </Box>

//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 {TableHeader.map((header) => (
//                   <TableCell key={header}>{header}</TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {subcategory.map((row, index) => (
//                 <TableRow key={row._id}>
//                   <TableCell>{index + 1}</TableCell>
//                   <TableCell>{row.questions}</TableCell>
//                   <TableCell>{row.answer}</TableCell>
//                   <TableCell>{row.subCatagoryname}</TableCell>
//                   <TableCell>{row.catagoryID?.catagoryName || ""}</TableCell>
//                   <TableCell>
//                     <Button
//                       variant="contained"
//                       color="error"
//                       onClick={() => deleteData(row._id)}
//                     >
//                       <DeleteIcon />
//                     </Button>
//                   </TableCell>
//                   <TableCell>
//                     <Button
//                       variant="contained"
//                       color="success"
//                       onClick={() => updateData(row._id)}
//                     >
//                       <EditIcon />
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Box>

//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>{eid ? "Update Q & A" : "Add Q & A"}</DialogTitle>
//         <form onSubmit={formik.handleSubmit}>
//           <DialogContent>
//             <TextField
//               fullWidth
//               label="Question"
//               name="questions"
//               value={formik.values.questions}
//               onChange={formik.handleChange}
//               error={formik.touched.questions && Boolean(formik.errors.questions)}
//               helperText={formik.touched.questions && formik.errors.questions}
//               margin="normal"
//             />
//             <TextField
//               fullWidth
//               label="Answer"
//               name="answer"
//               value={formik.values.answer}
//               onChange={formik.handleChange}
//               error={formik.touched.answer && Boolean(formik.errors.answer)}
//               helperText={formik.touched.answer && formik.errors.answer}
//               margin="normal"
//             />
//             <TextField
//               fullWidth
//               label="Subcategory Name"
//               name="subCatagoryname"
//               value={formik.values.subCatagoryname}
//               onChange={formik.handleChange}
//               margin="normal"
//             />
//             <FormControl fullWidth margin="normal">
//               <InputLabel>Category</InputLabel>
//               <Select
//                 name="catagoryID"
//                 value={formik.values.catagoryID}
//                 onChange={formik.handleChange}
//               >
//                 {categories.map((cat) => (
//                   <MenuItem key={cat._id} value={cat._id}>
//                     {cat.catagoryName}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </DialogContent>
//           <DialogActions>
//             <Button variant="contained" onClick={handleClose}>
//               Cancel
//             </Button>
//             <Button variant="contained" color="primary" type="submit">
//               {eid ? "Update" : "Add"}
//             </Button>
//           </DialogActions>
//         </form>
//       </Dialog>

//       <ToastContainer />
//     </Drawer>
//   );
// };

// export default QA;


import React, { useEffect, useState } from "react";
import Drawer from "../../Components/Drawer";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
} from "@mui/material";
import TableComponent from "../../Components/TableComponent";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const QA = () => {
  const token = localStorage.getItem("Token");
  const [qaData, setQAData] = useState([]); // To hold question-answer pairs
  const [categories, setCategories] = useState([]);
  const [subcategory, setSubCategory] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [dynamicFields, setDynamicFields] = useState([
    { questions: "", answer: "", subCatagoryID: "" },
  ]);

  const TableHeader = [
        "Index",
        "Questions",
        "Answer",
        "SubCategory Name",
        "Category Name",
        "Delete",
        "Update",
      ];

  const handleClickOpen = () => {
    setDynamicFields([{ questions: "", answer: "", subCatagoryID: "" }]);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const fetchQAData = async () => {
    try {
      const res = await axios.get("https://interviewhub-3ro7.onrender.com/questions/", {
        headers: { Authorization: token },
      });
      setQAData(res.data.data);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching question-answer data.");
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get("https://interviewhub-3ro7.onrender.com/catagory/", {
        headers: { Authorization: token },
      });
      setCategories(res.data.data);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching categories.");
    }
  };

  const fetchSubcategories = async () => {
    try {
      const res = await axios.get("https://interviewhub-3ro7.onrender.com/subcatagory/", {
        headers: { Authorization: token },
      });
      setSubCategory(res.data.data);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching subcategories.");
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
  };

  const handleDynamicChange = (index, field, value) => {
    const updatedFields = [...dynamicFields];
    updatedFields[index][field] = value;
    setDynamicFields(updatedFields);
  };

  const addDynamicField = () => {
    setDynamicFields([...dynamicFields, { questions: "", answer: "", subCatagoryID: "" }]);
  };

  const handleSubmit = async () => {
    try {
      await axios.post(
        "https://interviewhub-3ro7.onrender.com/questions/create",
        dynamicFields,
        {
          headers: { Authorization: token },
        }
      );
      toast.success("Q&A added successfully!");
      fetchQAData();
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Error adding Q&A.");
    }
  };
    const deleteData = async (id) => {
      try {
        const res = await axios.delete(
          `https://interviewhub-3ro7.onrender.com/questions/${id}`,
          { headers: { Authorization: token } }
        );
        toast.success(res.data.message);
        dataFetch();
      } catch (error) {
        console.error(error);
      }
    };

  useEffect(() => {
    fetchQAData();
    fetchCategories();
    fetchSubcategories();
  }, []);

  return (
    <Drawer>
      <Box sx={{ padding: 2 }}>
        {/* Search Field */}
        <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
          <TextField
            label="Search Q&A"
            variant="outlined"
            value={search}
            onChange={handleSearch}
            sx={{ width: "70%" }}
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleClickOpen}
            sx={{ backgroundColor: "#79797a" }}
          >
            Add Q&A
          </Button>
        </Box>

        {/* Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Index</TableCell>
                <TableCell>Questions</TableCell>
                <TableCell>Answers</TableCell>
                <TableCell>Subcategory Name</TableCell>
                <TableCell>Category Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {qaData
                .filter((item) =>
                  item.questions.toLowerCase().includes(search) ||
                  item.answer.toLowerCase().includes(search)
                )
                .map((row, index) => (
                  <TableRow key={row._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{row.questions}</TableCell>
                    <TableCell>{row.answer}</TableCell>
                    <TableCell>{row.subCatagoryname}</TableCell>
                   <TableCell>{row.catagoryID?.catagoryName || ""}</TableCell>
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
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Add Q&A Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Question-Answer</DialogTitle>
        <DialogContent>
          {dynamicFields.map((field, index) => (
            <Box key={index} sx={{ marginBottom: 2 }}>
              <TextField
                fullWidth
                label="Question"
                value={field.questions}
                onChange={(e) => handleDynamicChange(index, "questions", e.target.value)}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Answer"
                value={field.answer}
                onChange={(e) => handleDynamicChange(index, "answer", e.target.value)}
                margin="normal"
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Subcategory</InputLabel>
                <Select
                  value={field.subCatagoryID}
                  onChange={(e) => handleDynamicChange(index, "subCatagoryID", e.target.value)}
                >
                  {subcategory.map((sub) => (
                    <MenuItem key={sub._id} value={sub._id}>
                      {sub.subCatagoryname}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
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
