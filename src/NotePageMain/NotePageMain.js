import React from 'react'
import Note from '../Note/Note'
import ApiContext from '../ApiContext'
import { findNote } from '../notes-helpers'
import './NotePageMain.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { format } from 'date-fns'



export default class NotePageMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext

  handleDeleteNote = () => {
    this.props.history.push(`/`)
  }

  render() {

    const { notes } = this.context
    const { noteId } = this.props.match.params
    const num = Number(noteId)
    const note = findNote(notes, num)
    const noteClass = null;
    return (
      <section className='NotePageMain'>
        <div className={noteClass}>


          <h2 className='Note__title'>
            {note.title}
          </h2>

          <div>
            <span>Modified </span>
            <span className='Date'>
              {format(note.modified, 'DD MMM YYYY')}
            </span>
          </div>

          <div className='NotePageMain__content'>
            {note.content.split(/\n \r|\n/).map((para, i) =>
              <p key={i}>{para}</p>
            )}
          </div>




        </div>




      </section>
    )
  }
}
NotePageMain.propTypes = {
  history: PropTypes.object
}