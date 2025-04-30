import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, InputAdornment } from "@mui/material";
import { Person, Email, Lock, HowToReg } from "@mui/icons-material";

const Signup = () => {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const signupData = {
      fullName,
      email,
      password,
    };

    try {
      const response = await fetch("http://localhost:8096/api/v1/logins", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      if (response.ok) {
        alert("Signup successful!");
        navigate("/login"); // Correct path
        setFullName("");
        setEmail("");
        setPassword("");
      } else {
        alert("Signup failed!");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred during signup.");
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
      p={2}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        bgcolor="white"
        p={4}
        borderRadius={2}
        boxShadow={3}
        width="100%"
        maxWidth="400px"
      >
        <Box display="flex" alignItems="center" justifyContent="center" mb={3}>
          <HowToReg color="primary" sx={{ fontSize: 40, mr: 1 }} />
          <Typography variant="h4" fontWeight="bold">
            Sign Up
          </Typography>
        </Box>

        <TextField
          label="Full Name"
          type="text"
          fullWidth
          margin="normal"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
          }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Sign Up
        </Button>
      </Box>
    </Box>
  );
};

export default Signup;
