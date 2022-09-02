import classes from "./Navbar.module.css";
import React, { useState } from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, NavLink ,useParams} from "react-router-dom";
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
  const SearchHandlerFunction1=()=>{
    SearchCTX.SearchValueHandler('mobile');
    setIsAction(false)
  }
  const SearchHandlerFunction2=()=>{
    SearchCTX.SearchValueHandler('computers');
    setIsAction(false)
  }
  const OrdersHandlerClasses=()=>{
    setIsAction(true)
  }
  const OrdersHandlerClasses1=()=>{
    setIsAction(false)
  }
  return (
  <div>
    <nav className={classes.nav}>
      <NavLink to='/products' activeClassName={isaction?classes.active:classes.active1} onClick={SearchHandlerFunction}>Products</NavLink>
      <NavLink to='/products/mobile' activeClassName={classes.active} onClick={SearchHandlerFunction1}>Mobile</NavLink>
      <NavLink to='/products/computers' activeClassName={classes.active} onClick={SearchHandlerFunction2}>Computers</NavLink>
      <NavLink to='/orders/singleorder' activeClassName={isaction?classes.active:classes.active1} onClick={OrdersHandlerClasses}>Single Order</NavLink>
      <NavLink to='/orders/allorders' activeClassName={classes.active}  onClick={OrdersHandlerClasses1}>All Orders for admin</NavLink>
      <NavLink to='/cart' activeClassName={classes.active}> <ShoppingCartIcon fontSize="large"/>Cart</NavLink>
    </nav>
</div>
  );
};
export default Navbar;
