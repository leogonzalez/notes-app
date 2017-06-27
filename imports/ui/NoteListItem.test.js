import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';
import {Meteor} from 'meteor/meteor';

import {NoteListItem} from './NoteListItem.js';
import {notes} from '../fixtures/fixtures.js';

if (Meteor.isClient) {
  describe('note list item',function () {
    let Session;

    beforeEach(() => {
      Session = {
        set: expect.createSpy()
      };
    });

    it('should render title and time stamp passed is shown',function () {
      const title = 'My title here';
      const timestamp = '1498519961196';
      const wrapper = mount(<NoteListItem note={notes[0]} Session={Session}/>);
      expect(wrapper.find('h5').text()).toBe(notes[0].title);
      expect(wrapper.find('p').text()).toBe('Updated at: 6/26/17 ');
    });

    it('should set default title if no title set',function () {
      const wrapper = mount(<NoteListItem note={notes[1]} Session={Session}/>);
      expect(wrapper.find('h5').text()).toBe('Untitled Note');
      expect(wrapper.find('p').text()).toBe('Updated at: 6/26/17 ');
    });
// render
    it('should call set on click',function () {
      const wrapper = mount(<NoteListItem note={notes[0]} Session={Session}/>);
      wrapper.find('div').simulate('click');
      // debugger;
      expect(Session.set).toHaveBeenCalledWith('selectedNoteId',notes[0]._id);

    });
  })
}
