/*
    this really should be its own route, but tbh I think the route mapping
    is going to be way too convoluted (especially if some bad actor is going to
    try enter a route...redirecting someone might be a bit funky here)
*/
import React, { useEffect, useState } from "react";
import BlackButton from "../blackButton/blackButton";
import firebase from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import "./confirmUpload.css";

const{ firestore } = firebase;

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
        const storage = getStorage();
        const storageRef = ref(storage, 'images');

        const file = localStorage.getItem('url');
        const response = await fetch(file);
        const blob = await response.blob();

        const fileName = generateRandomCode() + '.' + blob.type.split('/')[1]; // Generate a unique file name
        const fileRef = ref(storageRef, fileName);

        await uploadBytes(fileRef, blob).then(async (snapshot) => {
            const url = await getDownloadURL(snapshot.ref);
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

















/*
    this really should be its own route, but tbh I think the route mapping
    is going to be way too convoluted (especially if some bad actor is going to
    try enter a route...redirecting someone might be a bit funky here)

import React, { useEffect, useState } from "react";
import BlackButton from "../blackButton/blackButton";
import firebase from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import "./confirmUpload.css";

const{ app, analytics, storage, firestore } = firebase;

function ConfirmUpload( {file}) {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState (0);
    //const [imageUpload, setImageUpload] = useState(null);
    const [fileUploaded, setFileUploaded] = useState(false);
    const [randomCode, setRandomCode] = useState(false);
    

    useEffect(() => {
        if (!file) {
            console.log("No file to process.");
            return;
        }
    
        const objectURL = URL.createObjectURL(file);
        // Use the objectURL for previews or dimension extraction
        const img = new Image();
        img.onload = () => {
            console.log("Image loaded:", img.width, "x", img.height);
            setWidth(img.width);
            setHeight(img.height);
            URL.revokeObjectURL(img.src); // Clean up the object URL to avoid memory leaks
        };
        img.src = objectURL;
    
        // Optionally set the objectURL to state if you need to display the image elsewhere
        // setPreviewUrl(objectURL); // Assuming you have a useState to hold this
    }, [file]);

    const handleUpload = async () => {
        if (!file) return; // Make sure there's a file selected
    
        // Generate a unique file name, for example, using the current timestamp and original file name
        const uniqueFileName = `images/${Date.now()}-${file.name}`;
        const imageRef = ref(storage, uniqueFileName);
        uploadBytes()
    
        // Upload the file directly to Firebase Storage
        try {
            const uploadResult = await uploadBytes(imageRef, file);
            const url = await getDownloadURL(uploadResult.ref);
            const code = generateRandomCode();
            await saveUrlToFirestore(url, code);
    
            console.log("File uploaded successfully!");
            setFileUploaded(true);
            setRandomCode(code);
        } catch (error) {
            console.error("Error uploading file: ", error);
        }
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
    

    const saveUrlToFirestore = async (url, code) => {
        await addDoc(collection(firestore, "images"),{
            url, // link to firestore database
            width,
            hheight,
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
        window.location.reload();
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
*/