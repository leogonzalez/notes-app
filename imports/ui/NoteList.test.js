import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';
import {Meteor} from 'meteor/meteor';

import {NoteList} from './NoteList.js';

const notes = [
  {
    _id: 'noteid1',
    title: 'anything1',
    body: 'more of anything1',
    userId: 'leo1',
    updatedAt: 0
  }, {
    _id: 'noteid2',
    title: '',
    body: 'more of anything2',
    userId: 'leo2',
    updatedAt: 0
  }
];

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
