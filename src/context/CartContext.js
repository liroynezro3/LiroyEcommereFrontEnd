import React from "react";
const CartContext = React.createContext({
  items: [],
  addItem: (item) => {},
  AddItemFromCart: (id) => {},
  RemoveItemFromCart: (id) => {},
  ClearCart:()=>{}
});

export default CartContext;
