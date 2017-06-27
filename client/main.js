import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import { routes, onAuthChange} from '../imports/routes/Routes.js';
import '../imports/startup/simple-schema-configuration.js';
import { Session } from 'meteor/session';
import {browserHistory} from 'react-router';

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  const currentPagePrivacy = Session.get('currentPagePrivacy');
  onAuthChange(isAuthenticated,currentPagePrivacy);
});

Tracker.autorun(() => {
  const selectedNoteId = Session.get('selectedNoteId');
  if (selectedNoteId) {
    // used brwoser history
    browserHistory.replace(`/dashboard/${selectedNoteId}`);
  }
  // new route created!

});
//call tracker

// Stateless functional Component - (presentational component)
// Are Sessions always started in client main.js????
Meteor.startup(() => {
  Session.set('selectedNoteId',undefined);
  ReactDOM.render(routes, document.getElementById('app'));
});
