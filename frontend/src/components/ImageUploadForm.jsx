import React, { useState } from 'react';
import axios from 'axios';
import AxiosInstance from './Axois';

const ImageUploadForm = () => {
  const [image, setImage] = useState(null);

  // Function to handle image selection
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create FormData object to send image data
    const formData = new FormData();
    formData.append('image', image);

    try {
      // Send POST request to backend API endpoint
      const response = await AxiosInstance.post(`images/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Handle successful response (e.g., show success message)
      console.log('Image uploaded successfully:', response.data);
    } catch (error) {
      // Handle error (e.g., show error message)
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <h2>Upload Image</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default ImageUploadForm;
