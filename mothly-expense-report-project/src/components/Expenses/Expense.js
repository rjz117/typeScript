import "./Expense.css";
import Card from "../UI/Card";
import ExpenseItem from "./ExpenseItem";
import ExpenseFilter from "./ExpenseFilter";
import { useState } from "react";
import ExpensesChart from './ExpensesChart'

const Expense = ({ expenses }) => {

  const [filterYear, setFilterYear] = useState('2022');

  const filteredExpense = (selectedYear) => {
    setFilterYear(selectedYear);
  }
  
  let filterExp = expenses.filter((expense) => {
    return (expense.date.getFullYear()).toString() === filterYear
  })

  let expenseCom = filterExp.map((expense) => {
    return (
      <ExpenseItem
        key={expense.id}
        date={expense.date}
        title={expense.title}
        amount={expense.amount}
      />
    );
  });


  return (
    <Card className="expenses">
      <ExpenseFilter onYearChange={filteredExpense} year={filterYear}/>
      <ExpensesChart expenses={filterExp} />
      <div>{filterExp.length === 0 ? <h2 className="expenses-list__fallback">No Expense Found.</h2> : expenseCom}</div>
    </Card>
  );
};

export default Expense;
