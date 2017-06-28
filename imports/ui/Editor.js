import React from 'react';
import {Session} from 'meteor/session';
import {createContainer} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import {browserHistory} from 'react-router';

import {Notes} from '../api/notes.js';

export class Editor extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      body:''
    }
  }
  //when is an event callback function, the call back is passed an 'e'
  handleBodyChange(e){
    const body = e.target.value;
    this.setState({body});
    this.props.call('notes.update',this.props.note._id,{body});
  }

  handleTitleChange(e){
    const title = e.target.value;
    this.setState({title});
    this.props.call('notes.update',this.props.note._id,{title});
  }

  componentDidUpdate(prevProps,prevState){ //gets called after stats or props updates
    const currentNoteId = this.props.note ? this.props.note._id : undefined;
    const prevNoteId =  prevProps.note ? prevProps.note._id : undefined;

    if (currentNoteId && currentNoteId!==prevNoteId) {
      this.setState({
        title: this.props.note.title,
        body: this.props.note.body,
      });
    }

  }

  handleRemoval(){
    this.props.call('notes.remove',this.props.note._id);
    this.props.browserHistory.push('/dashboard');
  }

  render(){
    if (this.props.note) {
      return (
      <div className='editor'>
        <input value={this.state.title}
          placeholder={'Untitled Note'}
          onChange={this.handleTitleChange.bind(this)}/>

        <textarea
          value={this.state.body}
          placeholder={"Your note Here"}
          onChange={this.handleBodyChange.bind(this)}>

        </textarea>
        <button onClick={this.handleRemoval.bind(this)}> Delete Note </button>
      </div>
      );
    } else {
      return (
        <div className='editor'>
          <p>
            {this.props.selectedNoteId ? 'Note Not Found' :"Pick a Note to Get Started!"}
          </p>
        </div>
      );
    }
  }
};

Editor.propTypes = {
  note: React.PropTypes.object ,
  selectedNoteId: React.PropTypes.string,
  call: React.PropTypes.func.isRequired,
  browserHistory: React.PropTypes.object.isRequired
}

export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId');
  return {
    selectedNoteId,
    note: Notes.findOne(selectedNoteId),
    call: Meteor.call,
    browserHistory
  }

},Editor);
