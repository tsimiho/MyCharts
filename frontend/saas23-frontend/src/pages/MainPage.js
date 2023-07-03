import "../App.css";
import Modal from "react-modal";
import React, { useState, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import DependencyWheelChart from '../components/DependencyWheelChart';
import LineChart from '../components/LineChart';
import LineChartWithAnnotations from '../components/LineChartwithAnnotations';
import BarChart from '../components/BarChart';
import NetworkGraph from '../components/NetworkGraph';
import PolarChart from '../components/PolarChart';

function MainPage({ newuser, setNewuser, user, setUser, userdata, setUserdata }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [type, setType] = useState("bar");
    const [ann, setAnn] = useState(0);
    const [chartComponent,setChartComponent] = useState(null);

    const openModal = (i) => {
        if (i % 6 === 0) {
            setChartComponent(<LineChart />);
        } else if (i % 6 === 1) {
            setChartComponent(<LineChartWithAnnotations />);
        } else if (i % 6 === 2) {
            setChartComponent(<BarChart />);
        } else if (i % 6 === 3) {
            setChartComponent(<DependencyWheelChart />);
        } else if (i % 6 === 4) {
            setChartComponent(<NetworkGraph />);
        } else if (i % 6 === 5) {
            setChartComponent(<PolarChart />);
        }
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        //window.history.back();
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
        const storedUser = localStorage.getItem("user");
        const storedUserdata = localStorage.getItem("userdata");
    
        if (storedUser) {
            const userObject = JSON.parse(storedUser);
            setUser(userObject);
            const userdataObject = JSON.parse(storedUserdata);
            setUserdata(userdataObject);
        }
    }, [setUser,setUserdata]);

    function signout() {
        setUser({});
        document.getElementById("signInDiv").hidden = false;
    }

    if (newuser === "false") return <Navigate replace to="/user" />;
    else if (Object.keys(user).length !== 0) return <Navigate replace to="/confirmation" />;
    else
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
                        <img src="/lineann.png" alt="LineChart with Ann"/>
                        LineChart with annotations
                    </button>{" "}
                    &nbsp;&nbsp;
                    <button className="mainbutton" onClick={() => openModal(2)}>
                        <img src="/barchart.jpg" alt="BarChart" />
                        Column Chart
                    </button>{" "}
                    &nbsp;&nbsp;
                    <button className="mainbutton" onClick={() => openModal(3)}>
                        <img src="/dependencywheel.jpg" alt="LineChart with Ann"/>
                        Dependency wheel
                    </button>
                    &nbsp;&nbsp;
                    <button className="mainbutton" onClick={() => openModal(4)}>
                        <img src="/networkgraph.png" alt="LineChart with Ann"/>
                        Network Graph
                    </button>
                    &nbsp;&nbsp;
                    <button className="mainbutton" onClick={() => openModal(5)}>
                        <img src="/polarchart.png" alt="LineChart with Ann"/>
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
                        }}>
                        {chartComponent}
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
