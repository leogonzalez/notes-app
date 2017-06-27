import { Meteor } from 'meteor/meteor';
import expect from 'expect';

import { Notes } from './notes';

if (Meteor.isServer) {
  describe('notes', function () {
    const noteOne = {
      _id: 'testNoteId1',
      title: 'My Title',
      body: 'My body for note',
      updatedAt: 0,
      userId: 'testUserId1'
    };
    const noteTwo = {
      _id: 'testNoteId2',
      title: 'Things to Buy',
      body: 'Couch',
      updatedAt: 0,
      userId: 'testUserId2'
    };
    beforeEach(function () {
      Notes.remove({});
      Notes.insert(noteOne);
      Notes.insert(noteTwo);
    });

    it('should insert new note', function () {
      const userId = 'testid';
      const _id = Meteor.server.method_handlers['notes.insert'].apply({ userId });

      expect(Notes.findOne({ _id, userId })).toExist();
    });

    it('should not insert note if not authenticated', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.insert']();
      }).toThrow();
    });

    it('should remove note', function () {
      Meteor.server.method_handlers['notes.remove'].apply({userId:noteOne.userId},[noteOne._id]);
      expect(Notes.findOne({_id:noteOne._id})).toNotExist();
    });

    it('should not remove if not authenticted',function () {
      expect(() => {
          Meteor.server.method_handlers['notes.remove'].apply({},[noteOne._id]);
      }).toThrow();
    });

    it('should not remove if not valid Id',function () {
      expect(() => {
          Meteor.server.method_handlers['notes.remove'].apply({userId:noteOne.userId},[]);
      }).toThrow();
    });

    it('should update note', function () {
      const title= 'This is updated';
      Meteor.server.method_handlers['notes.update'].apply({
          userId: noteOne.userId
      },[
        noteOne._id,
        {title}
      ]);

      const note = Notes.findOne(noteOne._id);

      expect(note.updatedAt).toBeGreaterThan(0);
      expect(note).toInclude({
        title,
        body: noteOne.body
      });
    });

    it('should throw error if extra updates',function(){
      const name = 'this is my name';
      const title = 'this is updated'

      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({
          userId: noteOne.userId
        },[
          noteOne._id,
          {name, title}
        ]);
      }).toThrow();
    });

    it('should not update note if user is not creator',function () {
      const title= 'This is updated';
      Meteor.server.method_handlers['notes.update'].apply({
          userId: 'testid'
      },[
        noteOne._id,
        {title}
      ]);

      const note = Notes.findOne(noteOne._id);

      expect(note).toInclude(noteOne);
    });

    it('should not update if unauthenticated',function () {
      const title= 'This is updated';

      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({},[
          noteOne._id,
          {title}
        ]);
      }).toThrow();
    });

    it('should not update if invalid _id', function () {
      const _id= 'This is invalid _id';

      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({
            userId: noteOne.userId
        },[
          {title:'this is title'}
        ]);
      }).toThrow();
    });

    it('should return users notes', function(){
      const res = Meteor.server.publish_handlers.notes.apply({userId: noteOne.userId});
      const notes = res.fetch();
      expect(notes.length).toBe(1);
      expect(notes[0]).toEqual(noteOne);
    });

    it('should return zero notes for user that has no notes', function(){
      const res = Meteor.server.publish_handlers.notes.apply({userId: "Leonardo"});
      const notes = res.fetch();
      expect(notes.length).toBe(0);
    });

  });
}
