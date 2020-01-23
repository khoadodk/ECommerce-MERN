import React from 'react';
import { Link } from 'react-router-dom';
import Images from './Images';

const Card = ({ product }) => {
  return (
    <div className="col-4 mb-3">
      <div className="card">
        <div className="card-header">{product.name}</div>
        <div className="card-body">
          <Images item={product} />
          <p>{product.description}</p>
          <p>${product.price}</p>
          <Link to="/">
            <button className="btn btn-outline-primary m-2">View</button>
          </Link>
          <button className="btn btn-outline-success m-2">Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default Card;