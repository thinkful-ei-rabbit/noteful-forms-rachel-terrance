import React from 'react'
import './CircleButton.css'
import PropTypes from 'prop-types';

export default function NavCircleButton(props) {
  let disabled = false;

  if (props.disabled === true) {
    disabled = true;
  } else {
    disabled = false;
  }

  return (
    <button disabled={disabled} onClick={props.onClick} className={['NavCircleButton', props.className].join(' ')}>{props.input}</button >

  )
}



NavCircleButton.propTypes = {
  className: PropTypes.string.isRequired
}