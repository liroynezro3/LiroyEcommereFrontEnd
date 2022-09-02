import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import classes from "./SlideImage.module.css";
const SlideImage = () => {
  const images = [
    "https://img.freepik.com/free-psd/laptop-screen-with-website-presentation-mockup-isolated_359791-168.jpg?w=1800&t=st=1662062888~exp=1662063488~hmac=84f512da787e3c8c12e4afda8814535059b4232e315ec2394564eb10e33f7b4d",
    "https://images.pexels.com/photos/207589/pexels-photo-207589.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1600"
  ];

  return (
    <div className={classes.overSlider}>
    <Slide >
      <div className={classes.eachSlideDiv}>
        <img src={`${images[0]}`} alt={`${images[0]}`}></img>
      </div>
      <div className={classes.eachSlideDiv}>
        <img src={`${images[1]}`} alt={`${images[1]}`}></img>
      </div>
      <div className={classes.eachSlideDiv}>
        <img src={`${images[2]}`} alt={`${images[2]}`}></img>
      </div>
    </Slide>
    </div>
  );
};

export default SlideImage;
