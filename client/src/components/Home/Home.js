import React, { useState, useEffect } from 'react';
import { getProducts } from '../../helpers/userFetch';
import Card from './Card';

const Home = () => {
  const [productsBySold, setProductBySold] = useState([]);
  const [productsByArrival, setProductByArrival] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadProductsBySold = () => {
    getProducts('sold').then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setLoading(false);
        setProductBySold(data);
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts('createdAt').then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setLoading(false);
        setProductByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySold();
  }, []);

  const showError = () => error && <h2>Fail to load!</h2>;

  const showLoading = () =>
    loading && (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );

  return (
    <div id="home">
      <div className="p-3">
        <div className="text-center mt-3">
          {showError()}
          <h1 className="mb-4 title">New Arrivals</h1>
          {showLoading()}

          <div className="row">
            {productsByArrival.map((product, i) => (
              <div className="col-4 mb-3" key={i}>
                <Card product={product} />
              </div>
            ))}
          </div>

          <h1 className="mb-4 title">Best Sellers</h1>
          {showLoading()}
          <div className="row">
            {productsBySold.map((product, i) => (
              <div className="col-4 mb-3" key={i}>
                <Card product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
