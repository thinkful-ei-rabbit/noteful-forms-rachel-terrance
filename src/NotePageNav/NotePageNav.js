import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import ApiContext from '../ApiContext'
import './NotePageNav.css';
import PropTypes from 'prop-types';



export default class NotePageNav extends React.Component {
  static defaultProps = {
    history: {
      goBack: () => { }
    },
    match: {
      params: {}
    }
  }
  static contextType = ApiContext;

  render() {
    return (
      <CircleButton
        tag='button'
        role='link'
        onClick={() => this.props.history.push('/')}
        className='NotePageNav__back-button'
        input={<FontAwesomeIcon icon='chevron-left' />}
      />
    )
  }
}

NotePageNav.propTypes = {
  history: PropTypes.object
}