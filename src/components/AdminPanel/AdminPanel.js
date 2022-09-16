import classes from "./AdminPanel.module.css";
import React from "react";
import {useHistory } from "react-router-dom";

const AdminPanel = () => {
    const history = useHistory();
  const links = [
    { title: "All Orders", url: "orders/allorders" },
    { title: "Add new item:", url: "products/addproduct" },
    { title: "Delete item", url: "products/deleteproduct" },
    { title: "Ban", url: "ban" },
  ];
  const context = links.map((item,index) => (
    <button key={index} onClick={()=>{history.push(item.url)}} className={classes.singlelinks}>
      {item.title}
    </button>
  ));
  return <div className={classes.links}>{context}</div>;
};
export default AdminPanel;
