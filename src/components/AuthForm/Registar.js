import React, { useState, useEffect} from "react";
import classes from "./Registar.module.css";
import {useHistory } from "react-router-dom";
const Registar = () => {
    const history = useHistory();
  const [enteredName, setEnteredName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");//onChange
  const [enteredPassword, setEnteredPassword] = useState("");

console.log(enteredName)
  const [nameIsValid, setNameIsValid] = useState();//onblur
  const [passwordIsValid, setPasswordIsValid] = useState();//onblur
  const [emailIsValid, setEmailIsValid] = useState();

  const [formIsValid, setFormIsValid] = useState(false);//valid form by useeffect

  const [isloading, setIsLoading] = useState(false);
  useEffect(() => {
    const identifier = setTimeout(() => {
      //מפעיל את הטיימר בפעם הראשונה הדפדפן עובד וכל שינוי ב DEPENDECIS
      console.log("Checking form validity!");
      setFormIsValid(enteredEmail.includes("@") && enteredPassword.trim().length > 5 &&enteredName.trim().length>2);
    }, 100);
    return () => {
      clearTimeout(identifier); // מנקה כל תחילת פונקציה עד שעוצרים למשך 1000 וחוזר להמשיך את הפונקציה(בא לפני תחילת הפונקציה)
    };
  }, [enteredName,enteredEmail, enteredPassword]);
console.log(formIsValid)

  const submitHandler = async (event) => {
    //sumbit Registar and send request to server
    event.preventDefault();
    if (formIsValid) {
      setIsLoading(true);
      try {//https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDV5cDmQs9lYrZQSd9_nPUesJgKAUVoCaw
        const response = await fetch(process.env.REACT_APP_SERVER+`/users/registar`, {//http://127.0.0.1:3000/users/registar
          method: "POST",
          body: JSON.stringify({
            name:enteredName,
            email: enteredEmail,
            pass: enteredPassword,
          }),
          headers: { "Content-type": "application/json" },
        });
        const responseData = await response.json();//the data of server back
        console.log("data from server",responseData)

        if (!response.ok) {
          let errorMessage ="Authentication failed!";
          if(responseData&&responseData.message){
            errorMessage = responseData.message;
          }
          throw new Error(errorMessage);
        }
        alert("all work thx for registar please login")
        history.push("/login")
      } catch (err) {
        alert(err);
      }
      setIsLoading(false);
    }
  };

  const validateNameHandler = () => {
    setNameIsValid(enteredName.trim().length > 2); // onblur
  };
  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes("@")); // onblur
  };
  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 5);
  };

  return (
    <div className={classes.registar}>
      <h1>Registar</h1>
      <form onSubmit={submitHandler}>
        <div className={`${classes.control} ${nameIsValid === false ? classes.invalid : ""}`}>
          <label htmlFor="name">Name</label>
          <input type="text" value={enteredName} onChange={(event) => {setEnteredName(event.target.value);}}
            onBlur={validateNameHandler}
            placeholder={"Enter your email"}
          />
        </div>
        <div className={`${classes.control} ${ emailIsValid === false ? classes.invalid : ""}`}>
          <label htmlFor="email">E-Mail</label>
          <input type="email" value={enteredEmail} onChange={(event) => { setEnteredEmail(event.target.value);}}
            onBlur={validateEmailHandler}
            placeholder={"Enter your email"}
          />
        </div>

        <div className={`${classes.control} ${passwordIsValid === false ? classes.invalid : ""}`} >
          <label htmlFor="password">Password</label>
          <input type="password" value={enteredPassword} onChange={(event) => {setEnteredPassword(event.target.value); }}
            onBlur={validatePasswordHandler}
            placeholder={"Enter your password"}/>
        </div>

        <div className={classes.actions}>
          {!isloading ? (
            <button type="submit" className={classes.btn}>
              Registar
            </button>
          ) : (
            <p>"Sending Request"</p>
          )}
          <p>Already have an account?</p>
          <button type="button" className={classes.toggle} onClick={()=>{history.push(`/login`);}}>
             Log in
          </button>
        </div>
      </form>
    </div>
  );
};

export default Registar;
