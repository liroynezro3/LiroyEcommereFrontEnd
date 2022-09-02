import React from "react";
import Header from "./Header";
import Navbar from "./Navbar";
const Layout = (props) => {
  console.log("Layout")
  return (
    <React.Fragment>
      <Header></Header>
      <Navbar></Navbar>
      <main>{props.children}</main>
    </React.Fragment>
  );
};
export default Layout;
