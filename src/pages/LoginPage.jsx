import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginThunk } from 'redux/auth/auth.reducer';

const LoginPage = () => {
  const dispatch = useDispatch();
  const handleSubmit = e => {
    e.preventDefault();

    const email = e.target.userEmail.value;
    const password = e.target.userPassword.value;

    const formData = {
      email,
      password,
    };

    dispatch(loginThunk(formData));
  };

  return (
    <div className="container">
      <form
        action="submit"
        onSubmit={handleSubmit}
        className="form_login__register"
      >
        <label className="label_loginPage__registerPage">
          <p>Email</p>
          <input
            type="email"
            name="userEmail"
            className="loginPage_registerPage__input"
          />
        </label>
        <label className="label_loginPage__registerPage">
          <p>Password</p>
          <input
            type="text"
            name="userPassword"
            className="loginPage_registerPage__input"
          />
        </label>

        <button className="button_loginPage__registerPage" type="submit">
          Login
        </button>
      </form>
      <p className="text_loginPage">
        If you don't have an account, create one now
      </p>
      <Link to="/register">
        <button className="button_loginPage__registerPage">Register</button>
      </Link>
    </div>
  );
};

export default LoginPage;
