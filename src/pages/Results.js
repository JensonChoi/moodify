import React from "react";
import '../styles/Results.css';
import '../styles/global.css';

import { useNavigate } from "react-router-dom";
import temp from "../Image/temp_image.png";

function Results(props) { 

    const navigate = useNavigate();

    return (
        <div className="results-page-container">
            <div className="results-image-box">
                <img className="results-image" src={temp} />
                <div className="results-page-column">
                    <div className="results-page-text-username">Generated Playlist</div>
                    <h1 className='results-title'>PLAYLIST NAME</h1>
                    <div className="results-page-text-username">username</div>
                    <div className="results-page-text-duration"># songs, duration</div>
                </div>
            </div>

            <div className="results-page-row">
                <h1 className='results-page-text-username'>PLAYLIST DISPLAY</h1>
            </div>

            <div className="results-page-row">
                <button className="results-button" style={{width: 200}} onClick={() => navigate("/generate")}>generate again!</button>
                <button className="results-button">add to spotify library</button>
            </div>
        </div>
    );
}

export default Results;