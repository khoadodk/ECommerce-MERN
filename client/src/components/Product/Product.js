import React, { useState, useEffect } from 'react';
import { getSingleProduct, getRelatedProducts } from '../../helpers/userFetch';
import Card from '../Home/Card';

const Product = ({ match }) => {
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { setError } = useState(false);

  useEffect(() => {
    const productId = match.params.productId;
    //Fetch single Product
    getSingleProduct(productId).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        // Fetch related products if fetch single product successfully
        getRelatedProducts(data._id).then(data => {
          if (data.error) {
            setError(data.error);
          } else {
            setRelatedProducts(data);
          }
        });
      }
    });
    // eslint-disable-next-line
  }, []);

  // console.log(product);
  // console.log(relatedProducts);
  const showNoRelated = () => {
    return relatedProducts.length === 0 && <h4>No related products found.</h4>;
  };

  return (
    <>
      <div className="m-2 d-flex justify-content-center">
        <div className="col-6">
          {product && product.description && (
            <Card product={product} showViewButton={false} />
          )}
        </div>
      </div>
      <div className="text-center">
        <h1 className="title p-3">Related Products</h1>
        {showNoRelated()}
        <div className="row m-2">
          {relatedProducts.map(product => (
            <div className="col-4" key={product._id}>
              <Card product={product} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Product;
