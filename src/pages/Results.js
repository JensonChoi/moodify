import React from "react";
import '../styles/Results.css';
import '../styles/global.css';

import { useNavigate } from "react-router-dom";
import temp from "../Image/temp_image.png";

import ReactTable from "react-table";

const data = [
    { number: 1, title: "this is what falling in love feels like", artist: "JVKE", plays: "286,615,301", time: "2:00" },
    { number: 2, title: "moon and back", artist: "JVKE", plays: "13,311,383", time: "2:28" },
    { number: 3, title: "golden hour", artist: "JVKE", plays: "460,554,848", time: "3:29"},
]  

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
                <table >
                    <tr>
                    <th>#</th>
                    <th>TITLE</th>
                    <th>PLAYS</th>
                    <th>🕓</th>
                    </tr>
                    {data.map((val, key) => {
                    return (
                        <tr key={key}>
                        <td style={{width: "5%"}}>{val.number}</td>
                        <td >
                            <div className="results-page-column">
                                <div>{val.title}</div>
                                <div className="artist-title" >{val.artist}</div>
                            </div>
                        </td>
                        <td>{val.plays}</td>
                        <td>{val.time}</td>
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