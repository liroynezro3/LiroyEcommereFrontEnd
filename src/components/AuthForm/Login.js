import React, { useState, useEffect, useRef} from 'react';
import classes from './Login.module.css';

const Login = () => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);


useEffect(()=>{
    const identifier = setTimeout(()=>{//מפעיל את הטיימר בפעם הראשונה הדפדפן עובד וכל שינוי ב DEPENDECIS
     console.log("Checking form validity!");
     setFormIsValid(enteredEmail.includes('@') && enteredPassword.trim().length > 5 );
   },100)
   return ()=>{
     clearTimeout(identifier);// מנקה כל תחילת פונקציה עד שעוצרים למשך 1000 וחוזר להמשיך את הפונקציה(בא לפני תחילת הפונקציה)
   }
 },[enteredEmail,enteredPassword]);

 const emailinputRef = useRef()
 const passwordinputRef = useRef()
 
  const submitHandler = (event) => {//sumbit login
    event.preventDefault();
    console.log("the email",enteredEmail)
    console.log("password",enteredPassword)
    if (formIsValid) {
     alert("All your your loggedIn")
    } 
  if(!emailIsValid)
  {
     emailinputRef.current.focus();
  }
  else{
    passwordinputRef.current.focus();
  }
  }

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));// onblur
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 5);
  };

  return (
   <div className={classes.login}>
    <h1>Login</h1>
  <form onSubmit={submitHandler}>
     <div className={`${classes.control} ${emailIsValid === false ? classes.invalid : ''}`}>
          <label htmlFor="email">E-Mail</label>
          <input  ref={emailinputRef}  type="email" value={enteredEmail} onChange={(event)=>{setEnteredEmail(event.target.value)}} onBlur={validateEmailHandler} placeholder={"Enter your email"}/>
     </div>

     <div className={`${classes.control} ${passwordIsValid === false ? classes.invalid : '' }`}>
        <label htmlFor="password">Password</label>
        <input ref={passwordinputRef}  type="password" value={enteredPassword} onChange={(event)=>{setEnteredPassword(event.target.value);}} onBlur={validatePasswordHandler} placeholder={"Enter your password"}/>
     </div>
     <div className={classes.actions}>
          <button type="submit" className={classes.btn}>Login</button>
          <button type="button"className={classes.toggle}>Create new accout</button>
      </div>
      </form>
    </div>
  );
};

export default Login;
