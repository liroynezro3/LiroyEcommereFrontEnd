import classes from "./Header.module.css";
import React, { useContext, useRef, useState } from "react";
import logo from "../../assets/LogoShop.jpg";
import { Link } from "react-router-dom";
import HeaderCartButton from "./HeaderCartButton";
import SearchIcon from "@mui/icons-material/Search";
import SearchContext from "../../context/SearchContext";
/* <img src={logo} className={classes.logo} alt="Logo"></img>*/
const Header = () => {
  const SearchValueRef = useRef(); // SearchValueRef.current.value

  const ValueCTX = useContext(SearchContext);
  const [valueInput, setValueInput] = useState("");
  const onChangeHandler = (e) => {
    setValueInput(e.target.value);
  };
  const SearchHandler = () => {
    ValueCTX.SearchValueHandler(valueInput);
  };

  return (
    <React.Fragment>
      <div className={classes.header}>
        <div className={classes.mylogo}></div>
        <div className={classes.search}>
          <Link to={`/products/${valueInput}`}>
            <button className={classes.searchbutton} onClick={SearchHandler}>
              <SearchIcon />
            </button>
          </Link>
          <input type={"text"} onChange={onChangeHandler}></input>
        </div>
        <div className={classes.cartButton}>
          <HeaderCartButton></HeaderCartButton>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Header;
