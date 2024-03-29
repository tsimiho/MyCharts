import "../App.css";
import Modal from "react-modal";
import React, { useState, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import DependencyWheelChart from "../components/DependencyWheelChart";
import LineChart from "../components/LineChart";
import LineChartWithAnnotations from "../components/LineChartwithAnnotations";
import BarChart from "../components/BarChart";
import NetworkGraph from "../components/NetworkGraph";
import PolarChart from "../components/PolarChart";
// import socket from "../components/WebSocket.js";

function MainPage({
    newuser,
    setNewuser,
    user,
    setUser,
    userdata,
    setUserdata,
}) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [type, setType] = useState("bar");
    const [ann, setAnn] = useState(0);
    const [chartComponent, setChartComponent] = useState(null);
    const [loading, setLoading] = useState(true); // New loading state

    const openModal = (i) => {
        if (i % 6 === 0) {
            setChartComponent(<LineChart height={"350"} />);
        } else if (i % 6 === 1) {
            setChartComponent(<LineChartWithAnnotations height={"350"} />);
        } else if (i % 6 === 2) {
            setChartComponent(<BarChart height={"350"} />);
        } else if (i % 6 === 3) {
            setChartComponent(<DependencyWheelChart height={"350"} />);
        } else if (i % 6 === 4) {
            setChartComponent(<NetworkGraph height={"350"} />);
        } else if (i % 6 === 5) {
            setChartComponent(<PolarChart height={"350"} />);
        }
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    function handleCallbackResponse(response) {
        var userObject = jwt_decode(response.credential);
        console.log(userObject.email);
        setUser(userObject);
        axios.post("http://localhost:9001/api/login", {
            email: userObject.email,
        });

        document.getElementById("signInDiv").hidden = false;
    }

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.onload = initializeGoogleButton;
        document.body.appendChild(script);

        function initializeGoogleButton() {
            google.accounts.id.initialize({
                client_id:
                    "919864012907-eihr65v77jminklnqd7j61r2bf6q2pdt.apps.googleusercontent.com",
                callback: handleCallbackResponse,
            });

            google.accounts.id.renderButton(
                document.getElementById("signInDiv"),
                {
                    theme: "outline",
                    size: "large",
                }
            );
        }
        const socket = new WebSocket("ws://localhost:8090");

        socket.onopen = () => {
            console.log("WebSocket connection established");
        };

        socket.onclose = () => {
            console.log("WebSocket connection closed");
        };

        socket.onmessage = ({ data }) => {
            setUserdata(JSON.parse(data));
            localStorage.setItem("userdata", data);
        };

        

        // Cleanup the WebSocket connection when the component unmounts

        // google.accounts.id.renderButton(document.getElementById("signInDiv"), {
        //     theme: "outline",
        //     size: "large",
        // });
        // localStorage.clear();

        /* global google */
        // google.accounts.id.initialize({
        //     client_id:
        //         "919864012907-eihr65v77jminklnqd7j61r2bf6q2pdt.apps.googleusercontent.com",
        //     callback: handleCallbackResponse,
        // });

        // localStorage.removeItem("user");
        // const storedUser = localStorage.getItem("user");
        // const storedUserdata = localStorage.getItem("userdata");

        // if (storedUserdata) {
        //     // const userObject = JSON.parse(storedUser);
        //     // setUser(userObject);
        //     const userdataObject = JSON.parse(storedUserdata);
        //     setUserdata(userdataObject);
        // }
        const storedUserdata = localStorage.getItem("userdata");

        try {
            // setUser(JSON.parse(storedUser));
            setUserdata(JSON.parse(storedUserdata));
        } catch (error) {
            setUserdata(null);
        }
        setLoading(false);

        return () => {
            socket.close();
        };
    }, []);

    if (loading) {
        return <div></div>;
    }
    
    if (userdata) {
        if (userdata.new === false) return <Navigate replace to="/user" />;
        else if (userdata.new === true)
            return <Navigate replace to="/confirmation" />;
    }

    return (
        <div className="background">
            <div className="wrapper">
                <img src="/logo.png" alt="Logo" />
                <h1 className="title"> MyCharts App</h1>
            </div>
            <div className="buttonscontainer">
                <button className="mainbutton" onClick={() => openModal(0)}>
                    <img src="/linechart.png" alt="LineChart" />
                    LineChart
                </button>{" "}
                &nbsp;&nbsp;
                <button className="mainbutton" onClick={() => openModal(1)}>
                    <img src="/lineann.png" alt="LineChart with Ann" />
                    LineChart with annotations
                </button>{" "}
                &nbsp;&nbsp;
                <button className="mainbutton" onClick={() => openModal(2)}>
                    <img src="/barchart.jpg" alt="BarChart" />
                    Column Chart
                </button>{" "}
                &nbsp;&nbsp;
                <button className="mainbutton" onClick={() => openModal(3)}>
                    <img src="/dependencywheel.jpg" alt="LineChart with Ann" />
                    Dependency wheel
                </button>
                &nbsp;&nbsp;
                <button className="mainbutton" onClick={() => openModal(4)}>
                    <img src="/networkgraph.png" alt="LineChart with Ann" />
                    Network Graph
                </button>
                &nbsp;&nbsp;
                <button className="mainbutton" onClick={() => openModal(5)}>
                    <img src="/polarchart.png" alt="LineChart with Ann" />
                    Polar chart
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
                            height: "55%",
                            margin: "auto",
                        },
                    }}
                >
                    {chartComponent}
                    <button className="mainbutton" onClick={closeModal}>
                        Back
                    </button>
                </Modal>
            </div>
            <div className="containerparent">
                <div className="containermain">
                    <h2 className="title">
                        {" "}
                        Press on a diagram to see how it works, or login with
                        your google account to start creating your own diagrams
                    </h2>
                    <div id="signInDiv"></div>
                </div>
            </div>
        </div>
    );
}

export default MainPage;
