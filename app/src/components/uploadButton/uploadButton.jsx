import React, { useRef, useEffect } from "react";
import "./uploadButton.css";

export function UploadButton({text, setImageUpload, imageUpload}) {

    function handleChange(e) {
        /*
        this is heavily yoinked from the fileUploadBox code... 
        I with though I could've compartmentalized this a bit better
        */
        const file = e.target.files[0];
        //setImageUpload(file); // Update the state in the parent component
        if(file){
            let regex = new RegExp('[^.]+$');
            let extension = file.name.match(regex)[0].toLowerCase();
            // if it's valid add it to local storage
            if (extension == "png" || extension == "jpeg" || extension == "jpg" || extension == "heic") {
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    localStorage.setItem("url", reader.result)
                    window.dispatchEvent(new Event("storage")) // see confirmUpload.jsx
                };
            }
        }
    }

    const ref = useRef(null);
    useEffect(() => {
        ref.current.addEventListener('change', handleChange);

        return () => {
            if (ref.current !== null) {
                ref.current.removeEventListener('change', handleChange);    
            }
        }

    }, []);
    
    return (
        <label className = "blackButton" for="file-input"> 
            {text}
            <input 
                ref={ref} 
                id="file-input" 
                type="file" 
                accept="image/png, image/jpeg, image/jpg, image/heic" 
                onChange={handleChange}
                value={imageUpload ? imageUpload.name : ''}
                />
        </label>
    );
}