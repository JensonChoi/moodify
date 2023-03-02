import React from 'react'
import '../styles/About.css'

const AboutPage = () => {
  return (
    <div className='about-page-container'>
        <h1 className='about-title'>About Moodify</h1>
        <div className='about-page-text'>
            <h2>What is Moodify?</h2>
            <p>Moodify is an extension of Spotify, that allows you to create playlists based off your mood! In order to use
                Moodify, you will first need to login to your Spotify account. After logging in, you can generate playlists by
                inputting a key word into our generation box! From there, Moodify will generate a playlist based off your mood
                by looking at your preexisting playlists. If you have less than 5 songs that match the input mood, Moodify will look
                through Spotify to generate a playlist with at least 5 songs that we think you would like!
            </p>
            <h2>Meet the Team!</h2>
            <p>Moodify was created by Divya Ponniah, Hannah Zhong, Jenson Choi, Maya Raman, and Vivian Ha as their capstone project
                for CS130 at UCLA.
            </p>
        </div>
    </div>
  )
}

export default AboutPage