import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import ApiContext from '../ApiContext'
import { getNotesForFolder } from '../notes-helpers'
import './NoteListMain.css'

export default class NoteListMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext

  render() {

    const { folderId } = this.props.match.params
    const { notes } = this.context
    const notesForFolder = getNotesForFolder(notes, folderId)
    console.log(notesForFolder)
    return (
      <section className='NoteListMain'>
        <ul>
          {notesForFolder.map(note => {
            console.log(note)
            return (
              <li key={note.id}>
                <Note
                  display={'noteList'}
                  id={note.id}
                  name={note.title}
                  modified={note.modified}
                />
              </li>
            )
          }
          )}
        </ul>
        <Link to='/add-note'>
          <CircleButton
            tag={Link}
            to='/add-note'
            type='button'
            className='NoteListMain__add-note-button'
            input={<FontAwesomeIcon icon='plus' />}
          />
        </Link>
      </section>
    )
  }
}
