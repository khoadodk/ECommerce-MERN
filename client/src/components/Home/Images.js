import React from 'react';

const Images = ({ item }) => {
  return (
    <div className="product-img">
      <img
        src={`${process.env.REACT_APP_API_URL}/product/photo/${item._id}`}
        alt={item.name}
        className="mb-3"
        style={{ maxHeight: '50%', maxWidth: '50%' }}
      />
    </div>
  );
};

export default Images;
