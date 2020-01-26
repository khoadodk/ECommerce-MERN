import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Components
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import SignIn from './components/SignIn/SignIn';
import Navbar from './components/Navbar/Navbar';
import UserDashboard from './components/UserDashboard/UserDashboard';
import About from './components/About/About';

//PrivateRoutes folder
import AdminRoute from './PrivateRoutes/AdminRoute';
import PrivateRoute from './PrivateRoutes/PrivateRoute';

//AdminDashboard folder
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import CreateCategory from './components/AdminDashboard/CreateCategory';
import CreateProduct from './components/AdminDashboard/CreateProduct';
import Shop from './components/Shop/Shop';
import Search from './components/Search/Search';
import Product from './components/Product/Product';
import Cart from './components/Cart/Cart';
import Orders from './components/AdminDashboard/Order';

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          {/* User Routes */}
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/shop" component={Shop} />
          <Route exact path="/about" component={About} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/product/:productId" component={Product} />
          <Route exact path="/cart" component={Cart} />
          <PrivateRoute
            exact
            path="/user/dashboard"
            component={UserDashboard}
          />

          {/* Admin Routes */}
          <AdminRoute
            exact
            path="/admin/dashboard"
            component={AdminDashboard}
          />
          <AdminRoute
            exact
            path="/create/category"
            component={CreateCategory}
          />
          <AdminRoute exact path="/create/product" component={CreateProduct} />
          <AdminRoute exact path="/admin/orders" component={Orders} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
