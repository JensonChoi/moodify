import React from 'react'
import '../styles/Button.css'
import '../styles/global.css'

function Button(props) {
  function handleClick(e) {
    if (props.loginRedirect) {
      const href =
        process.env.REACT_APP_ENVIRONMENT === 'local'
          ? 'http://localhost:8888/login'
          : 'https://moodify-backend1.herokuapp.com/login'
      console.log(href)
      window.location.href = href
    }
  }
  return (
    <button className='big-button' onClick={handleClick}>
      {props.name}
    </button>
  )
}

export default Button
