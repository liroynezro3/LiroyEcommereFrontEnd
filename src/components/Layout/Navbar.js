import classes from "./Navbar.module.css";
import React, { useState } from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {NavLink ,useParams} from "react-router-dom";
import { useContext } from "react";
import SearchContext from "../../context/SearchContext";
const Navbar = () => {

  //<div className={classes.moty}><button>dasdas</button></div>
  const [isaction,setIsAction] = useState(false)
  const SearchCTX = useContext(SearchContext)
  const SearchHandlerFunction=()=>{
    SearchCTX.SearchValueHandler('');
    setIsAction(true)
  }
  const SearchHandlerFunction2=()=>{
    SearchCTX.SearchValueHandler('computers');
    setIsAction(false)
  }
  const SearchHandlerFunction3=()=>{
    SearchCTX.SearchValueHandler('foods');
    setIsAction(false)
  }
  const SearchHandlerFunction4=()=>{
    SearchCTX.SearchValueHandler('Others');
    setIsAction(false)
  }
  const OrdersHandlerClasses=()=>{
    setIsAction(true)
  }

  return (
  <div>
    <nav className={classes.nav}>
      <NavLink to='/products' activeClassName={isaction?classes.active:classes.active1} onClick={SearchHandlerFunction}>Products</NavLink>
      <NavLink to='/products/computers' activeClassName={classes.active} onClick={SearchHandlerFunction2}>Computers</NavLink>
      <NavLink to='/products/foods' activeClassName={classes.active} onClick={SearchHandlerFunction3}>Foods</NavLink>
      <NavLink to='/products/Others' activeClassName={classes.active} onClick={SearchHandlerFunction4}>Others</NavLink>
      <NavLink to='/orders/searchorder' activeClassName={isaction?classes.active:classes.active1} onClick={OrdersHandlerClasses}>Search Order</NavLink>
      <NavLink to='/cart' activeClassName={classes.active}> <ShoppingCartIcon fontSize="large"/>Cart</NavLink>
    </nav>
</div>
  );
};
export default Navbar;
