import React from 'react'
import './CircleButton.css'

export default function NavCircleButton(props) {
  console.log(props)
  const { tag, className, childrenm, ...otherProps } = props

  return React.createElement(

    props.tag,
    {
      className: ['NavCircleButton', props.className].join(' '),
      ...otherProps
    },
    props.children
  )
}

