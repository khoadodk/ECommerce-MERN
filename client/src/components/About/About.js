import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="col-md-6 offset-md-3">
      <h4 className="pt-4 pb-3 text-center">MongoDB Express React Node</h4>

      <strong>To test this app:</strong>
      <ul>
        <li>Admin: khoado.dk@gmail.com/test1234</li>
        <li>User: user@email.com/test1234</li>
        <li>Credit Card: 4111 1111 1111 1111 02/22</li>
      </ul>

      <hr />
      <div>
        <h4>App features:</h4>
        <ul className="ml-5">
          <li>Login/Signup system</li>
          <li>Forgot/Reset password via email</li>
          <li>User/Admin dashboard</li>
          <li>CRUD products/categories in Admin dashboard</li>
          <li>Products filtered by category or price</li>
          <li>Product page with related products</li>
          <li>Shopping cart</li>
          <li>Payment with PayPal</li>
        </ul>
      </div>

      <footer className="bg-dark p-2 fixed-bottom">
        <div className="container-fluid text-white">
          <div className="row">
            <div className="col-6">
              <p className="mb-0 ">
                Copyright &copy; 2020 All Rights Reserved by Khoa Do
              </p>
            </div>
            <div className="col-6 d-flex justify-content-center align-items-center">
              <div className="mr-3">
                <i className="fab fa-facebook "></i>
              </div>
              <div className="mr-3">
                <i className="fab fa-linkedin"></i>
              </div>
              <div className="mr-3">
                <i className="fab fa-dribbble"></i>
              </div>
              <div className="mr-3">
                <i className="fab fa-instagram"></i>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
