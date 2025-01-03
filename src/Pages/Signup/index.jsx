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
import EmailIcon from "@mui/icons-material/Email";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import Image from '../../images/bg.jpg';

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const SignupSchema = Yup.object().shape({
    password: Yup.string()
      .min(5, "Too Short!")
      .max(10, "Too Long!")
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
          "https://interviewhub-3ro7.onrender.com/admin/signup",
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
        background: `linear-gradient(135deg, rgba(255, 126, 95, 0.7), rgba(254, 180, 123, 0.7)), url(${Image})`, // Added background image
        backgroundSize: 'cover', // Ensure it covers the whole screen
        backgroundPosition: 'center', // Center the background
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
          backgroundColor: "rgba(255, 255, 255, 0.54)",
          backdropFilter: "blur(10px)",
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
          <FormControl variant="standard" fullWidth sx={{ mb: 3 }}>
          <Box sx={{ display: "flex", alignItems: "flex-end", mb: 3 }} >
            <EmailIcon sx={{ color: "#333", mr: 1 }} />
            <TextField
              id="email"
              name="email"
              label="Email"
              variant="standard"
              type="email"
              fullWidth
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Box>
          </FormControl>

          {/* Password Field */}
          <FormControl variant="standard" fullWidth sx={{ mb: 3 }}>
            <TextField
              id="password"
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
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
          </FormControl>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            disabled={formik.isSubmitting}
            sx={{
              width: "100%",
              py: 1.5,
              fontWeight: "bold",
              textTransform: "uppercase",
              background: "linear-gradient(135deg, rgba(226, 212, 53, 0.63), rgba(225, 142, 79, 0.57))",
              color: "#fff",
              boxShadow: "linear-gradient(135deg, rgba(255, 126, 95, 0.7), rgba(254, 180, 123, 0.7))",
              "&:hover": {
                background: "linear-gradient(135deg, rgba(255, 126, 95, 0.7), rgba(254, 180, 123, 0.7))",
                boxShadow: "linear-gradient(135deg, rgba(255, 126, 95, 0.7), rgba(254, 180, 123, 0.7))",
              },
            }}
          >
            {formik.isSubmitting ? "Signing up..." : "Sign Up"}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Signup;

