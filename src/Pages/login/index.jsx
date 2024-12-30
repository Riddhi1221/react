import React, { useState,useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
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
  let [loader, setLoader] = useState(false);

  let [submitting , setSubmitting] = useState ();
  let navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  
  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleMouseDownPassword = (event) => event.preventDefault();

   const loginSchema = Yup.object().shape({
      password: Yup.string()
        .min(8, 'Too Short!')
        .max(10, 'Too Long!')
        .required('Required'),
      email: Yup.string()
        .email('Invalid email')
        .required('Required'),
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
        console.log("Login successful:", response.data);
        navigate("/admin");
      } catch (error) {
        console.error("Login failed:",  error.message);
     
      } finally {
        setLoader(false)
        // setSubmitting(false);
      }
    },
  });
  useEffect(() => {
    if (Token) {
      navigate("/dashboard");
    }
  }, [Token]);

  if(loader){
    return <h1>lodding.................</h1>
  }

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #ff9a9e, #fecfef)",
      }}
    >
      <Box
        sx={{
          width: 400,
          p: 5,
          borderRadius: 3,
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#333" }}
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
            {formik.Submitting ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default Login;
