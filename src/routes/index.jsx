import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import MainPage from '../pages/main';
import DetailPage from '../pages/detail';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route exact path="/detail">
          <DetailPage />
        </Route>
      </Switch>
    </Router>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.oneOfType([PropTypes.any]).isRequired,
};

export default Root;
