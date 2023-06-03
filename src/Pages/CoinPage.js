import { LinearProgress,  Typography, makeStyles } from "@material-ui/core";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CoinInfo from "../CoinInformation/CoinInfo";
import { SingleCoin } from "../config/api";
import { numberWithCommas } from "../components/CoinsTable";
import { CryptoState } from "../CryptoContext";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
    sidebar: {
      width: "32%",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      // borderRight: "1px solid grey",
    },
    heading: {
      fontWeight: "bold",
      marginBottom: 30,
      fontFamily: "Times New Roman",
      color:"white",
      // fontSize:"250%",
    },
    description: {
      width: "100%",
      fontFamily: "Montserrat",
      padding: 25,
      paddingBottom: 15,
      paddingTop: 0,
      textAlign: "justify",
    },
    ath:{
      fontFamily: "Copperplate Gothic Bold",
      fontSize:"110%",
      color:"#12d900",
      fontWeight:"bolder"
    },
    atl:{
      fontFamily: "Copperplate Gothic Bold",
      fontSize:"110%",
      color:"red",
      fontWeight:"bolder"

    },
    sidebarvalue:{
      fontFamily: "Copperplate Gothic Bold",
      fontSize:"110%",
      color:"orange",
      fontWeight:"bold"
    },

    marketData: {
      alignSelf: "start",
      padding: 25,
      paddingTop: 10,
      width: "100%",
      [theme.breakpoints.down("md")]: {
        display: "flex",
        justifyContent: "space-around",
      },
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "center",
      },
      [theme.breakpoints.down("xs")]: {
        alignItems: "start",
      },
    },
  }));

  const classes = useStyles();

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        
        <Typography variant="h3" className={classes.heading} style={{fontFamily:"Algerian",fontSize:"230%"}} >
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="60"
          style={{ marginBottom: -12,marginRight:20}}
        />
        <i><u>
          {coin?.name}
          </u></i>
        </Typography>

        <ul style={{ fontSize:"120%"}}>
        <div className={classes.marketData}>
        


          <span style={{ display: "flex" }}>
            <Typography variant="h7" className={classes.heading}>
              <li>Rank:</li>
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h7" className={classes.sidebarvalue}>
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </span>


          <span style={{ display: "flex" }}>
            <Typography variant="h7" className={classes.heading}>
              <li>Current Price:</li>
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h7" className={classes.sidebarvalue}>
              {symbol}{" "}
              {numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}
            </Typography>
          </span>


          <span style={{ display: "flex" }}>
            <Typography variant="h7" className={classes.heading} >
              <li>High (24h):</li>
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h7" className={classes.sidebarvalue}>
              {symbol}{" "}
              {numberWithCommas(coin?.market_data.high_24h[currency.toLowerCase()].toString())}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h7" className={classes.heading}>
              <li>Low (24h):</li>
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h7" className={classes.sidebarvalue}>
              {symbol}{" "}
              {numberWithCommas( coin?.market_data.low_24h[currency.toLowerCase()].toString())}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h7" className={classes.heading}>
              <li>Market Cap:</li>
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h7" className={classes.sidebarvalue}>
              {symbol}{" "}
              {numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0, -6))}
              M
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h7" className={classes.heading}>
              <li>24h Cap Change:</li>
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h7" className={classes.sidebarvalue}>
              {symbol}{" "}
              {numberWithCommas(Math.trunc(coin?.market_data.market_cap_change_24h_in_currency[currency.toLowerCase()]).toString().slice(0,-6))}
              M
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h7" className={classes.heading}>
              <li>  24h Cap Change %:</li>
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h7" className={classes.sidebarvalue}>
              {coin?.market_data.market_cap_change_percentage_24h_in_currency[currency.toLowerCase()].toString().slice(0,-1)}
              %
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h7" className={classes.heading}>
              <li>Total Volume:</li>
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h7" className={classes.sidebarvalue}>
              {numberWithCommas(coin?.market_data.total_volume[currency.toLowerCase()].toString().slice(0, -6))}
              M
            </Typography>
          </span> 

          <span style={{ display: "flex" }}>
            <Typography variant="h7" className={classes.heading}>
              <li>Total Supply:</li>
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h7" className={classes.sidebarvalue}>
              {numberWithCommas(Math.trunc(coin?.market_data.total_supply).toString().slice(0, -6))}
              M BTC
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h7" className={classes.heading}>
              <li>Circulating Supply:</li>
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h7" className={classes.sidebarvalue}>
              {numberWithCommas(Math.trunc(coin?.market_data.circulating_supply).toString().slice(0, -6))}
              M BTC
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h7" className={classes.heading}>
              <li>Max Supply:</li>
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h7" className={classes.sidebarvalue}>
              {numberWithCommas(Math.trunc(coin?.market_data.max_supply).toString().slice(0, -6))}
              M BTC
            </Typography>
          </span>

          <Typography style={{fontSize:"60%",color:"white",fontWeight:"bold",marginTop:"3%",marginBottom:"10%"}} align="right" >
            *last updated on :
            {coin?.market_data.last_updated.toString().slice(0,-8)}
          </Typography>
          
          <Typography style={{marginBottom:"10%",fontSize:"150%"}}align="center">------***------</Typography>
          
          <span style={{ display: "flex" }}>
            <Typography variant="h7" className={classes.heading}>
              <li>ATH:</li>
            </Typography>
            &nbsp; &nbsp;
            <Typography className={classes.ath} variant="h7">
              {symbol} {" "}
              {numberWithCommas(coin?.market_data.ath[currency.toLowerCase()].toString())}
              
            </Typography>
          </span>  

          <span style={{ display: "flex" }}>
            <Typography variant="h7" className={classes.heading} >
              <li>ATH change %:</li>
            </Typography>
            &nbsp; &nbsp;
            <Typography className={classes.ath} variant="h7">
              {numberWithCommas(coin?.market_data.ath_change_percentage[currency.toLowerCase()].toString().slice(0,-3))}
              %
            </Typography>
          </span> 

          <span style={{ display: "flex" }}>
            <Typography variant="h7" className={classes.heading}>
              <li>ATH Date:</li>
            </Typography>
            &nbsp; &nbsp;
            <Typography className={classes.ath} variant="h7">
              {coin?.market_data.ath_date[currency.toLowerCase()].toString().slice(0,-8)}
            </Typography>
          </span> 

          <span style={{ display: "flex" }}>
            <Typography variant="h7" className={classes.heading}>
              <li>ATL:</li>
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h7" className={classes.atl}>
              {symbol} {" "}
              {numberWithCommas(coin?.market_data.atl[currency.toLowerCase()].toString())}
              
            </Typography>
          </span> 

          <span style={{ display: "flex" }}>
            <Typography variant="h7" className={classes.heading}>
              <li>ATL change %:</li>
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h7" className={classes.atl}>
              {numberWithCommas(coin?.market_data.atl_change_percentage[currency.toLowerCase()].toString().slice(0,-3))}
              %
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h7" className={classes.heading}>
              <li>ATL Date:</li>
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h7" className={classes.atl}>
              {coin?.market_data.atl_date[currency.toLowerCase()].toString().slice(0,-8)}
            </Typography>
          </span>

        </div>
        </ul>
      </div>
      <CoinInfo coin={coin} />
    </div>
  );
};

export default CoinPage;