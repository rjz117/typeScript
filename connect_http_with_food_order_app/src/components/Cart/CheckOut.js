import { useState } from "react";
import classes from "./CheckOut.module.css";

const emptyForm = {
  name: "",
  street: "",
  postal: "",
  city: "",
};

const isEmpty = (value) => value.trim() === "";
const isSixChars = (value) => value.trim().length === 6;

const CheckOut = (props) => {
  const [form, setForm] = useState(emptyForm);
  const [formValidity, setFormValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => {
      return { ...prevForm, [name]: value };
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredNameIsValid = !isEmpty(form.name);
    const enteredStreetIsValid = !isEmpty(form.street);
    const enteredPostalIsValid = isSixChars(form.postal);
    const enteredCityIsValid = !isEmpty(form.city);

    setFormValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      postal: enteredPostalIsValid,
      city: enteredCityIsValid,
    });
    const isFormValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredPostalIsValid &&
      enteredCityIsValid;

    if (!isFormValid) {
        return;
    }
    props.onConfirm(form)
    setForm(emptyForm);

  };

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.form}>
        <div
          className={`${classes.control} ${
            !formValidity.name ? classes.invalid : ""
          }`}
        >
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={inputChangeHandler}
            value={form.name}
          />
          {!formValidity.name && <p>Please enter a valid name.</p>}
        </div>
        <div
          className={`${classes.control} ${
            !formValidity.street ? classes.invalid : ""
          }`}
        >
          <label htmlFor="street">Street</label>
          <input
            type="text"
            id="street"
            name="street"
            onChange={inputChangeHandler}
            value={form.street}
          />
          {!formValidity.street && <p>Please enter a street name.</p>}
        </div>
        <div
          className={`${classes.control} ${
            !formValidity.postal ? classes.invalid : ""
          }`}
        >
          <label htmlFor="postal">Postal Code</label>
          <input
            type="text"
            id="postal"
            name="postal"
            onChange={inputChangeHandler}
            value={form.postal}
          />
          {!formValidity.postal && (
            <p>Please enter a postal code. (6 charactor long)</p>
          )}
        </div>
        <div
          className={`${classes.control} ${
            !formValidity.city ? classes.invalid : ""
          }`}
        >
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            onChange={inputChangeHandler}
            value={form.city}
          />
          {!formValidity.city && <p>Please enter a city name.</p>}
        </div>
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button>Confirm</button>
      </div>
    </form>
  );
};

export default CheckOut;
