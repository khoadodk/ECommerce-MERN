import React, { useState } from 'react';

const RadioBox = ({ prices, handleFilters }) => {
  // eslint-disable-next-line
  const [value, setValue] = useState(0);

  const handleChange = event => {
    handleFilters(event.target.value);
    setValue(event.target.value);
  };

  return prices.map((p, i) => (
    <div key={i}>
      <input
        onChange={handleChange}
        value={`${p._id}`}
        name={p}
        type="radio"
        className="ml-4"
      />
      <label className="form-check-label font-weight-bold">{p.name}</label>
    </div>
  ));
};

export default RadioBox;
