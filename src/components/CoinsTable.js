import React, { useEffect, useState } from "react";

import { Pagination } from "@material-ui/lab";
import {Container,createTheme,TableCell,LinearProgress,ThemeProvider,Typography,TextField,
  TableBody,TableRow,TableHead,TableContainer,Table, Paper,makeStyles} from "@material-ui/core";
import axios from "axios";
import { CoinList } from "../config/api";
import { useHistory} from "react-router-dom";
import { CryptoState } from "../CryptoContext";


export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function CoinsTable() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { currency, symbol } = CryptoState();

  const useStyles = makeStyles({
    row: {
      backgroundColor: "#ececec",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "lightgrey",
      },
      fontFamily: "Montserrat",
    },
    pagination: {
      "& .MuiPaginationItem-root": {
        color: "orange",
        fontWeight:"bold",
        fontSize:"90%",
        fontFamily:"italic"
      },
    },
  });

  const classes = useStyles();
  const history = useHistory();

  const Theme = createTheme({
    palette: {
      primary: {
        main: "#ffffff",
      },
      type: "light",
    },
  });

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    console.log(data);

    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  return (
    <ThemeProvider theme={Theme}>
      <Container style={{ textAlign: "right" }}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontWeight:"bolder", color:"red"}}
        >
        </Typography>

        <TextField
          label="Search..."
          variant="outlined"
          type="search"
          size="small"
          inputProps={{
            maxLength:10,
          }}
          
          style={{ marginBottom: 30,width: "20%",backgroundColor:"grey"}}
          onChange={(e) => setSearch(e.target.value)}
        />

        <TableContainer component={Paper}>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table aria-label="semantic elements">
              <TableHead style={{ backgroundColor: "#69A6D1" }}>
                <TableRow width="10" >
                  {["#   ","Coin", "Price", "24hChange", "7dChange", "Market Cap","CIRC Supply","Total Supply"].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Montserrat",
                      }}
                      key={head}
                      align={head === "Coin" ? "" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                    
                    return (
                      <TableRow
                        onClick={() => history.push(`/coins/${row.id}`)}
                        className={classes.row}
                        key={row.name}
                      >

                        <TableCell align="right" style={{fontSize:"120%",fontWeight:"bolder"}} >
                        {row.market_cap_rank}
                        </TableCell>
                        
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 10,
                          }}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="40"
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 25,
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "black" }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>
                        
                        <TableCell align="right"  style={{fontWeight:"bolder",fontSize:"110%"}}>
                          {symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>

                        <TableCell align="right" style={{color: profit > 0 ? "#12d900" : "red",fontSize:"110%" ,fontWeight:"bolder"}}>
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>

                        <TableCell align="right" style={{color: profit > 0 ? "#12d900" : "red",fontSize:"110%" ,fontWeight:"bolder"}} >
                          {profit && "+"}
                          {row.price_change_percentage_7d_in_currency?.toFixed(2)}%
                        </TableCell>

                        <TableCell align="right"  style={{fontWeight:"bolder",fontSize:"110%"}}>
                          {symbol}{" "}
                          {numberWithCommas(row.market_cap.toString().slice(0, -6))}
                          M
                        </TableCell>

                        <TableCell align="right"  style={{fontWeight:"bolder",fontSize:"110%"}}>
                          {numberWithCommas(Math.trunc(row.circulating_supply).toString().slice(0,-6))}
                          M BTC
                        </TableCell>

                        <TableCell align="right"  style={{fontWeight:"bolder",fontSize:"110%"}}>
                        {numberWithCommas(Math.trunc(row.total_supply).toString().slice(0,-6))}
                          M BTC
                        </TableCell>
            
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        
        {/* Comes from @material-ui/lab */}
        <Pagination
          count={(handleSearch()?.length / 10).toFixed(0)}
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          classes={{ ul: classes.pagination }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
        
        <Typography style={{marginBottom:"1%",color:"grey"}}>Powered by <a href="https://www.coingecko.com/en/api">CoinGecko</a></Typography>

      </Container>
    </ThemeProvider>
  );
}