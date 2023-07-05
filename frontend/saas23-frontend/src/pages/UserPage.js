import "../style/UserPage.css";
import { Link, Navigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import socket from "../components/WebSocket.js";
import axios from "axios";

function UserPage({
    newuser,
    setNewuser,
    user,
    setUser,
    userdata,
    setUserdata,
}) {
    var data = [
        ["Number of Charts", userdata.diagrams ? userdata.diagrams.length : ""],
        ["Available Credits", userdata.quotas],
        [
            "Last Login",
            userdata.lastLogin ? userdata.lastLogin.slice(0, 10) : "",
        ],
    ];

    const [loading, setLoading] = useState(true); // New loading state
    const [loggedOut, setLoggedOut] = useState(false); // New loading state

    const rows = data.map((row, index) => {
        const cells = row.map((cell, cellIndex) => {
            return <td key={cellIndex}>{cell}</td>;
        });
        return <tr key={index}>{cells}</tr>;
    });

    function logout() {
        setUserdata({});
        localStorage.removeItem("userdata");
        setLoggedOut(true);
    }

    const updateuserdata = (data) => {
        data = JSON.parse(data);
        console.log(data);
        setUserdata(data);
        localStorage.setItem("userdata", JSON.stringify(data));
    };

    useEffect(() => {
        socket.onmessage = ({ data }) => {
            console.log("message");
            updateuserdata(data);
        };

        axios.post(`http://192.168.1.227:9001/api/login`, {
            email: userdata.email,
        });

        const storedUserdata = localStorage.getItem("userdata");

        try {
            setUserdata(JSON.parse(storedUserdata));
        } catch (error) {
            setUserdata(null);
        }

        setLoading(false);
    }, []);

    if (loggedOut === true) {
        return <Navigate replace to="/" />;
    }

    if (loading) {
        return <div></div>;
    }

    return (
        <div className="background">
            <div className="wrapper">
                <img src="/logo.png" alt="Logo" />
                <h1 className="title"> MyCharts App</h1>
                <button className="logout" onClick={() => logout()}>
                    Log out
                </button>
            </div>
            <div className="container">
                <h1 className="title"> Hello {userdata.email}</h1>
                <table className="data">
                    <tbody>{rows}</tbody>
                </table>
                <div className="buttonsuser">
                    <Link to="/mycharts">
                        <button className="mainbutton">My charts</button>
                    </Link>
                    &nbsp;&nbsp;&nbsp;
                    <Link to="/newchart">
                        <button className="mainbutton">New chart</button>
                    </Link>
                    &nbsp;&nbsp;&nbsp;
                    <Link to="/purchasecredits">
                        <button className="mainbutton">Buy credits</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default UserPage;
