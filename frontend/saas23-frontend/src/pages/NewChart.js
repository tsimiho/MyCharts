import "../style/UserPage.css";
import { Link, Navigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import FileUpload from "../components/FileUpload.js";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import csvtojson from 'csvtojson';
import DependencyWheelChart from '../components/DependencyWheelChart';
import LineChart from '../components/LineChart';
import LineChartWithAnnotations from '../components/LineChartwithAnnotations';
import BarChart from '../components/BarChart';
import NetworkGraph from '../components/NetworkGraph';
import PolarChart from '../components/PolarChart';

function NewChart({ user, setUser, userdata, setUserdata }) {
    const [i, setI] = useState(0);
    const [jsonData, setJsonData] = useState([]);
    const types = ["line","bar"];
    var [loggedin, setLoggedin] = useState(1);

    const changeI = (plus) => {
        if (plus) {
            var n = i + 1;
            setI(n);
        } else if (!plus) {
            var n = i - 1;
            if (n<0) n = n + 6
            setI(n);
        }
    };
    
    let chartComponent;

    if (i % 6 === 0) {
        chartComponent = <LineChart />;
    } else if (i % 6 === 1) {
        chartComponent = <LineChartWithAnnotations />;
    } else if (i % 6 === 2) {
        chartComponent = <BarChart />;
    } else if (i % 6 === 3) {
        chartComponent = <DependencyWheelChart />;
    } else if (i % 6 === 4) {
        chartComponent = <NetworkGraph />;
    } else if (i % 6 === 5) {
        chartComponent = <PolarChart />;
    }
      
    const convertCSVToJson = async (csvData) => {
        try {
            const jsonArray = await csvtojson().fromString(csvData);
            return jsonArray;
        } catch (error) {
            console.error('Error converting CSV to JSON:', error);
            return [];
        }
    };
      

    const download_csv = (diagram_type) => {
        const url = `http://localhost:9011/api/download_csv?param=${encodeURIComponent(
            diagram_type
        )}`;
        window.location.href = url;
    };

    useEffect(() => {
        // const storedUser = localStorage.getItem("user");
        // console.log(user);
        // if (!storedUser) {
        //   console.log(1);
        //   setLoggedin(0)
        // }
        console.log(userdata);
    }, []);

    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileChange = (event) => {
        const file = event.target.files[0];

        // Check if the file name or file type indicates it is a CSV file
        const fileName = file.name;
        const fileType = file.type;
        const isCSV = fileName.endsWith(".csv") || fileType === "text/csv";
        
        if (!isCSV) {
            toast.error("Please select a CSV file according to the description templates!", {
                position: "top-left",
                autoClose: 3000,
            });
            return; // Stop further processing
        }
        setSelectedFile(file);
        
        const reader = new FileReader();
    
        reader.onload = async (event) => {
            const contents = event.target.result;
            const json = await convertCSVToJson(contents);
            console.log(json)
            setJsonData(json)
        };
    
        reader.onerror = (event) => {
            console.error('Error reading the file:', event.target.error);
        };
    
        reader.readAsText(file);
        if (userdata.quotas < 10) {
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
        handleFileChange(event);
        if (userdata.quotas < 10) {
            toast.error("You don't have enough quotas to create a chart!", {
                position: "top-left",
                autoClose: false,
            }); // Display an error toast notification
        }
    };

    if (loggedin === 0) return <Navigate replace to="/" />;
    else
        return (
            <div className="background">
                <div className="wrapper2">
                    <img src="/logo.png" alt="Logo" />
                    <h1 className="title"> MyCharts App</h1>
                </div>
                <div className="container1">
                    <Link to="/user">
                        <button className="logout">Back</button>
                    </Link>
                </div>
                <div className="containernew">
                    <h1 className="titleuser"> Let's create your own chart!</h1>
                    <div className="container1">
                        {chartComponent}
                        <button
                            className="arrow-button-left"
                            onClick={() => changeI(false)}
                        ></button>
                        <button
                            className="arrow-button"
                            onClick={() => changeI(true)}
                        ></button>
                    </div><br />
                    <button
                        className="mainbutton"
                        onClick={() => download_csv(types[i % 2])}
                    >
                        Description template for {types[i % 2]} chart{" "}
                    </button>
                    <br /><br />
                    <div
                        className={`upload-box ${selectedFile ? "active" : ""}`}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                    >
                        <label htmlFor="file" className="upload-label">
                            <span className="upload-icon">+</span> Select File
                        </label>
                        <br />
                        <input
                            id="file"
                            type="file"
                            name="file"
                            className="file-input"
                            onChange={handleFileChange}
                        />
                        {selectedFile && (
                            <span className="file-name">
                                Selected File: {selectedFile.name}
                            </span>
                        )}
                    </div>
                    <div className="buttonsuser">
                        {userdata.quotas < 10 || selectedFile === null ? (
                            <br />
                        ) : (
                            <Link
                                to={`/newchart/preview?jsonData=${encodeURIComponent(
                                    JSON.stringify(jsonData)
                                )}`}
                            >
                                <button className="mainbutton" >Upload and create chart</button>
                            </Link>
                        )}
                        &nbsp; &nbsp;
                        <Link to="/user">
                            <button className="mainbutton">Cancel</button>
                        </Link>
                    </div>
                </div>
                <ToastContainer />
            </div>
        );
}

export default NewChart;
