import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './components/Home/Home';
import Register from './components/Register/Register';
import SignIn from './components/SignIn/SignIn';
import Navbar from './components/Navbar/Navbar';

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/signin" component={SignIn} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
