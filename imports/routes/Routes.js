import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import {Settion} from 'meteor/session';

import Signup from '../ui/Signup.js';
import Dashboard from '../ui/Dashboard.js';
import NotFound from '../ui/NotFound.js';
import Login from '../ui/Login.js';

const onEnterNotePage = (nextState) => {
Session.set('selectedNoteId',nextState.params.id);
};

export const onAuthChange = (isAuthenticated, currentPagePrivacy) => {
  const isUnauthenticatedPage = currentPagePrivacy === 'unauth';
  const isAuthenticatedPage = currentPagePrivacy === 'auth';

  if (isUnauthenticatedPage && isAuthenticated) {
    browserHistory.replace('/dashboard');
  } else if (isAuthenticatedPage && !isAuthenticated) {
    browserHistory.replace('/');
  }
};

export const globalOnChange = (previousState,nextState) => {
  globalOnEnter(nextState);
}

export const onLeaveNotePage = () => {
  Session.set('selectedNoteId',undefined);
}

export const globalOnEnter = (nextState) => {
  const lastRoute = nextState.routes[nextState.routes.length-1];
  Session.set('currentPagePrivacy',lastRoute.privacy);
}

export const routes = (
  <Router history={browserHistory}>
  <Route onEnter={globalOnEnter} onChange={globalOnChange}>
    <Route path="/" component={Login} privacy='unauth' />
    <Route path="/signup" component={Signup} privacy='unauth'/>
    <Route path="/dashboard" component={Dashboard} privacy='auth'/>
    <Route path="/dashboard/:id"
      component={Dashboard}
      privacy='auth'
      onEnter={onEnterNotePage}
      onLeave={onLeaveNotePage}/>
    <Route path="*" privacy='unauth' component={NotFound}/>
  </Route>
  </Router>
);
