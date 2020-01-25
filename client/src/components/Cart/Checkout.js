import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../../helpers/authFetch';
import { Link } from 'react-router-dom';

const Checkout = ({ products }) => {
  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  return (
    <div>
      <h2>Total: ${getTotal()}</h2>
      {isAuthenticated() ? (
        <button className="btn btn-success">Checkout</button>
      ) : (
        <Link to="/signin">Please sign in to checkout</Link>
      )}
    </div>
  );
};

export default Checkout;
