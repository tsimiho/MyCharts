import React, { useState } from "react";

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
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
    </div>
  );
}

export default FileUpload;