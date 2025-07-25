import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCoinHistory } from "../services/api";
import {
  Container,
  Typography,
  CircularProgress,
  Paper,
  Box,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const CoinChart = () => {
  const { coinId } = useParams();
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, [coinId]);

  const fetchHistory = async () => {
    try {
      const { data } = await getCoinHistory(coinId);

      if (Array.isArray(data.data)) {
        const formatted = data.data.reverse().map((entry) => ({
          time: new Date(entry.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          price: entry.price,
        }));
        setHistory(formatted);
      } else {
        setHistory([]);
        console.error("Unexpected response format:", data);
      }
    } catch (err) {
      console.error("Failed to fetch coin history:", err);
      setHistory([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      {/* Back button */}
      <Box display="flex" alignItems="center" mb={2}>
        <IconButton onClick={() => navigate("/dashboard")} color="primary">
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" ml={1} fontWeight="bold">
          {coinId.toUpperCase()} Price History
        </Typography>
      </Box>

      {/* Chart or loading */}
      {loading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress color="primary" />
        </Box>
      ) : history.length === 0 ? (
        <Typography color="error">No historical data found.</Typography>
      ) : (
        <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={history}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" tick={{ fontSize: 12 }} />
              <YAxis domain={["auto", "auto"]} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#1976d2"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      )}
    </Container>
  );
};

export default CoinChart;
