import React from 'react'
import '../styles/Button.css'
import '../styles/global.css'

function Button(props) {
  function handleClick(e) {
    if (props.loginRedirect) {
      window.location.href = 'https://moodify-backend1.herokuapp.com/login'
    }
  }
  return (
    <button className='big-button' onClick={handleClick}>
      {props.name}
    </button>
  )
}

export default Button
