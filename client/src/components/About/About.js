import React from 'react';

const Home = () => {
  return (
    <div className="col-md-6 offset-md-3">
      <h4 className="pt-4 pb-3 text-center">MongoDB Express React Node</h4>

      <hr />
      <div>
        <h3>App features:</h3>
        <ul className="ml-5">
          <li>Login/Signup system</li>
          <li>Forgot/Reset password via email</li>
          <li>User/Admin dashboard</li>
          <li>CRUD products, categories</li>
          <li>Products filtered by search, category and price</li>
          <li>Product page with related products</li>
          <li>Shopping cart</li>
          <li>Payment with PayPal</li>
          <li>Order notification</li>
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
