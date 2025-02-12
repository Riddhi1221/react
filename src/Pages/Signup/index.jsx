import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  InputAdornment,
  FormControl,
  TextField,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router";
import * as Yup from "yup";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const SignupSchema = Yup.object().shape({
    password: Yup.string()
      // .min(5, "Too Short!")
      // .max(10, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SignupSchema,
    onSubmit: async (values, { setSubmitting }) => {
      console.log("Submitting form values:", values);
      try {
        const response = await axios.post(
          "https://interviewback-ucb4.onrender.com/admin/signup",
          values
        );
        console.log("Signup successful:", response.data);
        navigate("/login");
      } catch (error) {
        console.error("Signup failed:", error.message);
        alert("Signup failed. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg,rgb(47, 104, 184),rgb(129, 147, 173))",
        // backgroundSize: 'cover', // Ensure it covers the whole screen
        // backgroundPosition: 'center', // Center the background
        overflow: "hidden",
        padding: 2,
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", sm: "400px" },
          p: { xs: 3, sm: 5 },
          borderRadius: 3,
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
          backgroundColor: "rgb(255, 255, 255)",
          // backdropFilter: "blur(10px)",
          mx: { xs: 2, sm: 0 },
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#333",
            textShadow: "1px 1px 2px rgba(251, 249, 249, 0.79)",
          }}
        >
          Create Account
        </Typography>
        <Typography
          variant="body2"
          align="center"
          sx={{ color: "#555", mb: 3 }}
        >
          Sign up to get started
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          {/* Email Field */}
          <FormControl variant="outlined" fullWidth sx={{ mb: 3 }}>
  {/* Firstname Field */}
  <TextField
    id="firstname"
    name="firstname"
    label="Firstname"
    variant="outlined"
    type="text"
    fullWidth
    value={formik.values.firstname}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    error={formik.touched.firstname && Boolean(formik.errors.firstname)}
    helperText={formik.touched.firstname && formik.errors.firstname}
    sx={{ mb: 3 }}
  />

  {/* Lastname Field */}
  <TextField
    id="lastname"
    name="lastname"
    label="Lastname"
    variant="outlined"
    type="text"
    fullWidth
    value={formik.values.lastname}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    error={formik.touched.lastname && Boolean(formik.errors.lastname)}
    helperText={formik.touched.lastname && formik.errors.lastname}
    sx={{ mb: 3 }}
  />

  {/* Contact Field */}
  <TextField
    id="contact"
    name="contact"
    label="Contact"
    variant="outlined"
    type="text"
    fullWidth
    value={formik.values.contact}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    error={formik.touched.contact && Boolean(formik.errors.contact)}
    helperText={formik.touched.contact && formik.errors.contact}
    sx={{ mb: 3 }}
  />

  {/* Email Field */}
  <Box sx={{ display: "flex", alignItems: "flex-end", mb: 3 }}>
    <TextField
      id="email"
      name="email"
      label="Email"
      variant="outlined"
      type="email"
      fullWidth
      value={formik.values.email}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={formik.touched.email && Boolean(formik.errors.email)}
      helperText={formik.touched.email && formik.errors.email}
    />
  </Box>
{/* </FormControl> */}

{/* Password Field */}
<Box variant="outlined" fullWidth sx={{ mb: 3 }}>
  <TextField
    id="password"
    name="password"
    label="Password"
    type={showPassword ? "text" : "password"}
    fullWidth
    value={formik.values.password}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    error={formik.touched.password && Boolean(formik.errors.password)}
    helperText={formik.touched.password && formik.errors.password}
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      ),
    }}
  />
  </Box>
</FormControl>


          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            disabled={formik.isSubmitting }
            sx={{
              width: "100%",
              py: 1.5,
              fontWeight: "bold",
              textTransform: "uppercase",
              background: "linear-gradient(135deg, rgb(144, 182, 213), #185a9d)",
              color: "#fff",
              boxShadow: "linear-gradient(135deg, #185a9d), rgb(144, 182, 213))",
              "&:hover": {
                background: "linear-gradient(135deg, #185a9d), rgb(144, 182, 213))",
                // boxShadow: "linear-gradient(135deg, rgba(255, 126, 95, 0.7), rgba(254, 180, 123, 0.7))",
              },
            }}
            // sx={{
            //   py: 1.5,
            //   fontWeight: "bold",
            //   background: "linear-gradient(90deg,rgb(144, 182, 213), #185a9d)",
            //   color: "#fff",
            //   "&:hover": {
            //     background: "linear-gradient(90deg, #185a9d,rgb(144, 182, 213))",
            //   },
            // }}
          >
            {formik.isSubmitting ? "Signing up..." : "Sign Up"}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Signup;

