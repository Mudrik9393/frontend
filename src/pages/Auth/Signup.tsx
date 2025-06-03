import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import {
  HowToReg,
  Person,
  Badge,
  Email,
  Lock,
} from "@mui/icons-material";

const Signup = () => {
  const [userName, setUserName] = useState<string>("");
  const [zanId, setZanId] = useState<string>(""); // zanId field
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [roleName, setRoleName] = useState<string>("customer"); // default roleName
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const navigate = useNavigate();

  const clearForm = () => {
    setUserName("");
    setZanId("");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:5555/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, zanId, email, password, roleName }),
      });

      const data = await response.text(); // read as text

      if (!response.ok) {
        throw new Error(data || "Registration failed");
      }

      setSuccess("Registration successful! Redirecting to login...");
      clearForm();

      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during registration");
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

        {error && (
          <Typography color="error" mb={2}>
            {error}
          </Typography>
        )}

        {success && (
          <Typography color="success.main" mb={2}>
            {success}
          </Typography>
        )}

        <TextField
          label="Full Name"
          type="text"
          fullWidth
          margin="normal"
          required
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="Zan ID"
          type="text"
          fullWidth
          margin="normal"
          required
          value={zanId}
          onChange={(e) => setZanId(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Badge />
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

        <Typography mt={2} textAlign="center">
          Already have an account? <Link to="/login">Login</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Signup;
