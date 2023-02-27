import React from "react";
import '../styles/Button.css';
import '../styles/global.css';

function Button(props) {
    return (
        <button className="big-button">{props.name}</button>
    );
}

export default Button;