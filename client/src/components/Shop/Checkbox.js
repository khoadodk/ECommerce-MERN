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
    <li className="list-unstyled ml-4" key={category._id}>
      <div className="form-check">
        <input
          type="checkbox"
          className="form-check-input "
          onChange={handleToggle(category._id)}
        />
        <label className="form-check-label font-weight-bold">
          {category.name}
        </label>
      </div>
    </li>
  ));
};

export default Checkbox;
