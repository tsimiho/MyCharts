import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  var quotas = 5
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (quotas < 10) {
      toast.error("You don't have enough quotas to create a chart!", {
          position: "top-left",
          autoClose: false,
      }); // Display an error toast notification
  }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setSelectedFile(file);
  };

  return (
    <div className={`upload-box ${selectedFile ? "active" : ""}`} 
         onDragOver={handleDragOver}
         onDrop={handleDrop}>
      <label htmlFor="file" className="upload-label">
        <span className="upload-icon">+</span> Select File
      </label><br/>
      <input
        id="file"
        type="file"
        name="file"
        className="file-input"
        onChange={handleFileChange}
      />
      {selectedFile && (
        <span className="file-name">Selected File: {selectedFile.name}</span>
      )}
      <ToastContainer />
    </div>
  );
}

export default FileUpload;