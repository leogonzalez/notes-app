import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { Editor } from './Editor.js';
import {notes} from '../fixtures/fixtures';

if (Meteor.isClient) {
  describe('editor',function () {
    let browserHIstory;
    let call;

    beforeEach(function () {
      call = expect.createSpy();
      browserHistory = {
        push: expect.createSpy()
      };

    });

    it('should render text to Pick a note when none selected',function () {
      const wrapper = mount(<Editor/>);
      expect(wrapper.find('p').text()).toBe('Pick a Note to Get Started!');
    });

    it('should render Note not found when not found',function () {
      const wrapper = mount(<Editor selectedNoteId={'id1'}/>);
      expect(wrapper.find('p').text()).toBe('Note Not Found');
    });

    it('should remove note and call method when clicked',function() {
      const wrapper = mount(<Editor
                              note={notes[0]}
                              call={call}
                              browserHistory={browserHistory}
                              selectedNoteId={notes[0]._id}/>);
      wrapper.find('button').simulate('click');
      expect(call).toHaveBeenCalledWith('notes.remove',notes[0]._id);
      expect(browserHistory.push).toHaveBeenCalledWith('/dashboard');
    });

    it('it should update the note body on textarea change',function () {
      const newBody = 'This is my new body text';
      const wrapper = mount(<Editor
                              note={notes[0]}
                              call={call}
                              browserHistory={browserHistory}
                              selectedNoteId={notes[0]._id}/>);
      wrapper.find('textarea').simulate('change',{
        target:{
          value: newBody
        }});
      // debugger;
      expect(wrapper.state("body")).toBe(newBody);
      expect(call).toHaveBeenCalledWith('notes.update',notes[0]._id,{body:newBody});
    });

    it('it should update the note title on input change',function () {
      const newTitle = 'This is my new body text';
      const wrapper = mount(<Editor
                              note={notes[0]}
                              call={call}
                              browserHistory={browserHistory}
                              selectedNoteId={notes[0]._id}/>);
      wrapper.find('input').simulate('change',{
        target:{
          value: newTitle
        }});
      // debugger;
      expect(wrapper.state("title")).toBe(newTitle);
      expect(call).toHaveBeenCalledWith('notes.update',notes[0]._id,{title:newTitle});
    });

    it('should set state for new note',function () {
      const wrapper = mount(<Editor
                              call={call}
                              browserHistory={browserHistory}/>);
      wrapper.setProps({
        selectedNoteId:notes[0]._id ,
        note:notes[0]
      });
      expect(wrapper.state('title')).toBe(notes[0].title);
      expect(wrapper.state('body')).toBe(notes[0].body);
    });

    it('should not setstate if note prop not provided',function () {
      const wrapper = mount(<Editor
                              call={call}
                              browserHistory={browserHistory}/>);
      wrapper.setProps({
        selectedNoteId:notes[0]._id ,
      });
      expect(wrapper.state('title')).toBe("");
      expect(wrapper.state('body')).toBe('');
    });
  });

}
