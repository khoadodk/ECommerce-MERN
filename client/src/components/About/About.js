import React from 'react';

const Home = () => {
  return (
    <div className="col-md-6 offset-md-3">
      <h4 className="pt-4 pb-3 text-center">MongoDB Express React Node</h4>
      <p>
        <strong>To test this app:</strong>
        <ul>
          <li>Admin: khoado.dk@gmail.com/test1234</li>
          <li>User: dk.khoado@yahoo.com/test1234</li>
          <li>Credit Card: 4111 1111 1111 1111 02/22</li>
        </ul>
      </p>
      <hr />
      <div>
        <h4>App features:</h4>
        <ul className="ml-5">
          <li>Login/Signup system</li>
          <li>User/Admin dashBoard</li>
          <li>Products filtered by category or price</li>
          <li>Product page with related products</li>
          <li>Shopping cart</li>
          <li>Payment with PayPal</li>
        </ul>
      </div>
      <footer className="text-center">Created by &copy; Khoa Do 2020</footer>
    </div>
  );
};
export default Home;
