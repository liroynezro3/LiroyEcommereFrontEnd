import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";
import CartContext from "../../context/CartContext";
import { Route, Switch, useHistory,useRouteMatch,Link} from "react-router-dom";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import { serverurl } from "../../hooks/domainURL";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const cartCtx = useContext(CartContext);
  const history = useHistory();
  const match = useRouteMatch();

  console.log(match);
  const TotalPrice = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.price * item.amount;
  }, 0);

  const orderHandler = () => {
    setIsCheckout(true);
  };
  const cancelHandler = () => {
    setIsCheckout(false);
  };
  const DeleteCartItemsHandler = () => {
    cartCtx.ClearCart();
  };
  //https://react-http-970f2-default-rtdb.firebaseio.com/orders.json
  const SendToData = async (UserInfo) => {
    const response = await fetch(
      //"https://react-http-970f2-default-rtdb.firebaseio.com/orders.json",
      //"http://127.0.0.1:3000/orders/",
      `${serverurl}/orders`,
      {
        method: "POST",
        body: JSON.stringify({
          Name: UserInfo.Name,
          City: UserInfo.City,
          PhoneNumber: UserInfo.PhoneNumber,
          PostalCode: UserInfo.PostalCode,
          Street: UserInfo.Street,
          OrderTotalPrice: TotalPrice,
          orderedItem: cartCtx.items,
        }),
        headers: { "Content-type": "application/json" },
      }
    );
    if (!response.ok) {
      history.replace(`${match.path}/unsuccessful`);
      throw new Error("Something went wrong!");
    }
    cartCtx.ClearCart();
    history.replace(`${match.path}/successful`);
    console.log(response);
  };
  const CartOrderList = (
    <ul>
      {cartCtx.items.map((item) => (
        <CartItem
          key={Math.random()}
          id={item.id}
          name={item.name}
          description={item.description}
          img={item.img}
          price={item.price}
          amount={item.amount}
        />
      ))}
    </ul>
  );

  let content;
  if (cartCtx.items.length === 0) {
    content = (
      <div className={classes.cart}>
        <div className={classes.cartOrder}>
          <span style={{ fontSize: "30px", fontWeight: "bolder" }}>
            Your Cart is Empty!
          </span>
        </div>
      </div>
    );
  } else {
    content = (
      <div className={classes.cart}>
        <div className={classes.cartList}>{CartOrderList}</div>
        {isCheckout && (
          <Checkout onCancel={cancelHandler} onConfirm={SendToData}></Checkout>
        )}
        <div className={classes.cartOrder}>
          {!isCheckout && (
            <button
              className={classes.cancelButton}
              onClick={DeleteCartItemsHandler}
            >
              delete all Cart items
            </button>
          )}
          <span>Total Price: {TotalPrice}$</span>
          {!isCheckout && (
            <button className={classes.orderButton} onClick={orderHandler}>
              Continue to Order
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <Switch>
        <Route path={`${match.path}`} exact>
          {content}
        </Route>
        <Route path={`${match.path}/successful`} exact>
          <div className={classes.cart}>
            <div className={classes.cartOrder}>
              <span style={{ fontSize: "30px", fontWeight: "bolder" }}>
                The Order successful to cheack your order click on the link and
                enter your Phone Number:
                <Link to={"/orders/searchorder"}>click here</Link>
              </span>
            </div>
          </div>
        </Route>
        <Route path={`${match.path}/unsuccessful`} exact>
          <div className={classes.cart}>
            <div className={classes.cartOrder}>
              <span style={{ fontSize: "30px", fontWeight: "bolder" }}>
                The Order dont succes plz try to order again
              </span>
            </div>
          </div>
        </Route>
      </Switch>
    </div>
  );
};
export default Cart;
