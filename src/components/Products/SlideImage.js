import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import classes from "./SlideImage.module.css";
import img1 from "../../assets/SlidePhotos/iphone14pic.jpg";
import img2 from "../../assets/SlidePhotos/applewatchpic.jpg";
import img3 from "../../assets/SlidePhotos/asuscomputerpic.jpg";
import img4 from "../../assets/SlidePhotos/macbookpic.jpg"
const SlideImage = () => {
  const images = [img1,img2,img3,img4];

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
      <div className={classes.eachSlideDiv}>
        <img src={`${images[3]}`} alt={`${images[3]}`}></img>
      </div>
    </Slide>
    </div>
  );
};

export default SlideImage;
