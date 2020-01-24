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
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);
  const [size, setSize] = useState(0);
  //   console.log(myFilter);

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
  }, [myFilter]);

  const loadMore = () => {
    let toSkip = skip + limit;
    getFilteredProducts(toSkip, limit, myFilter.filters).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        console.log(data.data);
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
    for (let key in defaultPrices) {
      if (defaultPrices[key]._id === parseInt(priceId)) {
        priceRange = defaultPrices[key].array;
      }
    }
    let myNewFilter = { ...myFilter };
    myFilter.filters['price'] = priceRange;
    setMyFilter(myNewFilter);
  };

  return (
    <div className="text-center">
      <div className=" m-3">
        <h2>Filter By</h2>
      </div>

      <div className="row justify-content-center">
        <p>
          <strong>Categories:</strong>
        </p>
        <Checkbox
          categories={categories}
          handleFilters={categoryIds => handleCategory(categoryIds)}
        />
      </div>
      <div className="row justify-content-center mt-2">
        <p>
          <strong>Prices:</strong>
        </p>
        <RadioBox
          prices={defaultPrices}
          handleFilters={priceId => handlePrice(priceId)}
        />
      </div>
      <div className="text-center">
        <h4>Results</h4>
      </div>
      <div className="row m-3">
        {filteredResults.map((product, i) => (
          <Card key={i} product={product} />
        ))}
      </div>
      {loadMoreButton()}
    </div>
  );
};

export default Shop;
