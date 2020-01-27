import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Images from './Images';
import moment from 'moment';
import { addItem, updateItem, removeItem } from '../../helpers/cart';

const Card = ({
  product,
  showViewButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRender = f => f,
  render = undefined
}) => {
  const [count, setCount] = useState(1);
  const [redirect, setRedirect] = useState(false);

  const showViewProductButton = showViewButton => {
    return (
      showViewButton && (
        <Link to={`/product/${product._id}`} className="mr-2">
          <button className="btn btn-outline-primary mt-2 mb-2">View</button>
        </Link>
      )
    );
  };
  const showStock = quantity => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill mb-2">In Stock</span>
    ) : (
      <span className="badge badge-primary badge-pill mb-2">Out of Stock</span>
    );
  };

  // Add to cart functionality
  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };

  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = showAddToCartButton => {
    return (
      showAddToCartButton && (
        <button
          className="btn btn-outline-success mt-2 mb-2"
          onClick={addToCart}
        >
          Add to cart
        </button>
      )
    );
  };
  //Remove item from cart functionality
  const showRemoveButton = showRemoveProductButton => {
    return (
      showRemoveProductButton && (
        <button
          className="btn btn-outline-danger mt-2 mb-2"
          onClick={() => {
            removeItem(product._id, () => setRedirect(true));
            setRender(!render); //re-render setItem in localstorage
          }}
        >
          Remove
        </button>
      )
    );
  };

  // update cart functionality

  const handleChange = productId => e => {
    setRender(!render); //re-render setItem in localstorage
    setCount(e.target.value < 1 ? 1 : e.target.value);
    if (e.target.value >= 1) {
      updateItem(productId, e.target.value);
    }
  };

  const showCartUpdateOptions = cartUpdate => {
    return (
      cartUpdate && (
        <div className="input-group mt-1">
          <div className="input-group-prepend">
            <span className="input-group-text">Quantity</span>
          </div>
          <input
            type="number"
            className="form-control"
            value={count}
            onChange={handleChange(product._id)}
          />
        </div>
      )
    );
  };

  return (
    <div className="card h-100 text-center">
      <div className="card-header">{product.name}</div>
      <div className="card-image">
        {shouldRedirect(redirect)}
        <Images item={product} />
      </div>
      <div className="column card-body">
        <p>{product.description.substring(0, 50)}</p>
        <hr />
        <h5>${product.price}</h5>
        <hr />
        <p>Category: {product.category && product.category.name}</p>
        <hr />
        <p>Added {moment(product.createdAt).fromNow()}</p>

        <div>{showStock(product.quantity)}</div>
        <div>
          {showViewProductButton(showViewButton)}

          {showAddToCart(showAddToCartButton)}

          {showRemoveButton(showRemoveProductButton)}
        </div>
        {showCartUpdateOptions(cartUpdate)}
      </div>
    </div>
  );
};

export default Card;
