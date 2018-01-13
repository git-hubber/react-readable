import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MainPage from '../views/MainPage';
import PostPage from '../views/PostPage';
import NotFoundPage from '../views/NotFoundPage';
import Header from '../components/Header';
import NavHeader from '../components/NavHeader';

export const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <NavHeader />
      <Switch>
        <Route
          exact path='/'
          component={MainPage}
        />
        <Route
          path='/categories/:id'
          component={MainPage}
        />
        <Route
          path='/post/:id'
          component={PostPage}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);
