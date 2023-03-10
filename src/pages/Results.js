import React from "react";
import '../styles/Results.css';
import '../styles/global.css';

import { useNavigate } from "react-router-dom";
import temp from "../Image/temp_image.png";

import ReactTable from "react-table";

const data = [
    { album: {album_group: 'ALBUM_GROUP', album_type: 'ALBUM_TYPE'}, artists:"Michelle Williams", available_markets: (184)['AR','AU','AT'], duration_ms: 209186, name:"Tightrope"},
    { album: {album_group: 'ALBUM_GROUP', album_type: 'ALBUM_TYPE'}, artists:"Michelle Williams", available_markets: (184)['AR','AU','AT'], duration_ms: 209186, name:"Tightrope"},
    { album: {album_group: 'ALBUM_GROUP', album_type: 'ALBUM_TYPE'}, artists:"Michelle Williams", available_markets: (184)['AR','AU','AT'], duration_ms: 209186, name:"Tightrope"},
    { album: {album_group: 'ALBUM_GROUP', album_type: 'ALBUM_TYPE'}, artists:"Michelle Williams", available_markets: (184)['AR','AU','AT'], duration_ms: 209186, name:"Tightrope"}
    /*{ number: 1, title: "this is what falling in love feels like", artist: "JVKE", album: "this is what _____ feels like (Vol 1-4)", time: "2:00" },
    { number: 2, title: "moon and back", artist: "JVKE", album: "this is what _____ feels like (Vol 1-4)", time: "2:28" },
    { number: 3, title: "golden hour", artist: "JVKE", album: "this is what _____ feels like (Vol 1-4)", time: "3:29"},*/
]  

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

    return (
        <div className="results-page-container">
            <div className="results-image-box" style={{backgroundColor: "#a1cda1"}}>
                <img className="results-image" src={temp} />
                <div className="results-page-column">
                    <div className="results-page-text-username" style={{paddingTop: "5%"}}>Generated Playlist</div>
                    <h1 className='results-title'>PLAYLIST NAME</h1>
                    <div className="results-page-text-username">username · 20 songs, </div>
                    <div className="results-page-text-duration">{durationConversion(timeSum(data))}</div>
                </div>
            </div>

            <div className="results-page-row">
                <table >
                    <tr>
                    <th>#</th>
                    <th>TITLE</th>
                    <th>ALBUM</th>
                    <th>🕓</th>
                    </tr>
                    {data.map((val, key) => {
                    return (
                        <tr key={key}>
                        <td style={{width: "5%"}}>{key+1}</td>
                        <td style={{width: "40%", whiteSpace: "nowrap", overflow: "hidden"}}>
                            <div className="results-page-column" >
                                <div>{val.name}</div>
                                <div className="artist-title" >{val.artists}</div>
                            </div>
                        </td>
                        <td style={{ whiteSpace: "nowrap", overflow: "hidden", maxWidth: 100}}>{val.album.album_group}</td>
                        <td>{timeConversion(val.duration_ms)}</td>
                        </tr>
                    )
                    })}
                </table>
            </div>

            <div className="results-page-row">
                <button className="results-button" style={{width: 200}} onClick={() => navigate("/generate")}>generate again!</button>
                <button className="results-button">add to spotify library</button>
            </div>
        </div>
    );
}

export default Results;