import axios from "axios";
import { useEffect, useState } from "react";
import { HistoricalChart } from "../config/api";
import { Line} from "react-chartjs-2";
import {
  createTheme,
  ThemeProvider,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import SelectButton from "../components/SelectButton";
import { chartDays } from "../config/data";
import { CryptoState } from "../CryptoContext";
import { Chart } from "chart.js/auto";
import parse from "html-react-parser";
import ReactLoading from "react-loading";

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();
  const [flag,setflag] = useState(false);

  const useStyles = makeStyles((theme) => ({
    container: {
      width: "75%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "top",
      marginTop: 25,
      padding: 40,
      gap:50,
     
      [theme.breakpoints.down("md")]: {
        width: "100%",
        padding: 20,

      },
    },
  }));

  const classes = useStyles();

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setflag(true);
    setHistoricData(data.prices);
  };

  console.log(coin);

  useEffect(() => {
    fetchHistoricData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#ffffff",
      },
      type: "light",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {!historicData | flag===false ? (
          <ReactLoading type="spokes" color="yellow" height={500} width={250} />
        ) : (
          <>
          <div
              style={{
                display: "flex",
                marginTop: 30,
                marginBottom:50,
                justifyContent: "space-around",
                width: "60%",
              }}

            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => {setDays(day.value);
                    setflag(false);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
            <Line
              data={{
                labels: historicData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Price Past ${days} Day(s) in ${currency} `,
                    backgroundColor:"lightblue",
                    borderColor: "blue",
                    fill:true,
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 2.5,
                  },
                },
              }}
            />
            
          </>
        )}
        
        
        
        
        
        
        <u style={{fontFamily:"Times New Roman",fontSize:"180%", color:"#f9f700ff"}} >Good to Know:</u>
       <div ><Typography variant="subtitle1" className={classes.description} style={{color:"white",fontFamily:"Times New Roman",fontSize:"130%"}}>
         <ul>
           <li><p>{parse(coin?.description.en.split(". ")[0])}.
           {parse(coin?.description.en.split(". ")[1])}.</p></li>

           <li><p>{parse(coin?.description.en.split(". ")[2])}.
           {parse(coin?.description.en.split(". ")[3])}.</p></li>

           <li><p>{parse(coin?.description.en.split(". ")[4])}.
           {parse(coin?.description.en.split(". ")[5])}.</p></li>

           <li><p>{parse(coin?.description.en.split(". ")[6])}.
           {/* {parse(coin?.description.en.split(". ")[7])}.
           {parse(coin?.description.en.split(". ")[8])} */}
           </p></li>
          </ul>
          
          
        </Typography>
        
        </div>
        <Typography style={{marginLeft:"80%",color:"grey"}} >Powered by <a href="https://www.coingecko.com/en/api">CoinGecko</a></Typography>
      </div>
      
    </ThemeProvider>
  );
};

export default CoinInfo;