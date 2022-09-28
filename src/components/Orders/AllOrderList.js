import React from "react";
import classes from "./AllOrderList.module.css";
import {serverurl} from '../../hooks/domainURL';
const AllOrderList = (props) => {
  const DeleteItemHandler=async (itemid) => {
      const response = await fetch(
        //`http://127.0.0.1:3000/orders/${itemid}`,
        //`https://react-http-970f2-default-rtdb.firebaseio.com/CartOrders/${itemid}.json`,
        `${serverurl}/orders/${itemid}`,
        {
          method: "DELETE",
          headers:{'Content-type':'application/json'}
        }
      );
      const responseHTTP = await response.json();
      
      props.dataSendRequest();
    };


  const Orders = props.Orders;
  const context = Orders.map((item) => (
    <li className={classes.orderlist} key={item._id}>
      <button onClick={()=>{DeleteItemHandler(item._id)}} className={classes.deleteOrder}>Delete Order</button>
      <h2>Order ID : {item._id}</h2>
      <div className={classes.aroundspans}>
        <span> Name: {item.Name}</span>
        <span> City: {item.City}</span>
        <span> Phone Number: {item.PhoneNumber}</span>
        <span> postalcode: {item.PostalCode}</span>
        <span> Street: {item.Street}</span>
      </div>
      <br></br>
      <span> Items - purcashed: </span>
        <ul className={classes.aroundLiItem}>
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
      </ul>
      <br></br>
      <br></br>
      <span className={classes.totalPrice}>
        {" "}
        Total Price:{item.OrderTotalPrice}
      </span>
    </li>
  ));
  return (
    <div className={classes.ordersPage}>
      <ul>{context}</ul>
    </div>
  );
};
export default AllOrderList;
