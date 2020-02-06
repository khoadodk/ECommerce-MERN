import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { signin, authenticate } from '../../helpers/authFetch';
import Google from '../Google/Google';
import Facebook from '../FacebookLogin/FaceBookLogin';

const Signin = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
    redirectToReferrer: false
  });

  const { email, password, loading, error, redirectToReferrer } = values;

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password }).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true
          });
        });
      }
    });
  };

  const signUpForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={handleChange('email')}
          type="email"
          className="form-control"
          value={email}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={handleChange('password')}
          type="password"
          className="form-control"
          value={password}
        />
      </div>
      <div>
        <p>
          Don't remember your password?
          <Link to="/auth/password/forgot">&nbsp;Click here!</Link>
        </p>
      </div>
      <button onClick={clickSubmit} className="btn btn-primary float-right">
        Submit
      </button>
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

  const showLoading = () =>
    loading && (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );

  const redirectUser = () => {
    if (redirectToReferrer) {
      return <Redirect to="/" />;
    }
  };

  const informParent = response => {
    authenticate(response, () => {
      setValues({
        ...values,
        redirectToReferrer: true
      });
    });
  };

  return (
    <div className="container w-50">
      <h1 className="title">Sign In</h1>
      {showLoading()}
      {showError()}
      <div className="text-center">
        <Google informParent={informParent} />
        <Facebook informParent={informParent} />
      </div>

      {signUpForm()}
      {redirectUser()}
    </div>
  );
};

export default Signin;
