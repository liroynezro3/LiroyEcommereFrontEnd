import classes from "./Products.module.css";
import React, { useContext, useEffect } from "react";
import ProductItem from "./ProductItem";
import { Route, useRouteMatch, Switch, Redirect} from "react-router-dom";
import ProductDetail from "./ProductDetail";
import { useState } from "react";
import SearchContext from "../../context/SearchContext";
import LoadingSpinner from "../UI/LoadingSpinner";
import SlideImage from "./SlideImage";
const Products = (props) => {
  const match = useRouteMatch();
  const items = props.items;
  const [FilterSearchArray, setFilterSearchArray] = useState([items]);
  const SearchCTX = useContext(SearchContext); //Search Context
  const Value = SearchCTX.InputValue; //Search
  console.log(Value)
    /*const a = items.filter(
    (item) =>
      item.name.toLowerCase().includes(Value.toLowerCase()) ||
      item.category.toLowerCase().includes(Value.toLowerCase())
  );*/
  const CheackValueFilter = () => {
    if (Value.length > 1) {
      const a = items.filter(
        (item) =>
          item.name.toLowerCase().includes(Value.toLowerCase()) ||
          item.category.toLowerCase().includes(Value.toLowerCase())
      );
      setFilterSearchArray(() => {
        return a;
      });
    } else {
      setFilterSearchArray(() => {
        return [...items];
      });
    }
  };
  useEffect(() => {
    CheackValueFilter();
  }, [Value]);

  const ItemList = FilterSearchArray.map((item) => (
    <ProductItem
      key={item.id}
      id={item.id}
      img={item.img}
      name={item.name}
      description={item.description}
      price={item.price}
    />
  ));
  return (
    <React.Fragment>
    <Switch>
      <Route path={`${match.path}`} exact>
      <SlideImage></SlideImage>
        <ul className={classes.main}>
          {FilterSearchArray.length > 1 ? (ItemList) : (<LoadingSpinner/>)}
        </ul>
      </Route>
      <Route path={`${match.path}/${Value}`} exact>
        <ul className={classes.main}>
          {FilterSearchArray.length > 0&& Value? (ItemList) : (
            <h2 className={classes.noitemfound}>No items Found</h2>
          )}
        </ul>
      </Route>
      <Route path={`${match.path}/id/:itemid`} exact>
        {FilterSearchArray.length > 1 ? (
          <ProductDetail items={FilterSearchArray}></ProductDetail>
        ) : (
          "Error"
        )}
      </Route>
      <Route path="*">
        <Redirect to={match}></Redirect>
      </Route>
    </Switch>
    </React.Fragment>
  );
};
export default Products;
