import React, { useState, useEffect } from "react";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
    const BackToOrderList = () => {
        props.onCancel();
      };
  const [nameValid, setNameValid] = useState();
  const [streetValid, setStreetValid] = useState();
  const [postalValid, setPostalValid] = useState();
  const [cityValid, setCityValid] = useState();
  const [phoneValid, setPhoneValid] = useState();
  
  const [entredName,setEntredName]= useState("");
  const [entredStreet,setEntredStreet]= useState("");
  const [entredPostalCode,setEntredPostal]= useState("");
  const [entredCity,setEntredCity]= useState("");
  const [entredPhone,setEntredPhone]= useState("");

  const nameValueHandler = (event) => {
    setEntredName(event.target.value);
   };
  const streetValueHandler = (event) => {
    setEntredStreet(event.target.value);
   };
  const cityValueHandler = (event) => {
    setEntredCity(event.target.value);
   };
  const postalValueHandler = (event) => {
    setEntredPostal(event.target.value);
   };
  const phoneValueHandler = (event) => {
    setEntredPhone(event.target.value);
   }
  const confirmHandler = (event) => {
    event.preventDefault();
    if (entredName.trim().length > 2 && entredStreet.trim().length < 99 && !entredName.includes('<') && !entredName.includes('>')) {
      setNameValid(true);
    } else {
      setNameValid(false);
    }
    if (entredStreet.trim().length > 2 && entredStreet.trim().length < 99) {
      setStreetValid(true);
    } else {
      setStreetValid(false);
    }
    if (entredCity.trim().length > 2 && entredCity.trim().length < 99) {
      setCityValid(true);
    } else {
      setCityValid(false);
    }
    if (entredPostalCode.trim().length >= 3&&entredPostalCode.length<=10) {
      setPostalValid(true);
    } else {
      setPostalValid(false);
    }
    if (entredPhone.trim().length > 3 && entredPhone.trim().length < 15) {
      setPhoneValid(true);
    } else {
      setPhoneValid(false);
    }
  };
  const FormIsValid = nameValid&&streetValid&&cityValid&&postalValid&&phoneValid;
  useEffect(()=>{  
    if(FormIsValid){
    props.onConfirm({
             Name:entredName,
             City:entredCity,
             PhoneNumber:entredPhone,
             PostalCode:entredPostalCode,
             Street:entredStreet});
    }},[FormIsValid])
  
  return (
    <form onSubmit={confirmHandler} className={classes.form}>
      <div className={`${classes.control} ${nameValid===false?classes.invalid:''}`}>
        <label htmlFor="name">Your Name:</label>
        <input type={"text"} id={"name"} onChange={nameValueHandler}></input>
        {nameValid===false?<p>Please enter a valid name!</p>:''}
      </div>
      <div className={`${classes.control} ${cityValid===false?classes.invalid:''}`}>
        <label htmlFor="City">City:</label>
        <input type={"text"} id={"City"} onChange={cityValueHandler}></input>
        {cityValid===false?<p>Please enter a valid city!</p>:''}
      </div>
      <div className={`${classes.control} ${streetValid===false?classes.invalid:''}`}>
        <label htmlFor="Street">Street:</label>
        <input  type={"text"} id={"Street"} onChange={streetValueHandler}></input>
        {streetValid===false?<p>Please enter a valid street!</p>:''}
      </div>
      <div className={`${classes.control} ${postalValid===false?classes.invalid:''}`}>
        <label htmlFor="Postal">Postal Code:</label>
        <input type={"text"} id={"Postal"} onChange={postalValueHandler}></input>
        {postalValid===false?<p>Please enter a valid postal code 3-10 chars!</p>:''}
      </div>
      <div className={`${classes.control} ${phoneValid===false?classes.invalid:''}`}>
        <label htmlFor="Phone">Phone Number:</label>
        <input type={"text"} id={"Phone"} onChange={phoneValueHandler}></input>
        {phoneValid===false?<p>Please enter a valid phone number!</p>:''}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={BackToOrderList}>
          cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};
export default Checkout;
