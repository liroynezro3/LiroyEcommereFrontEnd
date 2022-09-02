import React, { useState, useEffect, useCallback } from "react";
import AllOrderList from "./AllOrderList";
import classes from "./Orders.module.css";
import { Route, Switch, useRouteMatch} from "react-router-dom";
import SearchOrder from "./SearchOrder";
import {serverurl} from '../../hooks/domainURL';
import LoadingSpinner from "../UI/LoadingSpinner";
const Orders = (props) => {
  const [Orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const match = useRouteMatch();
  console.log(match.url)
  const OrderDataHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        //"http://127.0.0.1:3000/orders"
        //"https://react-http-970f2-default-rtdb.firebaseio.com/orders.json"
        `${serverurl}/orders`,
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      console.log("orderss from nodejs," ,data);
      const loadedOrders = [];
      for (const key in data) {
        console.log(data[key])
        loadedOrders.push({
          _id:data[key]._id,
          Name: data[key].Name,
          City: data[key].City,
          Street: data[key].Street,
          PostalCode: data[key].PostalCode,
          PhoneNumber: data[key].PhoneNumber,
          OrderTotalPrice: data[key].OrderTotalPrice,
          orderedItem: data[key].orderedItem,
        });
      }
      setOrders(loadedOrders);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);
  useEffect(() => {
    OrderDataHandler();
  }, [OrderDataHandler]);
  console.log("hhhhhhh",Orders[0]);

  return (
    <React.Fragment>
      <Switch>
        <Route path={`${match.path}/singleorder`}>
      {isLoading&&<LoadingSpinner/>}
      {!isLoading&&Orders.length===0&&<h1 className={classes.h1center}>Order Not Found</h1>}
      {!isLoading&&Orders.length>0&&<SearchOrder Orders={Orders}></SearchOrder>}
        </Route>
        <Route path={`${match.path}/allorders`} exact>
      {isLoading&&<LoadingSpinner/>}
      {!isLoading&&Orders.length===0&&<h1 className={classes.h1center}>No Orders Found</h1>}
      {!isLoading&&Orders.length>0&&<AllOrderList Orders={Orders} dataSendRequest={OrderDataHandler}></AllOrderList>}
        </Route>
      </Switch>
    </React.Fragment>
  );
};
export default Orders;
