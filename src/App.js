import './App.css';
import { BrowserRouter,Route} from 'react-router-dom';
import Header from './components/Header';
import Homepage from './Pages/Homepage';
import Coinpage from './Pages/CoinPage';
import { makeStyles } from '@material-ui/core';




const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#161616",
    color: "white",
    minHeight: "100vh",
  },
}));

function App() {
  const classes = useStyles();

  

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Route path="/" component={Homepage} exact />
        <Route path="/coins/:id" component={Coinpage} exact />
      </div>
    </BrowserRouter>
  );
}

export default App;
