import React from "react";
import "./styles.css";
/* import Loop from "../../../Assets/home/loop.png" */

export default function SearchBar() {
    return (
       <div className="bar">
            <input className="searchbar" type="text" title="Search" />
            <a href="#"> <img className="voice" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Google_mic.svg/716px-Google_mic.svg.png" title="Search by Voice" /></a>
        </div>
    )
}