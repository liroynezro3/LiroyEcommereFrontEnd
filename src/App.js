import React,{Suspense} from "react";
import Products from "./components/Products/Products";
import CartProvider from "./context/CartProvider";
import SearchProvider from "./context/SearchProvider";
import Layout from "./components/Layout/Layout";
import { Route, Switch,Redirect} from "react-router-dom";
import PageNotFound from "./components/UI/PageNotFound";
import useAPI from "./hooks/use-getAPI";
import {serverurl} from './hooks/domainURL'
import LoadingSpinner from "./components/UI/LoadingSpinner";
const Orders = React.lazy(()=>import('./components/Orders/Orders'));
const Cart = React.lazy(()=>import('./components/Cart/Cart'))

function App() {
  let data = useAPI(
    //"http://127.0.0.1:3000/products/"
    `${serverurl}/products`
    );
const context= (!data.isLoading&&data.data.length>0&&<Products items={data.data} isLoading={data.isLoading} error={data.error}/>)
  return (
    <CartProvider>
      <SearchProvider>
        <Layout>
          <Suspense fallback={<LoadingSpinner/>}>
          <Switch>
              <Route path="/" exact>
                   <Redirect to="/products"></Redirect>
              </Route>
              <Route path="/cart"> <Cart/> </Route>
              <Route path="/products">{context}</Route>:
              <Route path="/orders"><Orders/></Route>:
              <Route path="*"> <PageNotFound/> </Route>
          </Switch>
          </Suspense>
        </Layout>
      </SearchProvider>
    </CartProvider>
  );
}

export default App;
