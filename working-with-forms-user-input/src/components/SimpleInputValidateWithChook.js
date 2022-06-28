import useInput from './hooks/use-input';

const SimpleInputValidateWithChook = () => {

  const {
    value : enteredNameInput,
    isValid : isNameValid,
    hasError : nameHasError,
    inputChangeHandler : nameInputChange,
    inputBlurHandler: nameInputBlur,
    reset : resetNameInput
  } = useInput(value => value.trim() !== '');
  const {
    value : enteredEmailInput,
    isValid : isEmailValid,
    hasError : emailHasError,
    inputChangeHandler : emailInputChange,
    inputBlurHandler: emailInputBlur,
    reset : resetEmailInput
  } = useInput(value => value.trim().includes('@'));

  let formIsValid = false;

  if (isNameValid && isEmailValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    resetNameInput();
    resetEmailInput();

  };

  const nameInputClasses = nameHasError
    ? 'form-control invalid'
    : 'form-control';

    const emailInputClasses = emailHasError
    ? 'form-control invalid'
    : 'form-control';

  return (
    <form onSubmit={submitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input
          type='text'
          id='name'
          onChange={nameInputChange}
          onBlur={nameInputBlur}
          value={enteredNameInput}
        />
        {nameHasError && (
          <p className='error-text'>Name must not be empty.</p>
        )}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor='email'>Your E-Mail</label>
        <input
          type='email'
          id='email'
          onChange={emailInputChange}
          onBlur={emailInputBlur}
          value={enteredEmailInput}
        />
        {emailHasError && (
          <p className='error-text'>Please enter a valid email.</p>
        )}
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInputValidateWithChook;