import { useState } from "react";
import "./App.css";
import Expense from "./components/Expenses/Expense";
import NewExpense from "./components/NewEnpense/NewExpense";

function App() {

  let expenses = [
    {
      id: "e1",
      title: "Toilet Paper",
      amount: 94.12,
      date: new Date("2022-06-11"),
    },
    { id: "e2", title: "New TV", amount: 799.49, date: new Date("2022-06-11") },
    {
      id: "e3",
      title: "Car Insurance",
      amount: 294.67,
      date: new Date("2019-06-11"),
    },
    {
      id: "e4",
      title: "New Desk (Wooden)",
      amount: 450,
      date: new Date("2021-06-11"),
    },
  ];

  const[expenseData, setExpenseData] = useState(expenses)

  const addExpenseHandler = (myData) => {
    expenses = [myData, ...expenses];
    setExpenseData(expenses);
  } 

  return (
    <div>
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expense expenses={expenseData} />
    </div>
  );
}

export default App;
