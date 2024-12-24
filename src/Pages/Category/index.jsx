import React, { useEffect, useState } from "react";
import Drawer from "../../Components/Drawer";
import TextField from "../../Components/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Switch, TableCell } from "@mui/material";
import { useFormik } from "formik";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import Typography from '@mui/material/Typography';
import { ToastContainer, toast } from "react-toastify";
import TableComponent from "../../Components/TableComponent";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Category = () => {
  let token = localStorage.getItem("Token");
  let [category, setCategory] = useState([]);
  let [eid, setEid] = useState(null);
  let [search, setSearch] = useState("");
  let TableHeader = ["Index", "Category Name", "Status", "Delete", "Update"];
  const formik = useFormik({
    initialValues: {
      catagoryName: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        let res;
        if (eid && eid.length) {
          res = await axios.patch(
            `https://interviewhub-3ro7.onrender.com/catagory/${eid}`,
            values,
            {
              headers: {
                Authorization: token,
              },
            }
          );
        } else {
          res = await axios.post(
            "https://interviewhub-3ro7.onrender.com/catagory/create",
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
        console.log(error);
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

  let dataFetch = async () => {
    try {
      let res = await axios.get(
        "https://interviewhub-3ro7.onrender.com/catagory/",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setCategory(res.data.data);
      localStorage.setItem("category",JSON.stringify(res.data.data.length))
    } catch (error) {
      console.log(error);
    }
  };
  const searchCat = (values) => {
    console.log("search===>", values)
    axios.get("https://interviewhub-3ro7.onrender.com/catagory/?search=" + values, {
        headers: {
            Authorization: token,
        },
    })
        .then((res) => {
            console.log(res)
            setCategory(res.data.data);
        })
        .catch((err) => {
            console.error(err);
        });
};

const handleSearch = (e) => {
    console.log(e)
    const value = e.target.value;
    console.log("search==>", value)
    setSearch(value);
    searchCat(value);
};

  function updateData(id) {
    setEid(id);
    let dataFind = category.find((el) => el._id === id);
    formik.setValues(dataFind);
    handleClickOpen();
  }

  async function switchToggle(id) {
    let findData = category.find((el) => el._id === id);
    try {
      let res = await axios.patch(
        `https://interviewhub-3ro7.onrender.com/catagory/${id}`,
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
  }

  async function deleteData(id) {
    try {
      let res = await axios.delete(
        `https://interviewhub-3ro7.onrender.com/catagory/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      dataFetch();
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    dataFetch();
  }, []);

  return (
    <Drawer>
      <Box sx={{Padding:2}}>
     <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 2
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
            sx={{backgroundColor:"#79797a"}}
            onClick={() => {
              setEid(null);
              setOpen(true);
            
            }}
          >
            Add Category
          </Button>
        </Box>
        </Box>
      <Box sx={{ width: "100%" }}>
        <TableComponent
          TableHeader={TableHeader}
          TableData={category}
          renderRow={(row, index) => {
            return (
              <>
                <TableCell component="th" scope="row" align="left">
                  {index + 1}
                </TableCell>
                <TableCell align="left">{row.catagoryName}</TableCell>
                <TableCell align="left">
                  <Switch
                    checked={row.status === "on" ? true : false}
                    onClick={() => switchToggle(row._id)}
                  />
                </TableCell>
                <TableCell align="left">
                  <Button
                    variant="contained"
                    onClick={() => deleteData(row._id)}
                    sx={{backgroundColor:"red"}}
                  >
                    <DeleteIcon />
                  </Button>
                </TableCell>
                <TableCell align="left">
                  <Button
                    variant="contained"
                    onClick={() => updateData(row._id)}
                    sx={{backgroundColor:"green"}}
                  >
                    <EditIcon />
                  </Button>
                </TableCell>
              </>
            );
          }}
        />
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Add Category"}</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <TextField
              label="Category Name"
              name="catagoryName"
              onChange={formik.handleChange}
              value={formik.values.catagoryName}
            />
          </DialogContent>
          <DialogActions>
            <Button variant="contained" type="submit">
              Add Category
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <ToastContainer />
    </Drawer >
  );
};

export default Category;
