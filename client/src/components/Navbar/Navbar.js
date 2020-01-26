import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isAuthenticated, signout } from '../../helpers/authFetch';
import { getItemTotal } from '../../helpers/cart';

const Navbar = ({ history }) => {
  const isActive = path => {
    if (history.location.pathname === path) {
      return { color: '#007bff' };
    } else {
      return { color: '#fff' };
    }
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark sticky-top">
      <Link className="navbar-brand" to="/about">
        My Store <i className="fa fa-store"></i>
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbar"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbar">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/" className="nav-link" style={isActive('/')}>
              <i className="fa fa-home"></i>&nbsp;Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/shop" className="nav-link" style={isActive('/shop')}>
              Shop
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/search" className="nav-link" style={isActive('/search')}>
              Search
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/cart" className="nav-link" style={isActive('/cart')}>
              <i className="fa fa-shopping-cart"></i>&nbsp;
              <sup>
                <medium>{getItemTotal()}</medium>
              </sup>
            </Link>
          </li>

          {!isAuthenticated() && (
            <>
              <li className="nav-item">
                <Link
                  to="/register"
                  className="nav-link"
                  style={isActive('/register')}
                >
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/signin"
                  className="nav-link"
                  style={isActive('/signin')}
                >
                  Sign In
                </Link>
              </li>
            </>
          )}

          {/* Admin Links */}
          {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <>
              <li className="nav-item">
                <Link
                  to="/admin/dashboard"
                  className="nav-link"
                  style={isActive('/admin/dashboard')}
                >
                  <i className="fa fa-user-circle"></i>&nbsp;Admin
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/signin"
                  className="nav-link"
                  style={isActive('/signout')}
                  onClick={() => signout()}
                >
                  <i className="fa fa-sign-out-alt"></i>
                </Link>
              </li>
            </>
          )}
          {/* User Links */}
          {isAuthenticated() && isAuthenticated().user.role === 0 && (
            <>
              <li className="nav-item">
                <Link
                  to="/user/dashboard"
                  className="nav-link"
                  style={isActive('/user/dashboard')}
                >
                  <i className="fa fa-user-circle"></i>&nbsp;
                  {isAuthenticated().user.name}
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/signin"
                  className="nav-link"
                  style={isActive('/signout')}
                  onClick={() => signout()}
                >
                  <i className="fa fa-sign-out-alt"></i>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default withRouter(Navbar);
