import React from 'react'
import "../styles/MoodForm.css"

const MoodForm = () => {
  return (
    <div>
        <form>
            <textarea className="mood-input" type='text' placeholder='Happy, sad, etc'></textarea>
        </form>
    </div>
  )
}

export default MoodForm