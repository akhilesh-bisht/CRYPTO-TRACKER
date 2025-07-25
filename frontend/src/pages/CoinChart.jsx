import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCoinHistory } from "../services/api";
import {
  Container,
  Typography,
  CircularProgress,
  Paper,
  Box,
} from "@mui/material";
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
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch coin history when component mounts or coinId changes
  useEffect(() => {
    fetchHistory();
  }, [coinId]);

  const fetchHistory = async () => {
    try {
      const { data } = await getCoinHistory(coinId);

      // Ensure the data is an array before reversing
      if (Array.isArray(data.data)) {
        const formatted = data.data.reverse().map((entry) => ({
          time: new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
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
      <Typography variant="h4" gutterBottom color="primary">
        {coinId.toUpperCase()} Price History
      </Typography>

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
