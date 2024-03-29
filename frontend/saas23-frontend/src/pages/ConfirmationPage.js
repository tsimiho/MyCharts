import "../style/UserPage.css";
import { Link, Navigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
// import socket from "../components/WebSocket.js";

function Confirmation({
    newuser,
    setNewuser,
    user,
    setUser,
    userdata,
    setUserdata,
}) {
    const nothanks = () => {
        setUserdata({});
    };

    useEffect(() => {}, []);

    return (
        <div className="background">
            <div className="wrapper">
                <img src="/logo.png" alt="Logo" />
                <h1 className="title"> MyCharts App</h1>
            </div>
            <br />
            <div className="centered-container">
                <h2 className="title">
                    {" "}
                    This is the first time you are logging in with{" "}
                    {userdata.email}
                </h2>
                <h2 className="title">
                    {" "}
                    If you continue, your email will be stored in our database
                </h2>
                <h2 className="title">
                    {" "}
                    to allow you store your created charts and purchase chart
                    credits
                </h2>
            </div>
            <div className="buttonsuser">
                <Link to="/user">
                    <button className="mainbutton">Continue</button>
                </Link>
                &nbsp;&nbsp;&nbsp;
                <Link to="/">
                    <button onClick={() => nothanks()} className="mainbutton">
                        No thanks
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Confirmation;
