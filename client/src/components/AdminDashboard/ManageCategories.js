import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, deleteCategory } from '../../helpers/adminFetch';
import { isAuthenticated } from '../../helpers/authFetch';

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);

  const { user, token } = isAuthenticated();

  const loadCategories = () =>
    getCategories().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });

  useEffect(() => {
    loadCategories();
    // eslint-disable-next-line
  }, []);

  const deleteCategoryButton = categoryId => {
    deleteCategory(user._id, token, categoryId).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadCategories();
      }
    });
  };

  return (
    <div className="container w-50">
      <h1 className="title m-3 text-center">Manage Categories</h1>
      <h2>Total categories: {categories.length}</h2>
      <div className="row">
        <div className="col-12">
          <ul className="list-group">
            {categories.map(c => (
              <li className="list-group-item" key={c._id}>
                <strong className="float-left">{c.name}</strong>
                <div className="float-right">
                  <Link to={`/admin/category/update/${c._id}`}>
                    <span className="badge badge-warning badge-pill m-2">
                      Update
                    </span>
                  </Link>

                  <Link to={`/admin/categories`}>
                    <span
                      className="badge badge-danger badge-pill"
                      onClick={() => deleteCategoryButton(c._id)}
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

export default ManageCategories;
