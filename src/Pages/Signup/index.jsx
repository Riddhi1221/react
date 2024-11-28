import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Signup = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((prev) => !prev);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your submit logic here
    console.log("Signup Form Submitted");
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #ff7e5f, #feb47b)", // Gradient background
        animation: "backgroundShift 8s ease infinite alternate",
        "@keyframes backgroundShift": {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: 400,
          p: 5,
          borderRadius: 3,
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)", // Subtle shadow
          backgroundColor: "rgba(255, 255, 255, 0.85)", // Semi-transparent card
          backdropFilter: "blur(10px)", // Glass effect
          animation: "fadeIn 1.5s",
          "@keyframes fadeIn": {
            "0%": { opacity: 0 },
            "100%": { opacity: 1 },
          },
        }}
      >
        {/* Title */}
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#333",
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
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

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Username Field */}
          <Box sx={{ display: "flex", alignItems: "flex-end", mb: 2 }}>
            <AccountCircle sx={{ color: "#ff7e5f", mr: 1 }} />
            <TextField
              id="username-input"
              label="Username"
              variant="standard"
              fullWidth
              required
            />
          </Box>

          {/* Email Field */}
          <Box sx={{ display: "flex", alignItems: "flex-end", mb: 2 }}>
            <EmailIcon sx={{ color: "#feb47b", mr: 1 }} />
            <TextField
              id="email-input"
              label="Email"
              variant="standard"
              fullWidth
              type="email"
              required
            />
          </Box>

          {/* Password Input */}
          <FormControl variant="standard" fullWidth sx={{ mb: 2 }}>
            <InputLabel htmlFor="password-input">Password</InputLabel>
            <Input
              id="password-input"
              type={showPassword ? "text" : "password"}
              required
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          {/* Confirm Password Input */}
          <FormControl variant="standard" fullWidth sx={{ mb: 3 }}>
            <InputLabel htmlFor="confirm-password-input">
              Confirm Password
            </InputLabel>
            <Input
              id="confirm-password-input"
              type={showConfirmPassword ? "text" : "password"}
              required
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: "100%",
              py: 1.5,
              fontWeight: "bold",
              textTransform: "uppercase",
              background: "linear-gradient(90deg, #43cea2, #185a9d)",
              color: "#fff",
              boxShadow: "0px 4px 16px rgba(67, 206, 162, 0.4)",
              "&:hover": {
                background: "linear-gradient(90deg, #185a9d, #43cea2)",
                boxShadow: "0px 6px 20px rgba(67, 206, 162, 0.6)",
              },
            }}
          >
            Sign Up
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Signup;
