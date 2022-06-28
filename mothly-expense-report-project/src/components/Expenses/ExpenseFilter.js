import "./ExpenseFilter.css";

const ExpenseFilter = (props) => {

    const dropdownHandler = (event) => {
        props.onYearChange(event.target.value)
    }

  return (
    <div className="expenses-filter">
      <div className="expenses-filter__control">
        <h2>Filter By Year </h2>
        <div className="">
          <select onChange={dropdownHandler} value={props.year}>
            <option>2022</option>
            <option>2021</option>
            <option>2020</option>
            <option>2019</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ExpenseFilter;
