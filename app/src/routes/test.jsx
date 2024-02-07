import React, { useState } from 'react';
//import {firebase} from "../firebase"


// Firebase configuration
const Test = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  // Function to handle image upload
  const test = async (e) => {
    const file = e.target.files[0];
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    const url = await fileRef.getDownloadURL();
    setImage(url);
  };

  // Function to handle image download
  const handleImageDownload = async () => {
    const storageRef = firebase.storage().refFromURL(imageUrl);
    const url = await storageRef.getDownloadURL();
    setImageUrl(url);
  };

  return (
    <div>
      <h2>Image Upload and Download</h2>
      <input type="file" onChange={test} />
      <br />
      {image && <img src={image} alt="Uploaded" style={{ maxWidth: '300px' }} />}
      <br />
      <button onClick={handleImageDownload}>Download Image</button>
    </div>
  );
};

export { Test };
