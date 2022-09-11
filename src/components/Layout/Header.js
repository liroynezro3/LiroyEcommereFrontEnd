import classes from "./Header.module.css";
import React, { useContext, useState } from "react";
import logo from "../../assets/logoliroy.png";
import { Link ,NavLink} from "react-router-dom";
import HeaderCartButton from "./HeaderCartButton";
import SearchIcon from "@mui/icons-material/Search";
import SearchContext from "../../context/SearchContext";

const Header = () => {
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
        <div className={classes.aroundlink}>
        <NavLink to='/login' className={classes.login} activeClassName={classes.active}>Login/Register as a admin</NavLink>
        </div>
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
          <input type={"text"} onChange={onChangeHandler}></input>
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
