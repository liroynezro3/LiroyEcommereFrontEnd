import classes from "./ItemOrderForm.module.css";
import { useRef, useState } from 'react';
import Input from '../UI/Input';
const ItemOrderForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount; //להפוך את זה למספר
    if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5) 
    {
      setAmountIsValid(false);
      return;
    }
    props.onAddToCart(enteredAmountNumber);//back to productitem
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label='Amount:'
        input={{
          id: 'amount_' + props.id,
          type:'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
       <button className={classes.orderButton}>Order Now</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default ItemOrderForm;