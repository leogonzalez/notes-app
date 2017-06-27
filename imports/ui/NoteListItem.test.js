import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';
import {Meteor} from 'meteor/meteor';

import NoteListItem from './NoteListItem.js';

if (Meteor.isClient) {
  describe('note list item',function () {
    it('should render title and time stamp passed is shown',function () {
      const title = 'My title here';
      const timestamp = '1498519961196';
      const wrapper = mount(<NoteListItem note={{title,timestamp}}/>);
      expect(wrapper.find('h5').text()).toBe(title);
      expect(wrapper.find('p').text()).toBe('Updated at: 6/27/17 ');
    });

    it('should set default title if no title set',function () {
      const timestamp = '1498519961196';
      const wrapper = mount(<NoteListItem note={{title:'',timestamp}}/>);
      expect(wrapper.find('h5').text()).toBe('Untitled Note');
      expect(wrapper.find('p').text()).toBe('Updated at: 6/27/17 ');
    });
  })
}
