import React from 'react';
import {Session} from 'meteor/session';
import {createContainer} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';

import {Notes} from '../api/notes.js';

export class Editor extends React.Component {
  //when is an event callback function, the call back is passed an 'e'
  handleBodyChange(e){
    this.props.call('notes.update',this.props.note._id,{
      body: e.target.value
    });
  }

  handleTitleChange(e){
    this.props.call('notes.update',this.props.note._id,{
      title: e.target.value
    });
  }

  handleClick(){
    this.props.call('notes.remove',this.props.note._id);
    Session.set('selectedNoteId','');
  }
  render(){
    if (this.props.note) {
      return (
      <div>
        <input value={this.props.note.title}
          placeholder={'Untitled Note'}
          onChange={this.handleTitleChange.bind(this)}/>

        <textarea
          value={this.props.note.body}
          placeholder={"Your note Here"}
          onChange={this.handleBodyChange.bind(this)}>

        </textarea>
        <button onClick={this.handleClick.bind(this)}> Delete Note </button>
      </div>
      );
    } else {
      return (
        <p>
          {this.props.selectedNoteId ? 'Note Not Found' :"Pick a Note to Get Started!"}
        </p>
      );
    }
  }
};

Editor.propTypes = {
  note: React.PropTypes.object ,
  selectedNoteId: React.PropTypes.string
}

export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId');
  return {
    selectedNoteId,
    note: Notes.findOne(selectedNoteId),
    call: Meteor.call
  }

},Editor);
