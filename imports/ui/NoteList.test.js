import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';
import {Meteor} from 'meteor/meteor';

import {NoteList} from './NoteList.js';

//text fixture - sample test data
import {notes} from '../fixtures/fixtures.js';

if (Meteor.isClient) {
  describe('NoteList',function () {
    it('should render noteslistitem for each note',function () {
      const wrapper = mount(<NoteList notes={notes}/>);

      expect(wrapper.find('NoteListItem').length).toBe(2);
      expect(wrapper.find('NoteListEmptyItem').length).toBe(0);
    });

    it('should render noteslistEMPTYitem if no notes',function () {
      const wrapper = mount(<NoteList notes={[]}/>);
      expect(wrapper.find('NoteListItem').length).toBe(0);
      expect(wrapper.find('NoteListEmptyItem').length).toBe(1);
    });


  })
}
