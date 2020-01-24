import React from 'react';
import { Link } from 'react-router-dom';
import Images from './Images';
import moment from 'moment';

const Card = ({ product, showViewButton = true }) => {
  const showViewProductButton = showViewButton => {
    return (
      showViewButton && (
        <Link to={`/product/${product._id}`} className="mr-2">
          <button className="btn btn-outline-primary mt-2 mb-2">View</button>
        </Link>
      )
    );
  };

  const showAddToCartButton = () => {
    return (
      <button className="btn btn-outline-success mt-2 mb-2">Add to cart</button>
    );
  };

  const showStock = quantity => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill mb-2">In Stock</span>
    ) : (
      <span className="badge badge-primary badge-pill mb-2">Out of Stock</span>
    );
  };
  return (
    <div className="card h-100 text-center">
      <div className="card-header">{product.name}</div>
      <div className="card-body">
        <Images item={product} />
        <p>{product.description.substring(0, 50)}</p>
        <p>${product.price}</p>
        <p>Category: {product.category && product.category.name}</p>
        <p>Added {moment(product.createdAt).fromNow()}</p>

        {showStock(product.quantity)}
        <br />

        {showViewProductButton(showViewButton)}

        {showAddToCartButton()}
      </div>
    </div>
  );
};

export default Card;
