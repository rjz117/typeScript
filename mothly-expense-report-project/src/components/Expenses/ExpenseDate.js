import Card from '../UI/Card';
import './ExpenseDate.css'

const ExpenseDate = (props) => {
  // console.log(new Date(props.date));
  const month = props.date.toLocaleString('en', { month: "long" });
  const day = props.date.toLocaleString('en', { day: "numeric" });
  const year = props.date.getFullYear();

  return (
    <Card className="expense-date">
    <div>
      <div className="expense-date__month">{month}</div>
      <div className="expense-date__year">{year}</div>
      <div className="expense-date__day">{day}</div>
    </div>
    </Card>
  );
};

export default ExpenseDate
