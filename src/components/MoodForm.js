import React, {useState} from 'react'
import axios from 'axios';

import Button from "../components/Button.js"

import "../styles/MoodForm.css"

const MoodForm = () => {
  const [mood, setMood] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8888/playlist/generate', { mood });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleMoodChange = (event) => {
    setMood(event.target.value);
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          className="mood-input"
          type="text"
          placeholder="Happy, sad, etc"
          name="mood"
          value={mood}
          onChange={handleMoodChange}
        ></textarea>
        <Button name='Generate!'/>
      </form>
    </div>
  )
}

export default MoodForm