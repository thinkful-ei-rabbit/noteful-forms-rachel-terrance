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
          <div className='Note__content'>

            <h2 className='Note__title'>
              <Link to={`/note/${note.id}`}>
                {note.title}
              </Link>
            </h2>


            <div>
              <span>Modified</span>
              <span className='Date'>
                {format(note.modified, 'DD MMM YYYY')}
              </span>

            </div>

          </div>

        </div>

    )





        {/* <Note
          display={'notePage'}
          id={note.id}
          name={note.title}
          modified={note.modified}
          onDeleteNote={this.handleDeleteNote}
        /> */}
        {/* <div className='NotePageMain__content'>
          {note.content.split(/\n \r|\n/).map((para, i) =>
            <p key={i}>{para}</p>
          )}
        </div> */}
      </section>
    )
  }
}
NotePageMain.propTypes = {
  history: PropTypes.object
}