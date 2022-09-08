import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import classes from "./SlideImage.module.css";
const SlideImage = () => {
  const images = [
    "https://s4.aconvert.com/convert/p3r68-cdx67/a4wqe-pdymf.jpg",
    "https://s4.aconvert.com/convert/p3r68-cdx67/aix7r-j8yns.jpg",
    "https://s4.aconvert.com/convert/p3r68-cdx67/a9tud-sk4d2.jpg"
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
