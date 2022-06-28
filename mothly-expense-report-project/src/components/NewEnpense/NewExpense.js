import "./NewExpense.css";
import ExpenseForm from "./ExpenseForm";
import { useState } from "react";

const NewExpense = (props) => {
  const [expenseForm, setExpenseForm] = useState(false);

  const editingHandler = (event) => {
    setExpenseForm((prev) => !prev);
  };

  const saveExpenseData = (enteredExpenseData) => {
    let expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString(),
      date: new Date(enteredExpenseData.date),
    };
    props.onAddExpense(expenseData);
  };

  return (
    <div className="new-expense">
      {expenseForm ? (
        <ExpenseForm onSaveExpenseData={saveExpenseData} onCancel={editingHandler}/>
      ) : (
        <button onClick={editingHandler}>Add New Expense</button>
      )}
    </div>
  );
};

export default NewExpense;
