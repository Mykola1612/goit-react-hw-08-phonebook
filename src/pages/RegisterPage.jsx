import React from 'react';
import { useDispatch } from 'react-redux';
import { registerThunk } from 'redux/auth/auth.reducer';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const handleSubmit = e => {
    e.preventDefault();

    const name = e.target.username.value;
    const email = e.target.userEmail.value;
    const password = e.target.userPassword.value;

    const formData = {
      name,
      email,
      password,
    };

    dispatch(registerThunk(formData));
  };

  return (
    <div className="container" onSubmit={handleSubmit}>
      <form action="submit" className="form_login__register">
        <label className="label_loginPage__registerPage">
          Username
          <input
            type="text"
            name="username"
            className="loginPage_registerPage__input"
          />
        </label>
        <label className="label_loginPage__registerPage">
          Email
          <input
            type="email"
            name="userEmail"
            className="loginPage_registerPage__input"
          />
        </label>
        <label className="label_loginPage__registerPage">
          Password
          <input
            type="password"
            name="userPassword"
            className="loginPage_registerPage__input"
          />
        </label>
        <button className="button_loginPage__registerPage">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
