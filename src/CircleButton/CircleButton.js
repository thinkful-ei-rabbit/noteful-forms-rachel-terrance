import React from 'react'
import './CircleButton.css'

export default function NavCircleButton(props) {



  return (
    <button className={['NavCircleButton', props.className].join(' ')}>{props.input}</button >

  )
}

