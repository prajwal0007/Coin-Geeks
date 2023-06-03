import { Container, Typography,makeStyles } from "@material-ui/core";
import Carousel from "./Carousel";


const useStyles = makeStyles((theme) => ({
  banner: {
    backgroundImage: "url(./banner1.gif)",
  },
  bannerContent: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
  },
  tagline: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
}));

const Banner = () => {
  const classes = useStyles();

  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Rockwell",
              // fontStyle: "Oblique",
              color:"#fbab18" 
            }}
          >
            Coin Geeks
          </Typography>
          <p
            variant="subtitle2"
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontStyle: "Italic",
              fontFamily:"Brush Script",
              textAlign:"center",
              fontSize:"150%"
            }}
          >
           -- The Ultimate Guide --
          </p>
        </div>
        <Carousel />
      </Container>
    </div>
  );
}

export default Banner;