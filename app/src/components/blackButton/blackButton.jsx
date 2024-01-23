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
        <label className = "blackButton" for = "file-input"> {text} 
        <input id = "file-input" type = "file" accept = "application/pdf">
        </input> </label>
        );
}