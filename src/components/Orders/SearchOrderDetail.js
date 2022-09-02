import React, { useRef, useState } from "react";
import classes from "./SearchOrderDetail.module.css";
import { Route,useRouteMatch ,useHistory} from "react-router-dom";
const SearchOrderDetail = (props) => {
  const match = useRouteMatch();
  console.log(props);
  const item = props;
  const context = (
    <div className={classes.orderlist}>
      <li>
        <h2>Order ID : {item.id}</h2>
        <div className={classes.aroundspans}>
          <span> Name: {item.Name}</span>
          <span> City: {item.City}</span>
          <span> Phone Number: {item.PhoneNumber}</span>
          <span> postalcode: {item.PostalCode}</span>
          <span> Street: {item.Street}</span>
        </div>
        <br></br>
        <span> Items - purcashed: </span>
        <div className={classes.aroundLiItem}>
          {item.orderedItem.map((item) => (
            <li className={classes.liItem} key={item.id}>
              <div className={classes.insideitems}>
                <img
                  src={item.img}
                  className={classes.itemImg}
                  alt={item.name}
                ></img>
                <h2>{item.name}</h2>
                item id: {item.id}
                <br></br>
                item amount: {item.amount}
                <br></br>
                item price: {item.price}
              </div>
            </li>
          ))}
        </div>
        <br></br>
        <br></br>
        <span className={classes.totalPrice}>
          Total Price:{item.OrderTotalPrice}
        </span>
      </li>
    </div>
  );

  return (
    <React.Fragment>
      <div className={classes.ordersPage}>
        {context}
      </div>
    </React.Fragment>
  );
};
export default SearchOrderDetail;
