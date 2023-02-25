import React from "react";
import '../styles/Home.css';
import '../styles/global.css';

function Home() {
    return (
        <div className="home-page">
            <div className="main-section">
                <h1 className="heading">Moodify</h1>
                <div className="desc">
                    Welcome to Moodify, a web application that generates a Spotify playlist based on how you're feeling.
                </div>
            </div>
        </div>
    );
}

export default Home;