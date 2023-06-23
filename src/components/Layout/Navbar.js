import classes from "./Navbar.module.css";
import React, { useState } from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {NavLink ,useParams} from "react-router-dom";
import { useContext } from "react";
import SearchContext from "../../context/SearchContext";
const Navbar = () => {
  const SearchCTX = useContext(SearchContext)
  const SearchHandlerFunction=(value)=>{
    SearchCTX.SearchValueHandler(value?value:'');
  }

  return (
  <div>
    <nav className={classes.nav}>
      <NavLink to='/products' exact activeClassName={classes.active} className={classes.button} onClick={()=>SearchHandlerFunction('')}>Products</NavLink>
      <NavLink to='/products/computers' activeClassName={classes.active} className={classes.button} onClick={()=>SearchHandlerFunction('computers')}>Computers</NavLink>
      <NavLink to='/products/foods' activeClassName={classes.active} className={classes.button} onClick={()=>SearchHandlerFunction('foods')}>Foods</NavLink>
      <NavLink to='/products/Others'  activeClassName={classes.active} className={classes.button} onClick={()=>SearchHandlerFunction('others')}>Others</NavLink>
      <NavLink to='/orders/searchorder' exact activeClassName={classes.active} className={classes.button}>Search Order</NavLink>
      <NavLink to='/cart' activeClassName={classes.active} className={classes.button}> <ShoppingCartIcon fontSize="large"/>Cart</NavLink>
    </nav>
</div>
  );
};
export default Navbar;
