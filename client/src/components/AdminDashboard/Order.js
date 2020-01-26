import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { getOrders } from '../../helpers/adminFetch';
import { isAuthenticated } from '../../helpers/authFetch';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { user, token } = isAuthenticated();

  useEffect(() => {
    getOrders(user._id, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log(data);
        setOrders(data);
      }
    });
  }, []);

  return (
    <div>
      <h1 className="text-center mt-2">Total orders: {orders.length}</h1>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {orders.map((o, oIndex) => {
            return (
              <div
                className="mt-2"
                key={oIndex}
                style={{ borderBottom: '5px solid indigo' }}
              >
                <h4 className="mb-3 text-primary">
                  <span className="">Order ID: {o._id}</span>
                </h4>

                <ul className="list-group mb-2">
                  <li className="list-group-item text-danger">
                    <strong>{o.status}</strong>
                  </li>
                  <li className="list-group-item">
                    Transaction ID: {o.transaction_id}
                  </li>
                  <li className="list-group-item">Amount: ${o.amount}</li>
                  <li className="list-group-item">Ordered by: {o.user.name}</li>
                  <li className="list-group-item">
                    Ordered on: {moment(o.createdAt).fromNow()}
                  </li>
                  <li className="list-group-item">
                    Delivery address: {o.address}
                  </li>
                </ul>

                <h3 className="mt-4 mb-4 font-italic">
                  Total products in the order: {o.products.length}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Orders;
