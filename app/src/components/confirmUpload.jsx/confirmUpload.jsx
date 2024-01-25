/*
    this really should be its own route, but tbh I think the route mapping
    is going to be way too convoluted (especially if some bad actor is going to
    try enter a route...redirecting someone might be a bit funky here)
*/
import React, { useEffect, useState } from "react";
import BlackButton from "../blackButton/blackButton";
import "./confirmUpload.css";

function ConfirmUpload() {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState (0);

    function popImage() {
        localStorage.removeItem("url");
        location.reload();
        // using reload method might not be 
        // the smartest move
        // however, this page is so lightweight
        // it's really negligable
    }

    const url = localStorage.getItem("url");
    
    /*
        this might be a terrible approach, but I really
        want to be able to grab the height and width of the
        image without double rendering. 
    */

    useEffect(() => {
        let img = document.getElementById("uploadedImage");
        setHeight(img.height);
        setWidth(img.width);
    }, []);

    return ( <>
        {url && <>
            <img className="imgFrame" id="uploadedImage" src={url} alt="img" />
            <h2 className="resolution-text">Image Resolution: {width}  x {height} px</h2>
            <BlackButton text={"Create Code"} onClick={console.log("yoo")}/>
            <h4 className="tiny-text" onClick={popImage}>upload a different file or cancel...</h4>
            </>
        }
        </>
    );

}

export { ConfirmUpload };