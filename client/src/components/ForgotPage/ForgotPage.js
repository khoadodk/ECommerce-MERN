import React, { useState } from 'react';
import { forgotPasswordFetch } from '../../helpers/authFetch';

const ForgotPage = () => {
  const [values, setValues] = useState({
    email: '',
    error: '',
    success: false
  });

  const { email, error, success } = values;

  const handleChange = event => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false });
    forgotPasswordFetch({ email }).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, error: false, success: true });
      }
    });
  };

  const forgotPasswordForm = () => (
    <form>
      <div className="form-group">
        <input
          onChange={handleChange}
          name="email"
          value={email}
          type="email"
          placeholder="Email"
          className="form-control"
        />
      </div>
      <div>
        <button className="btn btn-primary float-right" onClick={clickSubmit}>
          Submit
        </button>
      </div>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: success ? '' : 'none' }}
    >
      We sent a reset password link to your email!
    </div>
  );

  return (
    <div className="container w-50">
      <h1 className="title pt-3 pb-3">Forgot Password</h1>
      {showError()}
      {showSuccess()}
      {forgotPasswordForm()}
    </div>
  );
};

export default ForgotPage;
