import classes from "./AdminPanel.module.css";
import React from "react";
import { Switch, useHistory, Route, useRouteMatch } from "react-router-dom";
import AddNewProduct from "./Options/AddNewProduct";
import DeleteProduct from "./Options/DeleteProduct";

const AdminPanel = () => {
  const match = useRouteMatch();
  const history = useHistory();
  const links = [
    { title: "All Orders", url: `/orders/allorders` },
    { title: "Add new product", url: `${match.path}/addproduct` },
    { title: "Delete product", url: `${match.path}/deleteproduct` },
  ];
  const context = links.map((item, index) => (
    <button key={index} onClick={() => {history.push(item.url)}} className={classes.singlelinks}>
      {item.title}
    </button>
  ));
console.log(match.path)
  return (
    <Switch>
      <Route path={match.path} exact>
        <div className={classes.links}>{context}</div>
      </Route>
      <Route path={`${match.path}/addproduct`}><AddNewProduct/></Route>
      <Route path={`${match.path}/deleteproduct`}><DeleteProduct/></Route>
      <Route path="*">
        Route not Found
      </Route>
    </Switch>
  );
};
export default AdminPanel;
