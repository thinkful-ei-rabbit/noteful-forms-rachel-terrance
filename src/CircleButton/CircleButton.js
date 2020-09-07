import React from 'react'
import './CircleButton.css'
import PropTypes from 'prop-types';

export default function NavCircleButton(props) {

  const { tag, className, children, ...otherProps } = props


  console.log(otherProps)

  return React.createElement(

    props.tag,
    {
      className: ['NavCircleButton', props.className].join(' '),
      ...otherProps
    },
    props.children
  )
}

NavCircleButton.propTypes = {
  tag: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.object),
  otherProps: PropTypes.object
}

