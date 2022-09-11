import React, { useState, useEffect, useRef } from "react";
import classes from "./Login.module.css";

const Login = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();

  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();

  const [formIsValid, setFormIsValid] = useState(false);

  const [isloading, setIsLoading] = useState(false);
  useEffect(() => {
    const identifier = setTimeout(() => {
      //מפעיל את הטיימר בפעם הראשונה הדפדפן עובד וכל שינוי ב DEPENDECIS
      console.log("Checking form validity!");
      setFormIsValid(enteredEmail.includes("@") && enteredPassword.trim().length > 5);
    }, 100);
    return () => {
      clearTimeout(identifier); // מנקה כל תחילת פונקציה עד שעוצרים למשך 1000 וחוזר להמשיך את הפונקציה(בא לפני תחילת הפונקציה)
    };
  }, [enteredEmail, enteredPassword]);


  const submitHandler = async (event) => {
    //sumbit login and send request to server
    event.preventDefault();
    if (formIsValid) {
      setIsLoading(true);
      try {
        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDV5cDmQs9lYrZQSd9_nPUesJgKAUVoCaw`, {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: { "Content-type": "application/json" },
        });
        const responseData = await response.json();//the data of server back
        console.log("data from server",responseData)

        if (!response.ok) {
          let errorMessage ="Authentication failed!";
          if(responseData&&responseData.error&&responseData.error.message){
            errorMessage = responseData.error.message;
          }
          throw new Error(errorMessage);
        }

        alert("all good thx for log in")

      } catch (err) {
        alert(err);
      }
      setIsLoading(false);
    }
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes("@")); // onblur
  };
  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 5);
  };

  return (
    <div className={classes.login}>
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            value={enteredEmail}
            onChange={(event) => {
              setEnteredEmail(event.target.value);
            }}
            onBlur={validateEmailHandler}
            placeholder={"Enter your email"}
          />
        </div>

        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={enteredPassword}
            onChange={(event) => {
              setEnteredPassword(event.target.value);
            }}
            onBlur={validatePasswordHandler}
            placeholder={"Enter your password"}
          />
        </div>
        <div className={classes.actions}>
          {!isloading ? (
            <button type="submit" className={classes.btn}>
              Login
            </button>
          ) : (
            <p>"Sending Request"</p>
          )}
          <button type="button" className={classes.toggle}>
            Create new accout
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
