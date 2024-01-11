import React from "react";
import "./header.css";

export default function Header() {
    return (
        <div className="header">
            <a href="/">
                <div className="title-container">
                    <img src={process.env.PUBLIC_URL + "/PairDrop.png"} height="88" width="88" alt="Logo"/>
                    <h2>Pairdrop</h2>
                </div>
            </a>
            <div className="options">
                <a href="/upload"> <h2>Upload</h2> </a>
                <a href="/download"> <h2>Download</h2> </a>
            </div>
        </div>
        );
}