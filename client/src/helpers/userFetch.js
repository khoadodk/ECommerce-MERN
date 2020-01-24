import queryString from 'query-string';

export const getProductsBySearch = params => {
  const query = queryString.stringify(params);
  console.log('query', query);
  return fetch(`${process.env.REACT_APP_API_URL}/products/search?${query}`, {
    method: 'GET'
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getProducts = sortBy => {
  return fetch(
    `${process.env.REACT_APP_API_URL}/products?sortBy=${sortBy}&order=desc&limit=6`,
    {
      method: 'GET'
    }
  )
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getFilteredProducts = (skip, limit, filters = {}) => {
  const data = {
    limit,
    skip,
    filters
  };
  return fetch(`${process.env.REACT_APP_API_URL}/products/by/search`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};
