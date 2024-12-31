import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  InputAdornment,
  IconButton,
  FormControl,
  TextField,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import EmailIcon from "@mui/icons-material/Email";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";

const Login = () => {
  let Token = localStorage.getItem("Token");
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const loginSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, "Too Short!")
      .max(10, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setLoader(true);
      try {
        console.log(values);
        const response = await axios.post(
          "https://interviewhub-3ro7.onrender.com/admin/login",
          values
        );
        localStorage.setItem("Token", response.data.token);
        toast.success(response.data.message, {
          theme: "dark",
        });
        navigate("/admin");
      } catch (error) {
        console.error("Login failed:", error.message);
        toast.error("Login failed. Please try again.");
      } finally {
        setLoader(false);
      }
    },
  });

  useEffect(() => {
    if (Token) {
      navigate("/dashboard");
    }
  }, [Token, navigate]);

  if (loader) {
    return <h1>Loading...</h1>;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #ff9a9e, #fecfef)",
        padding: 2,
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", sm: "400px" },
          p: { xs: 3, sm: 5 },
          borderRadius: 3,
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
          backgroundColor: "rgba(255, 255, 255, 0.85)",
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
            mb: { xs: 2, sm: 3 },
          }}
        >
          Welcome Back
        </Typography>
        <Typography
          variant="body2"
          align="center"
          sx={{ color: "#555", mb: 3 }}
        >
          Log in to access your account
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          {/* Email Field */}
          <Box sx={{ display: "flex", alignItems: "flex-end", mb: 2 }}>
            <EmailIcon sx={{ color: "#6a11cb", mr: 1 }} />
            <TextField
              id="email"
              name="email"
              label="Email"
              variant="standard"
              fullWidth
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Box>

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
            fullWidth
            disabled={formik.isSubmitting}
            sx={{
              py: 1.5,
              fontWeight: "bold",
              background: "linear-gradient(90deg, #43cea2, #185a9d)",
              color: "#fff",
              "&:hover": {
                background: "linear-gradient(90deg, #185a9d, #43cea2)",
              },
            }}
          >
            {formik.isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default Login;
