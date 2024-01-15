import React from "react";
import { useNavigate } from "react-router-dom";

import FileUploadBox from "../../components/fileUploadBox/fileUploadBox";
import BlackButton from "../../components/blackButton/blackButton";

import "./root.css";

function Root() {

    const navigate = useNavigate();

    const goto = (route) => { navigate(route) };

    return (
        <>
            {/* Keep the line breaks */}
            <h1 className='title-text'> 
            Web-based AirDrop <br/>
            Share Images Free
            </h1>
            <FileUploadBox />
            <BlackButton text={"or Download Using Code"} onClick={() => {goto("/s")}}/>
        </>
    )
}

export { Root };