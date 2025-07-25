import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Box,
  CircularProgress,
  Paper,
  Divider,
  Link,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

export default function AuthForm({ type = "login" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isLogin = location.pathname === "/login";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const url = `https://crypto-tracker-2vyu.onrender.com/api/auth/${isLogin ? "login" : "register"}`;

    try {
      const { data } = await axios.post(url, { email, password });

      localStorage.setItem("token", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data.user));

      toast.success(`${isLogin ? "Login" : "Signup"} successful!`);
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          maxWidth: 400,
          width: "100%",
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" align="center" mb={2} fontWeight="bold">
          {isLogin ? "Login to Your Account" : "Create a New Account"}
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button
            variant="contained"
            type="submit"
            disabled={loading}
            fullWidth
            sx={{ py: 1.2 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : isLogin ? "Login" : "Sign Up"}
          </Button>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="body2" align="center">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <Link href="/signup" underline="hover" color="primary">
                Sign up
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link href="/login" underline="hover" color="primary">
                Login
              </Link>
            </>
          )}
        </Typography>
      </Paper>
    </Box>
  );
}
