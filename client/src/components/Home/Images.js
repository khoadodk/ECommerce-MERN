import React from 'react';

const Images = ({ item }) => {
  return (
    <div className="product-img">
      <img
        src={`${process.env.REACT_APP_API_URL}/product/photo/${item._id}`}
        alt={item.name}
        className="m-3"
      />
    </div>
  );
};

export default Images;
