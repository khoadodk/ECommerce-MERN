import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isAuthenticated, signout } from '../../helpers/auth';

const Navbar = ({ history }) => {
  const isActive = path => {
    if (history.location.pathname === path) {
      return { color: '#000' };
    } else {
      return { color: '#fff' };
    }
  };
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark sticky-top">
      <Link className="navbar-brand" to="/">
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
              Home
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

          {isAuthenticated() && (
            <>
              <li className="nav-item">
                <Link
                  to="/signin"
                  className="nav-link"
                  style={isActive('/signout')}
                  onClick={() => signout()}
                >
                  Sign Out
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
