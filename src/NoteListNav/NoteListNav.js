import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import ApiContext from '../ApiContext'
import { countNotesForFolder, getNotesForFolder } from '../notes-helpers'

import './NoteListNav.css'

export default class NoteListNav extends React.Component {

  static contextType = ApiContext;

  constructor() {
    super();
    this.state = {
      filter: null
    }
  }


  render() {
    //if there is folder/:folder_id, 
    //send to getNotesForFolder with folder_id

    const { folders, notes } = this.context
    //let notesArr = getNotesForFolder(notes, folder)
    return (
      <div className='NoteListNav'>
        <ul className='NoteListNav__list'>
          {folders.map(folder => {

            return (
              <li key={folder.id}>
                <NavLink
                  className='NoteListNav__folder-link'
                  to={`/folder/${folder.id}`}
                >
                  <span className='NoteListNav__num-notes'>
                    {countNotesForFolder(notes, folder.id)}
                  </span>
                  {folder.title}
                </NavLink>
              </li>
            )
          })}
        </ul>
        <Link to='/add-folder'>
          <div className='NoteListNav__button-wrapper'>
            <CircleButton
              tag={Link}
              to='/add-folder'
              type='button'
              className='NoteListNav__add-folder-button'
              input={<FontAwesomeIcon icon='plus' />} />
          </div>
        </Link>
      </div>
    )
  }
}
