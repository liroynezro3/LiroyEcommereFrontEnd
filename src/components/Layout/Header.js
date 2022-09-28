import classes from "./Header.module.css";
import React, { useContext, useState } from "react";
import logo from "../../assets/logoliroy.png";
import { Link, NavLink } from "react-router-dom";
import HeaderCartButton from "./HeaderCartButton";
import SearchIcon from "@mui/icons-material/Search";
import SearchContext from "../../context/SearchContext";
import AuthContext from "../../context/AuthContext";
const Header = () => {
  const ValueCTX = useContext(SearchContext);
  const AuthCTX = useContext(AuthContext);
  const userName = localStorage.getItem("userName");
  
  const [valueInput, setValueInput] = useState("");

  const SearchHandler = () => {
    ValueCTX.SearchValueHandler(valueInput);
  };

  let contextPanel = ""
  if(!AuthCTX.isLoggedIn){
    contextPanel=(<div className={classes.aroundlogin}>
      <NavLink to="/login" className={classes.login}
        activeClassName={classes.active} >
        Login/Register as a admin
      </NavLink>
      </div>)
  }
  else{
    contextPanel =(<div className={classes.aroundLogout}>
    <Link to={"/adminpanel"} className={classes.adminpanel}>AdminPanel
    </Link>
    <div className={classes.logout}>
    <span>Welcome {userName}    
   <Link to="/products" onClick={AuthCTX.logout} className={classes.logoutlink}>
     logout
   </Link>
   </span>
   </div>
   </div>)
  }
  
  return (
    <React.Fragment>
      <div className={classes.header}>
      {contextPanel}
        <div className={classes.aroundfeature}>
          <div className={classes.mylogo}>
            <img className={classes.logo} src={logo} alt={"logo"}></img>
          </div>
          <div className={classes.search}>
            <Link to={`/products/${valueInput}`}>
              <button className={classes.searchbutton} onClick={SearchHandler}>
                <SearchIcon />
              </button>
            </Link>
            <input type={"text"}  placeholder={"Search by Name/Category"} onChange={(e)=>{setValueInput(e.target.value)}}></input>
          </div>
          <div className={classes.cartButton}>
            <HeaderCartButton></HeaderCartButton>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Header;
