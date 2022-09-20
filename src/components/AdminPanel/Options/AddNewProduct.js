import React, { useState, useEffect,useContext} from "react";
import classes from "./AddNewProduct.module.css";
import { serverurl } from "../../../hooks/domainURL";
import AuthContext from "../../../context/AuthContext";
import { fontFamily, fontWeight } from "@mui/system";
const AddNewProduct = (props) => {
//Input Values
const AuthCtx=useContext(AuthContext);
const [buttonClick,SetButtonClick]=useState(false)
const [isloading, setIsLoading] = useState(false);
  const [entredItemID,setentredItemID]= useState("");
  const [entreditemName,setEntredItemName]= useState("");
  const [entredImgData, setEntredImgData] = useState("");
  const [entreddescription,setEntredDescription]= useState("");
  const [entredCategory,setEntredCategory]= useState("");
  const [entredPrice,setEntredPrice]= useState("");
console.log(entredCategory)
  //console.log(`ID${entredItemID},name:${entreditemName},img:${entredimgURL},Description:${entreddescription},Category:${entredCategory}`)
   
   //Cheack my Valid inputs
   const [ItemID, setItemID] = useState();
   const [itemName, setItemName] = useState();
   const [imgData, setImgData] = useState();
   const [description, setDescription] = useState();
   const [category, setCategory] = useState();
   const [price, setPrice] = useState();
    //
   const confirmHandler = (event) => {
    event.preventDefault();
    if (entredItemID>=1000&&entredItemID <= 99999) {
      setItemID(true);
    } else {
      setItemID(false)
    }
    if (entreditemName.trim().length > 2 && entreditemName.trim().length <=20) {
      setItemName(true);
    } else {
      setItemName(false);
    }
    if (entredImgData.trim().length >= 5 && entredImgData.trim().length <=50000) {
      setImgData(true);
    } else {
      setImgData(true);
    }
    if (entreddescription.trim().length>=2&&entreddescription.trim().length<=200) {
      setDescription(true);
    } else {
      setDescription(false);
    }
    if (entredPrice > 0  && entredPrice <= 9999) {
      setPrice(true);
    } else {
      setPrice(false);
    }
    if (entredCategory.trim().length >= 1 && entredCategory.trim().length <= 50) {
      setCategory(true);
    } else {
      setCategory(false);
    }
    SetButtonClick(!buttonClick);
  };

  const FormIsValid = ItemID&&itemName&&imgData&&description&&category&&price;

  useEffect(()=>{  
    if(FormIsValid){
      console.log(`ID ${ItemID},name:${itemName},img:${entredImgData},Description:${description},price ${entredPrice}, Category ${category},Price:${price}`)
      const FormValues = {
        id:entredItemID,
        name:entreditemName,
        img:entredImgData,
        description:entreddescription,
        price:entredPrice,
        category:entredCategory
      }
      SendData(FormValues);
    }},[buttonClick,FormIsValid])

const SendData = async(FormValue)=>{
  console.log("From Send Data", FormValue)
  try {
    const response = await fetch(`${serverurl}/products`, { //http://127.0.0.1:3000/users/login
      method: "POST",
      body: JSON.stringify(
        FormValue
      ),
      headers: {"Content-type": "application/json" ,"x-api-key":AuthCtx.token},
    });
    const responseData = await response.json();//the data of server back
    console.log("data from server", responseData)

    if (!response.ok) {
      let errorMessage ="Upload Item Failed!";
      if(responseData&&responseData.message){
        errorMessage = responseData.message;
      }
      throw new Error(errorMessage);
    }
    alert("Add item successfully")
  } catch (err) {
    alert(err);
  }
  setIsLoading(false);
}
///////////////////////// image to base64
function handleChange(e) {
  const file = e.target.files[0];
  getBase64(file);
}
const getBase64 = (file) => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    onLoad(reader.result);
  };
};
const onLoad = (fileString) => {
  console.log(fileString);
  setEntredImgData(fileString)
};
/////////////////////////
  return (
    <form onSubmit={confirmHandler} className={classes.form}>
            <h3>Add New item</h3>
      <div className={`${classes.control} ${ItemID===false?classes.invalid:''}`}>
        <label htmlFor="item id">Add item ID 1000-99999*:</label>
        <input type={"number"} id={"id"} onChange={(e)=>{setentredItemID(e.target.value);}}></input>
        {ItemID===false?<p>Please enter other ID between 1000-99999!</p>:''}
      </div>
      <div className={`${classes.control} ${itemName===false?classes.invalid:''}`}>
        <label htmlFor="item name">Add name*:</label>
        <input  type={"text"} id={"item name"} onChange={(e)=>{setEntredItemName(e.target.value);}}></input>
        {itemName===false?<p>Please enter a valid item name</p>:''}
      </div>
      <div className={`${classes.control} ${imgData===false?classes.invalid:''}`}>
        <label htmlFor="url">Add img by URL or FILE Upload*:</label>
        <input type={"text"} id={"ImgUrl"} onChange={(e)=>{setEntredImgData(e.target.value);}} placeholder={"Enter URL"}></input>
        <input type={"file"} id={"ImgFile"} onChange={handleChange} style={{fontSize:"20px",fontWeight:"600",marginBottom:"8px"}}></input>
        {imgData===false?<p>Please enter a valid img</p>:''}
      </div>
      <div className={`${classes.control} ${description===false?classes.invalid:''}`}>
        <label htmlFor="Description">Add description*:</label>
        <input type={"text"} id={"Description"} onChange={(e)=>{setEntredDescription(e.target.value);}}></input>
        {description===false?<p>Please enter a valid description min:2 max:200 chars!</p>:''}
      </div>

      <div className={`${classes.control} ${price===false?classes.invalid:''}`}>
        <label htmlFor="Price">Add price*:</label>
        <input type={"number"} id={"Price"} onChange={(e)=>{setEntredPrice(e.target.value);}}></input>
        {price===false?<p>Please enter a valid price 0-9999</p>:''}
        </div>

      <div className={`${classes.control} ${category===false?classes.invalid:''}`}>
        <label htmlFor="Category">Add category*:</label>
           <select className={classes.selectCategorys} id={"Categorys"} onChange={(e)=>{setEntredCategory(e.target.value)}}>
        <option value="">Select a category</option>
        <option value="Mobile">Mobile</option>
        <option value="Computers">Computers</option>
        <option value="Foods">Foods</option>
        <option value="Others">Others</option>
          </select>
        {category===false?<p>Please enter a valid category</p>:''}
        </div>

        <button className={classes.submit}>Confirm</button>
    </form>
  );
};
export default AddNewProduct;

/*id: Joi.number().min(100).max(99999).required(),
name: Joi.string().min(2).max(20).required(),
img: Joi.string().min(5).max(300),
description: Joi.string().min(2).max(200),
price: Joi.number().min(1).max(9999).required(),
category: Joi.string().min(1).max(50).required(),*/