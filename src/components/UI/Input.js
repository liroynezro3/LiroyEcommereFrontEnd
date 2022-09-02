import classes from "./Input.module.css"
import React from "react";
const Input = React.forwardRef((props, ref)=>{
    return(
        <div className={classes.input}>
            <label htmlFor={props.input.id} className={props.className}>{props.label}</label>
            <input ref={ref} {...props.input}></input>
        </div>
    )
});
export default Input;