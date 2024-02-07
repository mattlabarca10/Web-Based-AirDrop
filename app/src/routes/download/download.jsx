import React , {useState} from "react";
import firebase from "../../firebase"
import { getFirestore, collection, query, where, doc, getDocs } from "firebase/firestore"
import "./download.css";
import  BlackButton  from "../../components/blackButton/blackButton";

const {app, analytics, storage, firestore} = firebase;

const db = getFirestore();
const docRef = doc(db, "images", "AUqPTHnCYwC0gfck56Jd");
//const docSnap = await getDoc(docRef);
//console.log(docSnap.data())

function Download() {
    const [isImgReady, setIsImgReady] = useState(false);
    const [code, setCode] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    
    const handleClick = async () => {
        try{
            console.log('Code entered by user:', code);

            const imageRef = collection(firestore, 'images');
            const q = query(imageRef, where('code', '==', code));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                querySnapshot.forEach((doc) => {
                    const imageData = doc.data();
                    console.log('URL:', imageData.url); // Access URL from document data
                    setImageUrl(imageData.url); // Set the image URL
                    setIsImgReady(true);
                });
            } else {
                alert("Image not found for code!");
            }
        } catch (error) {
            console.error("Error querying Firestore:", error);
            return null;
        }
        console.log('ImageURL:', imageUrl);
    }

    const handleInputChange = (event) => {
        setCode(event.target.value);
    }
    return (
        <>
            <h1> Enter Code: </h1>
            <input type="number" value={code} onChange={handleInputChange}/>
            <br/>
            {(!isImgReady) && <>
                <BlackButton text = {"Check Code"}  onClick={handleClick}/>

            </>}

            {(isImgReady) && <>
            <h1> Image Found!</h1>
            <img class = "downloadedpic" src={imageUrl} alt="Uploaded Image" />
            <br/>
            <a className="blackButton" href={imageUrl} download> View Photo </a> 
            </>}
        </>
    )
}

export { Download };


/*const imagesRef = firestore.collection("images"); // Reference to the "images" collection
        imagesRef.where("code", "==", code).get() // Query to find document with matching code
            .then((querySnapshot) => {
                if (!querySnapshot.empty) {
                    querySnapshot.forEach((doc) => {
                        const imageData = doc.data(); // Get data of the document
                        setImageUrl(imageData.url); // Set image URL from Firestore
                        setIsImgReady(true); // Set image ready flag
                    });
                } else {
                    console.log("Image not found for code:", code);
                }
            })
            .catch((error) => {
                console.error("Error fetching image:", error);
            });*/
            
            /*const db = getFirestore();
            const docRef = doc(db, "images", "AUqPTHnCYwC0gfck56Jd");
            const docSnap = await getDoc(docRef);
            console.log(docSnap.data())

            const findDocumentByField = async (value) => {*/