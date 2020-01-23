import React, { useState, useEffect } from 'react';
import { getProducts } from '../../helpers/userFetch';
import Card from './Card';

const Home = () => {
  const [productsBySold, setProductBySold] = useState([]);
  const [productsByArrival, setProductByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySold = () => {
    getProducts('sold').then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        console.log(data);
        setProductBySold(data);
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts('createdAt').then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        console.log(data);
        setProductByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySold();
  }, []);

  return (
    <div className="text-center m-3">
      <h2 className="mb-4">New Arrivals</h2>
      <div className="row">
        {productsByArrival.map((product, i) => (
          <Card key={i} product={product} />
        ))}
      </div>

      <h2 className="mb-4">Best Sellers</h2>
      <div className="row">
        {productsBySold.map((product, i) => (
          <Card key={i} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
