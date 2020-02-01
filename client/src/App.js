import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Components
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import SignIn from './components/SignIn/SignIn';
import Navbar from './components/Navbar/Navbar';
import UserDashboard from './components/UserDashboard/UserDashboard';
import About from './components/About/About';
import Shop from './components/Shop/Shop';
import Search from './components/Search/Search';
import Product from './components/Product/Product';
import Cart from './components/Cart/Cart';

//PrivateRoutes folder
import PrivateRoute from './PrivateRoutes/PrivateRoute';
import Profile from './components/UserDashboard/Profile';

//AdminDashboard folder
import AdminRoute from './PrivateRoutes/AdminRoute';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import CreateCategory from './components/AdminDashboard/CreateCategory';
import CreateProduct from './components/AdminDashboard/CreateProduct';
import Orders from './components/AdminDashboard/Order';
import ManageProducts from './components/AdminDashboard/ManageProducts';
import ManageCategories from './components/AdminDashboard/ManageCategories';
import UpdateCategory from './components/AdminDashboard/UpdateCategory';
import UpdateProduct from './components/AdminDashboard/UpdateProduct';
import ForgotPage from './components/ForgotPage/ForgotPage';
import ResetPage from './components/ResetPage/ResetPage';

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
          <Route exact path="/auth/password/forgot" component={ForgotPage} />
          <Route
            exact
            path="/auth/password/reset/:token"
            component={ResetPage}
          />
          <PrivateRoute
            exact
            path="/user/dashboard"
            component={UserDashboard}
          />
          <PrivateRoute exact path="/profile/:userId" component={Profile} />
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
          <AdminRoute exact path="/admin/products" component={ManageProducts} />
          <AdminRoute
            exact
            path="/admin/product/update/:productId"
            component={UpdateProduct}
          />
          <AdminRoute
            exact
            path="/admin/categories"
            component={ManageCategories}
          />
          <AdminRoute
            exact
            path="/admin/category/update/:categoryId"
            component={UpdateCategory}
          />
        </Switch>
      </Router>
    </>
  );
};

export default App;
