import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './components/Home/Home';
import Register from './components/Register/Register';
import SignIn from './components/SignIn/SignIn';
import Navbar from './components/Navbar/Navbar';
import PrivateRoute from './PrivateRoutes/PrivateRoute';
import UserDashboard from './components/UserDashboard/UserDashboard';
import AdminRoute from './PrivateRoutes/AdminRoute';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/signin" component={SignIn} />
          <PrivateRoute
            exact
            path="/user/dashboard"
            component={UserDashboard}
          />
          <AdminRoute
            exact
            path="/admin/dashboard"
            component={AdminDashboard}
          />
        </Switch>
      </Router>
    </>
  );
};

export default App;
