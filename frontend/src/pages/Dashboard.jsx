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
} from "@mui/material";
import { getCoins } from "../services/api";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  // State declarations
  const [coins, setCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [orderBy, setOrderBy] = useState("market_cap");
  const [order, setOrder] = useState("desc");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Fetch coin data on component mount and refresh every 30 minutes
  useEffect(() => {
    fetchCoins();
    const interval = setInterval(fetchCoins, 1800000); // 30 mins interval
    return () => clearInterval(interval); // clear on unmount
  }, []);

  // Fetch coin list from API
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

  // Filter coins by name (search input)
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const filtered = coins.filter((coin) =>
      coin.name.toLowerCase().includes(value)
    );
    setFilteredCoins(filtered);
  };

  // Handle sorting of coin list
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

  // Utility: return color based on 24h price change
  const getColor = (change) => (change >= 0 ? "green" : "red");

  // Navigate to chart page for a specific coin
  const handleRowClick = (id) => {
    navigate(`/coin/${id}`);
  };

  return (
    <Container sx={{ mt: 4 }}>
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

      {/* Loading spinner */}
      {loading ? (
        <CircularProgress className="relative top-[50%] left-[50%]" />
      ) : (
        // Table container
        <TableContainer component={Paper} elevation={4}>
          <Table>
            {/* Table headers */}
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Coin</strong>
                </TableCell>
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

            {/* Table body with coin rows */}
            <TableBody>
              {filteredCoins.map((coin) => (
                <TableRow
                  key={coin.id}
                  hover
                  onClick={() => handleRowClick(coin.id)}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell>
                    {/* Coin avatar and name */}
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      <Avatar src={coin.image} alt={coin.name} />
                      <div>
                        <div style={{ fontWeight: 600 }}>{coin.name}</div>
                        <div style={{ fontSize: "0.8rem", color: "#777" }}>
                          ({coin.symbol.toUpperCase()})
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>${coin.current_price.toLocaleString()}</TableCell>
                  <TableCell>${coin.market_cap.toLocaleString()}</TableCell>
                  <TableCell
                    style={{
                      color: getColor(coin.price_change_percentage_24h),
                    }}
                  >
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </TableCell>
                  <TableCell>
                    {new Date(coin.last_updated).toLocaleString()}
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
