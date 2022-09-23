import React, { useContext, useRef } from "react";
import classes from "./DeleteProduct.module.css";
import {serverurl} from "../../../hooks/domainURL";
import AuthContext from "../../../context/AuthContext";

const DeleteProduct = () => {
  const AuthCtx=useContext(AuthContext);
  const DeleteItemID = useRef();
  console.log(serverurl)
  const DeleteItem = async(event) => {
    event.preventDefault();
    const item = DeleteItemID.current.value;
    try {
      const response = await fetch(`${serverurl}/products/${item}`, { //http://127.0.0.1:3000/users/login
        method: 'DELETE',
        headers: {
        "Content-type": "application/json",
        "x-api-key":AuthCtx.token
      },
      });
      const responseData = await response.json();//the data of server back
      console.log("data from server", responseData)
  
      if (!response.ok) {
        let errorMessage ="Delete Item Failed!";
        if(responseData&&responseData.message){
          errorMessage = responseData.message;
        }
        throw new Error(errorMessage);
      }
      alert("Delete item successfully")
    } catch (err) {
      alert(err);
    }
  };
  return (
    <form className={classes.form} onSubmit={DeleteItem}>
      <h2>Delete Item</h2>
      <div className={classes.control}>
        <label>Please Item ID to delete the product:</label>
        <input placeholder={"item id 100-99999"} type={"number"} ref={DeleteItemID} min={100} max={99999}></input>
      </div>
      <button className={classes.submit}>Confirm</button>
    </form>
  );
};
export default DeleteProduct;
