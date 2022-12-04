import React, { useState, useEffect, useContext } from "react";
import classes from "./Login.module.css";
import { useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
const Login = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  
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
      try {//https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDV5cDmQs9lYrZQSd9_nPUesJgKAUVoCaw
        const response = await fetch(process.env.REACT_APP_SERVER+`/users/login`, { //http://127.0.0.1:3000/users/login
          method: "POST",
          body: JSON.stringify({
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
        const expirationTime= new Date(new Date().getTime()+(+responseData.expiresIn*1000))//timestap in miliseconds לוקח תזמן עכשיו ומוסיף 3600*1000
        authCtx.login(responseData.token,expirationTime.toISOString(),responseData.userName,responseData.email)
        alert("Thanks for login")
        history.replace("/adminpanel");
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
        <div className={`${classes.control} ${emailIsValid === false ? classes.invalid : ""}`}>
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
          <p>Don’t have an account?</p>
          <button type="button" className={classes.toggle} onClick={()=>{history.push(`/registar`);}}>
            Create new accout
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
