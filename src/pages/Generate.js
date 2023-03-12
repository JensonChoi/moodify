import React from "react";

import MoodForm from "../components/MoodForm.js"

import '../styles/Generate.css';
import '../styles/global.css';

function Generate() {
    return (
        <div className="generate-page">
            <div className="generate-main-section">
                <h1 className="heading">Generate a Playlist</h1>
                <div className="desc">
                    Input what mood you're feeling in the text box, and click the generate button to create a playlist!
                </div>
                <MoodForm/>
            </div>
        </div>
    );
}

export default Generate;