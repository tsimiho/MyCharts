import "../App.css";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Modal from "react-modal";
import React, { useState, useEffect } from "react";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsAccessibility from "highcharts/modules/accessibility";
import HighchartsDependencyWheel from "highcharts/modules/dependency-wheel";
import Sankey from "highcharts/modules/sankey";
import { Link, Navigate, useParams } from "react-router-dom";
import Chart from "chart.js/auto";
import LineChart from "../components/LineChart";
import jwt_decode from "jwt-decode";
import axios from "axios";

// const WebSocket = require('ws');
// const socket = new WebSocket('ws://localhost:9100');

const getOptions = (type) => ({
    chart: {
        type,
    },
    title: {
        text: type + " chart",
    },
    series: [
        {
            keys: ["from", "to", "weight"],
            linkWeight: 5,
            centeredLinks: true,
            dataLabels: {
                format: "{point.fromNode.name} → {point.toNode.name}: {point.weight}",
                nodeFormat: "{point.name}",
                color: "black",
            },
            data: [
                ["A", "B", 1],
                ["A", "C", 1],
                ["A", "D", 2],
                ["B", "C", 2],
                ["C", "D", 1],
                ["E", "D", 3],
                ["E", "F", 1],
            ],
        },
    ],
    credits: {
        enabled: false,
    },
});

function MainPage({ user, setUser }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [type, setType] = useState("bar");
    const [ann, setAnn] = useState(0);

    const openModal = (type, ann) => {
        setType(type);
        setAnn(ann);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        //window.history.back();
    };

    // works for line and bar charts
    const MyChart = () => {
        HighchartsExporting(Highcharts);
        HighchartsAccessibility(Highcharts);
        Sankey(Highcharts);
        HighchartsDependencyWheel(Highcharts);
        if (ann === 0)
            return (
                <HighchartsReact
                    highcharts={Highcharts}
                    options={{
                        chart: {
                            type: type,
                        },
                        title: {
                            text: "My Chart",
                        },
                        xAxis: {
                            categories: ["Apples", "Bananas", "Oranges"],
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
            );
        else if (ann === 1)
            return (
                <HighchartsReact
                    highcharts={Highcharts}
                    options={{
                        chart: {
                            type: "line",
                        },
                        title: {
                            text: "Example Line Chart with Annotations",
                        },
                        xAxis: {
                            categories: [
                                "Jan",
                                "Feb",
                                "Mar",
                                "Apr",
                                "May",
                                "Jun",
                                "Jul",
                                "Aug",
                                "Sep",
                                "Oct",
                                "Nov",
                                "Dec",
                            ],
                        },
                        yAxis: {
                            title: {
                                text: "Example Y-Axis",
                            },
                        },
                        series: [
                            {
                                name: "Example Series",
                                data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                            },
                        ],
                        annotations: [
                            {
                                labels: [
                                    {
                                        point: {
                                            x: 2,
                                            y: 3,
                                        },
                                        text: "Example Label",
                                    },
                                ],
                            },
                        ],
                    }}
                />
            );
        else
            return (
                <HighchartsReact
                    highcharts={Highcharts}
                    options={getOptions("dependencywheel")}
                />
            );
    };

    // for Google Login
    // Handle messages received from the backend
    // socket.onmessage = (event) => {
    //   const message = JSON.parse(event.data);
    //   if (message.status === 'acknowledgment') {
    //     // Handle acknowledgment response
    //   } else if (message.status === 'data') {
    //     // Handle data response
    //     console.log(message)
    //   }
    // };

    // Send user email to the backend
    // function handleCallbackResponse(response) {
    //     console.log("token" + response.credential);
    //     var userObject = jwt_decode(response.credential);
    //     console.log(userObject.email);
    //     setUser(userObject);

    //     // socket.send(JSON.stringify({ email: userObject.email }));

    //     document.getElementById("signInDiv").hidden = true;
    // }
    function handleCallbackResponse(response) {
        // console.log("token" + response.credential);
        var userObject = jwt_decode(response.credential);
        console.log(userObject.email);
        setUser(userObject);
        axios.post("http://localhost:9001/api/login", {
            email: userObject.email,
        });
        // .then((response) => {
        //   console.log(response.data);
        // })
        localStorage.setItem("user", JSON.stringify(userObject)); // Store user object in local storage
        document.getElementById("signInDiv").hidden = true;
    }
    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id:
                "919864012907-eihr65v77jminklnqd7j61r2bf6q2pdt.apps.googleusercontent.com",
            callback: handleCallbackResponse,
        });

        google.accounts.id.renderButton(document.getElementById("signInDiv"), {
            theme: "outline",
            size: "large",
        });
    }, []);

    function signout() {
        setUser({});
        document.getElementById("signInDiv").hidden = false;
    }

    if (Object.keys(user).length !== 0) return <Navigate replace to="/user" />;
    else
        return (
            <div className="background">
                <div className="wrapper">
                    <img src="/logo.png" alt="Logo" />
                    <h1 className="title"> MyCharts App</h1>
                </div>
                <div className="buttonscontainer">
                    <button
                        className="mainbutton"
                        onClick={() => openModal("bar", 0)}
                    >
                        <img src="/barchart.jpg" alt="BarChart" />
                        BarChart
                    </button>{" "}
                    &nbsp;
                    <button
                        className="mainbutton"
                        onClick={() => openModal("line", 0)}
                    >
                        <img src="/linechart.png" alt="LineChart" />
                        LineChart
                    </button>{" "}
                    &nbsp;
                    <button
                        className="mainbutton"
                        onClick={() => openModal("line", 1)}
                    >
                        <img src="/lineann.png" alt="LineChart with Ann" />
                        LineChart with annotations
                    </button>{" "}
                    &nbsp;
                    <button
                        className="mainbutton"
                        onClick={() => openModal("dependencywheel", 2)}
                    >
                        <img
                            src="/dependencywheel.jpg"
                            alt="LineChart with Ann"
                        />
                        Dependency wheel
                    </button>
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        contentLabel="Chart Modal"
                        style={{
                            overlay: {
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                            },
                            content: {
                                width: "50%",
                                height: "65%",
                                margin: "auto",
                            },
                        }}
                    >
                        <MyChart />
                        <LineChart
                            type={Math.round(Math.random())}
                            chartData={{
                                labels: ["Red", "Orange", "Blue"],
                                datasets: [
                                    {
                                        label: "Popularity of colours",
                                        data: [55, 23, 96],
                                        backgroundColor: [
                                            "rgba(255, 255, 255, 0.6)",
                                            "rgba(255, 255, 255, 0.6)",
                                            "rgba(255, 255, 255, 0.6)",
                                        ],
                                        borderColor: "rgba(255, 99, 132, 1)",
                                        borderWidth: 1,
                                    },
                                    {
                                        label: "Another line",
                                        data: [12, 45, 78],
                                        backgroundColor: [
                                            "rgba(255, 255, 255, 0.6)",
                                            "rgba(255, 255, 255, 0.6)",
                                            "rgba(255, 255, 255, 0.6)",
                                        ],
                                        borderColor: "rgba(54, 162, 235, 1)",
                                        borderWidth: 1,
                                    },
                                ],
                            }}
                            title={"Line chart with chartjs"}
                        />
                        <button className="mainbutton" onClick={closeModal}>
                            Back
                        </button>
                    </Modal>
                </div>
                <div className="container">
                    <h2 className="title">
                        {" "}
                        Press on a diagram to see how it works, or login with
                        your google account to start creating your diagrams
                    </h2>
                    <div id="signInDiv"></div>
                </div>
            </div>
        );
}

export default MainPage;
