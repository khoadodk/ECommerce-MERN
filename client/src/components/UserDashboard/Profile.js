import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../../helpers/authFetch';
import {
  getUser,
  updateUser,
  updateUserLocalStorage
} from '../../helpers/user';

const Profile = ({ match }) => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false
  });

  const { name, email, password, error, success } = values;
  const { token } = isAuthenticated();
  useEffect(() => {
    getUser(match.params.userId, token).then(data => {
      if (data.error) {
        setValues({ ...values, error: true });
      } else {
        setValues({ ...values, name: data.name, email: data.email });
      }
    });
    // eslint-disable-next-line
  }, []);

  const handleChange = name => event => {
    // console.log(event.target.value);
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    updateUser(match.params.userId, token, { name, email, password }).then(
      data => {
        if (data.error) {
          alert(data.error);
        } else {
          updateUserLocalStorage(data, () => {
            setValues({
              ...values,
              name: data.name,
              email: data.email,
              success: true
            });
          });
        }
      }
    );
  };

  const showSuccess = success => (
    <div
      className="alert alert-info"
      style={{ display: success ? '' : 'none' }}
    >
      Your profile has been updated successfully!
    </div>
  );

  const showError = error => (
    <div
      className="alert alert-danger"
      style={{ display: error ? '' : 'none' }}
    >
      Fail to update your profile
    </div>
  );

  const updateForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange('name')}
          value={name}
          type="text"
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          defaultValue={email}
          type="email"
          className="form-control"
          disabled
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={handleChange('password')}
          value={password}
          type="password"
          className="form-control"
        />
      </div>

      <div>
        <button className="btn btn-primary float-right" onClick={clickSubmit}>
          Update
        </button>
      </div>
    </form>
  );

  return (
    <div className="container w-50">
      <h1 className="title m-3 text-center">Profile update</h1>
      {showSuccess(success)}
      {showError(error)}
      {updateForm()}
    </div>
  );
};

export default Profile;
