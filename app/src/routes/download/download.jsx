import React , {useState} from "react";
import { firestore } from "../../firebase"
import { getFirestore, collection, query, where, doc, getDoc, getDocs } from "firebase/firestore"
import "./download.css";
import  BlackButton  from "../../components/blackButton/blackButton";

const db = getFirestore();
const docRef = doc(db, "images", "AUqPTHnCYwC0gfck56Jd");
const docSnap = await getDoc(docRef);
//console.log(docSnap.data())

function Download() {
    const [isImgReady, setIsImgReady] = useState(false);
    const [code, setCode] = useState('');
    
    const handleClick = async () => {
        try{
            console.log('Code entered by user:', code);
            setIsImgReady(true);

            const imageRef = collection(firestore, 'images');
            const q = query(imageRef, where('code', '==', parseInt(code)));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                querySnapshot.forEach((doc) => {
                    const imageData = doc.data();
                    console.log('URL:', imageData.url); // Access URL from document data
                });
                setIsImgReady(true);
            } else {
                console.log("Image not found for code:", code);
            }
        } catch (error) {
            console.error("Error querying Firestore:", error);
            return null;
        }
    }

    const handleInputChange = (event) => {
        setCode(event.target.value);
    }
    return (
        <>
            <p> Enter Code: </p>
            <input type="number" value={code} onChange={handleInputChange}/>
            <br/>
            {(!isImgReady) && <>
                <BlackButton text = {"Check Code"}  onClick={handleClick}/>
            </>}

            {(isImgReady) && <>
            <a className="blackButton" download = "/"> Download </a> 
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