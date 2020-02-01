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
    // eslint-disable-next-line
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
    <div>
      {showError()}
      <h1 className="title pt-3 pb-3">New Arrivals</h1>
      {showLoading()}

      <div className="container-fluid row m-0 p-0 card-container">
        {productsByArrival.map((product, i) => (
          <div className="col-4 mb-3" key={i}>
            <Card product={product} />
          </div>
        ))}
      </div>

      <h1 className="title pt-3 pb-3">Best Sellers</h1>
      {showLoading()}
      <div className="container-fluid row m-0 p-0 card-container">
        {productsBySold.map((product, i) => (
          <div className="col-4 mb-3" key={i}>
            <Card product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
