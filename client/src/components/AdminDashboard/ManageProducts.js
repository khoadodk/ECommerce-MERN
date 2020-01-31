import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, deleteProduct } from '../../helpers/adminFetch';
import { isAuthenticated } from '../../helpers/authFetch';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const { user, token } = isAuthenticated();

  const loadProducts = () =>
    getProducts().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line
  }, []);

  const deleteProductButton = productId => {
    deleteProduct(productId, user._id, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadProducts();
      }
    });
  };

  return (
    <div className="container w-50">
      <h1 className="title m-3 text-center">Manage Products</h1>
      <h2>Total products: {products.length}</h2>
      <div className="row">
        <div className="col-12">
          <ul className="list-group">
            {products.map(p => (
              <li className="list-group-item" key={p._id}>
                <strong className="float-left">{p.name}</strong>
                <div className="float-right">
                  <Link to={`/admin/product/update/${p._id}`}>
                    <span className="badge badge-warning badge-pill m-2">
                      Update
                    </span>
                  </Link>

                  <Link to={`/admin/products`}>
                    <span
                      className="badge badge-danger badge-pill"
                      onClick={() => deleteProductButton(p._id)}
                    >
                      Delete
                    </span>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ManageProducts;
