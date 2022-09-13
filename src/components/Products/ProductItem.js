import classes from "./ProductItem.module.css";
import React , {useContext} from "react";
import ItemOrderForm from "./ItemOrderForm";
import CartContext from "../../context/CartContext";
import { Link, useRouteMatch } from "react-router-dom";
const ProductItem = (props) => {
  const match = useRouteMatch()
 const Ctx = useContext(CartContext);
  const addToCartHandler = (amount) => {
    const item = {
      id: props.id,
      img: props.img,
      name: props.name,
      description: props.description,
      price: props.price,
      amount: amount,
    };
    Ctx.addItem(item);
  };
  return (
  <li className={classes.liproductItem}>
     <div className={classes.aroundTexts}>
     <img  src={props.img} alt={props.name} className={classes.img}
        ></img>
      <div className={classes.arounditem}>
        <span className={classes.name}>{props.name}</span>
        <br></br>
        <br></br>
        <div className={classes.description}>{props.description}</div>
        <Link to={`/products/id/${props.id}`}>{/*http://localhost:3002/products/id/107*/}
        <button className={classes.detailButton}>detail info</button>
        </Link>
        <br></br>
        <div className={classes.price}>{props.price}$</div>
        </div>
        <ItemOrderForm onAddToCart={addToCartHandler}></ItemOrderForm>
      </div>
    </li>
  );
};
export default ProductItem;
