import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ApiContext from '../ApiContext'
import config from '../config'
import './Note.css'
import PropTypes from 'prop-types';



export default class Note extends React.Component {

  static defaultProps = {
    onDeleteNote: () => { },
  }

  static contextType = ApiContext;

  handleClickDelete = e => {

    console.log(this.props.id)
    const noteId = this.props.id

    this.context.deleteNote(noteId)

    console.log(noteId)
    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          return null
        }

        return null

      })
      .catch(error => {
        console.error(error)
      })


  }

  render() {
    const { name, id, modified, display } = this.props
    const noteClass = `Note ${display}`
    return (

      <div className={noteClass}>
        <div className='Note__content'>

          <h2 className='Note__title'>
            <Link to={`/note/${id}`}>
              {name}
            </Link>
          </h2>


          <div>
            <span>Modified</span>
            <span className='Date'>
              {format(modified, 'DD MMM YYYY')}
            </span>

          </div>

        </div>
        <button
          className='Note__delete'
          type='button'
          onClick={this.handleClickDelete}
        >
          <FontAwesomeIcon icon='trash-alt' />
          <span>remove</span>
        </button>
      </div>

    )
  }
}
Note.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  onDeleteNote: PropTypes.func

}