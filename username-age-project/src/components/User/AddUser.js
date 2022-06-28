import "./AddUser.css";
import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModel from "../UI/ErrorModel";
import { useState } from "react";

const AddUser = (props) => {
  const emptyForm = {
    username: "",
    age: "",
  };

  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState();


  const hideErr = () => {
    setError(null)
  }

  const onchange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => {
      return { ...prevForm, [name]: value };
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (form.username.trim().length === 0 || form.age.trim().length === 0) {
      return setError({
        title: "Invalid Input.",
        message: "Please enter a  valid name and age. (non-empty values)",
      });
    }
    if (+form.age <= 0) {
      return setError({
        title: "Invalid Age.",
        message: "Please enter a  valid age. (> 0)",
      });
    }
    props.onSubmit({ ...form, id: Math.random().toString() });
    setForm(emptyForm);
  };

  return (
    <div>
      {error && (
        <ErrorModel title={error.title} message={error.message} setError={hideErr}/>
      )}
      <Card className="input">
        <form onSubmit={submitHandler}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={form.username}
            onChange={onchange}
          />
          <label htmlFor="age">Age (In years)</label>
          <input
            type="number"
            id="age"
            name="age"
            value={form.age}
            onChange={onchange}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
