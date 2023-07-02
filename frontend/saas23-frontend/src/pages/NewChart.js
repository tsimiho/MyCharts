import "../style/UserPage.css";
import { Link, Navigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import FileUpload from "../components/FileUpload.js";
import HighchartsReact from "highcharts-react-official";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsAccessibility from "highcharts/modules/accessibility";
import HighchartsDependencyWheel from "highcharts/modules/dependency-wheel";
import Sankey from "highcharts/modules/sankey";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function NewChart({ user, setUser }) {
    const [i, setI] = useState(0);
    const types = ["bar", "line"];
    var [loggedin, setLoggedin] = useState(1);

    var quotas = 5;
    const changeI = (plus) => {
        if (plus) {
            var n = i + 1;
            setI(n);
        } else if (!plus) {
            var n = i - 1;
            setI(n);
        }
    };
    const jsonData = [
        { category: "A", value: 10 },
        { category: "B", value: 20 },
        { category: "C", value: 30 },
    ];

    const chartConfig = {
        type: "bar",
        data: {
            labels: ["A", "B", "C"],
            datasets: [
                {
                    label: "Value",
                    data: [10, 20, 30],
                    backgroundColor: "rgba(0, 123, 255, 0.6)",
                },
            ],
        },
    };

    const upload = () => {
        console.log("Here");
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
    }, [quotas]);

    const [selectedFile, setSelectedFile] = useState(null);
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
        if (quotas < 10) {
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
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={{
                                chart: {
                                    type: types[i % 2],
                                    height: 250,
                                },
                                title: {
                                    text: "My Chart",
                                },
                                xAxis: {
                                    categories: [
                                        "Apples",
                                        "Bananas",
                                        "Oranges",
                                    ],
                                },
                                yAxis: {
                                    title: {
                                        text: "Fruit Eaten",
                                    },
                                },
                                series: [
                                    {
                                        name: "Jane",
                                        data: [1, 0, 4],
                                    },
                                    {
                                        name: "John",
                                        data: [5, 7, 3],
                                    },
                                ],
                            }}
                        />
                        <button
                            class="arrow-button-left"
                            onClick={() => changeI(false)}
                        ></button>
                        <button
                            class="arrow-button"
                            onClick={() => changeI(true)}
                        ></button>
                    </div>
                    <button
                        className="mainbutton"
                        onClick={() => download_csv(types[i % 2])}
                    >
                        Description template for {types[i % 2]} chart{" "}
                    </button>
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
                        {quotas < 10 ? (
                            <br />
                        ) : (
                            <Link to="/newchart/preview">
                                <button
                                    className="mainbutton"
                                    onClick={() => upload()}
                                >
                                    Upload and create chart
                                </button>
                            </Link>
                        )}
                        &nbsp; &nbsp;
                        <Link to="/newchart">
                            <button className="mainbutton">Cancel</button>
                        </Link>
                    </div>
                </div>
                <ToastContainer />
            </div>
        );
}

export default NewChart;
