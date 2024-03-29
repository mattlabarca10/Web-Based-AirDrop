import React from 'react';
import "./blackButton.css";

/*
    blackButton
    
    is a black button used often in the designs
    with a standardized font-size and padding.
    Also takes an onClick function
*/
export default function BlackButton({text, onClick}) {
    return (
        <button className = "blackButton" onClick={onClick}> 
            {text} 
        </button>
        );
}