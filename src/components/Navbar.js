import React from "react";
import { Link } from "react-router-dom";
import '../styles/Navbar.css';
import '../styles/global.css';

function Navbar() {
    return (
        <div className="navbar">
      <Link className="nav-link title left" to="/">
        Moodify
      </Link>
      <Link className="nav-link right" to="/">
        🏠 home
      </Link>
      <Link className="nav-link right" to="/">
        🎵 generate!
      </Link>
      <Link className="nav-link right" to="/">
        👋 about
      </Link>
    </div>
    );
}

export default Navbar;