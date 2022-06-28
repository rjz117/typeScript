import { useState } from "react";
import "./ExpenseForm.css";

const ExpenseForm = (props) => {
  let emptyForm = {
    title: "",
    amount: "",
    date: "",
  };
  const [form, setForm] = useState(emptyForm);

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => {
      // console.log(value);
      return { ...prevForm, [name]: value };
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    let expenseData = form;
    setForm(emptyForm);
    props.onSaveExpenseData(expenseData);
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input
            type="text"
            name="title"
            onChange={changeHandler}
            value={form.title}
          />
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input
            type="number"
            name="amount"
            min="0.01"
            step="0.01"
            onChange={changeHandler}
            value={form.amount}
          />
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input
            type="date"
            min="2019-01-01"
            name="date"
            max="2022-12-31"
            onChange={changeHandler}
            value={form.date}
          />
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button type="submit">Add Expense</button>
      </div>
    </form>
  );
};

export default ExpenseForm;
