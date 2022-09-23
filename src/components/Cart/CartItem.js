import classes from "./CartItem.module.css";
import CartContext from "../../context/CartContext";
import { useContext } from "react";
const CartItem = (props) => {
  const cartCTX = useContext(CartContext);
  const AddItemToCartHandler = () => {
    cartCTX.AddItemFromCart(props.id);
  };
  const RemoveItemFromCart = () => {
    cartCTX.RemoveItemFromCart(props.id);
  };

  return (
    <li className={classes["cart-item"]}>
      <div className={classes.texts}>
        <h2>{props.name}</h2>
        <span className={classes.description}>{props.description}</span>
      </div>
      <div className={classes.aroundIMG}>
      <img src={props.img} alt={props.name}></img>
      </div>
      <div className={classes.actions}>
        <span className={classes.price}>{props.price}$</span>
        <span className={classes.amount}>x {props.amount}</span>
        <button onClick={RemoveItemFromCart}>−</button>
        <button onClick={AddItemToCartHandler}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
