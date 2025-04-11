import React, { useState } from 'react';
import axios from '../services/axios';

const UploadDocuments = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');  // Added for message handling

  const handleUpload = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('file', file);

    const userId = 1; // Assuming the ID is hardcoded or dynamically fetched

    try {
      await axios.post(`/api/documents/upload/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Uploaded successfully');
    } catch (err) {
      alert('Upload failed');
    }
  };


  return (
    <div>
      <h2>Upload Document</h2>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}  {/* Display message */}
    </div>
  );
};

export default UploadDocuments;
