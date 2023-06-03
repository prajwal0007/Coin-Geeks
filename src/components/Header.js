import React from 'react';
import { makeStyles } from '@material-ui/core';
import { AppBar, Container, MenuItem, Select, ThemeProvider, Toolbar,  Typography,  createTheme} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';



const useStyles=makeStyles(()=>({
    title:{
        flex: 1,
        color: "orange",
        fontFamily: "Times New Roman",
        fontWeight: "bold",
        cursor: "hand",
    },
    cur_box:{
      color:"black",
      backgroundColor:"white",
      fontWeight: "bold",
      "&:hover": {
        backgroundColor: "white",
      },
      
  }
    
}))

const Header = () => {

const classes = useStyles();

const history = useHistory();
const {currency, setCurrency} = CryptoState();
console.log(currency);

const Theme = createTheme({
    palette: {
      primary: {
        main: "#333333",
      },
      type: "dark",
    },
  });

return (
  <ThemeProvider theme={Theme} >
   <AppBar position='static'>
    <Container>
      <Toolbar>
       <img
         src="header logo.png"
         alt="logo"
         height="50"
        //  style={{marginLeft:50,marginRight:10 }}
         onClick={() => history.push(`/`)}
       />

<Typography
              onClick={() => history.push(`/`)}
              variant="h6"
              className={classes.title}
            >
              Coin Geeks
            </Typography>

       

        <Select variant='outlined' 
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          style={{width:100,height:40,marginRight: 15,color:"black",backgroundColor:"rgb(80, 250, 60)",fontWeight:"bold"}}
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <MenuItem className={classes.cur_box} value={'USD'}>USD</MenuItem>
          <MenuItem className={classes.cur_box} value={'INR'}>INR</MenuItem>
        </Select>

        

      </Toolbar>
    </Container>

  </AppBar>
  </ThemeProvider>
  )
}

export default Header            
              

              


              