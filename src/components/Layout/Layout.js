import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Navbar from "./Navbar";
const Layout = (props) => {
  return (
    <React.Fragment>
      <Header/>
      <Navbar/>
      <main>{props.children}</main>
      <Footer/>
    </React.Fragment>
  );
};
export default Layout;
