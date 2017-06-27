import React from 'react';

import PrivateHeader from './PrivateHeader.js';
import NoteList from './NoteList.js';

export default () => {
  return (
    <div>
      <PrivateHeader title='Dashboard'/>
      <div className='page--content'>
        <NoteList/>
      </div>
    </div>
  );
}
