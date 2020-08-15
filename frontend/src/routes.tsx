import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Posts from './pages/Posts';
import Post from './pages/Post';
import PostForm from './pages/PostForm';

function Routes() {
  return <BrowserRouter>
    <Switch>
      <Route path='/' exact component={Posts} />
      <Route path='/create' component={PostForm} />
      <Route path='/:id' component={Post} />
    </Switch>
  </BrowserRouter>
}

export default Routes;