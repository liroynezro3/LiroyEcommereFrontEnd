import React, { useState } from "react";
import classes from "./FAQContext.module.css";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import RemoveIcon from "@mui/icons-material/Remove";
import { width } from "@mui/system";
const FAQContext = (props) => {
  const [openAnswer, setOpenAnswer] = useState(false);
  const OpenAndClosing = () => {
    setOpenAnswer(!openAnswer);
  };
  return (
      <div className={classes.accordion}>
      <div className={classes.question} onClick={OpenAndClosing}>
        <span>{props.question}</span>
        {openAnswer ? (
          <RemoveIcon className={classes.icon} style={{fontSize: "30px", marginTop: "10px"}}/>
           ) : (
          <AddCircleOutline
              style={{
              fontSize: "30px",
              marginTop: "10px",
            }}
          />
        )}
      </div>
        <div className={openAnswer ? classes.answerOpen : classes.answerClose}>
          {props.answer}
        </div>
        </div>
  );
};

export default FAQContext;
