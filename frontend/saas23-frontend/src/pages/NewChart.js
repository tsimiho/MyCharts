import "../style/UserPage.css";
import { Link, Navigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import FileUpload from "../components/FileUpload.js";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import csvtojson from "csvtojson";
import DependencyWheelChart from "../components/DependencyWheelChart";
import LineChart from "../components/LineChart";
import LineChartWithAnnotations from "../components/LineChartwithAnnotations";
import BarChart from "../components/BarChart";
import NetworkGraph from "../components/NetworkGraph";
import PolarChart from "../components/PolarChart";
import LineChartSchema from "../schemas/LineChartSchema";
import LineWithAnnotationsSchema from "../schemas/LineWithAnnotationsSchema";
import ColumnSchema from "../schemas/ColumnSchema";
import NetworkSchema from "../schemas/NetworkSchema";
import DependencyWheelSchema from "../schemas/DependencyWheelSchema";
import PolarSchema from "../schemas/PolarSchema";

function NewChart({ user, setUser, userdata, setUserdata }) {
    const [i, setI] = useState(0);
    const [jsonData, setJsonData] = useState(null);
    const types = [
        "LineChart",
        "LineAnnotationChart",
        "BasicColumn",
        "DependencyWheel",
        "NetworkGraph",
        "PolarChart",
    ];
    var [loggedin, setLoggedin] = useState(1);

    const changeI = (plus) => {
        if (plus) {
            var n = i + 1;
            setI(n);
        } else if (!plus) {
            var n = i - 1;
            if (n < 0) n = n + 6;
            setI(n);
        }
    };

    let chartComponent;

    if (i % 6 === 0) {
        chartComponent = <LineChart height={"250"} />;
    } else if (i % 6 === 1) {
        chartComponent = <LineChartWithAnnotations height={"250"} />;
    } else if (i % 6 === 2) {
        chartComponent = <BarChart height={"250"} />;
    } else if (i % 6 === 3) {
        chartComponent = <DependencyWheelChart height={"250"} />;
    } else if (i % 6 === 4) {
        chartComponent = <NetworkGraph height={"250"} />;
    } else if (i % 6 === 5) {
        chartComponent = <PolarChart height={"250"} />;
    }

    const convertCSVToJson = async (csvData) => {
        try {
            const jsonArray = await csvtojson().fromString(csvData);
            return jsonArray;
        } catch (error) {
            console.error("Error converting CSV to JSON:", error);
            return [];
        }
    };

    function hasSameSchema(json, reference) {
        // Get the keys of the JSON object and the reference schema
        const jsonKeys = Object.keys(json);
        const referenceKeys = Object.keys(reference);

        // Check if the number of keys is the same
        // if (jsonKeys.length !== referenceKeys.length) {
        //   return false;
        // }

        // Iterate over the keys
        for (let key of jsonKeys) {
            // Check if the key exists in the reference schema
            if (!reference.hasOwnProperty(key)) {
                console.log(key);
                toast.error(
                    "There is no property named " +
                        key +
                        " in the schema for the specific chart",
                    {
                        position: "top-left",
                        autoClose: 5000,
                    }
                );
                return false;
            }
        }

        return true;
    }

    const checkandsetjson = (json) => {
        const jsonnew = {};
        Object.entries(json[0]).forEach(([key, value]) => {
            jsonnew[key] = JSON.parse(value);
        });
        // console.log(jsonnew.chart.hasOwnProperty("type"));
        if (!jsonnew.hasOwnProperty("chart")) {
            toast.error("The csv doesn't have a 'chart' property", {
                position: "top-left",
                autoClose: 3000,
            });
            return;
        }
        var hasschema = false;
        if (jsonnew.chart.hasOwnProperty("type")) {
            console.log(jsonnew.chart.type);
            if (jsonnew.chart.type === "column") {
                hasschema = hasSameSchema(jsonnew, ColumnSchema);
            } else if (jsonnew.chart.type === "networkgraph") {
                hasschema = hasSameSchema(jsonnew, NetworkSchema);
            } else if (jsonnew.chart.type === "dependencywheel") {
                hasschema = hasSameSchema(jsonnew, DependencyWheelSchema);
            } else if (jsonnew.chart.type === "line") {
                if (jsonnew.hasOwnProperty("annotations")) {
                    hasschema = hasSameSchema(
                        jsonnew,
                        LineWithAnnotationsSchema
                    );
                } else {
                    hasschema = hasSameSchema(jsonnew, LineChartSchema);
                }
            }
        } else if (jsonnew.chart.polar === "true") {
            console.log("polar");
            hasschema = hasSameSchema(jsonnew, PolarSchema);
        }
        console.log(hasschema);
        if (hasschema) {
            setJsonData(json);
        }
    };

    const download_csv = (diagram_type) => {
        const url = `http://localhost:9014/api/download_csv?param=${encodeURIComponent(
            diagram_type
        )}`;
        window.location.href = url;
    };

    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileChange = (event) => {
        const file = event.target.files[0];

        const fileName = file.name;
        const fileType = file.type;
        const isCSV = fileName.endsWith(".csv") || fileType === "text/csv";

        if (!isCSV) {
            toast.error(
                "Please select a CSV file according to the description templates!",
                {
                    position: "top-left",
                    autoClose: 3000,
                }
            );
            return;
        }
        if (userdata.quotas < 1) {
            toast.error("You don't have enough quotas to create a chart!", {
                position: "top-left",
                autoClose: false,
            }); // Display an error toast notification
        }

        setSelectedFile(file);

        const reader = new FileReader();

        reader.onload = async (event) => {
            const contents = event.target.result;
            const json = await convertCSVToJson(contents);
            console.log(json[0]);
            checkandsetjson(json);
        };

        reader.onerror = (event) => {
            console.error("Error reading the file:", event.target.error);
        };

        reader.readAsText(file);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        console.log(file);
        // Check if the file name or file type indicates it is a CSV file
        const fileName = file.name;
        const fileType = file.type;
        const isCSV = fileName.endsWith(".csv") || fileType === "text/csv";

        if (!isCSV) {
            toast.error(
                "Please select a CSV file according to the description templates!",
                {
                    position: "top-left",
                    autoClose: 3000,
                }
            );
            return; // Stop further processing
        }
        setSelectedFile(file);

        const reader = new FileReader();

        reader.onload = async (event) => {
            const contents = event.target.result;
            const json = await convertCSVToJson(contents);
            console.log(json[0]);
            // check if csv file has correct format
            checkandsetjson(json);
        };

        reader.onerror = (event) => {
            console.error("Error reading the file:", event.target.error);
        };

        reader.readAsText(file);
        if (userdata.quotas < 1) {
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
                    </div>
                    <br />
                    <button
                        className="mainbutton"
                        onClick={() => download_csv(types[i % 6])}
                    >
                        Description template for {types[i % 6]}{" "}
                    </button>
                    <br />
                    <br />
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
                        {userdata.quotas < 1 || jsonData === null ? (
                            <h1 className="titleuser"> </h1>
                        ) : (
                            <Link
                                to={`/newchart/preview?jsonData=${encodeURIComponent(
                                    JSON.stringify(jsonData)
                                )}`}
                            >
                                <button className="mainbutton">
                                    Upload and create chart
                                </button>
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
