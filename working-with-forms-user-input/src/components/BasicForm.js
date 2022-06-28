import useInput from "./hooks/use-input";

const BasicForm = () => {
  const {
    value: enteredFirstNameInput,
    isValid: isFirstNameValid,
    hasError: firstNameHasError,
    inputChangeHandler: firstNameInputChange,
    inputBlurHandler: firstNameInputBlur,
    reset: resetFirstnameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredLastNameInput,
    isValid: isLastNameValid,
    hasError: lastNameHasError,
    inputChangeHandler: lastNameInputChange,
    inputBlurHandler: lastNameInputBlur,
    reset: resetLastNameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredEmailInput,
    isValid: isEmailValid,
    hasError: emailHasError,
    inputChangeHandler: emailInputChange,
    inputBlurHandler: emailInputBlur,
    reset: resetEmailInput,
  } = useInput((value) => value.trim().includes("@"));

  let isFormValid = false;

  if (isFirstNameValid && isLastNameValid && isEmailValid) {
    isFormValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(enteredFirstNameInput, enteredLastNameInput, enteredEmailInput);
    console.log('submited');
    resetFirstnameInput();
    resetLastNameInput();
    resetEmailInput();
  };

  const firstNameClass = firstNameHasError
    ? "form-control invalid"
    : "form-control";
  const lastNameClass = lastNameHasError
    ? "form-control invalid"
    : "form-control";
  const emailInputClasses = emailHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={submitHandler}>
      <div className="control-group">
        <div className={firstNameClass}>
          <label htmlFor="fname">First Name</label>
          <input
            type="text"
            id="fname"
            value={enteredFirstNameInput}
            onChange={firstNameInputChange}
            onBlur={firstNameInputBlur}
          />
          {firstNameHasError && (
            <p className="error-text">First Name must not be empty.</p>
          )}
        </div>
        <div className={lastNameClass}>
          <label htmlFor="lname">Last Name</label>
          <input
            type="text"
            id="lname"
            value={enteredLastNameInput}
            onChange={lastNameInputChange}
            onBlur={lastNameInputBlur}
          />
          {lastNameHasError && (
            <p className="error-text">Last Name must not be empty.</p>
          )}
        </div>
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">Your E-Mail</label>
        <input
          type="email"
          id="email"
          onChange={emailInputChange}
          onBlur={emailInputBlur}
          value={enteredEmailInput}
        />
        {emailHasError && (
          <p className="error-text">Please enter a valid email.</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!isFormValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
