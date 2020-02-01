import React, { useState, useEffect } from 'react';
import { getCategories } from '../../helpers/adminFetch';
import { getFilteredProducts } from '../../helpers/userFetch';
import { defaultPrices } from './defaultPrices';

import Card from '../Home/Card';
import Checkbox from './Checkbox';
import RadioBox from './RadioButton';

const Shop = () => {
  const [categories, setCategories] = useState([]);
  const [myFilter, setMyFilter] = useState({
    filters: { category: [], price: [] }
  });
  const [setError] = useState(false);
  const [limit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);
  const [size, setSize] = useState(0);
  // console.log(myFilter.filters);

  useEffect(() => {
    //Get the categories from API
    getCategories().then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        // console.log(data);
        setCategories(data);
      }
    });
    //Get the filtered products from API
    getFilteredProducts(skip, limit, myFilter.filters).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults(data.data);
        //for Load More button, size from the API
        setSize(data.size);
        setSkip(0);
      }
    });
    // eslint-disable-next-line
  }, [myFilter]);

  const loadMore = () => {
    let toSkip = skip + limit;
    getFilteredProducts(toSkip, limit, myFilter.filters).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults([...filteredResults, ...data.data]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMore} className="btn btn-primary mb-5">
          Load more
        </button>
      )
    );
  };

  const handleCategory = categoryIds => {
    const newFilter = { ...myFilter };
    //push ids from checkbox component to the state
    newFilter.filters['category'] = categoryIds;
    setMyFilter(newFilter);
  };

  const handlePrice = priceId => {
    let priceRange = [];
    // 1. loop over the keys in the defaultPrice and find the price range that match the id
    for (let key in defaultPrices) {
      if (defaultPrices[key]._id === parseInt(priceId)) {
        priceRange = defaultPrices[key].array;
      }
    }
    // 2. set the price range in the existing filter
    let myNewFilter = { ...myFilter };
    myFilter.filters['price'] = priceRange;
    setMyFilter(myNewFilter);
  };

  return (
    <div className="text-center">
      <div className="m-3">
        <h1 className="title">Filter By </h1>
      </div>

      <div className="container-fluid ml-0 row mark d-flex justify-content-center align-content-center">
        <Checkbox
          categories={categories}
          handleFilters={categoryIds => handleCategory(categoryIds)}
        />
      </div>
      <div className="container-fluid ml-0 row  mark d-flex justify-content-center align-content-center">
        <RadioBox
          prices={defaultPrices}
          handleFilters={priceId => handlePrice(priceId)}
        />
      </div>

      <div className="row m-3 card-container">
        {filteredResults.map((product, i) => (
          <div className="col-4 mb-3" key={i}>
            <Card product={product} />
          </div>
        ))}
      </div>
      {loadMoreButton()}
    </div>
  );
};

export default Shop;
