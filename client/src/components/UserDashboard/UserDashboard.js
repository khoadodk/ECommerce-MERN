import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { isAuthenticated } from '../../helpers/authFetch';
import { getPurchaseHistory } from '../../helpers/user';

const UserDashboard = () => {
  const [history, setHistory] = useState([]);

  const {
    user: { name, email, role, _id }
  } = isAuthenticated();
  const token = isAuthenticated().token;

  // console.log(_id);
  // console.log(token);
  // console.log(history);

  useEffect(() => {
    getPurchaseHistory(_id, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setHistory(data);
      }
    });
    // eslint-disable-next-line
  }, []);

  const userLinks = () => {
    return (
      <div className="card ">
        <h4 className="card-header">User Links</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/cart">
              My Cart
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to={`/profile/${_id}`}>
              Update Profile
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const userInfo = () => {
    return (
      <div className="card mb-5 card-dashboard">
        <h3 className="card-header">User Information</h3>
        <ul className="list-group">
          <li className="list-group-item">Name:&nbsp;{name}</li>
          <li className="list-group-item">Email:&nbsp;{email}</li>
          <li className="list-group-item">
            Role:&nbsp;{role === 1 ? 'Admin' : 'Registered User'}
          </li>
        </ul>
      </div>
    );
  };

  const purchaseHistory = history => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">Purchase history</h3>
        <ul className="list-group">
          <li className="list-group-item">
            {history.map(h => {
              return (
                <div key={h._id}>
                  <h3>Total Products:&nbsp;{h.products.length}</h3>
                  <hr />
                  {h.products.map(p => {
                    return (
                      <div key={p._id}>
                        <h6>Name: {p.name}</h6>
                        <h6>Price: ${p.price}</h6>
                        <h6>Purchase Date: {moment(p.createdAt).fromNow()}</h6>
                        <hr />
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <div className="row p-5 card-container">
      <div className="col-4">{userLinks()}</div>
      <div className="col-8">
        {userInfo()}
        {purchaseHistory(history)}
      </div>
    </div>
  );
};

export default UserDashboard;
