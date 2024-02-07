import React, { useEffect, useState } from "react";

import { FileUploadBox } from "../../components/fileUploadBox/fileUploadBox";
import { ConfirmUpload } from "../../components/confirmUpload/confirmUpload";

import "./upload.css";

function Upload() {
    const [file, setFile] = useState(null);
    /*
    because the image is put in local storage before making it to the upload
    we can make the check here when we initialize it so we don't have to wait
    for the listener.
    */
    const [isImgUploaded, setIsImgUploaded] = useState(localStorage.hasOwnProperty("url"));
    const [imageUploaded, setImageUploaded] = useState(false);

    /*
        this might be a memory leak I'm not sure
        I'm goint to come back to this
    */
    useEffect(() => {
        const storageEventHandler = () => {
            setIsImgUploaded(true);
        };

        window.addEventListener("storage", storageEventHandler);

        return () => {
            window.removeEventListener("storage", storageEventHandler);
        };
    }, []);

    useEffect(() => {
        if (isImgUploaded) {
            // If isImgUploaded is true, set the imageUploaded state to true
            setImageUploaded(true);
        }
    }, [isImgUploaded]);

    const handleImageUpload = (image) => {
        setFile(image);
        console.log(file);
    };

    return (
        <>
            {(!imageUploaded) && ( // Render FileUploadBox if image has not been uploaded
                <>
                    <h1 className='title-text'>Web-based AirDrop <br/> Share Images Free</h1>
                    <FileUploadBox setIsImageUpload={handleImageUpload} />
                </>
            )}
            {(imageUploaded) && ( // Render ConfirmUpload if image has been uploaded
                <ConfirmUpload file={file}/>
            )}
        </>
    )
}

export { Upload };