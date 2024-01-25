import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FileUploadBox } from "../../components/fileUploadBox/fileUploadBox";
import BlackButton from "../../components/blackButton/blackButton";

import "./root.css";
import { Upload } from "../upload/upload";

function Root() {
    const [isImgUploaded, setIsImgUploaded] = useState(localStorage.hasOwnProperty("url"));
    const navigate = useNavigate();
    const goto = (route) => { navigate(route) };

    window.addEventListener("storage", () => {
        // this event is called when
        // we write the valid file to
        // local storage
        setIsImgUploaded(true);
    });

    return (
        <>
            <Upload />
            {!isImgUploaded && <BlackButton text={"or Download Using Code"} onClick={() => {goto("/download")}}/>}
        </>
    )
}

export { Root };