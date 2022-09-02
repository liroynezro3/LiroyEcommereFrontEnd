import React, { useEffect, useRef, useState } from "react";
import classes from "./SearchOrder.module.css";
import PlagiarismIcon from "@mui/icons-material/Plagiarism";
import SearchOrderDetail from "./SearchOrderDetail";
import { Route, useRouteMatch, useHistory } from "react-router-dom";
const SearchOrder = (props) => {
  const history = useHistory();
  const match = useRouteMatch();
  const SearchOrderRef = useRef();
  const [search, setSearch] = useState(null);
  const OrderFilter = props.Orders.filter(
    (item) =>
      item._id.toString() === search || item.PhoneNumber.toString() === search
  );
  
  const SearchCheack = () => {
    setSearch(SearchOrderRef.current.value);
      if (OrderFilter.length > 0) {
      history.push(`${match.path}/${SearchOrderRef.current.value}`);
    }
    else{
      history.push(`${match.path}`);
    }
  };
  useEffect(()=>{
    SearchCheack()
  }
  ,[search])
  console.log("Special item from Search :", match);
  const context = OrderFilter.map((item) => (
    <SearchOrderDetail
      key={item._id}
      id={item._id}
      Name={item.Name}
      City={item.City}
      PhoneNumber={item.PhoneNumber}
      PostalCode={item.PostalCode}
      OrderTotalPrice={item.OrderTotalPrice}
      Street={item.Street}

      orderedItem={item.orderedItem}
    ></SearchOrderDetail>
  ));
  return (
    <React.Fragment>
      <div className={classes.ordersPage}>
        <h3>Enter Your ID number / Phone Number</h3>
        <div className={classes.search}>
          <button className={classes.searchbutton} onClick={SearchCheack}>
            <PlagiarismIcon
              fontSize="large"
              style={{ color: "grey" }}
            ></PlagiarismIcon>
          </button>
          <input type={"text"} ref={SearchOrderRef}></input>
        </div>
        <ul>
          {OrderFilter.length>0? <Route path={`${match.path}/:UserOrderInfo`} exact> {context} </Route> : 
        search&&<h2 className={classes.invalidSearch}>"Please Enter a Correct ID/PhoneNumber"</h2>}
        </ul>
      </div>
    </React.Fragment>
  );
};
export default SearchOrder;
