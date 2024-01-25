import React, { useEffect, useState } from "react";

import { FileUploadBox } from "../../components/fileUploadBox/fileUploadBox";
import { ConfirmUpload } from "../../components/confirmUpload.jsx/confirmUpload";

import "./upload.css";

function Upload() {

    /*
    because the image is put in local storage before making it to the upload
    we can make the check here when we initialize it so we don't have to wait
    for the listener.
    */
    const [isImgUploaded, setIsImgUploaded] = useState(localStorage.hasOwnProperty("url"));

    /*
        this might be a memory leak I'm not sure
        I'm goint to come back to this
    */
    window.addEventListener("storage", () => {
        // this event is called when
        // we write the valid file to
        // local storage
        setIsImgUploaded(true);
    });

    return (
        <>
            {(!isImgUploaded) && <>
                {/* Keep the line breaks */}
                <h1 className='title-text'> 
                Web-based AirDrop <br/>
                Share Images Free
                </h1>
                <FileUploadBox />
            </>}
            {(isImgUploaded) && <>
                <ConfirmUpload />
            </>}
        </>
    )
}

export { Upload };