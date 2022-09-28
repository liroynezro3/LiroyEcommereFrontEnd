import React, { useContext, useState } from "react";
import classes from "./ProductDetail.module.css";
import { useRouteMatch, useParams } from "react-router-dom";
import CartContext from "../../context/CartContext";

const ProductDetail = (props) => {
  const [IsHighLighted, setIsHighLighted] = useState(false);
  const btnClasses = `${classes.container} ${IsHighLighted ? classes.bump : ""}`;
  const CartCtx = useContext(CartContext);
  const match = useRouteMatch();
  const params = useParams();
  //console.log(match); //same with more options
  //console.log(params.itemid); //same

  //http://127.0.0.1:3000/products/itemid/?id=102

  //useEffect(()=>{
  //  fetchProductsData();
  // },[])
  //const[itemData,setData]=useState([])
  //const fetchProductsData =  async () => {// if i want to get simple item data
  //  try {
  //  const response = await fetch(`http://127.0.0.1:3000/products/itemid/?id=${params.itemid}`);
  //  if (!response.ok) {
  //   throw new Error("Something with Fetch not succses");
  //  }
  //  const responseData = await response.json();
  //  console.log(responseData);
  //  setData(() => {
  //    return responseData[0];
  //  });
  // } catch (err) {
  //   console.log(err);
  //  }
  //};

  const SingleItemId = props.items.find(
    (item) => item.id.toString() === params.itemid
  );
  const addToCartHandler = () => {
    setIsHighLighted(true);
    setTimeout(() => {
      setIsHighLighted(false);
    }, 300);

    const item = {
      id: SingleItemId.id,
      img: SingleItemId.img,
      name: SingleItemId.name,
      description: SingleItemId.description,
      price: SingleItemId.price,
      amount: 1,
    };
    CartCtx.addItem(item);
  };

  const context = (
    <div className={btnClasses}>
      <div className={classes.layouttexts}>
      <div className={classes.itemcode}>item code: {SingleItemId.id}</div>
        <h2 className={classes.name}>{SingleItemId.name}</h2>
        <span className={classes.description}>{SingleItemId.description}</span>
        <br></br>
        <span className={classes.price}>Price : {SingleItemId.price}$</span>
        <br></br>
        <br></br>
        <br></br>
        <button className={classes.orderButton} onClick={addToCartHandler}>
          Add To Cart
        </button>
      <img
        className={classes.img}
        src={SingleItemId.img}
        alt={SingleItemId.img}
      />
    </div>
    </div>
  );
  return <React.Fragment>{context}</React.Fragment>;
};
export default ProductDetail;
