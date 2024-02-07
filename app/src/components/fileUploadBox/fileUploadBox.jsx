import React from 'react';
import { useState, useRef, useEffect} from 'react';
import { UploadButton } from '../uploadButton/uploadButton';
import './fileUploadBox.css';

/*
    fileUploadBox

    supports drag and drop and manual upload and has animation changes for it
*/
function FileUploadBox({ setUploadImage }) {

    const [isFileOver, setIsFileOver] = useState(false);
    const [isDropped, setIsDropped] = useState(false);
    const[imageUpload, setImageUpload] = useState(null);

    const ref = useRef(null);

    // adding handlers for when they drag a file over us
    // and for when they drop a file on us
    // see drag and drop API for more info
    // https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API    

    // when the file is over the box
    function dragOverHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        // turn on hover styling
        setIsFileOver(true);
    }

    // when it leaves the box or we stop dragging for whatever reason
    function dragend_dragleaveHandler(e) {
        e.preventDefault();
        e.stopPropagation();

        // set the styling back to default
        setIsFileOver(false);    
    }


    // when we drop the file on the box
    function dropHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const f = e.dataTransfer.files; // grab the file
        if (f) {
            if (f[0]) { 
                // turn on processing style
                setIsDropped(true); 

                // checking extension to see if it's heic, png, jpg, jpeg
                let regex = new RegExp('[^.]+$');
                let extension = f[0].name.toLowerCase().match(regex);
                
                // if it's valid add it to local storage
                if (extension == "png" || extension == "jpeg" || extension == "jpg" || extension == "heic") {
                    let reader = new FileReader();
                    reader.readAsDataURL(f[0]);
                    reader.onload = () => {
                        localStorage.setItem("url", reader.result)
                        localStorage.setItem("blob", f[0] )
                        window.dispatchEvent(new Event("storage")) // see confirmUpload.jsx
                    };
                } else {
                    // otherwise activate modal
                    setIsDropped(false);
                    setIsFileOver(false);
                    console.log("Bad Extension");
                }
            }
        }
    }
    
    // handling a major bug


    // on the components bootup add these event listeners
    // when we destroy the component remove these event listeners
    useEffect(() => {
        ref.current.addEventListener('dragover', dragOverHandler);
        ref.current.addEventListener('drop', dropHandler);
        ref.current.addEventListener('dragend', dragend_dragleaveHandler);
        ref.current.addEventListener('dragleave', dragend_dragleaveHandler);
        
        return () => {
            // it seems that something is causing
            // this to be called twice? and it's causing an error
            // at unmount time
            // see https://react.dev/learn/synchronizing-with-effects
            if (ref.current !== null) {
                ref.current.removeEventListener('dragover', dragOverHandler);
                ref.current.removeEventListener('drop', dropHandler);
                ref.current.removeEventListener('dragend', dragend_dragleaveHandler);
                ref.current.removeEventListener('dragleave', dragend_dragleaveHandler);
            }
        };

    }, []);

    

    return (
            <div ref={ref} className={ isFileOver? 'file-upload-box-hovered' : 'file-upload-box'}>
                <div className='black-button-wrapper'>
                { !isDropped && <UploadButton text={ isFileOver ? "Drop Here" : "Upload Image"} />}
                { isDropped && <h2>Processing...</h2>}          
                </div>
                {!isDropped && <h6 className="small-text">or drop a file...</h6>}
                {isDropped && <h6 className="small-text">please wait shortly...</h6>  }
            </div>
    );
}


export {FileUploadBox};