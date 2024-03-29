import React, { useState } from 'react'
import axios from 'axios'

import Button from '../components/Button.js'

import '../styles/MoodForm.css'
import { useNavigate } from 'react-router-dom'

const MoodForm = (props) => {
  const [mood, setMood] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      console.log(mood)
      const baseUrl =
        process.env.REACT_APP_ENVIRONMENT === 'local'
          ? 'http://localhost:8888'
          : 'https://moodify-backend1.herokuapp.com'
      const response = await axios.post(
        `${baseUrl}/playlist/personal_generate`,
        { mood }
      )
      // console.log(response.data);

      const art = await axios.get(`${baseUrl}/generate_art?mood=` + mood)
      // console.log(typeof(art.data));

      navigate('/results', {
        state: {
          album_art: art.data,
          data: response.data['tracks'],
          moodCheck: [mood],
        },
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handleMoodChange = (event) => {
    setMood(event.target.value)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          className='mood-input'
          type='text'
          placeholder='Happy, sad, etc'
          name='mood'
          value={mood}
          onChange={handleMoodChange}
        ></textarea>
        <Button name='Generate!' />
      </form>
    </div>
  )
}

export default MoodForm
