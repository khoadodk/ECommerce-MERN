export const createCategory = (userId, token, category) => {
  return fetch(`${process.env.REACT_APP_API_URL}/category/create/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(category)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export const createProduct = (userId, token, product) => {
  return fetch(`${process.env.REACT_APP_API_URL}/product/create/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: product
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export const getCategories = () => {
  return fetch(`${process.env.REACT_APP_API_URL}/categories`, {
    method: 'GET'
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getOrders = (userId, token) => {
  return fetch(`${process.env.REACT_APP_API_URL}/order/list/${userId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getStatusValues = (userId, token) => {
  return fetch(
    `${process.env.REACT_APP_API_URL}/order/status-values/${userId}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
  )
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const updateOrderStatus = (userId, token, orderId, status) => {
  return fetch(
    `${process.env.REACT_APP_API_URL}/order/${orderId}/status/${userId}`,
    {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status, orderId })
    }
  )
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};
