import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableSortLabel,
  Avatar,
  CircularProgress,
  Button,
  Box,
} from "@mui/material";
import { getCoins } from "../services/api";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [coins, setCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [orderBy, setOrderBy] = useState("market_cap");
  const [order, setOrder] = useState("desc");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    fetchCoins();
    const interval = setInterval(fetchCoins, 1800000); // 30 mins
    return () => clearInterval(interval);
  }, []);

  const fetchCoins = async () => {
    try {
      const { data } = await getCoins();
      setCoins(data.data);
      setFilteredCoins(data.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching coins:", err);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const filtered = coins.filter((coin) =>
      coin.name.toLowerCase().includes(value)
    );
    setFilteredCoins(filtered);
  };

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);

    const sorted = [...filteredCoins].sort((a, b) => {
      const valA = a[property];
      const valB = b[property];

      if (typeof valA === "string") {
        return isAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }

      return isAsc ? valA - valB : valB - valA;
    });

    setFilteredCoins(sorted);
  };

  const getColor = (change) => (change >= 0 ? "green" : "red");

  const handleRowClick = (id) => {
    navigate(`/coin/${id}`);
  };

  return (
    <Container sx={{ mt: 4 }}>
      {/* Logout Button */}
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="outlined" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      {/* Header */}
      <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
        Top 10 Cryptocurrencies
      </Typography>

      {/* Search bar */}
      <TextField
        label="🔎 Search coin"
        variant="outlined"
        fullWidth
        value={search}
        onChange={handleSearch}
        sx={{ mb: 3 }}
      />

      {loading ? (
        <CircularProgress className="relative top-[50%] left-[50%]" />
      ) : (
        <TableContainer component={Paper} elevation={4}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Coin</strong></TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "current_price"}
                    direction={order}
                    onClick={() => handleSort("current_price")}
                  >
                    Price (USD)
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "market_cap"}
                    direction={order}
                    onClick={() => handleSort("market_cap")}
                  >
                    Market Cap
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "price_change_percentage_24h"}
                    direction={order}
                    onClick={() => handleSort("price_change_percentage_24h")}
                  >
                    24h Change
                  </TableSortLabel>
                </TableCell>
                <TableCell>Last Updated</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredCoins.map((coin) => (
                <TableRow
                  key={coin._id}
                  hover
                  onClick={() => handleRowClick(coin.coinId)}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Avatar>{coin.symbol?.slice(0, 2).toUpperCase()}</Avatar>
                      <div>
                        <div style={{ fontWeight: 600 }}>{coin.name}</div>
                        <div style={{ fontSize: "0.8rem", color: "#777" }}>
                          ({coin.symbol?.toUpperCase()})
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    {coin.price != null ? `$${coin.price.toLocaleString()}` : "N/A"}
                  </TableCell>

                  <TableCell>
                    {coin.marketCap != null ? `$${coin.marketCap.toLocaleString()}` : "N/A"}
                  </TableCell>

                  <TableCell style={{ color: getColor(coin.change24h) }}>
                    {coin.change24h != null ? `${coin.change24h.toFixed(2)}%` : "N/A"}
                  </TableCell>

                  <TableCell>
                    {coin.timestamp ? new Date(coin.timestamp).toLocaleString() : "N/A"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default Dashboard;
