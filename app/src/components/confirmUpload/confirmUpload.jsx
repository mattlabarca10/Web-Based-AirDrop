/*
    this really should be its own route, but tbh I think the route mapping
    is going to be way too convoluted (especially if some bad actor is going to
    try enter a route...redirecting someone might be a bit funky here)
*/
import React, { useEffect, useState } from "react";
import BlackButton from "../blackButton/blackButton";
import { firestore, storage } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./confirmUpload.css";

function ConfirmUpload() {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState (0);
    //const [imageUpload, setImageUpload] = useState(false);
    const [fileUploaded, setFileUploaded] = useState(false);
    const [randomCode, setRandomCode] = useState(false);

    useEffect(() => {
        let img = document.getElementById("uploadedImage");
        setHeight(img.height);
        setWidth(img.width);
    }, []);

    const handleUpload = async () => {
        /*if (!imageUpload) {
            console.log("imageUpload: " + imageUpload)
            console.error("No file selected for upload.");
            return;
        }*/
        console.log("hi")
        const storageRef = ref(storage, 'images');
        // TO DO get back blob data from file URL
        // Patrick and Matthew 2/5/24
        await uploadBytes(storageRef, url).then(async () => {
            const url = await getDownloadURL(storageRef);
            const code = generateRandomCode();
            saveUrlToFirestore(url, code);
        }).catch((error) => {
            console.error("Error uploading file: ", error);
        });
    };

    const generateRandomCode = () => {
        const characters = "0123456789"
        const length = 8;
        let result = "";
        for (let i = 0; i < length; i++){
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    const url = localStorage.getItem("url");
    /*
        this might be a terrible approach, but I really
        want to be able to grab the height and width of the
        image without double rendering. 
    */

    const saveUrlToFirestore = async (url, code) => {
        await addDoc(collection(firestore, "images"),{
            url: url, // link to firestore database
            width: width,
            height: height,
            code: code,
            createdAt: new Date()
        }).then(() => {
            console.log("File uploaded successfully!");
            setFileUploaded(true); // Update state to indicate that file is uploaded
            setRandomCode(code);
        }).catch(error => {
            console.error("Error uploading file: ", error);
        });
    }
        
    const popImage = () => {
        localStorage.removeItem("url");
        location.reload();
        // using reload method might not be 
        // the smartest move
        // however, this page is so lightweight
        // it's really negligable
    }


    return (<>
        {url && (
            <>
                <img className="imgFrame" id="uploadedImage" src={url} alt="img" />
                <h2 className="resolution-text">Image Resolution: {width}  x {height}px</h2>
                <BlackButton text={"Create Code"} onClick={handleUpload} />
                {fileUploaded && <h4 className="tiny-text">Your code: {randomCode}</h4>}
                <h4 className="tiny-text" onClick={popImage}>upload a different file or cancel...</h4>
            </>
        )}
    </>
    );

}

export { ConfirmUpload };