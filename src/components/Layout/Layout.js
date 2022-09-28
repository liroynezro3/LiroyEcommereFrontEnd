import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Navbar from "./Navbar";
import classes from "./Layout.module.css"
const Layout = (props) => {
  return (
    <React.Fragment>
      <Header/>
      <Navbar/>
      <main className={classes.main}>
      {props.children}</main>
      <Footer/>
    </React.Fragment>
  );
};
export default Layout;
