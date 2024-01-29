import React , {useState} from "react";

import "./download.css";
import  BlackButton  from "../../components/blackButton/blackButton";

function Download() {
    const [isImgReady, setIsImgReady] = useState(false);
    const [code, setCode] = useState(false);
    function handleClick() {
        setIsImgReady(true);
        console.log(code); //to do fetch image from code 
    }
    const handleInputChange = (event) => {
        setCode(event.target.value);
    }
    return (
        <>
            <p> Enter Code: </p>
            <input onChange={handleInputChange}/>
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