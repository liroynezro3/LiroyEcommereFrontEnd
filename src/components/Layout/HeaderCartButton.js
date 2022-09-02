import classes from "./HeaderCartButton.module.css";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useContext, useEffect, useState } from "react";
import CartContext from "../../context/CartContext";
import { NavLink } from "react-router-dom";
const HeaderCardButton = (props) => {
  const [BtnIsHighLighted,setBtnIsHighLighted] = useState(false)
  const cartCtx = useContext(CartContext);
  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);
  //const  {items}  = cartCtx;
  const btnClasses = `${classes.button} ${BtnIsHighLighted ? classes.bump:''}`;
  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return;
    }
    setBtnIsHighLighted(true)
    const timer = setTimeout(()=>{
      setBtnIsHighLighted(false);
    }
    ,300);
    return ()=>{clearTimeout(timer)};
  }, [cartCtx.items]);
  return (
    <NavLink activeClassName={classes.active} to='/cart'><button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <ShoppingCartIcon fontSize="large"/>
      </span>
      <span>Your Card </span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button></NavLink>
  );
};
export default HeaderCardButton;
