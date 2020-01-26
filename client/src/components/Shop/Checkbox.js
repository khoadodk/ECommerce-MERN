import React, { useState } from 'react';

const Checkbox = ({ categories, handleFilters }) => {
  const [checked, setChecked] = useState([]);

  const handleToggle = categoryId => () => {
    //return -1 if categoryId is not in the checked state
    const currentCategoryId = checked.indexOf(categoryId);
    //if -1, push it to the state, else splice it out
    const newCheckedCategoryId = [...checked];
    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(categoryId);
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1);
    }
    setChecked(newCheckedCategoryId);
    //pass [ids] to parent components
    handleFilters(newCheckedCategoryId);
  };

  return categories.map(category => (
    <li className="list-unstyled ml-5" key={category._id}>
      <input
        type="checkbox"
        className="form-check-input"
        //return false or true
        value={checked.indexOf(category._id === -1)}
        onChange={handleToggle(category._id)}
      />
      <label className="form-check-label">{category.name}</label>
    </li>
  ));
};

export default Checkbox;
