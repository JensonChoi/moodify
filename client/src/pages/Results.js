import React from 'react'
import '../styles/Results.css';
import '../styles/global.css';

import { useNavigate } from "react-router-dom";
import {useLocation} from 'react-router-dom'; 

import axios from 'axios';

function timeConversion(ms) {
    var minutes = Math.floor(ms / 60000);
    var seconds = ((ms % 60000) / 1000).toFixed(0);
    if( seconds < 10 ) {
        seconds = '0' + seconds
    }
    return minutes + ":" + seconds;
}

function durationConversion(ms) {
    var hours = Math.floor(ms / 3600000);
    var minutes = Math.floor((ms % 3600000) / 60000).toFixed(0);
    return hours + " hr " + minutes + " min ";
}

function timeSum(data_temp) {
    let sum = 0;
    data_temp.forEach(item => {
        sum += item.duration_ms;
    });
    return sum;
}

function Results(props) { 

    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            let uriArr = [];
            let i = 0;
            for( i = 0; i < 20; i++ ) {
                uriArr.push(location.state.data[i].uri);
            }

            let mood = location.state.moodCheck;
            console.log(mood);
            console.log(uriArr);

            const response = await axios.post('http://localhost:8888/playlist/save', { name: mood[0], description: mood[0], track_uris: uriArr });
            console.log(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="results-page-container">
            <div className="results-image-box" style={{backgroundColor: "#a1cda1"}}>
                <img className="results-image" alt="temp" src={location.state.album_art} />
                <div className="results-page-column">
                    <div className="results-page-text-username" >Generated Playlist</div>
                    <h1 className='results-title'>{location.state.moodCheck}</h1>
                    <div className="results-page-text-username">enjoy · 20 songs, </div>
                    <div className="results-page-text-duration">{durationConversion(timeSum(location.state.data))}</div>
                </div>
            </div>

            <div className="results-page-row">
                <table >
                    <tr>
                    <th>#</th>
                    <th>TITLE</th>
                    <th></th>
                    <th>ALBUM</th>
                    <th>🕓</th>
                    </tr>
                    {(location.state.data).map((val, key) => {
                    return (
                        <tr key={key}>
                        <td style={{width: "5%"}}>{key+1}</td>
                        <td style={{width: "6%", paddingTop: "1%"}}>
                            <img className="song-image" alt="temp" src={val.album.images[0].url} />
                        </td>
                        <td style={{width: "40%", whiteSpace: "nowrap", overflow: "hidden"}}>
                            <div style={{paddingTop: "0%"}} className="results-page-column" >
                                <div >{val.name}</div>
                                <div className="artist-title" >{val.artists[0].name}</div>
                            </div>
                        </td>
                        <td style={{ whiteSpace: "nowrap", overflow: "hidden", maxWidth: 100}}>{val.album.name}</td>
                        <td>{timeConversion(val.duration_ms)}</td>
                        </tr>
                    )
                    })}
                </table>
            </div>

            <div className="results-page-row">
                <button className="results-button" style={{width: 200}} onClick={() => navigate("/generate")}>generate again!</button>
                <button className="results-button" onClick={handleSubmit}>add to spotify library</button>
            </div>
        </div>
    );
}

export default Results;