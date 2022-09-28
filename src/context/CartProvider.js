import React, { useState } from "react";
import CartContext from "./CartContext";
const CartProvider = (props) => {
  const [items, setItems] = useState([]);
  const addItemToCartHandler = (item) => {
    const existingCartItemIndex = items.findIndex((a) => a.id === item.id);
    const existingCartItem = items[existingCartItemIndex];
    if (existingCartItem) {
      items[existingCartItemIndex].amount =
        items[existingCartItemIndex].amount + item.amount;
      setItems(() => {
        return [...items];
      });
    } 
    else {
      setItems((prevItems) => {
        return [...prevItems, item];
      });
    }
  };
  const AddItemFromCart = (cartid) => {
    const existingCartItemIndex = items.findIndex((a) => a.id === cartid);
    items[existingCartItemIndex].amount =
      items[existingCartItemIndex].amount + 1;
    setItems(() => {
      return [...items];
    });
  };
  const RemoveItemFromCart = (cartid) => {
    const existingCartItemIndex = items.findIndex((a) => {return a.id === cartid});
    items[existingCartItemIndex].amount =
      items[existingCartItemIndex].amount - 1;
    if (items[existingCartItemIndex].amount < 1) {
      items.splice(existingCartItemIndex, 1);
    }
    setItems(() => {
      return [...items];
    });
  };
  const ClearCart =()=>{
    setItems(()=>{
      return [];
    })
  }
  const cartContext = {
    items: items,
    addItem: addItemToCartHandler,
    AddItemFromCart: AddItemFromCart,
    RemoveItemFromCart: RemoveItemFromCart,
    ClearCart: ClearCart
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};
export default CartProvider;
