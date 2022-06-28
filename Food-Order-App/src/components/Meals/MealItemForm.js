import "./MealItemForm.css";
import Input from "../UI/Input";
import { useState } from "react";


const emptyForm = {
  inputAmount:'0'
}

const MealItemForm = (props) => {
  const [form, setForm] = useState(emptyForm)
  const [amountIsValid, setAmountIsValid] = useState(true)
  
  const amountChangeHandler = (event) => {
    setForm((prevForm) => {
      return { inputAmount: event.target.value }
    })
  }

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = form.inputAmount;
    const enteredAmountNumber = +enteredAmount;
    if(enteredAmount.trim().length ===0 || enteredAmountNumber <1 || enteredAmountNumber > 5) {
      setAmountIsValid(false)
      return;
    }
    else {
      setAmountIsValid(true)
      props.onAddToCart(enteredAmountNumber);
      setForm(emptyForm)
    }

  }
  return (
    <form className="form" onSubmit={submitHandler}>
      <Input
        label="Amount"
        Input={{
          id: "amount",
          type: "number",
          min: "0",
          max: "10",
          step: "1",
          value: form.inputAmount,
          onChange : amountChangeHandler
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please Enter A Valid Amount. (1-5)</p>}
    </form>
  );
};

export default MealItemForm;
