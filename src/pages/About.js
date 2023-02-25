import React from "react";
import '../styles/About.css';
import '../styles/global.css';

function About() {
    return (
        <div className="home-page">
            <div className="main-section">
                <h1 className="heading">About Us</h1>
                <div className="desc">
                    Welcome to Moodify, a web application that generates a Spotify playlist based on how you're feeling.
                </div>
            </div>
        </div>
    );
}

export default About;