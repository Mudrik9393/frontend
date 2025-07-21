import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import { Email, Lock, Login as LoginIcon } from "@mui/icons-material";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5555/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Login failed");
      }

      // ✅ Check allowed roles
      const allowedRoles = ["admin", "meterreader"];
      if (!allowedRoles.includes(data.roleName)) {
        throw new Error("You are not authorized to access the web portal");
      }

      // ✅ Save login data to localStorage
      localStorage.setItem("token", data.token || "dummy-token");
      localStorage.setItem("userEmail", data.email);
      localStorage.setItem("userName", data.userName);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("role", data.roleName); // important for sidebar

      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
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
          <LoginIcon color="primary" sx={{ fontSize: 40, mr: 1 }} />
          <Typography variant="h4" fontWeight="bold">
            Login
          </Typography>
        </Box>

        {error && (
          <Typography color="error" mb={2}>
            {error}
          </Typography>
        )}

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
          Login
        </Button>

        <Typography mt={2} textAlign="center">
          Don't have an account? <Link to="/signup">Register</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
